## 🟢 GraphQL Essentials / Intermediário

---

### 1. **O que é GraphQL e quais problemas ele resolve em relação ao REST?**

**GraphQL** é uma linguagem de consulta e runtime para APIs criada pelo Facebook.

**Problemas que resolve comparado ao REST:**

| REST                                                                  | GraphQL                                          |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| Overfetching: traz campos desnecessários.                             | Client escolhe exatamente os campos.             |
| Underfetching: precisa de múltiplas requisições para montar uma tela. | Uma única query pode buscar dados relacionados.  |
| Rígido: estrutura definida por backend.                               | Flexível: client define a estrutura da resposta. |
| Múltiplas rotas (ex: `/users`, `/posts`)                              | Um único endpoint `/graphql`                     |

**Resumo:** GraphQL reduz o atrito entre front-end e back-end, dando **mais controle ao consumidor da API.**

---

### 2. **Como funciona uma query GraphQL? Qual sua estrutura básica?**

Uma **query** é uma operação que **lê dados**.

**Estrutura:**

```graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
    }
  }
}
```

* `query`: palavra-chave opcional.
* `user`: é o nome do resolver raiz.
* `{ name email posts { title } }`: define os campos desejados.

**Resposta JSON** segue a estrutura da query:

```json
{
  "data": {
    "user": {
      "name": "Filipe",
      "email": "filipe@x.com",
      "posts": [{ "title": "Post 1" }]
    }
  }
}
```

---

### 3. **O que são resolvers e qual seu papel no GraphQL?**

**Resolvers** são funções que **resolvem os campos solicitados** na query.

No servidor, cada campo mapeado no schema GraphQL tem (ou herda) um resolver:

```ts
const resolvers = {
  Query: {
    user: (_, { id }) => findUserById(id),
  },
  User: {
    posts: (user) => getPostsByUserId(user.id)
  }
}
```

Eles podem acessar banco de dados, serviços externos, cache, etc.
**Resolvers = camada de execução.**

---

### 4. **Qual a diferença entre query, mutation e subscription?**

| Operação       | Função                                       | Exemplo                            |
| -------------- | -------------------------------------------- | ---------------------------------- |
| `query`        | Leitura de dados, **sem efeitos colaterais** | `query { user(id: "1") { name } }` |
| `mutation`     | Escrita ou alteração de dados                | `mutation { updateUser(...) }`     |
| `subscription` | Assinatura em tempo real (WebSockets)        | `subscription { newMessage(...) }` |

**Queries** e **mutations** usam HTTP.
**Subscriptions** geralmente usam WebSocket (ex: Apollo com `graphql-ws`).

---

### 5. **Como o GraphQL trata overfetching e underfetching?**

* **Overfetching**: ocorre em REST quando se recebe mais dados do que o necessário.

  * Ex: `GET /users` retorna todos os campos, mesmo que só precise do nome.

* **Underfetching**: ocorre quando múltiplas requisições são necessárias para montar uma tela.

  * Ex: buscar `/users`, depois `/users/1/posts`, depois `/posts/1/comments`.

**Em GraphQL:**

* A query define **exatamente os campos** desejados.
* É possível **navegar relações** com uma única requisição:

```graphql
query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        body
      }
    }
  }
}
```

---

### 6. **O que é tipagem forte em GraphQL e como ela beneficia o front-end?**

GraphQL é **fortemente tipado**: todo campo tem um tipo declarado no schema (`String`, `Int`, `Boolean`, etc.).

**Benefícios para o front-end:**

* Autocompletar (ex: VSCode, Playground).
* **Validação automática** de queries antes da execução.
* **Geração de tipos TypeScript** com GraphQL Codegen.
* Integração com ferramentas de lint e formatação.

Exemplo:

```graphql
type User {
  id: ID!
  name: String
  email: String!
}
```

Isso gera **contratos explícitos** entre client e server — evita erros silenciosos.

---

### 7. **Como lidar com erros em GraphQL (response parcial, `errors[]`, fallback)?**

Diferente de REST, GraphQL pode retornar **dados parciais** + um array de erros.

```json
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "Unauthorized",
      "path": ["user"]
    }
  ]
}
```

**Como tratar:**

* Verifique `errors[]` mesmo quando `data` existir.
* Mapeie erros por `path` (ex: `user`, `posts[0]`).
* Em libs como Apollo Client, use `errorPolicy: "all"` para continuar mesmo com erro parcial.

---

### 8. **Como enviar variáveis em queries GraphQL e qual a vantagem disso?**

**Query com variável:**

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
  }
}
```

**Payload enviado:**

```json
{
  "query": "...",
  "variables": { "id": "123" }
}
```

**Vantagens:**

* Reutilização de queries.
* Caching mais eficiente.
* Separação clara entre lógica e dados.
* Suporte melhor por clients como Apollo ou Relay.

---

### 9. **O que é introspection em GraphQL e por que é importante?**

**Introspection** permite ao client **descobrir o schema da API em tempo real.**

* Permite gerar documentação automática (GraphiQL, Playground).
* Suporta ferramentas de autocomplete e type generation.
* Permite validação de queries antes mesmo de serem enviadas.

**Importante:** em produção, pode ser **limitada ou desativada** por questões de segurança.

---

### 10. **Como integrar GraphQL em aplicações React com Apollo Client ou Relay?**

**Apollo Client** é a lib mais usada.
Exemplo com `@apollo/client`:

```tsx
import { useQuery, gql } from '@apollo/client'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
    }
  }
`

const User = ({ id }) => {
  const { data, loading, error } = useQuery(GET_USER, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return <p>{data.user.name}</p>
}
```

**Relay** é mais poderoso e eficiente, mas exige mais configuração e uma runtime controlada. Ideal para projetos de escala muito grande com necessidades avançadas de performance e fragmentação.