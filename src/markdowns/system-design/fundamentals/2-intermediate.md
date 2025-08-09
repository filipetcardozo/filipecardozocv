### 1. **Como projetar um sistema de autenticação escalável (ex: OAuth2, JWT, SSO)?**

**Abordagem comum:**

* **Auth Server** centralizado (ex: Keycloak, Auth0)
* **Token JWT** para autenticação stateless (carregado no front e validado no backend)
* **OAuth2** para login via terceiros (ex: Google, GitHub)
* **SSO (Single Sign-On)** usando cookies de sessão ou SAML/OpenID Connect

**Princípios para escalar:**

* Use **tokens curtos + refresh tokens**
* Tokens devem ser validados **localmente**, sem I/O
* **Revogação via blacklist/cache** (Redis)
* Deploy do auth service em múltiplas zonas

---

### 2. **O que é rate limiting e por que é essencial em APIs públicas?**

**Rate limiting** impõe limites ao número de requisições permitidas por cliente em um intervalo de tempo.

**Por que usar:**

* Evita abuso (DDoS, bots)
* Protege recursos escassos (banco, terceiros)
* Garante QoS para todos os usuários

**Técnicas comuns:**

* Token Bucket
* Sliding Window
* Fixed Window

**Implementação**: via gateway (ex: NGINX, Kong) ou Redis + middleware customizado.

---

### 3. **Como projetar uma fila de tarefas assíncronas para operações demoradas (ex: envio de email)?**

**Arquitetura típica:**

* Produtor envia job para uma fila (ex: RabbitMQ, SQS, Kafka)
* Worker assíncrono consome e executa a tarefa
* Job status pode ser armazenado para tracking

**Benefícios:**

* Evita bloqueio na requisição original
* Permite retry automático
* Suporta picos de carga

**Considerações**:

* Idempotência
* Persistência dos jobs
* Visibilidade de falhas (DLQ, logs)

---

### 4. **Como garantir resiliência em chamadas entre microsserviços (timeout, retry, circuit breaker)?**

**Padrões para resiliência**:

* **Timeouts**: evita travamento indefinido
* **Retries com backoff exponencial**: tolera falhas transitórias
* **Circuit Breaker**: corta chamadas após X falhas consecutivas
* **Bulkhead**: isola falhas em compartimentos

**Bibliotecas**: Resilience4J, Hystrix (legado), Polly (C#)

**Monitoramento é essencial** para diagnosticar falhas intermitentes.

---

### 5. **O que é CDN e como ela melhora latência e escalabilidade?**

**CDN (Content Delivery Network)** distribui conteúdo estático em servidores geograficamente espalhados.

**Benefícios**:

* Reduz latência servindo do nó mais próximo
* Alivia tráfego do servidor de origem
* Melhora a escalabilidade e disponibilidade global

**Usado para**:

* Imagens, vídeos, arquivos JS/CSS
* Documentos estáticos
* Requisições de API com cache (em edge)

**Exemplos**: Cloudflare, Akamai, Fastly, AWS CloudFront

---

### 6. **Como projetar um serviço com suporte a uploads de arquivos grandes (streaming, multipart)?**

**Estratégias eficazes:**

* **Upload direto para storage (ex: S3)** via URL assinada — o backend não armazena nem processa.
* **Multipart upload**: quebra arquivos em partes, paraleliza e permite retry de partes.
* **Streaming**: usa streams em Node.js para processar sem carregar tudo na memória.

**Considerações:**

* Limites de tamanho e tipo
* Antivírus ou validação
* Notificação de sucesso (ex: webhook, fila)

---

### 7. **Como aplicar logging e tracing distribuído em sistemas com múltiplos serviços?**

**Boas práticas:**

* Cada requisição recebe um **trace ID único** (propagado entre serviços)
* Logs são **estruturados** (JSON, com metadata)
* Use **correlação entre logs, traces e métricas**

**Ferramentas**:

* Tracing: OpenTelemetry, Jaeger, Zipkin
* Logs: ELK Stack, Datadog, Loki
* APMs: New Relic, Sentry, Dynatrace

> Permite rastrear erros ponta-a-ponta em arquiteturas com muitos serviços.

---

### 8. **Quais estratégias usar para cache invalidation em sistemas com alto tráfego?**

**Problema clássico**: manter cache atualizado sem degradar performance.

**Técnicas:**

* **TTL curto + revalidação sob demanda**
* **Write-through**: atualiza cache no momento da escrita no banco
* **Cache aside (lazy loading)**: carrega ao acessar e invalida após tempo/evento
* **Tagging ou versionamento**: cache com chave única por versão

**Ferramentas**: Redis, Varnish, CDN Edge cache

---

### 9. **Como projetar uma API de busca eficiente com filtros, paginação e ordenação?**

**Boas práticas:**

* Use **query params semânticos** (`?q=term&status=open`)
* Suporte a **paginação por offset ou cursor**
* Permita ordenação com `?sort=-created_at`
* Use **indexes** no banco de dados
* Para alto volume: engine dedicada (Elasticsearch)

**Evite**: filtros mal otimizados sem índices ou paginação via frontend.

---

### 10. **Como projetar uma arquitetura multi-tenant para atender múltiplos clientes de forma isolada e segura?**

**Modelos possíveis**:

* **Banco por tenant**: máxima isolação, mais custo
* **Schema por tenant**: balanceia isolamento e simplicidade
* **Tenant ID em cada linha (shared schema)**: alta densidade, cuidado com vazamentos

**Boas práticas**:

* Isolamento lógico + segurança forte (scopes por tenant)
* Limites de uso (rate limiting, quotas)
* Logging e billing separados por tenant

> Fundamental em SaaS B2B e ambientes com muitos clientes.