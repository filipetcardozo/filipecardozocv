Aqui estão **25 questões** bem elaboradas e respondidas sobre **Hooks do React**, incluindo hooks nativos e customizáveis. As perguntas estão divididas por níveis e organizadas para cobrir desde fundamentos até casos avançados e criação de hooks reutilizáveis.

---

## 🟢 Fundamentos — Hooks básicos (useState, useEffect, useRef, useContext)

### 1. **O que é o `useState` e como ele funciona?**

`useState` é um hook que permite adicionar estado local a componentes funcionais. Ele retorna um par: o valor atual do estado e uma função para atualizá-lo.

```jsx
const [count, setCount] = useState(0);
```

---

### 2. **Quando o estado atualizado por `setState` realmente reflete o novo valor?**

Na renderização seguinte. `setState` é assíncrono. Se você quiser garantir acesso ao valor mais recente, use o callback de `setState` ou `useEffect` que depende daquele valor.

---

### 3. **Como o `useEffect` substitui métodos de ciclo de vida?**

* `componentDidMount` → `useEffect(() => {}, [])`
* `componentDidUpdate` → `useEffect(() => {}, [deps])`
* `componentWillUnmount` → `useEffect(() => { return () => {} }, [])`

---

### 4. **O que é o array de dependências no `useEffect`?**

É o conjunto de valores que o React monitora. Se algum deles mudar, o efeito será reexecutado. Um array vazio garante execução única (montagem).

---

### 5. **Para que serve o `useRef`?**

* Referenciar elementos DOM.
* Persistir valores entre renders sem causar re-render.
  Exemplo:

```js
const inputRef = useRef();
<input ref={inputRef} />;
```

---

### 6. **Qual a diferença entre `useRef` e `useState`?**

`useRef` não dispara re-render quando seu valor muda. É útil para armazenar dados mutáveis que não afetam a interface.

---

### 7. **Como funciona o `useContext`?**

Permite acessar um valor de contexto global em qualquer componente descendente.

```jsx
const theme = useContext(ThemeContext);
```

---

## 🟡 Intermediário — useReducer, useMemo, useCallback

### 8. **O que é `useReducer` e quando usar?**

É uma alternativa ao `useState` para estados mais complexos ou com múltiplas transições. Baseia-se no padrão reducer (como Redux).

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

### 9. **Qual a diferença entre `useReducer` e `useState`?**

* `useState` é simples e direto para estados isolados.
* `useReducer` ajuda quando múltiplas ações mudam o estado, ou quando o estado é um objeto complexo.

---

### 10. **Para que serve o `useMemo`?**

Memoriza o resultado de uma função pesada de computar. Evita reexecuções desnecessárias entre renders.

```js
const expensiveValue = useMemo(() => compute(a, b), [a, b]);
```

---

### 11. **E o `useCallback`, qual o uso?**

Retorna uma função **memorável**, útil para evitar que funções inline sejam recriadas a cada render (por exemplo, para otimizar componentes filhos com `React.memo`).

```js
const memoizedFn = useCallback(() => doSomething(id), [id]);
```

---

### 12. **Quando `useCallback` e `useMemo` não são necessários?**

Quando o custo de reexecutar a função é menor que o custo da memória usada para memoização.

---

## 🔴 Avançado — useLayoutEffect, useImperativeHandle, useDebugValue

### 13. **O que é `useLayoutEffect`?**

É como o `useEffect`, mas executa **antes** da pintura do navegador. Útil para leituras de layout ou atualizações que afetam o DOM imediatamente.

---

### 14. **Qual a diferença entre `useEffect` e `useLayoutEffect`?**

`useLayoutEffect` bloqueia o paint até executar — pode causar travamentos se mal usado. `useEffect` roda após o render, mais leve.

---

### 15. **O que é `useImperativeHandle` e quando usar?**

Permite que um componente filho controle o que será exposto para um `ref` externo.

```js
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));
```

---

### 16. **Para que serve o `forwardRef`?**

Permite que um componente funcional receba um `ref` de fora e o repasse internamente para um elemento DOM.

---

### 17. **Como `useDebugValue` ajuda na depuração de hooks customizados?**

Adiciona labels ao React DevTools para exibir o estado interno do hook.

```js
useDebugValue(state ? "Online" : "Offline");
```

---

## 🛠️ Hooks Customizáveis — reutilização e encapsulamento

### 18. **O que é um hook customizado?**

É uma função que usa outros hooks (como `useState`, `useEffect`) para encapsular lógica reutilizável entre componentes.

```js
function useLocalStorage(key, defaultValue) { ... }
```

---

### 19. **Quais os benefícios de hooks customizados?**

* Reutilização de lógica.
* Melhor legibilidade e manutenção.
* Separação de preocupações sem precisar de HOCs.

---

### 20. **Como passar parâmetros dinâmicos para um hook customizado?**

Via argumentos normais da função:

```js
const { data } = useFetch(`/api/users/${id}`);
```

---

### 21. **Como criar um hook de debounce com `useEffect` e `setTimeout`?**

```js
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
```

---

### 22. **É possível usar hooks dentro de loops ou condições?**

**Não.** Hooks devem estar no topo do componente para manter a ordem entre renders. Quebrar essa regra causa bugs imprevisíveis.

---

### 23. **Como criar um hook que compartilha estado entre componentes?**

É necessário manter o estado fora dos componentes React — usando um contexto, um store, ou hook com singleton.

---

### 24. **Como criar um hook que escuta eventos globais (ex: resize)?**

```js
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handler = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}
```

---

### 25. **Como testar hooks customizados?**

Use bibliotecas como [React Testing Library](https://testing-library.com/docs/react-testing-library/api/) + `@testing-library/react-hooks` ou o novo `renderHook` da Testing Library v14.