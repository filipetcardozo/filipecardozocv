🚀 Deploy, Observabilidade e Resiliência
1. O que é CI/CD e por que é essencial em projetos modernos?
CI (Continuous Integration): integração frequente de código com validações automatizadas (build, testes).

CD (Continuous Delivery/Deployment): entrega contínua e segura para ambientes de staging ou produção.

Essencial porque:

Reduz tempo entre codar e entregar valor real.

Detecta regressões mais cedo.

Impõe disciplina e automação como parte do fluxo de engenharia.

2. O que é blue-green deployment? E canary release?
Blue-Green: duas versões (blue e green) coexistem. A nova é deployada separadamente e o tráfego é comutado de uma só vez após validação.

Canary: a nova versão é liberada para uma pequena fração de usuários. Gradualmente aumenta-se o tráfego até que esteja 100% em produção.

Ambas mitigam riscos de regressão, mas canary permite feedback progressivo e rollback mais controlado.

3. O que são logs estruturados e por que adotá-los?
São logs em formato parseável por máquina (geralmente JSON), com campos padronizados.

Vantagens:

Facilitam buscas, filtros e correlações em ferramentas como ELK, Datadog, Loki.

Permitem dashboards e alertas precisos.

Reduzem ruído e ambiguidade de logs “livres”.

Exemplo:

json
Copy
Edit
{ "event": "user_login", "userId": 123, "timestamp": "...", "status": "success" }
4. Como você lida com falhas intermitentes em sistemas distribuídos?
Retries exponenciais com jitter.

Timeouts agressivos para não congestionar a aplicação.

Fallbacks (graceful degradation).

Circuit breakers para interromper chamadas falhas em cascata.

Observabilidade para detectar padrões (spikes, flutuações).

O objetivo é aceitar que falhas acontecem e tornar o sistema resiliente, não perfeito.

5. O que é um circuit breaker e como ele ajuda na resiliência?
É um padrão que interrompe chamadas para serviços instáveis, evitando degradação em cascata.

Funciona como um disjuntor:

Se muitas falhas ocorrem, ele “abre” e bloqueia novas chamadas por um tempo.

Após o tempo, entra em modo “semi-aberto” (testa se serviço se recuperou).

Usado em libs como resilience4j ou implementado manualmente.

6. Qual a diferença entre monitoramento e observabilidade?
Monitoramento: coleta e alerta com base em métricas e logs conhecidos.
Ex: CPU alta, erro 500, tempo de resposta > 2s.

Observabilidade: capacidade de entender por que algo está errado mesmo sem alertas pré-definidos, usando logs, métricas e tracing juntos.

Observabilidade → diagnóstico profundo e exploratório.
Monitoramento → supervisão contínua de indicadores chave.

7. O que são health checks e como usá-los em aplicações web?
São endpoints que expõem o estado de saúde da aplicação para orquestradores (Kubernetes, Elastic Beanstalk, etc).

Tipos:

Liveness: está vivo, não travado.

Readiness: está pronto para receber tráfego.

Ex: /healthz, /ready.
Usar para:

Prevenir deploys com apps quebradas.

Evitar enviar tráfego para instâncias indisponíveis.

8. O que é tracing distribuído e qual problema ele resolve?
É a capacidade de rastrear uma requisição através de múltiplos serviços, identificando gargalos e falhas.

Problema resolvido:

Em sistemas distribuídos (ex: microserviços), logs separados dificultam entender o fluxo end-to-end.

Tracing gera um ID único por requisição e o propaga, permitindo mapear todo o caminho.

Ferramentas: OpenTelemetry, Jaeger, Zipkin, Datadog.

9. Como detectar e agir sobre memory leaks em aplicações React?
Sinais:

Lentidão progressiva.

Componentes que continuam vivos após serem desmontados.

Eventos não cancelados, timers ativos, refs acumulando.

Ações:

Usar useEffect com função de cleanup correta.

Evitar manter estados desnecessários em useState.

Profilers como o do Chrome DevTools ou React DevTools → inspecionar heap e componentes zumbis.

10. O que você monitora para garantir performance em produção?
Web Vitals: LCP, TTI, CLS (Core Web Vitals).

Erros de JS no front (Sentry, LogRocket, etc).

Tempo de resposta da API e % de erros por rota.

Tamanho e tempo de carregamento de assets.

Taxa de conversão ou abandono por UX quebrada.

Em SPAs complexas ou microfrontends, é crítico monitorar por domínio ou rota, e não só globalmente.