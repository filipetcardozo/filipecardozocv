# Part 3: Hexagonal Architecture

---

## 1. Qual problema a Arquitetura Hexagonal resolve?

**Explicação breve:**
A abordagem hexagonal busca isolar o núcleo de regras de negócio de qualquer detalhe de infraestrutura ou tecnologia. Por meio de "ports" e "adapters", dependências externas, como bancos de dados ou interfaces web, são plugadas de fora para dentro. Dessa forma, é possível substituir essas integrações sem modificar o domínio principal, mantendo o código mais limpo e testável.

---

## 2. Como aplicar ports e adapters na prática?

* Defina interfaces (ports) que descrevem como o domínio espera se comunicar com o mundo exterior: repositórios, serviços de terceiros ou filas.
* Implemente adapters que convertem essas interfaces em chamadas concretas (HTTP, JDBC, mensageria), mantendo detalhes específicos fora do núcleo.
* O domínio interage somente com as interfaces, podendo ser testado sem infraestrutura real e permitindo a troca de tecnologias com impacto mínimo.

---

## 3. Benefícios notáveis

* Testes unitários ficam mais fáceis, pois as dependências são abstraídas em interfaces e podem ser totalmente simuladas.
* Há menor acoplamento a frameworks ou bancos específicos, permitindo trocar tecnologias com risco reduzido.
* A estrutura modular favorece migrações, tornando possível adicionar novos adapters ou substituir antigos sem reescrever o domínio.

## 4. Como a Hexagonal se relaciona com a Clean Architecture?

Ambas as abordagens procuram manter o domínio independente de detalhes de infraestrutura. A Hexagonal tende a ser mais pragmática, enfatizando a comunicação por meio de portas e adaptadores, enquanto a Clean Architecture organiza as camadas em anéis concêntricos. No fundo, compartilham os mesmos princípios de isolamento e testabilidade.

---

## 5. Exemplo de adapter de entrada

Um exemplo é um controlador HTTP ou handler REST que recebe a requisição, converte os dados para objetos de comando e os envia às portas do domínio. Ele age como porta de entrada, traduzindo protocolos de rede em chamadas internas padronizadas.

---

## 6. Exemplo de adapter de saída

Como adapter de saída podemos citar um repositório de dados que implementa a porta definida pelo domínio, realizando a persistência em banco relacional ou enviando mensagens a uma fila. Ele traduz objetos do domínio em formatos adequados à infraestrutura externa.

---

## 7. Como tratar transações?

As regras de negócio determinam quais operações precisam ocorrer de forma atômica. As portas do domínio expõem essa necessidade e os adapters de persistência implementam transações reais no banco ou serviço utilizado, garantindo consistência sem que o domínio conheça detalhes técnicos.

---

## 8. Impacto na curva de aprendizagem

A divisão clara entre domínio e infraestrutura auxilia novos desenvolvedores a localizar rapidamente onde inserir lógica de negócio ou adaptação a serviços externos. Embora exija entender o conceito de portas e adaptadores, essa organização evita acoplamentos prematuros e reduz confusão com dependências espalhadas pelo código.

---

## 9. Existem frameworks que apoiam esse estilo?

Embora a arquitetura seja neutra em relação a tecnologias, muitos frameworks oferecem recursos para implementá-la. No ecossistema Java e Kotlin é comum utilizar Spring Boot ou Micronaut; em Node.js, o NestJS fornece uma estrutura modular adequada. O ponto chave é que a separação de portas e adaptadores pode ser realizada em qualquer linguagem.

---

## 10. Quando a abordagem não se aplica bem?

Projetos pequenos ou de curta duração podem não se beneficiar da complexidade adicional de definir portas e adaptadores. Se não há necessidade de trocar tecnologias ou de isolamento forte de regras, a implementação pode acabar sendo mais pesada do que o problema que resolve.

