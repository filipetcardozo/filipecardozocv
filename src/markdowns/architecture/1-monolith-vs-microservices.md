# Part 1: Monolito vs Microserviços

---

## 1. O que caracteriza uma aplicação monolítica?

**Resposta clara:**
Um monolito reúne toda a aplicação em um só processo e deployment, abrigando interface, regras de negócio e persistência. Essa simplicidade inicial agiliza o desenvolvimento e a comunicação entre times, pois tudo está no mesmo código. Entretanto, à medida que a base cresce, fica complexo dividir responsabilidades e evoluir de forma independente, prejudicando escalabilidade e manutenção.

---

## 2. Quando optar por microserviços?

**Resumo objetivo:**
Opta-se por microserviços quando é necessário escalar partes específicas do sistema e delegar autonomia total para diferentes equipes. Cada serviço possui ciclo de vida e banco de dados próprios, permitindo evoluções paralelas. Em contrapartida, exige infraestrutura robusta, práticas de observabilidade e maior esforço de operação para coordenar as dependências distribuídas.

---

## 3. Quais desafios comuns em migrações de monolito para microserviços?

**Destaques:**

* Separar corretamente os domínios costuma demandar refatorações profundas, pois dependências implícitas aparecem ao isolar módulos.
* É necessário lidar com transações distribuídas, replicação de dados e consistência eventual, tornando a arquitetura mais complexa.
* Também é fundamental estabelecer monitoramento, logging centralizado e testes de integração robustos para detectar falhas entre serviços.

## 4. Como integrar microserviços de forma eficaz?

Além de APIs HTTP bem documentadas, é importante adotar formatos de mensagem padronizados e versionados. Mensageria assíncrona ou filas de eventos permitem comunicação resiliente, pois um serviço pode ficar indisponível sem bloquear todo o fluxo. Estratégias de tracing distribuído e contratos de serviço ajudam a manter a integridade das integrações.

---

## 5. Em quais cenários ainda vale manter um monolito?

Em times reduzidos ou aplicações com escopo bem delimitado, o overhead dos microserviços pode ultrapassar seus benefícios. Nesses casos, um monolito permite entregas mais rápidas e simplicidade operacional, com menos pontos de falha e menor custo de infraestrutura. Se o domínio não exige grande escala ou divisão rígida por módulos, manter tudo em um único código ainda é bastante eficaz.

---

## 6. O que é um serviço orquestrador?

Trata-se de um componente que coordena chamadas entre diversos serviços, garantindo que cada etapa de um processo complexo aconteça na ordem correta. Ele pode iniciar workflows, compensar falhas e consolidar respostas, oferecendo uma visão de negócio mais ampla do que simples chamadas ponto a ponto. Assim, mantém a consistência de operações distribuídas.

---

## 7. Como manter consistência de dados entre serviços?

Como cada microserviço possui seu próprio banco, a consistência transacional tradicional deixa de existir. É comum adotar consistência eventual com integração por eventos ou mensagens assíncronas. Padrões como Saga e Outbox ajudam a orquestrar múltiplas operações mantendo controle de falhas e garantindo que o estado final fique sincronizado mesmo após erros intermediários.

---

## 8. Qual o papel de um service registry?

O service registry atua como catálogo onde cada instância de serviço registra seu endereço e metadados. Clientes e gateways consultam esse catálogo para descobrir a localização atual de cada serviço, permitindo balanceamento e escalabilidade horizontal. Sem ele, seria necessário configurar manualmente endpoints ou depender de DNS estático, reduzindo a flexibilidade da arquitetura.

---

## 9. Como muda a estratégia de testes?

Com microserviços, crescem os cenários de testes em diferentes níveis. Além dos tradicionais testes unitários, ganham destaque os testes de contrato para validar APIs e mensagens publicadas. Também se tornam indispensáveis testes de integração ponta a ponta que cobrem vários serviços simultaneamente, garantindo que a comunicação e os fluxos de negócio estejam corretos.

---

## 10. Qual abordagem para migração incremental?

Comece identificando módulos menos acoplados que possuam fronteiras claras dentro do monolito. Extraia cada um como um serviço independente, expondo APIs ou eventos aos poucos. Durante a transição, mantenha as interfaces antigas ativas para não quebrar consumidores e vá reduzindo o tamanho do monolito até que todas as funcionalidades estejam separadas.

