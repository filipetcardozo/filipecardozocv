### 1. **Qual a diferença entre `var`, `let` e `const` no JavaScript?**

**Resposta:**
A principal diferença está no **escopo** e **mutabilidade**.

* `var` tem **escopo de função** e sofre hoisting com valor `undefined`. Pode ser redeclarada e reatribuída.
* `let` tem **escopo de bloco** e também sofre hoisting, mas não pode ser acessada antes da declaração (tem **temporal dead zone**). Pode ser reatribuída, mas não redeclarada no mesmo escopo.
* `const` também tem **escopo de bloco**, não pode ser reatribuída, mas objetos referenciados por `const` ainda podem ser modificados internamente.

---

### 2. **O que é o escopo de uma variável e como ele funciona em funções e blocos?**

**Resposta:**
Escopo define **onde uma variável é acessível**. Em JavaScript temos:

* **Escopo global** (acessível em todo o programa),
* **Escopo de função** (quando declarada com `var` dentro de uma função),
* **Escopo de bloco** (com `let` e `const`, válido em `{ }` como if, loops, etc.).

Isso impacta visibilidade, isolamento e possíveis efeitos colaterais.

---

### 3. **O que significa `undefined` e como ele difere de `null`?**

**Resposta:**
`undefined` é um valor automático atribuído a variáveis que **foram declaradas mas não inicializadas**. Também é o retorno padrão de funções sem `return`.

`null` é um valor **intencionalmente atribuído** para representar “nenhum valor” ou “vazio”.

Em resumo:

* `undefined` = ausência de atribuição
* `null` = ausência de valor, definida pelo programador

---

### 4. **Explique o conceito de hoisting em JavaScript.**

**Resposta:**
Hoisting é o comportamento de mover **declarações** para o topo do escopo antes da execução do código.

* Variáveis declaradas com `var` são içadas com valor `undefined`.
* Funções declaradas com `function` são içadas **com corpo completo**.
* `let` e `const` também são içadas, mas **não podem ser acessadas antes da declaração** devido à *temporal dead zone*.

---

### 5. **Como funciona a tipagem em JavaScript? Ele é fortemente ou fracamente tipado?**

**Resposta:**
JavaScript é **fracamente e dinamicamente tipado**. Isso significa:

* O tipo de uma variável pode mudar em tempo de execução.
* Conversões de tipo implícitas (coerção) são comuns, o que pode levar a resultados inesperados como:

  ```js
  '5' - 2 // 3
  '5' + 2 // '52'
  ```

Essa flexibilidade é poderosa, mas exige disciplina para evitar bugs.

---

### 6. **Qual é a diferença entre `==` e `===`?**

**Resposta:**

* `==` (comparação abstrata) **converte tipos diferentes antes de comparar**, o que pode causar coerções inesperadas.
* `===` (comparação estrita) compara **valor e tipo**, evitando conversões automáticas.

**Exemplo:**

```js
'5' == 5    // true
'5' === 5   // false
```

Boa prática: sempre preferir `===` para evitar comportamentos ambíguos.

---

### 7. **O que é uma função de callback?**

**Resposta:**
É uma função passada como **argumento para outra função**, que será chamada em algum ponto da execução.

**Exemplo:**

```js
setTimeout(() => console.log('Executado depois'), 1000);
```

Callbacks são comuns em **operações assíncronas** ou para **customização de comportamento**, como no `Array.prototype.map`.

---

### 8. **Como funciona o `setTimeout` e o `setInterval`?**

**Resposta:**

* `setTimeout(fn, ms)` executa `fn` **uma vez após o tempo indicado**.
* `setInterval(fn, ms)` executa `fn` **repetidamente a cada intervalo**.

Ambos são assíncronos e dependem do **event loop** para agendar a execução.

**Nota:** o tempo real pode ser afetado por bloqueios no thread principal.

---

### 9. **Qual a saída do código abaixo e por quê?**

```js
console.log(typeof null);
```

**Resposta:**
A saída é `"object"`.

Isso é considerado um **bug histórico da linguagem** — no início da especificação, `null` foi implementado como referência nula, mas `typeof` retornava `"object"` por compatibilidade. Isso nunca foi corrigido para não quebrar legados.

---

### 10. **O que é o objeto `window` em JavaScript no contexto do navegador?**

**Resposta:**
`window` é o **objeto global no navegador**. Ele representa a **janela do navegador**, e contém:

* DOM (`window.document`)
* APIs globais (`window.alert`, `window.setTimeout`)
* Variáveis globais (`var x = 1` é `window.x = 1`)

No Node.js, o equivalente é `global`, não `window`.
