## 🔹 1. O que acontece se você chamar `setState` com o mesmo valor do estado atual?


O React faz uma comparação superficial (`Object.is`). Se o valor for o mesmo, **nenhum re-render acontece**.
Exceção: se você passar um **objeto novo** com o mesmo conteúdo (referência diferente), ele vai renderizar — porque React compara referência, não conteúdo profundo.

---

## 🔹 2. Por que não devemos atualizar o state diretamente (ex: `state.count++`)?


Porque o React não percebe que houve mudança. O `setState` é necessário para informar que o componente precisa ser re-renderizado.
Atualizar diretamente quebra o ciclo de renderização e pode causar comportamentos imprevisíveis.

---

## 🔹 3. O que acontece se esquecer o array de dependências no `useEffect`?


O efeito será executado **após todo render**. Ou seja: pode virar um loop infinito se ele mesmo alterar o estado.
**Exemplo de bug clássico:** fazer fetch dentro de um `useEffect` sem `[]` e com `setData` dentro → loop de fetch infinito.

---

## 🔹 4. Por que não devemos usar `async` diretamente em `useEffect`?


Porque o retorno de `useEffect` **deve ser uma função de limpeza (ou `undefined`)**, e `async` faz o hook retornar uma Promise, o que quebra essa expectativa.
**Solução correta:** usar uma função interna assíncrona dentro do `useEffect`.

```tsx
useEffect(() => {
  const load = async () => { ... };
  load();
}, []);
```

---

## 🔹 5. Como React trata eventos comparado ao DOM puro?


React usa um **sistema de eventos sintéticos** chamado SyntheticEvent. Ele funciona de forma semelhante, mas é **normalizado** para funcionar de forma consistente entre navegadores.

Além disso, os eventos em React são sempre capturados na **fase de "bubbling"**, não na "capturing", a menos que você especifique.

---

## 🔹 6. O que significa dizer que `setState` é assíncrono?


O `setState` **não atualiza o valor imediatamente**. Ele **agenda** uma atualização.
Se você tentar acessar o estado logo após chamar `setState`, verá o valor antigo.
**Solução:** use `useEffect` ou `setState(prev => ...)` para lógica baseada no valor atualizado.

---

## 🔹 7. Qual a diferença entre `defaultValue` e `value` em inputs?



* `value`: componente controlado → depende do estado.
* `defaultValue`: componente não-controlado → o valor inicial é definido, mas depois o DOM cuida.

Usar ambos ao mesmo tempo causa comportamento inesperado.

---

## 🔹 8. Como fazer um `map` de elementos JSX corretamente?


Usar um `.map()` com uma `key` única:

```tsx
items.map(item => <li key={item.id}>{item.name}</li>)
```

A `key` **não deve ser o índice** se a ordem ou conteúdo puder mudar.
Se não tiver um `id`, gere um UUID ou outro identificador estável.

---

## 🔹 9. Por que não devemos manipular o DOM diretamente em React (ex: `document.getElementById`)?


Porque React **mantém sua própria representação do DOM (virtual DOM)**. Se você mexer no DOM direto, o React pode sobrescrever sua mudança ou causar inconsistência.

**Alternativa correta:** usar `ref`.

```tsx
const inputRef = useRef();
<input ref={inputRef} />
```

---

## 🔹 10. O que é lifting state up e por que é útil?


É mover o estado para o **componente pai comum** entre dois ou mais componentes que precisam compartilhar esse estado.

**Por quê:** evita duplicação, facilita sincronização e segue o fluxo de dados unidirecional do React.