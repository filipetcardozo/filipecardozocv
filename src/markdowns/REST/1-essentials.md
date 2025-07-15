### 1. **O que é uma API REST e qual seu propósito?**

Uma **API REST** (Representational State Transfer) é um estilo de arquitetura para comunicação entre sistemas via **HTTP**, baseado em recursos e operações padronizadas.

**Propósito:**
Permitir que clientes (como aplicações web ou mobile) acessem e manipulem recursos (dados) de forma previsível, usando os métodos HTTP de forma semântica.

**Exemplo:**
Uma API `/users` pode representar um recurso de usuários, com diferentes operações (listar, criar, atualizar, deletar).

---

### 2. **Quais são os métodos HTTP e como usá-los corretamente?**

| Método     | Função                                 | Exemplo                   |
| ---------- | -------------------------------------- | ------------------------- |
| **GET**    | Buscar dados (sem alterar estado)      | `GET /users/123`          |
| **POST**   | Criar um novo recurso                  | `POST /users` + body JSON |
| **PUT**    | Substituir um recurso **por completo** | `PUT /users/123`          |
| **PATCH**  | Atualizar **parcialmente** um recurso  | `PATCH /users/123`        |
| **DELETE** | Remover um recurso                     | `DELETE /users/123`       |

Usar corretamente os verbos HTTP ajuda a manter a API semântica, previsível e compatível com caches, proxies e ferramentas.

---

### 3. **O que são status codes HTTP e como interpretá-los?**

Os códigos de status HTTP indicam o **resultado da requisição**. São agrupados por categorias:

* **2xx — Sucesso**

  * `200 OK`: sucesso na requisição.
  * `201 Created`: recurso criado com sucesso.
  * `204 No Content`: ação realizada, sem retorno.

* **4xx — Erro do cliente**

  * `400 Bad Request`: dados malformados.
  * `401 Unauthorized`: não autenticado.
  * `403 Forbidden`: autenticado, mas sem permissão.
  * `404 Not Found`: recurso inexistente.

* **5xx — Erro do servidor**

  * `500 Internal Server Error`: erro inesperado.
  * `503 Service Unavailable`: servidor indisponível.

Front-ends devem **reagir de forma apropriada** a cada grupo — exibir mensagens, redirecionar, ou tentar novamente.

---

### 4. **Como enviar e receber dados com JSON em uma API?**

**Requisição:**

```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "name": "Filipe",
  "email": "filipe@example.com"
}
```

* **Content-Type:** define o tipo do corpo da requisição.
* Para REST APIs modernas, o mais comum é `application/json`.

**Resposta:**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 123,
  "name": "Filipe"
}
```

APIs devem sempre usar `Content-Type` correto, tanto na requisição quanto na resposta.

---

### 5. **Qual a diferença entre query params, path params e body?**

| Tipo            | Uso                      | Exemplo                    |
| --------------- | ------------------------ | -------------------------- |
| **Path param**  | Identifica recurso único | `/users/123`               |
| **Query param** | Filtros ou paginação     | `/posts?author=ana&page=2` |
| **Body**        | Envia dados estruturados | JSON em `POST /users`      |

* **Path param**: essencial para o endpoint.
* **Query param**: opcional e modificador.
* **Body**: usado em `POST`, `PUT`, `PATCH` para enviar payloads complexos.

---

### 6. **O que são endpoints e como devem ser nomeados em REST?**

Um **endpoint** é uma URL que representa um recurso ou ação.

**Boas práticas de nomeação:**

* Sempre no **plural**: `/users`, `/products`, `/orders`.
* Ação implícita no **verbo HTTP**, não no path (evite `/getUser`).
* Use **sub-resources** para relacionamentos: `/users/123/orders`.

Exemplos:

```http
GET /users         → lista todos
POST /users        → cria novo
GET /users/123     → busca usuário 123
PUT /users/123     → atualiza usuário 123
```

---

### 7. **Como lidar com erros de API no front-end?**

Boas práticas:

* **Tratar status codes** (`response.status`).
* Exibir mensagens claras para erros esperados (`400`, `404`, `401`).
* Usar **try/catch** com `fetch` ou libs como `axios`.
* Exibir um fallback de erro genérico para `500`.

Exemplo com `fetch`:

```ts
try {
  const res = await fetch('/api/data')
  if (!res.ok) throw new Error('Erro de API')
  const data = await res.json()
} catch (e) {
  showErrorToast('Falha ao carregar dados')
}
```

---

### 8. **O que é CORS e por que ele pode bloquear requisições?**

**CORS (Cross-Origin Resource Sharing)** é uma política de segurança dos browsers.

**Problema:**

* O navegador bloqueia chamadas para domínios diferentes do origin (ex: `localhost` → `api.empresa.com`) **sem permissão explícita**.

**Solução:**

* O servidor deve retornar um header como:

  ```http
  Access-Control-Allow-Origin: https://meu-front.com
  ```
* Ou, em desenvolvimento:

  ```http
  Access-Control-Allow-Origin: *
  ```

Front-ends não controlam CORS. **O backend deve configurar isso.**

---

### 9. **O que significa ser "stateless" em REST APIs?**

Significa que **cada requisição deve conter todas as informações necessárias** — o servidor **não guarda estado entre chamadas**.

Implicações:

* Escalabilidade: qualquer servidor pode responder.
* Cacheabilidade: o resultado depende apenas da requisição.
* Simplicidade: não há sessões, apenas **tokens, cookies ou headers**.

Exemplo:

```http
GET /users
Authorization: Bearer <token>
```

Sem o token, o servidor **não sabe quem é o usuário**.

---

### 10. **Como autenticar chamadas REST com tokens (Bearer)?**

1. O cliente faz login (ex: `POST /auth/login`) e recebe um **token JWT**.
2. O token é enviado em todas as chamadas protegidas:

```http
Authorization: Bearer eyJhbGciOiJIUzI1...
```

3. O servidor valida esse token e identifica o usuário.

**Importante:**

* Armazene o token com segurança (preferência: **HTTP-only cookies** para evitar XSS).
* Em SPAs, use headers com cuidado e renove tokens via refresh token.
