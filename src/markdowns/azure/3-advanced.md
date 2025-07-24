## **10 questões avançadas sobre Microsoft Azure**, cada uma formulada como em uma entrevista técnica, com **respostas completas e contextualizadas do ponto de vista de um candidato experiente**:

---

### 1. **Como você projetaria uma aplicação altamente disponível e tolerante a desastres entre regiões no Azure?**

**Resposta:**
Eu começaria usando serviços com suporte a replicação geográfica, como Azure SQL Geo-Replication, Azure Storage GRS e Front Door para DNS-based traffic routing. Utilizaria **Availability Zones** dentro da região principal e uma **região secundária** configurada como failover.
Para orquestração, aplico **Azure Traffic Manager** (baseado em performance ou prioridade) ou **Front Door** com health probes para redirecionar o tráfego automaticamente.
Também automatizo a replicação de infraestrutura via ARM/Bicep e configuro testes regulares de failover para garantir o RTO e RPO.

---

### 2. **Como você aplicaria políticas de governança e compliance em múltiplas subscriptions no Azure?**

**Resposta:**
Uso **Azure Policy** para forçar regras como "armazenamento criptografado", "localização geográfica permitida" ou "uso obrigatório de tags". Aplico essas políticas via **management groups**, organizando as subscriptions por tipo (produção, dev, etc.).
Também uso **Azure Blueprints** para padronizar a configuração de ambientes com RBAC, políticas e recursos. Para rastreamento, habilito o **Azure Defender** e o **Microsoft Purview** para mapear dados sensíveis e garantir conformidade.

---

### 3. **Quais estratégias você adotaria para garantir segurança zero trust em um ambiente Azure corporativo?**

**Resposta:**
Zero trust exige verificar sempre e confiar nunca. Implemento isso com:

* **Autenticação multifator (MFA)** via Azure AD.
* **Conditional Access Policies** para verificar contexto (dispositivo, IP, risco).
* **Segmentação de rede**, sem dependência de perímetro — uso NSGs, firewalls e microsegmentação com Azure Firewall e Private Link.
* **Identidade gerenciada e controle de acesso granular via RBAC.**
* **Auditoria contínua e alertas com Microsoft Sentinel.**

---

### 4. **Explique como proteger segredos e configurações sensíveis em uma aplicação cloud-native.**

**Resposta:**
Utilizo o **Azure Key Vault** para armazenar secrets, certificados e chaves. A aplicação acessa via **Managed Identity**, evitando embutir segredos em código.
Para containers, injeto secrets como volumes ou variáveis de ambiente temporárias. Para CI/CD, integro Key Vault aos pipelines usando tarefas seguras.
Audito acessos com logs de Key Vault e configuro alertas para acessos suspeitos.

---

### 5. **Como você faria observabilidade completa de uma aplicação Kubernetes (AKS) no Azure?**

**Resposta:**
Habilito **Azure Monitor para containers**, que coleta métricas do cluster (CPU, memória), logs do kubelet, e logs das aplicações.
Para tracing distribuído, integro **OpenTelemetry** ou Application Insights.
Uso o **Log Analytics Workspace** para centralizar logs e o **Grafana** com Azure Monitor para visualizações.
Também aplico liveness/readiness probes para melhorar rastreabilidade de falhas e autoscaling.

---

### 6. **Quais mecanismos você usaria para garantir performance e controle de custos (FinOps) em uma arquitetura serverless?**

**Resposta:**
Primeiro, monitoro execuções com Application Insights e Azure Monitor, identificando funções com alto consumo.
Uso planos de consumo com limites de execução e **rate limiting** para evitar abuse.
Para FinOps, habilito orçamentos e alertas via **Azure Cost Management**, classifico recursos por tags (ex: equipe, projeto) e implemento políticas para desligar serviços fora do horário comercial.

---

### 7. **Como você faria deploy seguro de uma aplicação com infraestrutura como código no Azure?**

**Resposta:**
Uso **Bicep** ou **Terraform** com pipelines de CI/CD. O deploy é feito via pipelines com controle de versionamento e **aprovadores manuais** para ambientes sensíveis.
Secrets são lidos de Key Vault com identidade gerenciada.
Executo `what-if` antes de aplicar mudanças e valido com `terraform plan` ou `bicep --what-if`.
Por fim, aplico **locks** em recursos críticos e monitoro alterações com Azure Activity Logs.

---

### 8. **Como escalar horizontalmente uma aplicação que usa Azure SQL Database com grande volume de leitura e escrita?**

**Resposta:**
Escalonamento de leitura é feito com **read replicas** via **Active Geo-Replication**. Posso usar **Elastic Pools** para isolar cargas de trabalho e evitar contenção.
Para escrita intensiva, uso **partitioning** de tabelas, stored procedures otimizadas e retry policies com backoff exponencial.
Em casos extremos, considero **sharding** manual (em app layer) ou migração para uma arquitetura híbrida com NoSQL (ex: Cosmos DB para eventos, SQL para transações).

---

### 9. **Como integrar aplicações legadas on-premises com recursos hospedados no Azure?**

**Resposta:**
Uso **Azure VPN Gateway** ou **ExpressRoute** para conexão segura entre o datacenter e a VNet.
Para comunicação entre aplicações, utilizo Azure Relay, Hybrid Connections ou Event Grid com endpoints privados.
Garanto identidade unificada com **Azure AD Connect** para sincronizar usuários e autenticação.
Também crio proxies de API com Azure API Management para expor os serviços legados com segurança e controle.

---

### 10. **Como você projetaria uma arquitetura event-driven escalável no Azure?**

**Resposta:**
Começo com **Event Grid** ou **Service Bus** como backbone para eventos.
Serviços como Azure Functions ou Logic Apps reagem aos eventos de forma assíncrona. Para garantir escalabilidade:

* Configuro **Azure Functions** com plano de consumo e escalonamento dinâmico.
* Uso **dead-letter queues** e políticas de retry.
* Particiono tópicos (no Event Hub, por exemplo) para balanceamento de carga.
  Para garantir resiliência, monitoro eventos com Application Insights e integro com dashboards via Azure Monitor.