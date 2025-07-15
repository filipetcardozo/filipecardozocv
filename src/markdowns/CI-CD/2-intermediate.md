## 🟡 Nível Intermediário — Integração com Projeto, Ambientes e Automações

---

### 1. **Como diferenciar pipelines para PRs, branches principais e produção?**

No CI/CD, é comum ter **pipelines distintos para diferentes gatilhos**:

* **Pull Requests (PRs):**
  → Executam lint, testes e builds leves para validar antes do merge.
  → Sem deploy automático.

* **Branches principais (`main`, `develop`):**
  → Rodam testes completos + builds.
  → Podem gerar **artefatos** ou publicar em staging.

* **Tags ou branches de produção (`release/*`, `prod`):**
  → Executam deploys para produção.
  → Normalmente só são disparados por merge/tag autorizada.

**Exemplo em GitHub Actions:**

```yaml
on:
  pull_request:
  push:
    branches:
      - main
      - prod
```

---

### 2. **O que são ambientes de staging e como integrá-los no pipeline?**

**Staging** é um ambiente intermediário entre desenvolvimento e produção.

**Funções:**

* Testes de integração com backend real.
* Validação de funcionalidades por QA ou PO.
* Deploy prévio ao ambiente final.

**Integração:**

* Crie uma etapa de deploy no CI que envia o build para staging:

  * Ex: deploy para Vercel, S3, Firebase, Heroku.
* Use variáveis de ambiente separadas (`STAGING_API_URL`).
* Automatize esse deploy ao push em `main`, por exemplo.

---

### 3. **Como automatizar testes com Jest ou Cypress em CI?**

**Jest (unitário):**

```yaml
steps:
  - run: npm run test
```

**Cypress (E2E):**

* Use `cypress-io/github-action`:

```yaml
- uses: cypress-io/github-action@v6
  with:
    start: npm run start
    wait-on: 'http://localhost:3000'
    browser: chrome
```

**Boas práticas:**

* Use **headless mode**.
* Rode em **paralelo** se possível.
* Salve artefatos (screenshots, vídeos) em caso de falha.

---

### 4. **Como configurar múltiplos jobs com dependências (ex: build → test → deploy)?**

Em CI moderno (GitHub Actions, GitLab CI), você pode definir **jobs independentes com dependências declaradas**.

**Exemplo:**

```yaml
jobs:
  build:
    steps: [...]

  test:
    needs: build
    steps: [...]

  deploy:
    needs: test
    steps: [...]
```

**Vantagem:** paraleliza etapas que não dependem uma da outra e reduz o tempo total de execução.

---

### 5. **Como armazenar e usar secrets/tokens com segurança no pipeline?**

* Use **secret managers da própria plataforma**:

  * GitHub: Settings > Secrets
  * GitLab: CI/CD > Variables

* No `.yaml`, acesse via `secrets`:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

**Boas práticas:**

* Nunca exponha secrets em logs.
* Use variáveis distintas por ambiente (`STAGING_TOKEN`, `PROD_TOKEN`).
* Nunca commit tokens no código.

---

### 6. **Como automatizar builds e deploys de aplicações React/Vite em CI?**

**Etapas comuns:**

```yaml
- name: Install dependencies
  run: npm ci

- name: Build
  run: npm run build

- name: Deploy
  run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

**Outras opções de deploy:**

* Firebase (`firebase deploy`)
* Netlify CLI (`netlify deploy`)
* S3 (`aws s3 sync`)
* Docker → Kubernetes ou ECS

---

### 7. **Como lidar com falhas intermitentes no pipeline? Quais estratégias de retry?**

**Falhas intermitentes** são instáveis (timeout, flakiness de rede, race condition em testes E2E).

**Soluções:**

* Use **retry automático**:

  * GitHub Actions:

    ```yaml
    continue-on-error: true
    ```

  * Cypress:

    ```js
    Cypress.config('retries', 2)
    ```

* Detecte e isole testes flaky.

* Use mocks ou dados determinísticos.

* Reforce timeouts configuráveis (`wait-on`, `start-server-and-test`).

---

### 8. **O que são "cache" e "restore" em CI/CD e como aceleram os builds?**

**Cache** evita refazer etapas pesadas como instalação de dependências.

**Exemplo:**

```yaml
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```

**Impacto real:**

* Reduz builds de 2–3 minutos para segundos.
* Pode ser usado também para `.next/cache`, `.vite`, `.eslintcache`, etc.

---

### 9. **Como notificar times sobre falhas ou sucessos (ex: via Slack ou email)?**

**Slack:**

* Use ações como `8398a7/action-slack` ou webhooks custom:

```yaml
- uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_URL }}
```

**Email:**

* GitHub Actions: via `dawidd6/action-send-mail`.
* GitLab CI: nativo por notificações configuráveis.

**Dica:** notifique **somente falhas** ou **última etapa**, para evitar ruído.

---

### 10. **Como aplicar controle de qualidade com ferramentas como ESLint, Prettier e SonarQube?**

**ESLint + Prettier:**

```yaml
- run: npm run lint
- run: npm run format:check
```

**SonarQube (análise de qualidade estática):**

* Requer Sonar Scanner CLI + token de projeto.

```yaml
- uses: SonarSource/sonarcloud-github-action@v1.9
  with:
    projectKey: your_project
    organization: your_org
```

**Objetivo:** prevenir regressões, detectar code smells, duplicações e falhas de padrão antes do merge.