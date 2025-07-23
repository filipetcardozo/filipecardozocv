**10 questões avançadas de System Design**, focadas em **escalabilidade real, tolerância a falhas, consistência, governança e engenharia de sistemas complexos**:

---

### 1. **Como você projetaria um sistema global altamente disponível com consistência eventual e failover automático entre múltiplas regiões (multi-region failover)?**

* **DNS com geolocalização (GeoDNS)** para roteamento de usuários à região mais próxima.
* **Banco de dados replicado entre regiões** (ex: DynamoDB global tables, Cosmos DB).
* **Escrita local + replicação assíncrona**, aceitando consistência eventual.
* **Failover com detecção via health checks** + orquestração com Route53, Cloudflare ou Akamai.
* Uso de **buckets S3 regionais com fallback** para assets.

**Trade-off:** menor latência e HA global vs. consistência forte.

---

### 2. **Quais estratégias você usaria para realizar deploys em sistemas que processam milhões de requisições por minuto sem downtime (zero-downtime deploy)?**

* **Blue-Green Deployment** com tráfego gradualmente migrado.
* **Canary Release** com monitoramento de métricas por versão.
* **Feature toggles** para ativar código novo sem reimplantar.
* **Database migrations backward-compatible**, com versionamento de schema.
* **Health checks em instâncias novas** antes de exposição ao tráfego.

---

### 3. **Como projetar uma arquitetura que suporte fila de mensagens com garantia de entrega exata uma vez (exactly-once delivery) em sistemas distribuídos?**

* Usar **IDs de mensagem únicos** com deduplicação em banco ou cache.
* Persistência idempotente (o mesmo dado pode ser regravado sem efeito colateral).
* **Outbox Pattern**: transação no banco escreve evento numa tabela outbox; um worker depois publica.
* Fila com suporte a **deduplication window** (ex: SQS FIFO, Kafka + compacted topics).

**Nota:** Exactly-once real é quase impossível sem cooperação dos dois lados — foque em **idempotência e deduplicação**.

---

### 4. **Como você trataria eventos duplicados e ordenação em uma arquitetura baseada em eventos com Kafka ou similar?**

* **Chave de partição controlada** para garantir ordenação por entidade (ex: `userId`).
* **Offset tracking e checkpointing por consumidor**.
* Implementar lógica de **idempotência** no consumidor (verificar ID do evento).
* Se necessário ordering global: use um **single partition**, com perda de paralelismo.

---

### 5. **Como arquitetar um sistema de recomendação em tempo real com baixa latência e atualização frequente?**

* **Pré-processamento assíncrono** com workers (Spark, Flink).
* **Modelo de ML embarcado ou por API** com cache para recomendação básica.
* **Redis ou ElasticSearch** para consulta de recomendações em tempo real.
* **Re-treinamento offline**, mas aplicação em tempo real via modelo serializado.

> Otimize a cold start com conteúdo popular e personalize com eventos recentes via streaming.

---

### 6. **Como organizar a governança de contratos e comunicação entre microsserviços?**

* **Versionamento de APIs** (REST v1, GraphQL com directives).
* **Pact ou AsyncAPI** para **testes de contrato** entre produtor e consumidor.
* **Catálogo de APIs centralizado** (SwaggerHub, Backstage).
* **Mensageria com schema registry** (ex: Avro com Confluent Schema Registry).
* Separação por **bounded contexts**, evitando dependências cruzadas.

---

### 7. **Como implementar auditoria e rastreabilidade de dados sensíveis sem comprometer performance ou compliance?**

* **Logs estruturados com nível de acesso** por usuário (incluindo IP, timestamp, ID).
* **Fila de eventos para auditoria** desacoplada da operação principal (ex: Kafka, Kinesis).
* **Separação de storage de logs** com criptografia + retenção controlada.
* **Encriptação em trânsito e em repouso**, mascaramento em campos sensíveis.
* **Alertas de acesso incomum** com base em regras de compliance (ex: SOC2, LGPD).

---

### 8. **Quais técnicas você usaria para manter integridade de dados em sistemas com múltiplos serviços e bancos separados?**

* **Eventual consistency** com eventos de domínio e validações assíncronas.
* **Sagas** com orquestração (centralizada) ou coreografia (via eventos).
* **Transações distribuídas** evitadas; usar **compensação** em falha.
* **Outbox pattern** para confiabilidade em publicação de eventos após alterações.

---

### 9. **Como projetar uma arquitetura de API Gateway robusta?**

* **Autenticação e autorização centralizada** (ex: JWT, OAuth2).
* **Roteamento dinâmico baseado em path e headers.**
* **Rate limiting, throttling e caching** por cliente.
* **Observabilidade**: logs, tracing por request ID, dashboards.
* Suporte a **fallbacks e mock de serviços indisponíveis**.

**Ferramentas**: Kong, Ambassador, KrakenD, Zuul, API Gateway da AWS.

---

### 10. **Como construir e escalar um sistema de notificações tolerante a falhas externas?**

* Sistema **event-driven**, baseado em fila para desacoplamento.
* **Worker por canal** (email, push, SMS), com retry e fallback.
* Armazenar **status e logs de entrega**, com dashboard de acompanhamento.
* Permitir **configuração de preferências do usuário** (opt-in/out por canal).
* **Circuit breakers** para provedores instáveis e failover para backup provider.

---

Essas soluções são aplicáveis em arquiteturas robustas, SaaS B2B, sistemas financeiros, ou plataformas com milhões de usuários.