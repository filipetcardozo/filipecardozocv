# Part 11: Domínio Profundo de Next.js

---

## 1. Qual a diferença entre Pages Router e App Router?

**Resposta clara:**

* **Pages Router:** baseado em arquivos `pages/`, usa rotas predefinidas, `getServerSideProps`, `getStaticProps`, etc.
* **App Router:** introduzido no Next.js 13, usa `app/` com Server Components por padrão, layouts aninhados e loading per route.

**Ponto crítico:** App Router tem suporte nativo a streaming, Suspense e muito mais controle granular sobre rendering boundaries.

---

## 2. O que são e como funcionam os Server Components?

**Resposta clara:**
Server Components (RSCs) são componentes que rodam **apenas no servidor**, nunca enviam JS ao client, e podem acessar banco de dados, secrets, cookies com segurança.

**Exemplo:**

```tsx
// Server Component (padrão)
async function Page() {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}
```

Eles não podem conter `useState`, `useEffect` ou handlers de eventos.

---

## 3. Como funciona o caching no Next.js 14+ com App Router?

**Resposta clara:**
Next.js 14 introduz um modelo de cache inteligente com tags.

* `fetch` tem cache automático com `cache`, `next.revalidate`, `next.tags`.
* Pode invalidar caches com `revalidateTag('products')`.

**Exemplo:**

```ts
fetch('/api/data', { next: { tags: ['profile'] } });
```

---

## 4. Como diferenciar e aplicar SSR, SSG, ISR e CSR?

**Resposta clara:**

* **SSR:** renderiza a página em tempo real no servidor (`getServerSideProps` ou Server Component).
* **SSG:** página gerada em build time (`getStaticProps`).
* **ISR:** revalida páginas após X segundos (`revalidate`).
* **CSR:** página é um shell vazio e carrega dados client-side (hooks/fetch).

**Boas práticas:**

* Use SSR para dados sensíveis ou dinâmicos por request.
* Use SSG para conteúdo fixo (landing, blog).

---

## 5. O que são Edge Functions e Middleware e quando usar?

**Resposta clara:**

* **Edge Functions:** executam no CDN (Cloudflare, Vercel Edge) com baixa latência, mas sem Node.js completo.
* **Middleware:** intercepta requisições antes de chegar à rota.

**Exemplo de Middleware:**

```ts
export function middleware(req) {
  const country = req.geo.country;
  return NextResponse.rewrite(`/landing/${country}`);
}
```

Use para geolocalização, auth leve, redirecionamentos.

---

## 6. Como proteger rotas no App Router?

**Resposta clara:**

* Em Server Component, use `cookies()` para validar sessão JWT.
* Redirecione com `redirect()` se não autorizado.

**Exemplo:**

```ts
import { cookies } from 'next/headers';
const session = cookies().get('token');
if (!session) redirect('/login');
```

Evite validação só no client — o HTML já teria sido renderizado.

---

## 7. Como Next.js lida com imports dinâmicos e split de código?

**Resposta clara:**
Use `next/dynamic` para carregar componentes sob demanda.

```ts
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

O Next também faz code splitting automático por página.

Reduz TTI (Time to Interactive) em páginas grandes.

---

## 8. Como definir headers HTTP e meta tags no App Router?

**Resposta clara:**
Use arquivos `metadata.ts` ou exporte `generateMetadata()` nos layouts e páginas:

```ts
export const metadata = {
  title: 'Dashboard',
  description: 'Painel admin'
};
```

Para headers HTTP, configure no `next.config.js`:

```ts
headers() {
  return [{ source: '/(.*)', headers: [...] }];
}
```

---

## 9. Como configurar Web Vitals e reportar para uma ferramenta externa?

**Resposta clara:**
Use a função `reportWebVitals` no Next.js:

```ts
export function reportWebVitals(metric) {
  if (metric.name === 'LCP') {
    sendToAnalytics(metric);
  }
}
```

Ideal para conectar com Datadog, LogRocket, Sentry, etc.

---

## 10. Como Next.js se comporta com TypeScript e Monorepos?

**Resposta clara:**

* Suporte nativo a TypeScript desde a criação do projeto.
* Detecta `tsconfig.json` automaticamente.
* Em monorepos (Turborepo), use `baseUrl`, `paths`, `moduleResolution` e o plugin `next-transpile-modules`.

Isso permite importar pacotes compartilhados entre apps com consistência.