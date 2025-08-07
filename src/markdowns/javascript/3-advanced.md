### 1. **Como o JavaScript trata concorrência e paralelismo? Ele é single-threaded?**

**Resposta:**
Sim, o JavaScript é **single-threaded** por natureza, executando uma instrução por vez via sua *call stack*. No entanto, ele trata **concorrência** por meio de seu modelo assíncrono e **event loop**, permitindo que operações de I/O, timers e eventos ocorram em paralelo ao código síncrono, sem bloquear a thread principal.

Paralelismo real é possível com **Web Workers** (no browser) ou **worker\_threads** (no Node.js), que criam múltiplas threads, mas com troca de mensagens entre elas (sem compartilhamento de memória direta).

---

### 2. **O que são generators e como eles se diferenciam de funções normais?**

**Resposta:**
**Generators** são funções que podem **pausar e retomar sua execução**, mantendo o estado interno entre chamadas. São declarados com `function*` e usam `yield` para emitir valores.

Diferenças principais:

* **Estado preservado** entre execuções.
* Chamadas a `generator.next()` retornam `{ value, done }`.
* Suportam fluxos lazy (úteis para grandes coleções ou iteradores personalizados).

Exemplo:

```js
function* idGen() {
  let id = 0;
  while (true) yield ++id;
}
```

---

### 3. **Como funciona a delegação de eventos no DOM? Por que ela é útil?**

**Resposta:**
**Delegação de eventos** é uma técnica onde você adiciona um **único listener em um elemento pai** e manipula eventos dos filhos usando **event bubbling**.

Vantagens:

* **Melhora performance**, evitando múltiplos listeners.
* Permite capturar eventos de elementos dinâmicos (criados após o carregamento).

Exemplo:

```js
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("Item clicado:", e.target.textContent);
  }
});
```

---

### 4. **O que são WeakMap e WeakSet, e em que casos são preferíveis a Map/Set?**

**Resposta:**
**WeakMap** e **WeakSet** armazenam **referências fracas a objetos** — ou seja, não impedem que esses objetos sejam coletados pelo garbage collector.

Características:

* As chaves (WeakMap) ou valores (WeakSet) **devem ser objetos**.
* Não são enumeráveis (não têm `size`, `forEach` etc.).
* Úteis para armazenar **metadados privados** ou cache associado a objetos, sem risco de vazamento de memória.

---

### 5. **Como funciona a coleta de lixo (garbage collection) no JavaScript?**

**Resposta:**
O garbage collector do JS remove da memória os objetos **não mais acessíveis** no código.

O algoritmo principal é o **Mark-and-Sweep**:

1. Marca objetos acessíveis a partir do root (como o `window`).
2. Remove objetos inacessíveis (não referenciados direta ou indiretamente).

Referências circulares **não causam vazamento** se forem inacessíveis. Mas se objetos se referenciam mutuamente e ainda são acessíveis, permanecem na memória.

---

### 6. **Explique o conceito de currying e composition em JavaScript funcional.**

**Resposta:**

* **Currying**: transforma uma função de múltiplos argumentos em uma sequência de funções unárias.

  ```js
  const add = (a) => (b) => a + b;
  add(1)(2); // 3
  ```

* **Composition**: combina funções menores em funções maiores.

  ```js
  const compose = (f, g) => (x) => f(g(x));
  ```

Esses padrões favorecem **imparcialidade, reutilização e legibilidade**, comuns em programação funcional.

---

### 7. **Como o JavaScript lida com a herança via protótipos? Qual a diferença para herança clássica?**

**Resposta:**
JavaScript usa **herança prototípica**, onde objetos herdam diretamente de outros objetos por meio do seu **prototype chain**.

Exemplo:

```js
const animal = { sound: "roar" };
const lion = Object.create(animal);
console.log(lion.sound); // "roar"
```

Diferença:

* Não há classes no modelo original (pré-ES6).
* É mais flexível: herança por objeto, não por tipo.
* ES6 `class` é **syntactic sugar** sobre esse modelo.

---

### 8. **O que são módulos ES6 e como eles diferem do padrão CommonJS?**

**Resposta:**

* **ES6 modules** (`import/export`) são **estáticos** e suportam **tree-shaking**, sendo avaliados uma única vez (singleton).
* **CommonJS** (`require/module.exports`) é **dinâmico**, usado no Node.js.

Diferenças:

* ES6 é assíncrono e nativo no navegador (com `type="module"`).
* CommonJS é síncrono, baseado em runtime.

ES6 é preferível para projetos modernos pela melhor compatibilidade com bundlers e browsers.

---

### 9. **Quais são as limitações do JSON.stringify()? Quando ele falha?**

**Resposta:**
`JSON.stringify()` converte objetos em string JSON, mas tem limitações:

* Ignora funções, `undefined`, símbolos.
* Não serializa referências circulares (causa erro).
* `Date` vira string, `Map/Set` são ignorados.
* Propriedades não enumeráveis são descartadas.

Exemplo de falha:

```js
const obj = {};
obj.self = obj;
JSON.stringify(obj); // TypeError: circular structure
```

---

### 10. **Como funcionam proxies em JavaScript e para que você usaria um?**

**Resposta:**
**Proxy** é um wrapper sobre um objeto que intercepta operações como leitura (`get`), escrita (`set`), e mais de 13 outras operações via **traps**.

Exemplo:

```js
const obj = {};
const proxy = new Proxy(obj, {
  get(target, prop) {
    return prop in target ? target[prop] : "Not Found";
  }
});
```

Usos:

* **Validação de acesso**.
* **Criação de reatividade** (como no Vue).
* **Logging, profiling** ou mapeamento dinâmico de propriedades.
