## **10 questões de complexidade intermediária sobre Microsoft Azure**, seguidas de **respostas no formato entrevista técnica**, respondendo de forma clara, precisa e contextualizada:

---

### 1. **Como você implementaria um mecanismo de autoscaling em uma aplicação hospedada no Azure App Service?**

O Azure App Service suporta autoscaling baseado em métricas, como uso de CPU, memória ou número de requisições. Configuraria uma **regra de escalonamento horizontal** via Azure Monitor para adicionar/remover instâncias automaticamente. Também posso definir perfis de escalonamento com base em horários (por exemplo, mais instâncias no horário comercial). Tudo isso pode ser feito via portal, CLI ou ARM templates.

---

### 2. **Qual a diferença entre Azure Functions e Azure Logic Apps, e quando escolher um ou outro?**

Azure Functions é uma plataforma serverless voltada a desenvolvedores — permite executar código sob demanda em múltiplas linguagens. Já o Logic Apps é mais visual, com foco em integração de sistemas via conectores (ex: Salesforce, Outlook).
Escolho **Functions** quando preciso de controle fino com código customizado. Uso **Logic Apps** quando a integração é entre serviços existentes com pouco ou nenhum código.

---

### 3. **Explique como você faria autenticação e autorização em uma API protegida com Azure AD.**

Registraria a API como um app no Azure AD, definindo escopos (scopes) e permissões. O cliente (web ou mobile app) também é registrado e autenticado via OAuth 2.0 / OpenID Connect.
A aplicação cliente obtém um token JWT via Azure AD e envia esse token no header Authorization da requisição. A API valida o token usando as chaves públicas da Microsoft e autoriza com base nos claims.

---

### 4. **Como você garantiria a segurança no acesso a recursos de armazenamento no Azure (por exemplo, blobs)?**

Primeiro, desabilito o acesso anônimo e exijo autenticação via Azure AD ou SAS tokens (Shared Access Signature) com tempo de expiração e permissões mínimas. Também habilito o firewall do Storage Account, restringindo o tráfego a redes confiáveis.
Para controle mais refinado, uso RBAC em nível de container ou integração com identidade gerenciada (Managed Identity) para evitar chaves de acesso hardcoded.

---

### 5. **Como funcionam os Managed Identities no Azure e para que são usados?**

Managed Identity é uma identidade gerenciada pelo Azure que pode ser atribuída a serviços (como App Services ou VMs). Ela permite que esses serviços acessem outros recursos protegidos (ex: Azure Key Vault, SQL Database) **sem armazenar segredos** no código.
Uso isso para eliminar o uso de credenciais manuais. Ex: um Function App pode acessar o Key Vault com permissão baseada em RBAC, autenticando com sua identidade gerenciada.

---

### 6. **O que são Availability Zones e como usá-las para aumentar a resiliência da sua aplicação?**

Availability Zones são zonas físicas isoladas dentro de uma mesma região do Azure. Cada zona possui sua própria energia, refrigeração e rede.
Para aumentar resiliência, distribuo instâncias de serviços críticos (como VMs ou App Service Environments) entre diferentes zonas. Assim, se uma zona falhar, as outras continuam operando. Alguns serviços como AKS e Azure SQL também oferecem suporte nativo a zonas.

---

### 7. **Você precisa garantir que dados estejam criptografados em repouso e em trânsito. Como faria isso no Azure?**

Para dados em repouso, quase todos os serviços do Azure já oferecem criptografia por padrão com chaves gerenciadas pela Microsoft (ou por mim, se preferir usar Azure Key Vault).
Para dados em trânsito, garanto que o HTTPS esteja habilitado em serviços web e uso TLS 1.2+ para conexões. Em bancos de dados, exijo conexão criptografada. Também posso configurar IPsec ou VPN entre redes privadas.

---

### 8. **Como você controlaria e limitaria o uso de uma API exposta publicamente no Azure?**

Usaria o Azure API Management como gateway, aplicando **rate limiting** com políticas de throttling por chave de acesso ou IP. Também adicionaria autenticação via Azure AD, OAuth ou chaves de subscrição.
Além disso, posso definir quotas por usuário, aplicar regras de CORS, proteger com WAF via Azure Application Gateway e registrar logs de uso para monitorar abusos.

---

### 9. **Você precisa fazer deploy contínuo de uma aplicação serverless. Como faria isso no Azure?**

Configuraria pipelines de CI/CD com Azure DevOps ou GitHub Actions. Para Azure Functions, o deploy pode ser feito via `func azure functionapp publish`, ou por pacotes ZIP, Docker ou slots.
Incluo etapas de lint, testes, e validação antes do deploy. Também posso usar slots de staging para publicar, testar e promover para produção com zero downtime.

---

### 10. **Como monitorar e diagnosticar uma aplicação distribuída no Azure?**

Usaria o Azure Monitor com Application Insights para coletar métricas, logs e traços distribuídos. Configuro telemetry nos serviços para capturar tempo de resposta, falhas e dependências externas.
Para aplicações com múltiplos componentes, uso o recurso de **Distributed Tracing** do App Insights para rastrear requisições ponta a ponta. Também integro alertas com Azure Alerts ou Microsoft Teams para incidentes.