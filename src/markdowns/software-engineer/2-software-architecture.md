🧱 Arquitetura de Software
1. O que é separação de responsabilidades (SoC) e por que é importante?
É o princípio de isolar diferentes responsabilidades de um sistema em componentes distintos.
Isso reduz o acoplamento e facilita:

Testes unitários.

Manutenção e evolução.

Reuso e substituição de partes isoladas.

Exemplo clássico: manter lógica de apresentação (UI) separada da lógica de domínio e persistência.

2. O que caracteriza uma arquitetura monolítica versus uma baseada em microsserviços?
Monolítica: aplicação unificada, um único deploy, todos os módulos compartilham memória/processo.
Fácil de começar, mas difícil de escalar de forma independente.

Microsserviços: módulos isolados, com deploys independentes, comunicação via rede (REST, gRPC, etc).
Promove escalabilidade e autonomia, mas traz complexidade operacional (observabilidade, contratos, versionamento).

3. O que é acoplamento e coesão? Como afetam a manutenibilidade?
Acoplamento: grau de dependência entre componentes.
Menor acoplamento = menos impacto em mudanças.

Coesão: grau em que os elementos de um módulo trabalham em torno de uma única responsabilidade.
Alta coesão = módulos com propósito claro e focado.

Objetivo: Baixo acoplamento, alta coesão → sistemas mais fáceis de evoluir e menos propensos a bugs em cadeia.

4. Qual o papel das camadas (ex.: apresentação, domínio, dados) em uma arquitetura clássica?
A separação em camadas visa organizar responsabilidades e definir limites claros.
Modelo clássico em 3 camadas:

Apresentação (UI): interação com o usuário.

Domínio (Negócio): regras, validações, lógica.

Infraestrutura (Dados): persistência, APIs externas.

Facilita manutenção, testes e separação de competências entre times.

5. Como decidir entre usar uma arquitetura orientada a eventos ou baseada em requisições síncronas?
Orientada a eventos: ideal quando há baixa acoplabilidade entre componentes e necessidade de resiliência, escalabilidade ou tempo real.
Ex: fila de pedidos, sistemas com backpressure, IoT.

Síncrona: quando é necessário feedback imediato e simplicidade de controle de fluxo.
Ex: login, checkout, validações em tempo real.

Critério central: acoplamento temporal e latência tolerável.

6. O que são design trade-offs e como avaliá-los?
São decisões arquiteturais que envolvem sacrifícios entre qualidades desejadas (ex.: performance vs. manutenibilidade).
Avaliação envolve:

Mapeamento dos impactos técnicos e de negócio.

Identificação de custos de mudança futura (YAGNI vs. antecipação).

Prototipagem e experimentação quando necessário.

Não há soluções ideais, só escolhas conscientes baseadas em contexto.

7. O que é DDD (Domain-Driven Design) e quando faz sentido aplicá-lo?
DDD é uma abordagem que centraliza a modelagem de software no domínio do problema real do negócio, com foco em linguagem ubíqua e isolamento de contextos.

Faz sentido quando:

O domínio é complexo e mutável.

Há múltiplas subáreas com regras distintas.

Equipes técnicas e de negócio atuam em conjunto e precisam alinhar vocabulário e design.

Evite em sistemas CRUD simples com pouca lógica de negócio.

8. O que são cross-cutting concerns e como você os trata em sistemas complexos?
São funcionalidades transversais a múltiplos módulos, como:

Logging

Autenticação

Monitoramento

Validação

Segurança

Tratamento típico:

Middleware (em Express, NestJS, etc).

AOP (Aspect-Oriented Programming).

Decorators ou injeções de dependência.

Centralização via serviços ou bibliotecas comuns.

9. Como a arquitetura influencia escalabilidade horizontal e vertical?
Escalabilidade horizontal: multiplicação de instâncias. Requer arquitetura stateless, com comunicação desacoplada e cache externo.

Escalabilidade vertical: aumento da capacidade de uma única instância. Depende de otimização local, mas tem limites físicos.

A escolha de arquitetura (monólito, microsserviços, serverless) define quais estratégias serão mais viáveis.

10. O que é arquitetura evolutiva e como adotá-la em equipes ágeis?
É uma arquitetura desenhada para suportar mudanças frequentes sem reescrever tudo.
Princípios:

Modularidade alta.

Feature toggles para experimentação.

CI/CD com automação de testes.

Documentação leve e viva.

Feedback contínuo de uso e performance.

Adotar implica aceitar mudanças como parte do design, e não exceções.