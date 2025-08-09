## 🟡 Nível 2: Consumo Estratégico e Integração

---

### 1. **Como implementar retry com backoff em chamadas REST instáveis?**

**Retry** tenta novamente uma requisição que falhou. O **backoff** é o tempo de espera entre as tentativas, normalmente crescente.

**Padrão comum: Exponential Backoff + Jitter**

```ts
async function fetchWithRetry(url, retries = 3, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Erro')
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i)))
    }
  }
}
```

**Bibliotecas como Axios e React Query já têm retry com backoff embutido.**

---

### 2. **O que é paginar uma API e quais padrões são comuns?**

**Paginação** divide resultados grandes em partes menores.

**Padrões:**

* **Offset / Limit**

  ```
  GET /posts?offset=20&limit=10
  ```

* **Page / Size**

  ```
  GET /posts?page=3&pageSize=20
  ```

* **Cursor-based (token de continuidade)**

  ```
  GET /posts?after=abc123
  ```

**Quando usar:**

* *Offset* é simples mas menos eficiente com grandes volumes.
* *Cursor* é ideal para streams, feeds, e APIs com ordenação dinâmica (mais performático).

---

### 3. **Como lidar com autenticação via JWT no consumo de APIs?**

**JWT (JSON Web Token)** carrega informações do usuário em um token assinado.

**Fluxo comum:**

1. Cliente faz login e recebe `access_token` (e opcionalmente um `refresh_token`).
2. As chamadas subsequentes usam:

   ```http
   Authorization: Bearer <access_token>
   ```
3. Quando o token expira:

   * Tenta **refresh** silencioso com `refresh_token`.
   * Se falhar, redireciona para login.

**Segurança:**

* Prefira armazenar tokens em **HTTP-only cookies**, evitando `localStorage`.
* Use short-lived tokens e renovação automatizada.

---

### 4. **O que é versionamento de API e por que ele importa?**

Versionamento garante que **mudanças na API não quebrem clientes existentes**.

**Formas comuns:**

* Na URL:
  `/api/v1/users`
* Em headers:
  `Accept: application/vnd.myapi.v2+json`

**Importância:**

* Permite evolução da API com backward compatibility.
* Evita que alterações quebrem SPAs antigas ou apps mobile em produção.

---

### 5. **Como lidar com serialização e deserialização de dados de forma segura?**

**Serialização**: transformar objeto → string (JSON).
**Deserialização**: string JSON → objeto.

**Boas práticas:**

* Validar estruturas com **schemas** (ex: Zod, Yup, io-ts).
* Nunca confie diretamente no conteúdo da API — valide tipos, valores e formatos.
* Mapeie campos para seu modelo (ex: `snake_case` → `camelCase`).

**Exemplo com Zod:**

```ts
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email()
})
const parsed = UserSchema.parse(responseData)
```

---

### 6. **Como lidar com erros 401/403 de forma centralizada no front-end?**

**401 = não autenticado**, **403 = autenticado, mas sem permissão.**

**Abordagem centralizada:**

* Interceptors (com Axios):

  ```ts
  axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) logout()
    if (error.response.status === 403) showPermissionError()
    return Promise.reject(error)
  })
  ```

* Em libs como **React Query**, usar `onError` global:

  ```ts
  <QueryClientProvider client={queryClient}>
    ...
  </QueryClientProvider>
  ```

---

### 7. **O que são HATEOAS e links navegáveis em REST? Vale a pena usar?**

**HATEOAS (Hypermedia as the Engine of Application State)** adiciona links nos responses da API para indicar ações relacionadas.

**Exemplo:**

```json
{
  "id": 123,
  "name": "Filipe",
  "_links": {
    "self": "/users/123",
    "orders": "/users/123/orders"
  }
}
```

**Vantagem:**

* Cliente não precisa conhecer a estrutura da API.

**Na prática:**

* Pouco usado em SPAs modernas.
* Overhead maior e pouco benefício quando o front já conhece as rotas.

**Útil em APIs genéricas, auto-descobertas, ou para hypermedia-driven UIs.**

---

### 8. **Qual a diferença entre PUT e PATCH em atualizações de recurso?**

| Verbo     | Semântica                       | Comportamento                |
| --------- | ------------------------------- | ---------------------------- |
| **PUT**   | Substitui **o recurso inteiro** | Exige o payload completo     |
| **PATCH** | Atualiza **parte do recurso**   | Só manda os campos alterados |

**Exemplo:**

* `PUT /users/123` → precisa enviar todo o objeto.
* `PATCH /users/123` → envia `{ "email": "novo@email.com" }`.

**Usar PATCH** é mais leve e mais alinhado a UIs com edição parcial.

---

### 9. **Como aplicar cache HTTP no consumo de REST APIs?**

**Cache headers usados:**

* `Cache-Control: max-age=3600` → define tempo de validade.
* `ETag` → hash do conteúdo para revalidação condicional.
* `If-None-Match: <etag>` → evita reenvio se nada mudou (`304 Not Modified`).

**Client-side:**

* Navegador pode usar o cache automático.
* Libs como Axios ou SWR podem cachear via config ou hook.

**Vantagens:**

* Reduz chamadas desnecessárias.
* Aumenta performance e responsividade.

---

### 10. **Como mapear e abstrair chamadas REST com hooks (React Query, SWR, etc.)?**

Exemplo com **React Query**:

```tsx
const { data, error, isLoading } = useQuery(['user', userId], () =>
  fetch(`/api/users/${userId}`).then(res => res.json())
)
```

Vantagens:

* Cache, retry, refetch automático.
* Controle de loading/error.
* Abstração limpa e testável.

**Para mutações:**

```ts
const mutation = useMutation(data =>
  fetch('/api/users', { method: 'POST', body: JSON.stringify(data) })
)
```

**SWR** tem sintaxe mais simples, ideal para leitura, mas menos customizável que React Query.