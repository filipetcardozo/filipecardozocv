# Part 9: Performance e Developer Experience (DX) em React e Next.js

---

## 1. O que é TTFB e como otimizá-lo no Next.js?

**Resposta clara:**
TTFB (Time to First Byte) mede o tempo entre a requisição HTTP e o primeiro byte da resposta.

**Melhorias comuns:**

* Usar Server Components para evitar JS desnecessário.
* Cachear SSR com headers HTTP ou ISR (Incremental Static Regeneration).
* Reduzir lógica pesada dentro de `getServerSideProps`.

---

## 2. Como evitar re-renderizações desnecessárias no React?

**Resposta clara:**

* Memoize componentes com `React.memo()`.
* Use `useMemo` e `useCallback` para valores e funções estáveis.
* Quebre componentes em partes menores que se atualizam isoladamente.
* Prefira `key` estável em listas.

Use o React DevTools Profiler para identificar pontos quentes.

---

## 3. Como usar lazy loading para melhorar LCP (Largest Contentful Paint)?

**Resposta clara:**

* Use `next/image` para lazy load de imagens grandes.
* Use `dynamic()` com `ssr: false` para componentes pesados que não precisam ser renderizados no servidor.
* Quebre o layout com `<Suspense fallback={...}>` para carregar blocos em tempo real.

---

## 4. Como medir performance real de uma página Next.js?

**Ferramentas chave:**

* `Web Vitals` (integrado ao Next.js via callback `reportWebVitals`).
* `Lighthouse` para simulações locais.
* `Vercel Analytics` para métricas em produção.

**Indicadores relevantes:** LCP, TTFB, CLS, INP, FID.

---

## 5. Como otimizar o bundle JavaScript no Next.js?

**Resposta clara:**

* Evite importar bibliotecas inteiras (ex: `import { debounce } from 'lodash'` vs `import debounce from 'lodash/debounce'`).
* Use `dynamic()` para code-splitting manual.
* Avalie dependências com `next build --analyze`.
* Elimine imports não utilizados.

---

## 6. O que é o Turbopack e como ele melhora a DX em Next.js?

**Resposta clara:**
Turbopack é o novo bundler do Next.js (substitui Webpack), escrito em Rust. É:

* Muito mais rápido em dev mode.
* HMR mais eficiente (Hot Module Reload).
* Mais inteligente na invalidation do cache.

Ideal para grandes projetos que sofriam com lentidão de rebuild.

---

## 7. Como configurar prefetch automático em links?

**Resposta clara:**
O Next.js faz `prefetch` automático de páginas visíveis via `<Link>`. Para links fora da viewport ou com comportamento específico:

```tsx
<Link href="/produtos" prefetch={false} />
```

Prefetch melhora a percepção de velocidade (Page Transitions).

---

## 8. Como controlar a prioridade de carregamento de imagens?

**Resposta clara:**
O componente `next/image` permite:

```tsx
<Image src="/hero.jpg" priority width={500} height={300} />
```

Use `priority` para a imagem principal acima da dobra (hero). Lazy loading continua sendo o padrão.

---

## 9. Como organizar imports e aliases para melhorar DX?

**Resposta clara:**

* Use `paths` em `tsconfig.json`:

```json
"@components/*": ["./src/components/*"]
```

* Reduz importações relativas longas e melhora refatorações.
* Pode ser combinado com `eslint-plugin-import` para impor padrões de ordem.

---

## 10. Como otimizar fonts e evitar layout shift (CLS)?

**Resposta clara:**

* Use `next/font` (v13+) para carregamento eficiente e com fallback.
* Evite `@import` em CSS; use fonte embutida no bundle.
* Defina `font-display: swap` para evitar atraso na renderização.

Isso reduz o Cumulative Layout Shift (CLS), uma das Web Vitals mais afetadas por fontes externas.