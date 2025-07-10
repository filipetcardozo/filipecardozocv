## 📊 Qualidade e Manutenibilidade de Código

### 1. **O que é código limpo? Quais são seus princípios?**

Código limpo é aquele que:

* **Comunica claramente sua intenção.**
* É **fácil de ler, modificar e testar**.
* **Evita duplicação**, nomes vagos, dependências implícitas.

Princípios (baseado em *Clean Code*, Robert C. Martin):

* Funções pequenas e com propósito único.
* Nomes significativos.
* Menos efeitos colaterais.
* Separação de responsabilidades.
* Testes automatizados como garantia de segurança para mudanças.

---

### 2. **Como você define dívida técnica? Quando ela é aceitável?**

Dívida técnica é qualquer **compromisso consciente ou não** que reduz a qualidade interna de um sistema para obter um ganho imediato (normalmente tempo de entrega).

**Aceitável quando:**

* Há pressa estratégica **justificada** e o débito é documentado.
* Existe plano claro de pagamento posterior.
* Não compromete a estabilidade ou segurança.

**Perigosa quando:**
Ignorada, acumulada ou escondida — vira entropia.

---

### 3. **O que é TDD e quando *não* é a melhor abordagem?**

TDD (Test-Driven Development) é a prática de:

1. Escrever o teste antes.
2. Fazer o código mínimo para passar.
3. Refatorar mantendo o teste verde.

**Não é indicado quando:**

* O problema é de design aberto/exploratório (ex: POCs).
* Há grande incerteza na API ou estrutura (ex: interfaces voláteis).
* O custo do retrabalho é menor do que manter os testes sincronizados (ex: spike técnico, protótipo).

---

### 4. **O que significa "testar comportamentos e não implementações"?**

Significa focar **no que o sistema faz**, e não **como ele faz**.
Ou seja, os testes devem:

* Validar resultados observáveis (ex: UI renderizada, chamadas feitas, efeitos disparados).
* Não acoplar ao nome de funções privadas ou à estrutura interna dos componentes.

**Vantagem:** testes mais robustos frente a refatorações internas.

---

### 5. **Como medir a complexidade de um código? Ferramentas e métricas.**

Principais métricas:

* **Complexidade ciclomática**: número de caminhos de execução independentes (alta = difícil de testar).
* **Nível de aninhamento** (if, switch, loops).
* **Fan-in / Fan-out** (número de dependências e consumidores).
* **Tempo de leitura**: quanto tempo leva para entender uma função.

Ferramentas:

* SonarQube, ESLint (com plugins de complexidade), CodeClimate, VSCode CodeMetrics, etc.

---

### 6. **O que é refatoração segura e como garantir não regressão?**

Refatoração segura é a modificação da estrutura interna do código **sem alterar seu comportamento externo**.

Para garantir:

* **Testes automatizados cobrindo o comportamento antes da mudança.**
* Commits pequenos e atômicos.
* Refatorar com apoio de ferramentas (ex: renomear com IDE).
* CI com execução completa dos testes.

---

### 7. **Qual a diferença entre testes unitários, de integração e E2E?**

* **Unitários**: testam uma função/componente isoladamente.
  Rápidos, baratos, focados em lógica.

* **Integração**: testam múltiplos módulos funcionando juntos (ex: service + DB).
  Detectam falhas em interações.

* **E2E**: testam o sistema inteiro como o usuário final.
  Lentos, frágeis, mas essenciais para confiança final.

---

### 8. **O que é cobertura de testes e por que ela pode ser enganosa?**

Cobertura é a proporção do código executado por testes.
**Alta cobertura ≠ testes bons**.

Pode ser enganosa porque:

* Código pode ser executado mas **não ter assertivas**.
* Cobertura 100% pode esconder lógica não validada.

**Foco real:** garantir que testes **validem comportamentos críticos**, não apenas que linhas sejam executadas.

---

### 9. **Como identificar code smells e quando agir sobre eles?**

**Code smells** são sintomas de problemas estruturais no código, mesmo que ele funcione.

Exemplos:

* Funções longas ou com múltiplas responsabilidades.
* Condicionais aninhadas demais.
* Nomes genéricos.
* Repetição de código.

**Quando agir:**

* Ao tocar o código para alterar/compreender.
* Quando afeta testes, legibilidade ou performance.
* Quando há evidência de bugs recorrentes.

---

### 10. **Como práticas de versionamento (ex.: SemVer) afetam a qualidade do projeto?**

SemVer (Semantic Versioning) = `MAJOR.MINOR.PATCH`

* **PATCH**: correções sem quebrar nada.
* **MINOR**: novas features compatíveis.
* **MAJOR**: mudanças incompatíveis.

**Impacto na qualidade:**

* Evita atualizações acidentais que quebram contratos.
* Dá previsibilidade a consumidores da lib/API.
* Exige maturidade no controle de mudanças e testes de regressão.