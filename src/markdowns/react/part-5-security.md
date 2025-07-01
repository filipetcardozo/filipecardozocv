# Part 5: Security em React e Next.js

---

## 1. Como evitar XSS (Cross-Site Scripting) em React?

**Resposta clara:**
React protege contra XSS por padrão: ele escapa automaticamente strings inseridas no JSX. Porém, se você usar `dangerouslySetInnerHTML`, está abrindo uma porta para XSS.

**Boa prática:**

* Evite usar `dangerouslySetInnerHTML`.
* Se for necessário, sanitize o HTML com bibliotecas como `DOMPurify`.

---

## 2. Qual a diferença entre cookies e localStorage para autenticação?

**Resposta clara:**

* **Cookies:** podem ser acessíveis pelo servidor (com `httpOnly`) e usados em SSR. Mais seguros contra XSS, mas vulneráveis a CSRF se mal configurados.
* **localStorage:** acessível apenas no client. Suscetível a XSS, pois qualquer script malicioso pode ler o token.

**Recomendação:** use cookies com `httpOnly`, `secure`, `SameSite=strict` sempre que possível.

---

## 3. Como proteger rotas de API no Next.js?

**Resposta clara:**
Use validação de sessão/token no início de cada handler:

```ts
export default function handler(req, res) {
  const session = getSession(req);
  if (!session) return res.status(401).end();
  // continue
}
```

**Extras importantes:**

* Valide métodos (`req.method`).
* Limite o número de requests por IP (rate limiting).
* Valide e sanitize a entrada (Zod, Yup, etc).

---

## 4. O que é CSRF e como evitá-lo?

**Resposta clara:**
**CSRF (Cross-Site Request Forgery)** ocorre quando um site malicioso induz o navegador do usuário a fazer uma requisição autenticada a outro site onde ele está logado.

**Prevenção em Next.js:**

* Use `SameSite=strict` nos cookies.
* Verifique um token CSRF no corpo do POST (ou cabeçalho).
* Evite usar GET para operações com efeitos colaterais.

---

## 5. Como lidar com autenticação e SSR no App Router?

**Resposta clara:**
Utilize funções server-side como `cookies()` ou `getToken()` (com NextAuth ou JWT manual).

**Exemplo:**

```ts
import { cookies } from 'next/headers';
const token = cookies().get('session');
```

Se não houver token, redirecione com `redirect('/login')`.

---

## 6. Como validar e sanitizar input do usuário?

**Resposta clara:**
Use bibliotecas como:

* **Zod/Yup:** para validar esquemas no backend ou frontend.
* **validator.js:** para e-mails, URLs, etc.

Nunca confie no que vem do client. Mesmo formulários "travados" podem ser burlados por ferramentas como Postman.

---

## 7. Como prevenir brute force e abuso nas rotas API?

**Resposta clara:**

* Limite tentativas por IP (Rate limiting): `express-rate-limit`, `next-rate-limit`, `upstash/ratelimit`.
* Use captchas (hCaptcha, reCAPTCHA) em endpoints sensíveis.
* Para login, use delay exponencial ou bloqueio temporário após muitas tentativas.

---

## 8. Como lidar com erros de forma segura?

**Resposta clara:**

* Nunca exponha `stack traces` ou mensagens internas ao client.
* No client, mostre mensagens genéricas: "Algo deu errado".
* No server, logue os detalhes internamente e retorne status apropriado (400, 401, 403, 500).

---

## 9. Como garantir que headers sensíveis estejam ativos?

**Resposta clara:**
Use a opção `headers` do Next.js ou um proxy (como Vercel, NGINX) para forçar headers como:

* `Content-Security-Policy`
* `Strict-Transport-Security`
* `X-Content-Type-Options`
* `Referrer-Policy`

Pode ser configurado em `next.config.js`:

```ts
headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // outros headers...
      ]
    }
  ];
}
```

---

## 10. Como lidar com dependências inseguras no projeto?

**Resposta clara:**

* Use `npm audit` ou `pnpm audit` para verificar vulnerabilidades.
* Atualize pacotes regularmente.
* Use `npm dedupe` para resolver conflitos de versões.
* Em projetos sensíveis, use o modo strict do `npm audit --production`.