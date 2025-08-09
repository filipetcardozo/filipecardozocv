## 🔴 Nível 3: Design, Escalabilidade e Arquitetura em REST APIs

---

### 1. **Quais são os princípios de um bom design RESTful?**

**Design RESTful** foca em:

* **Recursos como entidades centrais** (ex: `/users`, `/orders`).
* **URIs claras e semânticas**, sempre no **plural**, sem verbos:

  * ✅ `GET /users/123`, ❌ `GET /getUserById`
* **Verbos HTTP corretos**:

  * `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
* **Representações consistentes**:

  * Use JSON padronizado (camelCase, types claros, campos obrigatórios).
* **Hypermedia quando necessário** (HATEOAS).
* **Statelessness**, ou seja, cada chamada contém tudo que o servidor precisa.

Boas práticas resultam em APIs previsíveis, evolutivas e fáceis de consumir.

---

### 2. **Como projetar uma API que suporte evoluções sem quebrar clientes?**

* **Versionamento claro**: na URL (`/v1/users`) ou em headers.
* **Evite breaking changes**:

  * Adicione campos, mas não remova nem altere tipos existentes.
  * Evite mudar significado de valores existentes (ex: enum, boolean).
* **Use contratos explícitos** com OpenAPI/Swagger.
* **Torne respostas tolerantes**:

  * Clients devem ignorar campos que não conhecem.
* **Feature toggles** e controle por flags em headers ou query params.

**Objetivo:** *garantir backward compatibility e permitir evolução controlada.*

---

### 3. **REST vs GraphQL vs RPC: quando escolher cada um?**

| Protocolo          | Quando usar                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **REST**           | APIs públicas, cacheáveis, estáveis, baseadas em recursos. Ótimo para CRUD e sistemas com lógica de domínio clara.                          |
| **GraphQL**        | Aplicações com UIs dinâmicas e requisitos variáveis de dados. Reduz overfetching/underfetching. Requer coordenação entre client e server.   |
| **RPC (ex: gRPC)** | Comunicação entre serviços internos (microsserviços), com foco em performance e tipagem forte. Ideal para baixa latência e alto throughput. |

**Resumo:** REST para estabilidade, GraphQL para flexibilidade, RPC para performance de backends.

---

### 4. **Como aplicar idempotência corretamente em POST, PUT e DELETE?**

* **Idempotência** = múltiplas chamadas com o mesmo efeito final.

| Método     | Idempotente?                                          | Como garantir?                    |
| ---------- | ----------------------------------------------------- | --------------------------------- |
| **GET**    | ✅                                                     | Sem alterações no estado          |
| **PUT**    | ✅                                                     | Substitui recurso com dados fixos |
| **DELETE** | ✅                                                     | Repetir exclusão não muda nada    |
| **POST**   | ❌ por padrão, mas pode ser idempotente com estratégia |                                   |

**POST com idempotência:**

* Use um header/param com `Idempotency-Key`.
* O servidor armazena o resultado da primeira execução e reutiliza nas próximas com a mesma chave.

---

### 5. **Como lidar com consistência eventual em APIs REST distribuídas?**

**Consistência eventual** = dados podem estar temporariamente desatualizados entre réplicas ou serviços.

**Boas práticas:**

* Informe o cliente que a operação foi aceita mas pode não refletir imediatamente (`202 Accepted`).
* Use mecanismos de **eventos assíncronos** com reprocessamento garantido (ex: Kafka + retry).
* Permita *polling*, *webhooks* ou *subscriptions* para acompanhamento de estado.
* Implemente **versionamento de recurso** (ex: `updatedAt`, `revisionId`) para reconciliar dados.

---

### 6. **O que são middlewares e como eles podem melhorar segurança, logging e validação em REST APIs?**

**Middlewares** são funções que interceptam requisições/respostas, geralmente aplicadas em frameworks como Express, Fastify, NestJS, etc.

**Responsabilidades típicas:**

* **Autenticação/Autorização**
* **Rate limiting**
* **Logging estruturado**
* **Validação de payloads (ex: Joi, Zod, Yup)**
* **Transformações (ex: camelCase ↔ snake\_case)**

**Benefício:** centraliza lógica transversal sem poluir handlers de negócio.

---

### 7. **Como projetar contratos de API e garantir sua integridade com ferramentas (OpenAPI, Swagger, Pact)?**

* Use **OpenAPI (Swagger)** para:

  * Descrever contratos de forma padronizada.
  * Gerar documentação interativa.
  * Criar mocks automáticos e SDKs.

* Use **Pact** para:

  * Validar **contratos de consumo**: front e back validam expectativas em ambas as direções.
  * Ideal para microserviços e times desacoplados.

**Integração no CI/CD**:

* Valide contratos antes de deploy.
* Gere documentação com versionamento.

---

### 8. **Como aplicar o princípio de separação de responsabilidades entre API e client SDK?**

Separar API da SDK evita **acoplamento direto** entre transport layer e client logic.

**Boas práticas:**

* A API deve ser genérica, stateless e autodocumentada.
* O SDK (JavaScript, TypeScript) encapsula:

  * Serialização, headers, erros, tipos.
  * Retry, cache, fallback, tokens.

**Benefícios:**

* SDK pode evoluir com o front sem mudar a API.
* APIs mantêm contratos limpos e independentes.

---

### 9. **Como implementar um gateway de API (ex: Kong, Express Gateway) e quais problemas ele resolve?**

**API Gateway** é uma camada intermediária entre o cliente e múltiplos serviços/API internas.

**Problemas que resolve:**

* Roteamento centralizado.
* Autenticação, rate limit, logs e monitoramento.
* CORS e headers cross-cutting.
* Transformações e versionamento.
* Proxy para microserviços internos.

**Ferramentas comuns:**

* Kong, Express Gateway, Tyk, Ambassador, KrakenD.

**Exemplo:** front chama `/api/orders`, o gateway roteia para `order-service`, aplica cache e autenticação via plugin.

---

### 10. **Como medir e otimizar latência e throughput de uma API REST sob carga real?**

**Métricas principais:**

* **Latência**: tempo para responder uma requisição (p50, p95, p99).
* **Throughput**: número de requisições por segundo (RPS).
* **Taxa de erro**: % de 5xx e 4xx sob carga.

**Ferramentas:**

* **K6, Artillery, Locust** → carga controlada.
* **Prometheus + Grafana** → observabilidade em tempo real.
* **APM tools** (Datadog, New Relic, Sentry) → tracing por endpoint.

**Otimizações:**

* Query mais leve (limitar JOINs, índices).
* Cache de resposta (Redis, CDN).
* Redução de payloads (compressão, partial fields).
* Lazy loading de dados pesados.