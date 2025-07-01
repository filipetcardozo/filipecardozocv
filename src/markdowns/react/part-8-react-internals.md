# Part 8: React Internals - Conceitos Avançados do Motor do React

---

## 1. O que é o Fiber e por que ele substituiu o Stack Reconciler?

**Resposta clara:**
Fiber é a arquitetura interna do React desde a versão 16. Ele substituiu o Stack Reconciler para permitir:

* Divisão da renderização em unidades pequenas (frames).
* **Pausar, continuar, abortar ou recomeçar** renderizações.
* Agendamento baseado em prioridade.

Isso permite otimizações como `startTransition()` e melhora responsividade, especialmente em apps pesados.

---

## 2. O que é o Virtual DOM e o que ele não é?

**Resposta clara:**
Virtual DOM é uma representação em memória da UI. A cada render, o React cria uma nova árvore virtual e compara com a anterior (reconciliation).

**Mito comum:** Virtual DOM é sempre rápido. Não é verdade. O que o torna eficiente é o algoritmo de diff e a minimização de atualizações reais no DOM.

---

## 3. Como o React decide o que re-renderizar?

**Resposta clara:**
Ele compara a árvore anterior de elementos (JSX convertido) com a nova. Quando encontra diferenças, marca os "fibers" afetados como "dirty" e os re-renderiza.

**Critérios que disparam render:**

* Mudança de props ou state.
* Mudança na key de um elemento.
* Força manual via `forceUpdate` (classes).

---

## 4. O que é batching e como funciona com eventos e efeitos?

**Resposta clara:**
**Batching** é a capacidade do React de agrupar múltiplas atualizações de estado em um único render, evitando renders intermediários.

Desde o React 18, **batching é automático mesmo em Promises, timeouts, fetchs**, etc.

**Exemplo:**

```tsx
setA(1);
setB(2);
```

Renderiza apenas uma vez. Antes do React 18, isso não era garantido em código assíncrono.

---

## 5. Como o React lida com eventos (SyntheticEvent)?

**Resposta clara:**
React usa um sistema de eventos próprio (SyntheticEvent) que:

* Normaliza eventos entre browsers.
* Usa delegação de evento no topo da árvore (em `document`).
* Garante performance com reaproveitamento de objetos de evento (event pooling, hoje depreciado).

Isso evita que cada botão adicione um event listener individual no DOM real.

---

## 6. O que é o "key" em arrays e como o React usa internamente?

**Resposta clara:**
A `key` serve para identificar elementos entre renders.

React usa isso durante a reconciliação para:

* Determinar se um elemento pode ser reaproveitado.
* Evitar desmontar e remontar DOM desnecessariamente.

**Errar a key é um dos principais causadores de re-renderização invisível.**

---

## 7. Como funciona a fase de commit em React?

**Resposta clara:**
Depois da reconciliação e renderização virtual, o React:

1. Aplica mudanças no DOM.
2. Dispara efeitos (`useLayoutEffect`, depois `useEffect`).
3. Atualiza refs e callbacks.

Essa é a fase onde a UI "ganha vida".

---

## 8. Qual a ordem de execução de efeitos em React?

**Resposta clara:**

1. `useLayoutEffect` roda **antes da pintura da tela** (bloqueia a UI).
2. `useEffect` roda **após** a pintura.

**Em Server Components,** nenhum dos dois é executado no servidor, apenas no client.

---

## 9. O que acontece se você atualizar o estado durante o render?

**Resposta clara:**
React lança um erro: "Cannot update a component while rendering a different component...".

**Motivo:** isso quebra a previsibilidade do ciclo de vida. Atualizações só podem ocorrer em eventos, efeitos ou callbacks. Nunca diretamente dentro do corpo da função.

---

## 10. O que é uma renderização suspensa e como o React trata isso?

**Resposta clara:**
Quando um componente lança uma Promise (com `use()` ou `Suspense`), o React pausa a renderização e mostra um fallback até a Promise resolver.

Isso permite:\*\*

* Streaming parcial da UI.
* Lazy loading com fluidez.
* Evitar "layout shift".

Com React 18+ e App Router do Next.js, isso é nativo.