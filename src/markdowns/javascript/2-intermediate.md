### 1. **Explique o que é e como funciona o event loop no JavaScript.**

**Resposta:**
O event loop é o mecanismo que permite ao JavaScript, que é single-threaded, lidar com **operações assíncronas** sem bloquear a thread principal.

Funciona assim:

1. A **call stack** executa o código síncrono.
2. Operações assíncronas (como `setTimeout` ou `fetch`) são delegadas ao **Web APIs**.
3. Quando finalizadas, suas callbacks vão para a **task queue**.
4. O event loop monitora e, quando a call stack está vazia, move tarefas da fila para execução.

É a base do modelo assíncrono do JS.

---

### 2. **Qual é a diferença entre uma função normal e uma arrow function?**

**Resposta:**
A maior diferença está na **ligação do `this`**:

* **Funções normais** têm `this` dinâmico, dependendo de como são chamadas.
* **Arrow functions** não têm `this` próprio — capturam o `this` léxico (do contexto onde foram definidas).

Além disso:

* Arrow functions não têm `arguments`, `super` nem podem ser usadas como construtoras.

---

### 3. **O que são Promises e como funcionam?**

**Resposta:**
Promises representam **operações assíncronas** que podem estar em três estados: `pending`, `fulfilled` ou `rejected`.

São objetos com uma interface `.then()` e `.catch()` que permitem encadear ações assíncronas sem recorrer a callbacks aninhados (*callback hell*).

Exemplo:

```js
fetch('/api')
  .then(response => response.json())
  .catch(err => console.error(err));
```

---

### 4. **Explique `async/await`. Quando você usaria isso ao invés de `.then()`?**

**Resposta:**
`async/await` é **syntactic sugar** sobre Promises que permite escrever código assíncrono de forma síncrona e mais legível.

Exemplo:

```js
async function getData() {
  try {
    const res = await fetch('/api');
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}
```

Eu uso `async/await` quando a lógica exige várias chamadas sequenciais ou controle de erro mais limpo — é mais legível que múltiplos `.then()` aninhados.

---

### 5. **O que são closures e qual seu uso comum?**

**Resposta:**
Closure é a **capacidade de uma função acessar variáveis do escopo externo mesmo após esse escopo ter sido encerrado**.

São úteis para:

* Criar funções privadas.
* Preservar estado entre execuções.
* Funções geradoras, como debounce/throttle.

Exemplo clássico:

```js
function counter() {
  let count = 0;
  return () => ++count;
}
const inc = counter();
inc(); // 1
```

---

### 6. **Qual a diferença entre `map`, `filter`, `reduce` e `forEach` em arrays?**

**Resposta:**

| Método    | Retorno        | Finalidade                             |
| --------- | -------------- | -------------------------------------- |
| `map`     | Novo array     | Transforma elementos                   |
| `filter`  | Novo array     | Filtra elementos por condição          |
| `reduce`  | Qualquer valor | Acumula resultado em única saída       |
| `forEach` | `undefined`    | Executa efeito colateral (sem retorno) |

Todos são imutáveis (não alteram o array original), exceto `forEach` quando usado com efeitos colaterais.

---

### 7. **O que é "destructuring assignment"? Dê um exemplo.**

**Resposta:**
É uma sintaxe que permite **extrair valores de arrays ou objetos** em variáveis.

Exemplo com objeto:

```js
const user = { name: 'Ana', age: 30 };
const { name } = user;
console.log(name); // "Ana"
```

Com array:

```js
const [first, second] = [1, 2, 3];
```

Melhora legibilidade e reduz repetição.

---

### 8. **Explique a diferença entre shallow copy e deep copy de objetos.**

**Resposta:**

* **Shallow copy** copia apenas o nível superior. Objetos internos continuam sendo **referenciados**.
* **Deep copy** copia recursivamente todos os níveis, criando **novas instâncias**.

Exemplo:

```js
const a = { x: { y: 1 } };
const b = { ...a }; // shallow
b.x.y = 2; // afeta `a`

const c = structuredClone(a); // deep copy
```

Deep copy é necessária quando há aninhamentos e você quer evitar efeitos colaterais.

---

### 9. **Qual a diferença entre `??` e `||`?**

**Resposta:**

* `||` retorna o primeiro valor **falsy** (`'', 0, false, null, undefined`)
* `??` retorna o primeiro valor **nullish** (`null` ou `undefined`)

Exemplo:

```js
const a = 0 || 5;     // 5
const b = 0 ?? 5;     // 0
```

Use `??` quando quiser preservar valores como `0` e `''`.

---

### 10. **O que é o objeto `this` e como ele se comporta em diferentes contextos (global, método, função, arrow function)?**

**Resposta:**

* No **escopo global (browser)**, `this` refere-se ao `window`.
* Em uma **função normal**, `this` depende de como a função é chamada.
* Em **métodos de objeto**, `this` é o objeto que chama.
* Em **arrow functions**, `this` é léxico — capturado do escopo externo onde foi definida.

Exemplo:

```js
const obj = {
  fn: function () { return this; },
  arrow: () => this
};
```

Nesse exemplo, `obj.fn()` retorna `obj`, mas `obj.arrow()` retorna o `this` do escopo onde `obj` foi criado.
