# Part 18: Observabilidade - Conceitos Essenciais

---

## 1. O que é observabilidade e como ela difere de monitoramento?


Observabilidade é a capacidade de entender o que está acontecendo dentro de um sistema complexo com base em seus sinais externos (logs, métricas, traces). Monitoramento é o ato de coletar e visualizar esses sinais.

---

## 2. Quais os três pilares da observabilidade?



1. **Logs:** eventos discretos com contexto textual.
2. **Métricas:** dados agregados com timestamp (ex: latência, erros).
3. **Traces:** rastreiam o caminho completo de uma requisição através de serviços.

---

## 3. Qual a diferença entre métricas de infraestrutura e métricas de negócio?

* Infra: CPU, memória, IOPS, conexões.
* Negócio: pedidos por minuto, taxa de conversão, tempo no carrinho.

Ambas são essenciais para diagnóstico completo.

---

## 4. Como aplicar observabilidade em apps front-end (React)?



* Logar erros no client com ferramentas como Sentry.
* Medir Web Vitals (LCP, FID, CLS).
* Adicionar tracing customizado para interações importantes (ex: click em "finalizar compra").

---

## 5. Como observar funções serverless ou Edge Functions?

* Log via `console.log` (CloudWatch, Stackdriver, etc).
* Correlacionar com ID de trace.
* Usar wrappers (ex: OpenTelemetry) para tracing automático.

---

## 6. Quais ferramentas comuns para observabilidade?



* Logs: Loki, ELK Stack, Sentry.
* Métricas: Prometheus, Datadog, New Relic.
* Tracing: Jaeger, Zipkin, OpenTelemetry, Honeycomb.

---

## 7. O que é tracing distribuído?


É o rastreamento de uma requisição através de vários serviços e camadas. Mostra onde ocorrem atrasos, falhas ou retrabalhos. Cada span representa uma etapa.

---

## 8. O que são SLOs, SLIs e SLAs?

* **SLO (Objective):** ex: 99.9% das requisições < 300ms.
* **SLI (Indicator):** o dado medido: latência, erro, etc.
* **SLA (Agreement):** contrato formal (geralmente com clientes).

---

## 9. Como propagar contexto de trace entre serviços?



* Use headers HTTP padronizados (ex: `traceparent`, `x-request-id`).
* Ferramentas como OpenTelemetry automatizam isso.
* Importante para manter coerência em microserviços e edge.

---

## 10. Como implementar observabilidade de forma iterativa?

**Passos recomendados:**

1. Defina objetivos (SLOs).
2. Logue erros e dados críticos.
3. Meça pontos de latência.
4. Adicione tracing entre front → back → banco.
5. Estabeleça alertas com foco no usuário final.