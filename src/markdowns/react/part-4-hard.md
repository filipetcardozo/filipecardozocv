## 🔹 1. Como funcionam os React Server Components (RSC) e por que eles são um divisor de águas?

**Resposta clara e elaborada:**

React Server Components (RSC) são **componentes que rodam 100% no servidor**, **não enviam nenhum JavaScript para o cliente** e podem acessar dados diretamente (DB, APIs, etc.), sem expor nada ao front.

### Por que isso é poderoso:

* Reduz drasticamente o tamanho do bundle.
* Elimina a necessidade de chamadas API via `fetch` no cliente.
* Permite renderizar dados sensíveis com segurança.
* Aumenta performance inicial (menos JS, menos hidratação).

**Em Next.js (App Router),** qualquer componente `.js` em um `page.js`, `layout.js` ou `component` padrão é tratado como Server Component por padrão. Você só precisa marcar com `'use client'` se quiser usar hooks, interações etc.

---

## 🔹 2. O que é hydration no React e como ela afeta a performance?

**Resposta clara e elaborada:**

**Hydration** é o processo que ocorre quando o React recebe um HTML renderizado no servidor (SSR ou SSG) e precisa "conectar" esse HTML com o JavaScript do cliente para torná-lo interativo.

### Problemas comuns:

* **Hydration delay:** grande quantidade de JS trava o thread principal.
* **Mismatch:** se o HTML renderizado no servidor não bater com o que React espera no cliente, pode ocorrer erro de consistência.

### Como mitigar:

* Dividir o bundle com **lazy loading**.
* Usar **Server Components** para evitar envio de JS.
* Hidratar de forma seletiva com **`suspense` + `lazy`** ou **adaptive hydration** (híbrido).

---

## 🔹 3. Como funciona o mecanismo de streaming no SSR moderno com Next.js?

**Resposta clara e elaborada:**

Streaming no SSR (Server-Side Rendering) permite que o servidor **envie partes da página conforme elas ficam prontas**, em vez de esperar tudo para depois enviar.

### Com `<Suspense>`, o Next.js pode:

1. Renderizar o layout imediatamente.
2. Mostrar loaders ou placeholders (`fallback`) para seções mais lentas.
3. Substituir os placeholders quando os dados ou componentes carregarem.

**Impacto:** melhora o Time to First Byte (TTFB) e o Largest Contentful Paint (LCP), que são métricas de UX/performance.

---

## 🔹 4. Qual a diferença entre renderização no servidor (SSR), geração estática (SSG), ISR e Client Side Rendering (CSR) no Next.js?

**Resposta clara e elaborada:**

* **SSR (Server-Side Rendering):** a cada requisição, o HTML é gerado no servidor.
  *Vantagem:* sempre atualizado.
  *Desvantagem:* mais lento, depende da rede/servidor.

* **SSG (Static Site Generation):** HTML gerado no momento do build.
  *Vantagem:* super rápido.
  *Desvantagem:* precisa rebuild se algo muda.

* **ISR (Incremental Static Regeneration):** híbrido. O HTML é estático, mas pode ser revalidado após X segundos.
  *Vantagem:* performance + atualização.

* **CSR (Client Side Rendering):** tudo é carregado e montado no navegador via JS.
  *Vantagem:* controle máximo do front.
  *Desvantagem:* tempo de espera maior e má performance se não for otimizado.

---

## 🔹 5. Como o React prioriza atualizações e o que mudou com o concurrent rendering?

**Resposta clara e elaborada:**

Antes, todas as atualizações eram tratadas com **a mesma prioridade** — o React parava tudo para re-renderizar o que você pediu.

Com o **Concurrent Rendering (React 18)**, o React consegue **interromper uma renderização, priorizar outra mais urgente (como uma animação ou input do usuário), e voltar depois**.

Você pode marcar tarefas como de baixa prioridade com `startTransition()`:

```tsx
startTransition(() => {
  setSearchQuery(value);
});
```

Isso melhora a fluidez do app, especialmente em interações com listas grandes, filtros ou buscas.

---

## 🔹 6. Qual a diferença entre useEffect, useLayoutEffect e Server Effects no App Router?

**Resposta clara e elaborada:**

* `useEffect`: roda depois da pintura da tela. Ideal para lógica assíncrona como fetch, eventos.
* `useLayoutEffect`: roda antes da pintura. Ideal para medições e manipulação visual (mas pode atrasar o render).
* **Server Effects (ex: fetch no Server Component):** rodam no servidor, antes mesmo de renderizar o HTML — são síncronos e não aparecem no bundle do cliente.

**Impacto prático:**

* Você pode mover muita lógica de `useEffect` para Server Components, limpando o front e reduzindo JS.

---

## 🔹 7. O que é uma race condition em hooks e como evitá-la?

**Resposta clara e elaborada:**

Uma **race condition** acontece quando múltiplas chamadas assíncronas disputam o mesmo espaço de estado, e a mais lenta pode sobrescrever a mais recente.

**Exemplo clássico:**

```tsx
useEffect(() => {
  fetch(`/search?q=${query}`).then(setResults);
}, [query]);
```

Se `query` mudar rapidamente, resultados de uma busca antiga podem sobrescrever os novos.

**Soluções:**

* Usar `AbortController` para cancelar a fetch anterior.
* Usar `useTransition` para marcar atualizações como transitórias.
* Checar se a requisição ainda é válida antes de aplicar o resultado.

---

## 🔹 8. Como estruturar um sistema de Design System com componentes reutilizáveis no React moderno?

**Resposta clara e elaborada:**

1. **Componentes desacoplados:** não dependem de estado global ou contexto. Recebem tudo por props.
2. **Próximos da estrutura do HTML:** ex: `Button`, `Input`, `Card`, `Modal`.
3. **Styling modular e consistente:** usando Tailwind, CSS Modules ou tokens de design.
4. **Acessibilidade (a11y):** foco em teclado, roles corretos, ARIA.

Exemplos de bibliotecas com esse padrão: Radix UI (headless), ShadCN (com styling).

---

## 🔹 9. Como aplicar Code Splitting no Next.js e quando isso faz diferença?

**Resposta clara e elaborada:**

**Code Splitting** divide seu código JS em pedaços menores (chunks). Assim, o navegador carrega só o necessário por página.

No Next.js isso é automático por rota, mas você pode forçar com `dynamic()`:

```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
});
```

**Usos práticos:**

* Telas de gráficos.
* Componentes que só aparecem em interações raras.
* Admin panels com bibliotecas grandes.

---

## 🔹 10. Como isolar e otimizar componentes pesados que causam re-renderização em cascata?

**Resposta clara e elaborada:**

**Problema:** Um componente pai atualiza e força re-render dos filhos, mesmo que eles não mudem.

**Soluções:**

* **Memoizar os filhos com `React.memo()`**.
* **Evitar passar funções inline** para filhos: use `useCallback`.
* **Evitar objetos/arrays novos**: use `useMemo`.
* **Dividir o componente em partes menores**, só atualizando o que realmente muda.

**Ferramentas úteis:**

* `React DevTools Profiler` para ver quais componentes renderizam.
* `why-did-you-render` para alertar renderizações desnecessárias.