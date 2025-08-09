Aqui estão 15 questões sobre **concorrência no React e Next.js**, com foco crescente em complexidade — da base até pontos avançados como interrupção de renderização, `useTransition`, server components e performance interativa:

---

### 1. **O que significa "concorrência" no contexto do React?**

Concorrência em React se refere à capacidade do React de intercalar tarefas e *adiar ou interromper renderizações* para manter a interface responsiva. É uma abstração controlada sobre multitarefa, permitindo melhor UX sem expor o programador à complexidade de `threads`.

---

### 2. **Qual a diferença entre concorrência e paralelismo?**

* **Concorrência** é sobre gerenciar múltiplas tarefas que progridem *aparentemente ao mesmo tempo*.
* **Paralelismo** é quando múltiplas tarefas são realmente executadas *simultaneamente*, geralmente em múltiplos núcleos.

React lida com **concorrência cooperativa**, não paralelismo real.

---

### 3. **React é single-threaded ou multi-threaded?**

O React é single-threaded no JavaScript — toda renderização e manipulação de estado acontece na main thread. No entanto, com recursos como Web Workers ou OffscreenCanvas, você pode terceirizar tarefas pesadas.

---

### 4. **O que são os concurrent features do React 18?**

São melhorias que permitem o React:

* Pausar uma renderização em progresso
* Abortar renderizações antigas
* Renderizar várias versões ao mesmo tempo (preview x confirmed state)
* Priorizar interações mais importantes com `useTransition`

---

### 5. **Para que serve o `useTransition`?**

Ele permite diferenciar *interações urgentes* (como digitação) de *interações não urgentes* (como filtros de busca). Isso evita que digitar fique lento por causa de atualizações pesadas no DOM.

```tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setFilteredResults(heavyComputation(query));
});
```

---

### 6. **Quando usar `useDeferredValue`?**

É útil quando você quer adiar o uso de um valor até que as atualizações urgentes terminem, evitando que renderizações custosas bloqueiem o input.

---

### 7. **Como `Suspense` contribui com concorrência?**

`<Suspense>` permite que o React *espere recursos assíncronos* (como dados ou componentes) sem bloquear a renderização inicial. Ele mostra um fallback e retoma quando o conteúdo está pronto.

---

### 8. **O que são Server Components e como se relacionam com concorrência?**

Server Components permitem pré-renderizar partes da UI no servidor **sem enviar JS para o cliente**. Isso reduz carga na main thread e melhora performance interativa. Eles se encaixam bem no modelo concorrente, pois são "pausáveis" naturalmente.

---

### 9. **Qual a relação entre race conditions e concorrência no React?**

Concorrência mal gerida (ex.: múltiplas `fetch` chamadas em `useEffect`) pode causar race conditions, onde uma resposta lenta sobrescreve uma resposta mais nova. A solução envolve `AbortController`, guards de versionamento ou libs como React Query.

---

### 10. **Como você cancela efeitos concorrentes em `useEffect`?**

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal });
  return () => controller.abort(); // cancela se `query` mudar
}, [query]);
```

---

### 11. **Como React evita que múltiplos renders causem tearing visual?**

Com o `useTransition`, o React agrupa updates e só "commit"a quando tudo estiver pronto, evitando *"intermediate states"* visíveis.

---

### 12. **Por que `startTransition` pode melhorar UX perceptível?**

Porque ele **deixa o React responder primeiro** às interações do usuário, e só depois executa updates mais pesados — sem bloquear o input.

---

### 13. **Next.js suporta Server Components? Como isso impacta concorrência?**

Sim, via App Router. Você pode escrever componentes como `async function`, com carregamento suspenso. Isso permite melhor divisão de trabalho entre servidor e cliente, e reduz sobrecarga na main thread.

---

### 14. **Como usar React Query para concorrência com dados remotos?**

React Query gerencia cache, background updates e evita duplicidade de fetch. Ele lida bem com concorrência porque:

* Cancela fetches obsoletos
* Retorna dados em `isFetching` / `status`
* Permite `suspense: true`

---

### 15. **Quais problemas de concorrência React não resolve por si só?**

* Cálculos CPU-bound que precisam de Web Workers
* Composições assíncronas profundas sem Suspense boundaries
* Abstrações de negócio não canceláveis (ex.: debounce manual mal feito)

Para esses casos, é necessário combinar ferramentas: `useTransition`, `Web Workers`, libs de controle de estado e design reativo inteligente.