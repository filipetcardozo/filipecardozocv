### 1. **O que é o ciclo de vida de um componente em React e por que ele é importante?**

**Resposta (tom de entrevista):**
“O ciclo de vida descreve as fases pelas quais um componente passa — montagem, atualização e desmontagem. Entender esses estágios me permite escolher onde inicializar dados, escutar eventos ou liberar recursos. Sem essa visão, eu corro o risco de criar vazamentos de memória ou renderizações desnecessárias.”

---

### 2. **Quais são os principais métodos do lifecycle em componentes de classe?**

**Resposta:**
“Nos *class components* costumo dividir em três grupos:

* **Inicialização:** `constructor` e `render`.
* **Montagem:** `componentDidMount` — ideal para chamadas a APIs.
* **Atualização e limpeza:** `componentDidUpdate` para reagir a mudanças de props/estado e `componentWillUnmount` para remover listeners.
  Esses pontos de entrada dão controle fino sobre efeitos colaterais.”

---

### 3. **Como o `useEffect` simula métodos de ciclo de vida em componentes funcionais?**

**Resposta:**
“Com `useEffect` consigo cobrir os três métodos principais:

* Passo um array de dependências vazio (`[]`) e o React executa apenas depois da montagem, como um `componentDidMount`.
* Se adiciono dependências, ele dispara sempre que elas mudam, espelhando `componentDidUpdate`.
* Retornando uma função de *cleanup*, ganho o comportamento de `componentWillUnmount`, liberando timers ou assinaturas.”

---

### 4. **O que acontece quando defino múltiplos `useEffect` no mesmo componente?**

**Resposta:**
“Eles rodam **na ordem em que foram declarados** após cada render — primeiro as limpezas dos efeitos antigos, depois os efeitos novos. Gosto de separar responsabilidades: um effect para assinaturas WebSocket, outro para *analytics*, por exemplo. Isso mantém cada efeito coeso e fácil de depurar.”

---

### 5. **Como evitar que um `useEffect` dispare infinitamente?**

**Resposta:**
“Coloco no array de dependências **apenas** o que o efeito realmente usa. Se preciso atualizar estado dentro dele, garanto que isso não cause nova mudança nas mesmas dependências ou uso o *callback* do `setState`. Quando percebo que posso cair em loop, removo a dependência e passo para outro efeito, ou troco por `useRef`.”

---

### 6. **Que armadilhas comuns você vê em `componentDidUpdate` ou `useEffect`?**

**Resposta:**
“A maior é atualizar estado sem condicional — vira um loop. Outra é esquecer de cancelar *fetches* assíncronos; quando o componente desmonta, ainda recebemos resposta e tentamos setar estado em algo inexistente. Por isso, sempre retorno um *cleanup* ou uso `AbortController`.”

---

### 7. **Diferença entre `useLayoutEffect` e `useEffect`, e quando usar cada um?**

**Resposta:**
“`useEffect` roda **após** o browser pintar a tela, então não bloqueia a interface. Já `useLayoutEffect` executa **antes** da pintura, garantindo leituras/alterações de layout corretas (ex.: medir altura de um elemento para animação). Em 90 % dos casos uso `useEffect`; reservo `useLayoutEffect` para cenários específicos de layout onde o *flicker* seria perceptível.”

---

#### Observação final (se houver espaço na entrevista)

“Geralmente prefiro *function components* e hooks por clareza e composição. Ainda uso classes em bases de código legadas, mas, sempre que possível, migro para hooks, porque o gerenciamento de side-effects fica declarativo e testável.”
