## **10 questões básicas sobre Azure**, cada uma seguida por uma **resposta completa no formato entrevista técnica**, com o candidato respondendo com clareza, foco e profundidade:

---

### 1. **O que é o Microsoft Azure e quais são os principais benefícios do uso da nuvem da Microsoft?**

**Resposta (candidato):**
O Azure é a plataforma de computação em nuvem da Microsoft. Ele oferece serviços em modelos IaaS, PaaS e SaaS, abrangendo desde infraestrutura básica até soluções prontas para uso, como bancos de dados, machine learning e DevOps.
Os principais benefícios incluem escalabilidade elástica, alta disponibilidade global, integração nativa com ferramentas da Microsoft, segurança robusta e modelo de pagamento sob demanda, o que ajuda a otimizar custos e acelerar a entrega de soluções.

---

### 2. **Como você hospedaria uma aplicação web no Azure?**

**Resposta:**
Usaria o Azure App Service, que é um serviço PaaS ideal para hospedar aplicações web. Ele abstrai o gerenciamento de infraestrutura, suporta linguagens como .NET, Java, Node.js e Python, e permite escalar automaticamente com base na carga. Também facilita a integração com pipelines CI/CD e oferece recursos de segurança como autenticação integrada com Azure AD.

---

### 3. **O que são Resource Groups no Azure e como eles são usados?**

**Resposta:**
Resource Groups são contêineres lógicos usados para organizar e gerenciar recursos relacionados no Azure. Todos os recursos de uma aplicação — como banco de dados, app service e storage — podem ser agrupados em um único resource group. Isso facilita aplicar RBAC, monitoramento, tags e políticas, além de permitir a exclusão em massa com segurança e controle.

---

### 4. **Quais opções de armazenamento o Azure oferece para arquivos binários como imagens ou vídeos?**

**Resposta:**
Para esse tipo de dado não estruturado, o ideal é usar o Azure Blob Storage. Ele oferece armazenamento altamente escalável, seguro e com diferentes camadas de acesso (hot, cool, archive). É muito usado para backup, repositórios de mídia, logs e integração com CDNs. Além disso, permite acesso via API REST e SDKs para várias linguagens.

---

### 5. **Você precisa de um banco relacional gerenciado no Azure. O que usaria e por quê?**

**Resposta:**
Usaria o Azure SQL Database. É um serviço PaaS baseado no SQL Server, com alta disponibilidade, backup automático, tuning inteligente e escalabilidade elástica. Ele elimina a necessidade de gerenciar instâncias, patches e backups, o que permite focar no desenvolvimento da aplicação.

---

### 6. **Explique brevemente a diferença entre IaaS, PaaS e SaaS com exemplos no Azure.**

**Resposta:**

* **IaaS:** infraestrutura como serviço — como VMs no Azure (Azure Virtual Machines), onde gerencio o sistema operacional, runtime e aplicação.
* **PaaS:** plataforma como serviço — como o Azure App Service ou Azure Functions, que abstraem a infraestrutura e permitem focar só no código.
* **SaaS:** software como serviço — como o Microsoft 365 ou Power BI, onde apenas consumo a aplicação pronta, sem qualquer gerenciamento técnico.

---

### 7. **Como você gerenciaria CI/CD no Azure?**

**Resposta:**
Utilizaria o Azure DevOps ou GitHub Actions, dependendo do contexto. Com Azure DevOps, posso configurar pipelines YAML para build e release, integrar com repositórios Git e fazer deploy automatizado para Azure App Services, AKS ou funções. Também é possível configurar testes automatizados, gates de aprovação e rollback automático.

---

### 8. **O que é o Azure Active Directory e qual seu papel na arquitetura de soluções?**

**Resposta:**
Azure AD é a solução de identidade da Microsoft em nuvem. Ele gerencia autenticação e autorização para usuários, grupos e aplicativos. É essencial para implementar Single Sign-On (SSO), MFA e controlar acesso baseado em políticas. Ele também pode ser usado para proteger APIs e permitir integração com identidades externas, como contas Google ou Facebook.

---

### 9. **Como o Azure lida com escalabilidade de aplicações?**

**Resposta:**
O Azure permite escalabilidade tanto vertical quanto horizontal. Por exemplo, com App Service posso configurar autoescalabilidade com base em métricas como CPU, memória ou throughput. Já em AKS, é possível configurar Horizontal Pod Autoscaler. Serviços como Azure Functions escalam automaticamente sob demanda (serverless), sem necessidade de provisionamento manual.

---

### 10. **Como você controla e restringe acessos a recursos no Azure?**

**Resposta:**
Uso o RBAC (Role-Based Access Control), que permite atribuir permissões a usuários, grupos e aplicações com base em papéis (como leitor, colaborador ou proprietário). As permissões podem ser aplicadas em nível de subscription, resource group ou recurso individual. Para reforçar, combino com Azure Policies e, quando necessário, com Conditional Access e identidade gerenciada.