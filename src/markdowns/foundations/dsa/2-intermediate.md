### 1. **Implemente uma função para calcular o n-ésimo número de Fibonacci usando recursão**

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

> ⚠️ Esse algoritmo tem complexidade **exponencial (O(2ⁿ))** — ideal para introdução, mas ineficiente sem memoization.

---

### 2. **Como você validaria se os parênteses em uma expressão matemática estão balanceados?**

Use uma **stack** para empilhar `(` e desempilhar ao encontrar `)`:

```js
function isBalanced(expr) {
  const stack = [];
  for (let char of expr) {
    if (char === '(') stack.push(char);
    if (char === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}
```

---

### 3. **Explique a diferença entre Stack e Queue, com exemplos reais de uso**

| Conceito       | Stack (Pilha)                             | Queue (Fila)                                            |
| -------------- | ----------------------------------------- | ------------------------------------------------------- |
| Ordem          | LIFO (último entra, primeiro sai)         | FIFO (primeiro entra, primeiro sai)                     |
| Exemplo real   | Histórico do navegador, chamada de função | Fila de impressão, processamento de tarefas assíncronas |
| Métodos comuns | `push`, `pop`                             | `enqueue`, `dequeue`                                    |

---

### 4. **Dado um array ordenado, como você encontraria um valor usando busca binária?**

```js
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

> Complexidade: **O(log n)**

---

### 5. **Como você detectaria se existe um ciclo em uma lista encadeada?**

Use o algoritmo de **dois ponteiros** (Floyd's Cycle Detection):

```js
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}
```

---

### 6. **Qual a diferença entre BFS e DFS em uma árvore? Quando usar cada um?**

| Algoritmo | BFS (Breadth-First Search) | DFS (Depth-First Search)             |
| --------- | -------------------------- | ------------------------------------ |
| Ordem     | Nível a nível              | Profundidade primeiro                |
| Estrutura | Fila                       | Pilha (ou recursão)                  |
| Uso ideal | Menor caminho, largura     | Validação estrutural, busca completa |

> BFS é melhor para encontrar caminhos curtos.
> DFS é mais leve em memória em árvores rasas.

---

### 7. **Como você faria um "flatten" de um array aninhado de profundidade arbitrária?**

```js
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
    []
  );
}

// flatten([1, [2, [3, 4]], 5]) => [1, 2, 3, 4, 5]
```

---

### 8. **Como detectar se duas árvores binárias são idênticas?**

```js
function isSameTree(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}
```

---

### 9. **Explique o conceito de "memoization" e quando ele é útil**

Memoization é uma técnica de **caching** de resultados de funções **puras**, usada para evitar **cálculos repetidos**.

Exemplo com Fibonacci:

```js
const memo = {};

function fib(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fib(n - 1) + fib(n - 2);
}
```

> Útil em **recursões profundas** e **DP top-down**, como cálculo de caminhos, combinações, etc.

---

### 10. **Implemente uma função para retornar todas as permutações de uma string**

```js
function permute(str) {
  const result = [];

  function backtrack(path, remaining) {
    if (!remaining.length) return result.push(path);
    for (let i = 0; i < remaining.length; i++) {
      backtrack(path + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1));
    }
  }

  backtrack('', str);
  return result;
}

// permute("abc") => ["abc", "acb", "bac", "bca", "cab", "cba"]
```