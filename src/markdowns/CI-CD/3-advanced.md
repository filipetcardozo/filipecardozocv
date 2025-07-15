## 🔴 Nível Avançado — Otimização, Segurança, Escalabilidade e Governança

---

### 1. **Como arquitetar pipelines modulares reutilizáveis em múltiplos repositórios?**

A ideia é **extrair lógica comum dos pipelines** para evitar duplicação e facilitar manutenção.

**Técnicas:**

* **Reutilização por templates**:

  * GitHub Actions: `reusable workflows` via `workflow_call`.
  * GitLab CI: `include:` para importar templates `.yml`.

* **Pipelines versionados por repositório central** (ex: `ci-templates/`).

* **Uso de actions customizadas** em GitHub:

  * Crie uma action por etapa reutilizável: `setup-node`, `lint`, `build`, etc.

**Benefícios:**

* Reduz inconsistência entre projetos.
* Centraliza mudanças (ex: upgrade de Node, mudança de padrão de testes).

---

### 2. **Como aplicar deploys canário, blue-green ou rolling dentro de pipelines automatizados?**

**Deploy Canário:** libera nova versão para uma porcentagem pequena de usuários.

**Blue-Green:** mantém duas versões em paralelo (`blue` = atual, `green` = nova), com switch controlado.

**Rolling:** atualiza instâncias gradualmente, evitando downtime.

**Como automatizar:**

* Ferramentas como **Kubernetes + Argo Rollouts**, **Spinnaker**, ou **AWS CodeDeploy**.
* CI dispara rollout via `kubectl`, `helm`, `argo`, etc.
* Monitoração ativa com alertas e rollback automático em caso de regressão.

---

### 3. **Como versionar pipelines e workflows mantendo rastreabilidade?**

* **Treat pipelines as code**: todo `.yml` versionado no Git.

* **Tags e branches** nos repositórios de templates:

  * `ci-template@v2.3.1`
  * `ci-infra/main`

* Ferramentas como **GitHub reusable workflows** ou GitLab `include:` permitem importar por tag ou commit.

**Vantagem:** permite "fixar" a versão de um pipeline enquanto outros avançam.

---

### 4. **O que é pipeline-as-code e quais são seus desafios em organizações grandes?**

**Pipeline-as-code** é o princípio de que **toda lógica de build/test/deploy deve estar versionada no repositório**, junto com o código.

**Desafios em larga escala:**

* **Multiprojetos com pipelines duplicados**
  → solução: abstração via templates e repositórios comuns.

* **Governança**: quem pode editar deploy para produção?

* **Auditoria e versionamento de workflows sensíveis**.

* **Padronização vs. flexibilidade**: evitar que times criem lógicas conflitantes.

---

### 5. **Como garantir segurança em pipelines (ex: evitar secret leaks e injeção de comandos)?**

**Boas práticas:**

* Use **Secret Managers integrados** (ex: GitHub Secrets, AWS Secrets Manager).
* **Não permita inputs externos não sanitizados**:

  * Evite `run: ${{ github.event.inputs.script }}`.
* Valide **hashes ou referências fixas** para Actions de terceiros.
* Use containers seguros e atualizados para runners.
* Bloqueie execução de pipelines em forks ou repositórios não confiáveis.

**Exemplo:** use `audit` em todas as dependências de CLI envolvidas.

---

### 6. **Como lidar com CI/CD em monorepos (Nx, Turborepo, Lerna)?**

**Desafios:**

* Build e testes mais lentos.
* Mudança em uma parte pode disparar pipelines desnecessários.

**Soluções:**

* **Ações condicionais** baseadas em paths alterados:

  ```yaml
  if: contains(github.event.head_commit.message, 'packages/ui')
  ```

* **Builders com caching inteligente:**

  * **Nx Cloud**, **Turborepo**, **Lage** detectam e executam só o que mudou.
  * Cache de resultados de builds entre PRs e branches.

* **Divisão de pipelines por pacote (multi-job com filter).**

---

### 7. **Como medir performance e gargalos do seu pipeline (tempo por job, paralelização)?**

**Ferramentas:**

* GitHub Actions Insights.
* GitLab CI/CD Metrics.
* Plugins como **Buildkite Insights**, **CircleCI dashboards**.

**O que medir:**

* Tempo médio por job.
* Steps mais lentos.
* Tempo ocioso por bloqueios (`needs:`).
* Falhas recorrentes.
* Eficácia do caching (hits vs. misses).

**Táticas:**

* Paralelizar testes em shards.
* Quebrar jobs longos (>5 min).
* Pré-compilar dependências pesadas.

---

### 8. **O que é GitOps e como ele se relaciona com CI/CD moderno?**

**GitOps** é um modelo de entrega contínua onde **o Git é a fonte de verdade da infraestrutura.**

* CI prepara o artefato e faz commit de manifesto (ex: `deployment.yaml`) em um repositório Git.
* Um agente (ex: **Flux**, **ArgoCD**) observa o Git e aplica as mudanças no cluster.

**Vantagens:**

* Todo o estado da produção é auditável via Git.
* Rollback = revert de commit.
* Permite deploys controlados e rastreáveis.

---

### 9. **Como aplicar testes de contrato (ex: Pact) no CI/CD para APIs?**

**Testes de contrato** validam que **clientes e servidores compartilham expectativas compatíveis.**

**Fluxo no CI:**

1. Consumidor gera contrato e publica no Pact Broker.
2. Produtor (API) roda CI com verificação do contrato.
3. CI só aprova deploy se o contrato for respeitado.

**Ferramentas:**

* [Pact](https://docs.pact.io/)
* [Postman contract tests](https://www.postman.com/blog/contract-testing/)
* [OpenAPI + Dredd](https://dredd.org)

Essencial em arquiteturas desacopladas (microserviços, microfrontends).

---

### 10. **Como garantir rollback automático ou mitigação rápida após deploy com falhas?**

**Táticas:**

* **Health checks** automatizados (CI + runtime).
* **Observabilidade integrada**: métricas, logs, alertas.
* **Deploys gradativos (canário)** + verificação de erro.
* **Monitoramento de erros (ex: Sentry)** com limites por release.

**Rollback:**

* GitOps: revert commit de `manifest.yaml`.
* AWS CodeDeploy ou Kubernetes: `rollout undo`.
* Firebase Hosting ou Vercel: reverter release via CLI/API.

**Boas práticas:**

* Nunca apagar releases antigas.
* Automatizar rollback por timeout ou falha de health check.
* Alertar canal do time via CI/CD.

---

Essas práticas consolidam um domínio técnico maduro sobre CI/CD, essencial para quem lidera times de engenharia ou trabalha com arquitetura de entrega contínua.