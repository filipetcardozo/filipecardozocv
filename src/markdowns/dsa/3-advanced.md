### 1. **Dado um grafo representando rotas de voo entre cidades, como encontrar o caminho mais curto entre dois pontos?**

Use o **algoritmo de Dijkstra** se os pesos forem positivos.

**Passos**:
- Use uma **min-heap (priority queue)** para explorar vértices com menor custo acumulado.
- Atualize as distâncias ao visitar vizinhos.
- Pare ao chegar no destino (para path mais curto único).

**Aplicável em**: rotas, redes, mapas.

---

### 2. **Como resolver o problema da "mochila" (knapsack) com programação dinâmica?**

Problema: maximizar valor com limite de peso.

**Abordagem**: `dp[i][w] = maior valor usando até o item i e peso w`

```js
function knapsack(weights, values, W) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][W];
}
```

---

### 3. **O que é o problema N-Queens e como resolvê-lo com backtracking?**

Posicionar `N` rainhas num tabuleiro `NxN` sem que se ataquem.

**Backtracking com poda**:
- Coloque uma rainha por linha.
- Verifique conflitos por coluna e diagonais.
- Volte se não puder continuar.

> Complexidade: O(N!), mas reduzido com pruning.

---

### 4. **Como você detectaria um ciclo em um grafo direcionado?**

Use **DFS com pilha de recursão**:

- Marque vértices como visitados.
- Mantenha um conjunto de vértices na stack atual.
- Se revisitar um vértice já na stack → ciclo.

```js
function hasCycle(graph) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (let neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }

    stack.delete(node);
    return false;
  }

  for (let node in graph) {
    if (dfs(node)) return true;
  }

  return false;
}
```

---

### 5. **Dado um array, encontre a subarray contínua com a maior soma possível (Kadane’s algorithm)**

```js
function maxSubarraySum(nums) {
  let maxSoFar = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSoFar = Math.max(maxSoFar, current);
  }

  return maxSoFar;
}
```

> Tempo: **O(n)**. Resolve variações como "máximo lucro com ações".

---

### 6. **Explique como funciona o algoritmo de Dijkstra e onde ele pode ser aplicado**

**Objetivo**: encontrar menor caminho de uma origem para todos os outros nós.

**Funcionamento**:
- Inicialize distâncias como infinito.
- Explore vizinhos do nó com menor custo.
- Atualize a menor distância se achar um caminho melhor.

**Uso**: mapas, redes, grafos ponderados com pesos positivos.

---

### 7. **Como encontrar a menor string que contém todas as letras de outra string (sliding window)?**

Problema clássico de **janela deslizante com mapa de contagem**.

```js
function minWindow(s, t) {
  const map = {};
  for (let c of t) map[c] = (map[c] || 0) + 1;

  let left = 0, right = 0, count = t.length, min = Infinity, start = 0;

  while (right < s.length) {
    if (map[s[right++]]-- > 0) count--;
    
    while (count === 0) {
      if (right - left < min) {
        min = right - left;
        start = left;
      }
      if (++map[s[left++]] > 0) count++;
    }
  }

  return min === Infinity ? "" : s.slice(start, start + min);
}
```

---

### 8. **Como você implementaria um LRU cache do zero?**

Use combinação de **Map + lista duplamente encadeada** para O(1) acesso e atualização.

Conceito:
- Map guarda chave → nó da lista.
- Lista mantém ordem de uso (mais recente no topo).
- Ao exceder a capacidade, remove o último da lista.

> Implementação completa envolve estrutura customizada, como `LinkedHashMap` em Java.

---

### 9. **Dado um conjunto de tarefas com dependências, como ordenar para que todas sejam executadas na ordem correta? (Topological sort)**

**Topological Sort com BFS (Kahn’s Algorithm)**:
- Calcule in-degree (número de dependências).
- Comece com nós sem dependência (in-degree 0).
- Remova e atualize dependentes.

> Se houver ciclo → impossível ordenar.

---

### 10. **Como otimizar múltiplas chamadas de API assíncronas com limite de concorrência?**

Implemente um pool de execução com controle de paralelismo.

```js
async function asyncPool(limit, tasks) {
  const ret = [];
  const executing = [];

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    ret.push(p);

    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) await Promise.race(executing);
    }
  }

  return Promise.all(ret);
}
```

> Útil para chamadas paralelas a APIs que limitam **rate limit** (ex: GitHub, Firebase).
