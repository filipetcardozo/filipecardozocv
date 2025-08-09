## 🔴 GraphQL Avançado

---

### 1. **Como projetar um schema GraphQL escalável e evolutivo?**

Boas práticas para schemas escaláveis:

* **Modelagem por domínio**: separar `User`, `Order`, `Product`, etc., com limites claros.
* **Nomes estáveis e descritivos**: evite renomear tipos ou campos sem versionamento.
* **Evitar sobrecarga de campos**: não crie supertipos com 50+ campos. Use relações.
* **Modularização** com SDL (Schema Definition Language) em múltiplos arquivos.
* **Depender de contratos tipados (OpenAPI, Protobuf) quando integra sistemas legados.**

**Evolução:**

* Sempre adicione, nunca remova.
* Campos novos devem ser opcionais por padrão.
* Documente o uso esperado de cada campo para facilitar depreciação futura.

---

### 2. **Como versionar APIs GraphQL sem quebrar clientes existentes?**

GraphQL **não tem versionamento por URL** como REST.

**Técnicas seguras:**

* **Adicionar, nunca remover** campos.
* Usar **alias** para simular campos novos sem quebrar antigos:

  ```graphql
  legacyPrice: priceV1
  currentPrice: priceV2
  ```
* **Usar diretivas customizadas** para descrever versões (`@deprecated`, `@release(label: "beta")`).
* **Schema stitching ou federation** para publicar múltiplos schemas coexistentes.

**Evite:**

* Mudar tipos de retorno.
* Renomear ou reestruturar respostas.

---

### 3. **Como aplicar autorização e autenticação por campo (field-level auth) no GraphQL?**

**Autenticação:** validar *quem* está fazendo a requisição.
**Autorização:** validar *o que* essa pessoa pode acessar.

**Abordagens:**

* **Resolvers por campo** com verificação:

  ```ts
  user: (parent, args, context) => {
    if (!context.user) throw new AuthError()
    return getUser(args.id)
  }
  ```

* **Middleware de schema (ex: graphql-shield)**:
  Define regras declarativas por tipo/campo:

  ```ts
  rules: {
    Query: {
      me: isAuthenticated,
      adminData: isAdmin
    }
  }
  ```

**Granularidade:** aplicar por query, mutation, e até por subcampo (ex: `salary` só visível para RH).

---

### 4. **O que são fragments e como usá-los para evitar repetição e otimizar queries?**

**Fragments** são blocos reutilizáveis de seleção de campos.

```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "123") {
    ...UserFields
  }
  author(id: "456") {
    ...UserFields
  }
}
```

**Vantagens:**

* Reduz repetição de campos em múltiplas queries.
* Ajuda no versionamento (um fragment por versão de UI).
* Facilita caching e diffing no Apollo Client.

---

### 5. **Como implementar e usar pagination em GraphQL (offset, cursor, Relay-style)?**

**Modelos comuns:**

* **Offset pagination:**

  ```graphql
  posts(offset: 20, limit: 10)
  ```

  Simples, mas frágil em listas mutáveis.

* **Cursor-based (Relay-style):**

  ```graphql
  posts(first: 10, after: "cursor123") {
    edges {
      node { title }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  ```

  Mais robusto para feeds, chats e listas dinâmicas.

**Boas práticas:**

* Sempre expor `hasNextPage`, `endCursor`.
* Mantenha `limit` no backend (ex: max 100).
* Cursors devem ser opacos (ex: base64 de um ID/timestamp).

---

### 6. **O que é N+1 problem em resolvers e como evitá-lo com data loaders?**

**N+1 problem** acontece quando resolvers fazem múltiplas chamadas individuais para campos relacionados:

```ts
// Ex: para 100 posts
posts.map(p => getUserById(p.userId)) // 100 queries
```

**Solução: [DataLoader](https://github.com/graphql/dataloader):**

* Agrupa as chamadas em **um batch por tick de event loop**.

```ts
const userLoader = new DataLoader(ids => batchGetUsers(ids))

post: (post, _, ctx) => ctx.userLoader.load(post.userId)
```

**Benefícios:**

* Reduz chamadas duplicadas.
* Melhora latência em relacionamentos `one-to-many`.

---

### 7. **Como aplicar caching eficiente em GraphQL (Apollo, persisted queries, CDN)?**

**Níveis de cache:**

* **Apollo Client (in-memory):**

  * Cache automático por `id + __typename`.
  * Suporte a políticas (`cache-first`, `network-only`, etc.).

* **Persisted queries:**

  * Client envia hash da query → server responde se for conhecida.
  * Evita parsing e introspection desnecessários.

* **CDN (Varnish, Cloudflare):**

  * Cache de respostas completas baseado em headers custom.
  * Menos comum, pois GraphQL é POST por padrão → exige tunning.

**Boas práticas:**

* Use IDs previsíveis nos tipos.
* Fragmentação bem feita = reaproveitamento eficaz.

---

### 8. **O que é schema stitching vs. Apollo Federation? Quando usar cada abordagem?**

| Técnica               | Descrição                                          | Quando usar                                           |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| **Schema Stitching**  | Combina múltiplos schemas manualmente (merge SDL)  | Pequenos sistemas com pouco desacoplamento            |
| **Apollo Federation** | Cada serviço define sua parte do schema (subgraph) | Escalável, multi-times, compatível com gateway Apollo |

**Stitching** está caindo em desuso pela complexidade de coordenação.
**Federation** é o padrão moderno para **supergraphs com microserviços GraphQL**.

---

### 9. **Como mitigar riscos de introspection abuse e denial of service em GraphQL?**

**Riscos:**

* Ferramentas de introspection revelam toda a estrutura da API.
* Queries maliciosas ou profundamente aninhadas causam DoS.

**Mitigações:**

* **Desativar introspection em produção:**

  ```ts
  validationRules: [NoSchemaIntrospectionCustomRule]
  ```

* **Limitar profundidade:**

  ```ts
  depthLimit(5)
  ```

* **Limitar complexidade:**

  ```ts
  costLimit({ maxCost: 100 })
  ```

* **Rate limiting com middlewares/gateways.**

* Validar **persisted queries** para aceitar apenas queries conhecidas.

---

### 10. **Como garantir estabilidade e integridade do schema com GraphQL Codegen, Contracts e CI?**

**GraphQL Codegen:**

* Gera tipos TypeScript a partir do schema + queries.
* Detecta breaking changes automaticamente.

**Contracts:**

* Pact, GraphQL Inspector ou Apollo Rover validam se mudanças são compatíveis com consumidores.

**CI/CD ideal:**

1. Validação de schema com linters.
2. Testes de contrato (consumer-driven).
3. Geração de código cliente (typings, hooks).
4. Deploy bloqueado em caso de quebra de compatibilidade.

**Resultado:** APIs versionadas implicitamente por schema e controladas com precisão de tipo.