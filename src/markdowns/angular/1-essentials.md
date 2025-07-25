## ✅ 1. **O que é um componente em Angular?**


> Um componente é uma unidade de interface que controla uma parte da tela. Ele combina HTML, CSS e lógica TypeScript, e é definido com o decorator `@Component`.

> **Explicação crítica:**
> No Angular, tudo parte de componentes. Eles encapsulam UI + comportamento, e são declarados em um módulo. O Angular reconhece componentes pelo `selector`, que é como eles são usados no HTML (`<app-header>`, por exemplo). Isso promove reusabilidade, composição e separação de responsabilidades. Sem entender bem a estrutura de um componente, você não consegue evoluir em Angular.

---

## ✅ 2. **Quais os tipos de data binding em Angular?**



* `{{ expression }}` → Interpolação (one-way: componente → template)
* `[property]` → Property binding (one-way: componente → DOM)
* `(event)` → Event binding (one-way: DOM → componente)
* `[()]` → Two-way binding (`banana in a box`)

> **Explicação crítica:**
> O data binding define como os dados fluem entre a lógica e a view. O Angular dá controle explícito sobre o sentido do fluxo. O two-way binding (`ngModel`) é útil, mas perigoso se usado sem pensar — pode levar a views que se atualizam fora de controle. Ter controle claro do fluxo é essencial para aplicações previsíveis.

---

## ✅ 3. **Para que servem `@Input()` e `@Output()`?**



* `@Input()` permite que o componente receba dados do componente pai.
* `@Output()` permite emitir eventos para o pai, via `EventEmitter`.

> **Explicação crítica:**
> Essa é a base da comunicação entre componentes. O Angular evita acoplamento direto entre eles, promovendo comunicação unidirecional. Isso força você a pensar em fluxo de dados e arquitetura limpa, onde cada componente é o mais isolado possível.

---

## ✅ 4. **O que são diretivas? Quais tipos existem?**


> Diretivas são instruções para o DOM. Existem três tipos:

* **Estruturais**: alteram o layout (ex: `*ngIf`, `*ngFor`)
* **De atributo**: mudam aparência ou comportamento de elementos (ex: `[ngClass]`)
* **Customizadas**: você pode criar a sua com `@Directive`.

> **Explicação crítica:**
> As diretivas são o mecanismo do Angular para manipular o DOM de forma declarativa. Entender isso te ajuda a evitar manipulação direta com `document.querySelector` — algo que fere os princípios do Angular.

---

## ✅ 5. **Como funciona a injeção de dependência no Angular?**


> Angular cria e gerencia instâncias de serviços automaticamente. Você declara dependências no construtor, e o Angular as injeta com base no escopo definido (por módulo, componente ou globalmente).

> **Explicação crítica:**
> A DI do Angular não é opcional — é parte do core. Ela favorece testes, reuso e desacoplamento. Saber onde declarar um serviço (ex: `providedIn: 'root'` vs `providers: []`) muda o escopo da instância. Erros aqui causam bugs complexos de estado compartilhado.

---

## ✅ 6. **O que é o `ngOnInit` e quando ele é chamado?**


> `ngOnInit()` é um lifecycle hook chamado uma vez após a criação do componente e inicialização das `@Input()`.

> **Explicação crítica:**
> Você usa `ngOnInit` quando precisa executar lógica de inicialização que depende de dados ou bindings. Evita colocar código no construtor, que deve apenas preparar dependências — não executar lógica.

---

## ✅ 7. **O que são Pipes e para que servem?**


> Pipes são usados para transformar dados diretamente no template (ex: `{{ data | date }}`).

> **Explicação crítica:**
> Eles mantêm o template limpo e declarativo. Usar lógica de formatação diretamente no HTML em vez de no controller melhora legibilidade. Criar pipes customizados também força você a pensar em transformação *pura* (sem efeitos colaterais).

---

## ✅ 8. **Qual a diferença entre Template-Driven e Reactive Forms?**



* Template-driven: definidos no HTML com `ngModel`, mais simples, menos controle.
* Reactive: definidos no TypeScript com `FormControl`/`FormGroup`, mais controlados, testáveis e escaláveis.

> **Explicação crítica:**
> Para formulários simples, template-driven basta. Mas reactive forms são melhores para formulários complexos, dinâmicos ou com múltiplas validações. Saber os dois mostra versatilidade.

---

## ✅ 9. **Como funciona o roteamento em Angular?**


> Você define rotas em um array de `Routes`, usa `RouterModule.forRoot()` e coloca `<router-outlet>` no template para exibir o componente correspondente.

> **Explicação crítica:**
> Angular trata navegação como parte da arquitetura — não é um hack. Entender como proteger rotas, lazy-load módulos e passar parâmetros (`this.route.snapshot.params`) é essencial para apps reais.

---

## ✅ 10. **O que é um Observable e como o Angular o utiliza?**


> Um `Observable` é uma stream de dados que pode emitir múltiplos valores ao longo do tempo. Angular os usa em HTTP, formulários, eventos e muito mais.

> **Explicação crítica:**
> Muita gente sabe *usar* `subscribe()`, mas não sabe que isso cria um *observable stream ativo*, que precisa ser cancelada (`unsubscribe()`) se não for usar `async` pipe. Isso evita vazamentos de memória. Saber operadores RxJS (ex: `switchMap`) diferencia alguém que apenas "usa Angular" de quem domina reatividade.
