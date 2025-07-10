🧠 Engenharia de Requisitos
1. O que são requisitos funcionais? Dê exemplos práticos.
São funcionalidades que o sistema deve executar. Representam comportamentos esperados frente a entradas específicas.
Exemplos:

Usuário pode fazer login com email e senha.

Sistema envia email de confirmação após cadastro.

Admin pode remover contas inativas.

2. O que são requisitos não funcionais? Qual a diferença em relação aos funcionais?
Requisitos não funcionais definem restrições ou qualidades do sistema, e não descrevem comportamentos diretos.
Exemplos: tempo de resposta, segurança, escalabilidade, acessibilidade.

Diferença:

Funcionais: o que o sistema faz.

Não funcionais: como ele deve ser.

3. Como você elicita requisitos de stakeholders não técnicos?
Utilizo uma combinação de:

Entrevistas orientadas a cenários de uso reais.

Protótipos de baixa fidelidade, para validar intenções e evitar ambiguidade.

Casos de uso escritos com linguagem natural.

Técnicas como User Story Mapping e Job Stories, para explorar motivações antes das soluções.

4. O que é um requisito ambíguo? Como evitá-lo?
É aquele que permite múltiplas interpretações.
Exemplo ruim: “O sistema deve ser rápido.”
Como evitar:

Usar critérios mensuráveis.

Validar entendimento com os stakeholders.

Especificar com clareza: “A resposta deve vir em até 500ms para 95% das requisições.”

5. O que diferencia uma user story de um requisito formal?
User story: centrada no usuário, informal e orientada à entrega incremental.
Ex: “Como comprador, quero filtrar produtos por preço para encontrar ofertas.”

Requisito formal: estruturado, técnico, com rastreabilidade e possível validação automatizada.
Ex: “O sistema deve permitir ordenação crescente/decrescente por preço na listagem de produtos.”

6. Como priorizar requisitos conflitantes entre diferentes áreas do negócio?
Avaliação de impacto (financeiro, técnico, risco).

Modelos de priorização como MoSCoW, WSJF ou matriz de esforço vs. valor.

Facilitação de workshops com stakeholders para tomada de decisão conjunta baseada em trade-offs.

7. Como garantir rastreabilidade entre requisitos e entregas?
Uso de ferramentas que relacionem histórias, tarefas e testes automatizados (ex: Jira + GitHub + CI/CD).

Criação de matrizes de rastreabilidade que mapeiam requisito → artefato → teste.

Controle de versão claro com links diretos para PRs ou commits que implementam cada requisito.

8. Qual o papel dos critérios de aceitação na engenharia de requisitos?
Eles definem como saber se o requisito foi atendido.
Servem como base para:

Testes (manuais ou automatizados).

Alinhamento com o cliente.

Limites claros de escopo.

Exemplo: “Se o usuário inserir senha incorreta 3 vezes, deve ser exibida mensagem de bloqueio temporário.”

9. Como requisitos mal definidos afetam a arquitetura?
Podem induzir decisões estruturais erradas ou inflexíveis.

Forçam re-trabalho quando descobertas emergem tardiamente.

Afetam escolha de padrões, serviços e até a granularidade dos componentes.

10. O que é o escopo do sistema e como ele se relaciona com os requisitos?
O escopo delimita o que será entregue e o que está fora da solução.
Relaciona-se com os requisitos ao filtrar quais serão atendidos dentro de um ciclo de projeto ou MVP.
Ajuda a evitar scope creep e define prioridades de implementação.