### 1. **Como você verificaria se uma string é um palíndromo?**

Um palíndromo é uma string que se lê igual de trás para frente.
**Solução simples**: inverter a string e comparar com ela mesma.

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

---

### 2. **Dado um array, como você encontraria o valor que aparece com maior frequência?**

Use um **objeto (hash map)** para contar as ocorrências e acompanhar o valor mais frequente.

```js
function mostFrequent(arr) {
  const count = {};
  let max = 0;
  let result;

  for (let el of arr) {
    count[el] = (count[el] || 0) + 1;
    if (count[el] > max) {
      max = count[el];
      result = el;
    }
  }

  return result;
}
```

---

### 3. **Como inverter um array sem usar `reverse()`?**

Iterando manualmente ou usando `reduce`.

```js
function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}
```

---

### 4. **Como verificar se duas strings são anagramas?**

Ordene ambas e compare, ou use contagem de caracteres com hash map.

```js
function areAnagrams(a, b) {
  const clean = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  return clean(a) === clean(b);
}
```

---

### 5. **Dado um array de números, como você encontra o maior e o menor valor?**

Com `Math.max`/`Math.min`, ou manualmente com iteração:

```js
function minMax(arr) {
  let min = Infinity, max = -Infinity;
  for (let num of arr) {
    if (num < min) min = num;
    if (num > max) max = num;
  }
  return { min, max };
}
```

---

### 6. **O que é complexidade de tempo O(n)? Dê um exemplo prático.**

Significa que o tempo de execução **cresce linearmente** com o tamanho da entrada.

**Exemplo prático**: somar todos os números de um array.

```js
function sum(arr) {
  let total = 0;
  for (let num of arr) total += num;
  return total;
}
// Executa uma vez para cada elemento => O(n)
```

---

### 7. **Como remover itens duplicados de um array?**

Usando `Set`, que só aceita valores únicos:

```js
const unique = arr => [...new Set(arr)];
```

Ou com hash map para maior controle:

```js
function removeDuplicates(arr) {
  const seen = {};
  return arr.filter(item => {
    if (seen[item]) return false;
    seen[item] = true;
    return true;
  });
}
```

---

### 8. **Como você detectaria se há um ciclo infinito em um loop `while`?**

Tecnicamente, isso é uma **análise estática difícil** (problema de parada). Mas você pode evitar ciclos:

* Garantindo **condição de parada finita**.
* Adicionando **limite de iteração (guard clause)**.
* Monitorando **valores anteriores** em casos como listas encadeadas (usar dois ponteiros: tortoise and hare).

---

### 9. **O que é uma `hash table` e como ela pode ser usada para otimizar buscas?**

Uma **hash table** (ou objeto/mapa) armazena pares chave-valor e oferece **acesso em tempo constante O(1)** na média.

**Uso prático**: contar frequência, indexar rapidamente, remover duplicatas.

```js
const map = { user1: 'Filipe', user2: 'Ana' };
console.log(map['user1']); // acesso direto, sem busca linear
```

---

### 10. **Explique a diferença entre `map()` e `forEach()` no JavaScript.**

| Critério   | `map()`                   | `forEach()`                  |
| ---------- | ------------------------- | ---------------------------- |
| Retorno    | Retorna novo array        | Retorna `undefined`          |
| Mutação    | Não altera array original | Pode alterar se desejado     |
| Uso típico | Transformações puras      | Efeitos colaterais (log, IO) |
| Paradigma  | Funcional                 | Imperativo                   |

**Exemplo:**

```js
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);     // [2, 4, 6]
nums.forEach(n => console.log(n * 2));    // loga 2, 4, 6
```