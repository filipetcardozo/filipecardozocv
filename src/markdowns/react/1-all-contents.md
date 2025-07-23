## 🔹 1. Como funciona a reconciliação no React e por que isso importa?


O React reconstrói uma nova árvore de componentes a cada render. Em vez de atualizar diretamente o DOM (que é lento), ele compara o "antes" e o "depois" no chamado Virtual DOM. A reconciliação é o processo de detectar o que mudou.

**Por que importa:**
Evita atualizações desnecessárias no DOM real. Mas se você usar `key` errado ou mudar a estrutura de forma imprópria, o React pode recriar partes do DOM à toa, causando lentidão ou bugs visuais.

---

## 🔹 2. Quando usar `useReducer` ao invés de `useState`?


`useState` é ótimo para estados simples e isolados. Mas quando seu estado tem **múltiplos campos que mudam em conjunto** ou **transições complexas**, `useReducer` te ajuda a organizar isso melhor, como um mini Redux local.

**Exemplo:**
Um formulário com vários campos e estados como `isLoading`, `error`, `success`, onde mudanças em um campo impactam outros — isso é ideal para `useReducer`.

---

## 🔹 3. Qual a diferença entre `useEffect` e `useLayoutEffect`?



* `useEffect`: roda **depois** que o HTML foi pintado na tela.
* `useLayoutEffect`: roda **antes** da tela ser mostrada.

**Use `useLayoutEffect`** só quando você precisa **medir algo na tela ou manipular layout antes da pintura**, como pegar altura de um elemento.

Se usado errado, pode bloquear a renderização e prejudicar performance.

---

## 🔹 4. O que é prop drilling e como resolver?


Prop drilling é passar props de um componente para outro só para alcançar um neto ou bisneto. Fica verboso e difícil de manter.

**Como resolver:**

* Se os dados forem estáticos ou raramente mudam → **Context API**
* Se os dados mudam muito ou são globais → **Zustand, Redux ou useContext + useReducer**

---

## 🔹 5. O que são componentes controlados vs não controlados?



* **Controlado:** o valor vem do state do React. Você tem controle total.
* **Não controlado:** o DOM gerencia o valor. Você só lê quando precisa.

**Exemplo:**
Um `<input>` com `value={name}` e `onChange={setName}` é controlado. Um `<input ref={inputRef}>` sem `value` é não controlado.

Use controlado quando precisa de validação ou integração com a lógica do app.

---

## 🔹 6. O que é memoização em React e quando vale a pena?


Memoizar é guardar o resultado de algo para evitar recalcular ou rerenderizar à toa.

**Quando usar:**

* Cálculos caros → `useMemo`
* Funções passadas para filhos → `useCallback`
* Componentes filhos → `React.memo`

**Cuidado:** usar demais pode complicar seu código e ter custo de memória.

---

## 🔹 7. O que é `key` em listas e por que não usar índice?


O `key` ajuda o React a identificar itens únicos ao renderizar listas.

**Não use o índice (`0, 1, 2...`)** como key quando a lista muda, porque isso confunde o React — ele pode achar que um item é outro, causando bugs como inputs trocando de lugar ou valores errados.

---

## 🔹 8. Como otimizar listas longas em React?



* **Memoize** os itens: `React.memo()`
* **Virtualize** a lista: com `react-window` ou `react-virtualized`, só renderiza o que está visível na tela.

Isso evita renderizar milhares de itens desnecessariamente e melhora a performance.

---

## 🔹 9. Como funcionam os Server Components no Next.js?


Server Components rodam no servidor e não enviam nenhum JavaScript para o cliente. Você usa eles para renderizar partes que não precisam de interação.

**Vantagem:** menos JS no cliente → app mais rápido e leve.

**Exemplo de uso:** tabela de dados que não precisa de eventos de clique — só mostra informações.

---

## 🔹 10. Quando usar SSR, SSG, ISR e CSR no Next.js?



* **SSR (Server-Side Rendering):** conteúdo dinâmico e sensível (ex: dashboard).
* **SSG (Static Site Generation):** páginas que não mudam (ex: blog público).
* **ISR (Incremental Static Regeneration):** conteúdo que muda às vezes (ex: catálogo de produtos).
* **CSR (Client-Side Rendering):** apps interativos ou personalizados pós-login.

---

## 🔹 11. Como proteger rotas privadas no Next.js?


No App Router, você pode verificar o token/cookie no lado servidor (middleware ou `server.js`) ou no componente cliente via hook de autenticação.

**Exemplo:**

```tsx
if (!session) redirect('/login');
```

Assim evita que usuários sem login acessem páginas privadas.

---

## 🔹 12. Como funciona a Suspense no Next.js com streaming?


`<Suspense>` permite mostrar um "placeholder" enquanto uma parte da tela ainda carrega.

No Next.js, com streaming, ele **envia o layout primeiro** e **vai carregando partes menores depois**. Isso dá sensação de velocidade.

---

## 🔹 13. Como funciona o cache do `fetch` no Next.js 14+?


Você pode dizer ao Next.js como cachear um `fetch`:

```ts
fetch(url, { cache: 'force-cache' }) // usa cache sempre
fetch(url, { cache: 'no-store' }) // nunca usa cache
```

Ou ainda, usar `revalidate: 60` para revalidar a cada minuto. Isso ajuda a balancear performance com dados atualizados.

---

## 🔹 14. Como tratar erros de forma elegante no App Router?


Crie um `error.js` dentro da pasta da rota. Se der erro durante o carregamento, esse componente será renderizado no lugar da tela quebrada.

Isso evita tela branca e melhora a UX.

---

## 🔹 15. Quando vale a pena usar Zustand em vez de Context?


Zustand é mais leve, mais rápido e separa leitura e escrita — ou seja, evita renderizações desnecessárias como o Context faz.

Use Zustand para:

* Estados globais mutáveis
* Dados que mudam com frequência
* Projetos médios a grandes

---

## 🔹 16. O que é "adaptive hydration" e por que importa?


É uma técnica onde o React/Next.js **atrasam a hidratação de componentes** que não são imediatamente visíveis, como partes fora da tela ou que não são interativas logo de cara.

**Vantagem:** melhora tempo de resposta e performance inicial.

---

## 🔹 17. Como funciona a arquitetura de layouts no App Router?


Cada pasta pode ter um `layout.js`. Isso define a estrutura da página (como navbar, sidebar). O layout **envolve** as páginas internas e mantém o estado entre navegações.

**Exemplo:** a navbar não recarrega toda vez que você muda de página — ela é persistente.

---

## 🔹 18. Como lidar com requisições paralelas e lentas no `useEffect`?


Você pode usar `Promise.all()` dentro do `useEffect`, ou adotar `React Suspense` com async components para melhor controle.

**Também:** sempre cancele efeitos antigos com abortController se estiver fazendo `fetch`.

---

## 🔹 19. Qual a diferença entre layouts aninhados e templates no App Router?



* **Layouts:** persistem entre páginas (ex: sidebar que continua).
* **Templates:** são recriados a cada navegação (bom para resetar UI, como forms).

---

## 🔹 20. Como monitorar performance real do app React?


Use:

* **Lighthouse** para métricas de carregamento.
* **React Profiler** para re-renderizações.
* **Web Vitals (FID, LCP, TTFB)** com ferramentas como Vercel Analytics ou customizadas.

Isso ajuda a detectar gargalos reais e a melhorar UX baseada em dados.