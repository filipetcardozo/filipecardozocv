### 1. **O que é um closure em JavaScript?**

Um closure é quando uma função "lembra" das variáveis do escopo em que foi criada, mesmo após esse escopo ter sido finalizado. Isso ocorre porque funções em JavaScript carregam consigo seu **contexto léxico**. É a base para encapsulamento de estado, criação de funções geradoras, currying, entre outros padrões funcionais.

---

### 2. **Qual a diferença entre escopo léxico e escopo dinâmico? Como closures se relacionam com isso?**

JavaScript usa escopo **léxico**: as variáveis acessíveis são determinadas no momento em que a função é definida, não quando ela é executada. Closures dependem disso — elas capturam o ambiente **onde foram declaradas**, e não onde foram chamadas.

---

### 3. **Closures mantêm valores ou referências?**

Closures mantêm **referência ao escopo**, não cópias dos valores. Isso significa que, se a variável for modificada posteriormente, a função closure verá o novo valor.

```js
let x = 10;
function closure() {
  console.log(x);
}
x = 42;
closure(); // imprime 42
```

---

### 4. **Qual o risco de closures em loops com `var`? Como resolver?**

`var` não tem escopo de bloco, então todas as funções criadas em um loop com `var` compartilham a mesma referência da variável. Isso resulta em closures que acessam o mesmo valor final.

Soluções:

* Usar `let` (que tem escopo de bloco)
* Usar IIFE (Immediately Invoked Function Expression) para capturar o valor

---

### 5. **Closures podem causar vazamento de memória? Como evitar?**

Sim. Se closures capturam referências a objetos pesados que não são mais usados (ex: DOM elements), isso impede o garbage collector de liberá-los.

Evite:

* Guardar closures desnecessariamente em variáveis globais
* Referenciar objetos DOM dentro de closures que vivem por muito tempo

---

### 6. **Como closures afetam o comportamento de `useEffect` em React?**

Closures em `useEffect` capturam o valor da renderização atual. Isso pode causar bugs se você espera acessar valores atualizados dentro de `setInterval`, `event listeners`, ou funções assíncronas.

Soluções:

* Usar `useRef` para valores mutáveis
* Ou preferir funções atualizadas via `useCallback` com dependências corretas

---

### 7. **Como usar closures para encapsular estado sem classes?**

Você pode criar funções com estado interno e expor uma interface controlada:

```js
function criarContador() {
  let count = 0;
  return () => ++count;
}

const c = criarContador();
c(); // 1
c(); // 2
```

Esse padrão substitui classes simples, mantendo dados privados por meio de closures.

---

### 8. **Como closures são usados para currying e composição de funções?**

Closures permitem criar funções parcialmente aplicadas:

```js
function multiplicarPor(x) {
  return (y) => x * y;
}

const duplicar = multiplicarPor(2);
duplicar(5); // 10
```

Cada chamada gera uma nova função que lembra o parâmetro original (`x`), tornando fácil criar APIs composáveis.

---

### 9. **Closures influenciam igualdade referencial em React? Como evitar problemas?**

Sim. Funções criadas dentro do componente a cada render (com closures) quebram a igualdade referencial, afetando otimizações com `React.memo`, `useEffect`, ou `useCallback`.

Evite isso memoizando funções com `useCallback` e garantindo que os closures só sejam recriados quando necessário (via dependências corretas).

---

### 10. **Você consegue criar uma função de cache/memoização com closure? Como?**

Sim. Closures são ideais para memoization simples:

```js
function memoize(fn) {
  const cache = {};
  return (x) => {
    if (cache[x]) return cache[x];
    return (cache[x] = fn(x));
  };
}
```

O `cache` vive dentro da closure, persistindo entre chamadas sem expor seu conteúdo ao mundo externo.
