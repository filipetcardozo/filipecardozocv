# Part 17: Arquitetura Flux - Conceitos Fundamentais

---

## 1. O que é a arquitetura Flux?

**Resposta clara:**
Flux é um padrão de arquitetura unidirecional criado pelo Facebook para lidar com atualizações previsíveis de estado em UIs complexas. Flux define um ciclo de dados com quatro partes: **Action → Dispatcher → Store → View**.

---

## 2. Qual a diferença entre Flux e Redux?

**Resposta clara:**
Redux é uma implementação simplificada e opinativa do Flux:

* Flux: múltiplas stores, dispatcher central.
* Redux: store única, reducers puros, middleware ao invés de dispatcher.

---

## 3. Qual é o ciclo de dados no Flux?

**Resumo:**

1. **View** dispara uma **Action**.
2. A **Action** passa pelo **Dispatcher**.
3. O **Dispatcher** envia para todas as **Stores** registradas.
4. A **Store** atualiza e emite evento.
5. A **View** se atualiza em resposta.

---

## 4. Qual o papel das Actions em Flux?

**Resposta clara:**
Uma action é um objeto que descreve um evento ocorrido (ex: `type: 'USER_LOGIN'`). Pode conter dados adicionais (`payload`). Não tem lógica: são apenas descritores.

---

## 5. O que é o Dispatcher?

**Resposta clara:**
É um objeto que registra todas as stores e distribui todas as actions para elas. Ele controla a ordem de atualização e evita dependências circulares entre stores.

---

## 6. O que são Stores em Flux?

**Resposta clara:**
Stores mantém o estado da aplicação e a lógica de negócio. Elas ouvem o Dispatcher, atualizam o estado e emitem eventos para a View.

Diferente de modelos MVC, stores não têm setters expostos — só escutam actions.

---

## 7. Por que Flux impõe fluxo unidirecional?

**Resposta clara:**
Para manter previsibilidade e facilitar debugging. Em aplicações com múltiplas interações assíncronas, a bidirecionalidade (como no MVC) torna o estado difícil de rastrear.

---

## 8. Flux exige React?

**Resposta clara:**
Não. Flux é uma arquitetura de estado, não uma biblioteca React. Pode ser usada com outras bibliotecas de UI.

---

## 9. Quais os desafios de implementar Flux puro?

**Resposta clara:**

* Boilerplate alto (actions, dispatcher, stores).
* Testabilidade menor que Redux.
* Gerenciamento manual de dependências entre stores pode gerar acoplamento.

Por isso, Redux se popularizou mais.

---

## 10. Em que contextos usar Flux (ou Redux) ainda faz sentido hoje?

**Resposta clara:**

* Apps com interações complexas entre módulos.
* Múltiplos estados derivados que dependem de vários fatores.
* Ambientes onde o debugging e rastreabilidade são prioritários.

Mas em apps simples, ferramentas como Context API, Zustand ou React Query podem ser mais apropriadas.