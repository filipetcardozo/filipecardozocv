## 🟢 Nível Iniciante — Fundamentos de CI/CD

---

### 1. **O que significa CI/CD e qual o objetivo de cada parte?**

* **CI** (Continuous Integration): processo de **integrar código com frequência** no repositório principal, executando builds e testes automaticamente para validar a integridade da aplicação.
* **CD** pode significar duas coisas:

  * **Continuous Delivery**: código está sempre em estado **pronto para deploy**, com deploys manuais mas automatizáveis.
  * **Continuous Deployment**: deploys ocorrem **automaticamente** após a aprovação nos testes.

**Objetivo geral:** automatizar o caminho do commit até a produção com **segurança, previsibilidade e agilidade.**

---

### 2. **Quais são os benefícios de adotar CI/CD em projetos modernos?**

* Redução de bugs em produção (via testes automatizados).
* Feedback rápido para desenvolvedores.
* Redução de trabalho manual e erros humanos.
* Deploys mais frequentes e menos arriscados.
* Melhor colaboração entre devs, QA e DevOps.
* Facilita cultura DevOps e entrega contínua de valor.

---

### 3. **O que é um pipeline e como ele se estrutura?**

Um **pipeline** é a sequência de **etapas automatizadas** que transformam o código fonte em software funcional e implantado.

**Exemplo de estrutura:**

```plaintext
1. Checkout do código (git clone)
2. Instalação de dependências
3. Lint + testes
4. Build da aplicação
5. Deploy para staging ou produção
```

Cada passo é chamado de **job** ou **step** e pode ser executado de forma sequencial ou paralela.

---

### 4. **Qual a diferença entre build, test e deploy em um processo de CI/CD?**

| Fase       | Objetivo                                                    |
| ---------- | ----------------------------------------------------------- |
| **Build**  | Transforma o código em algo executável (ex: `vite build`)   |
| **Test**   | Valida o comportamento esperado (unitários, E2E, etc.)      |
| **Deploy** | Envia o código/testado para o ambiente final (staging/prod) |

Cada fase é automatizada e validada no pipeline, aumentando a confiança na entrega.

---

### 5. **O que é um gatilho (trigger) em CI/CD e como ele é usado?**

**Triggers** são **eventos que disparam a execução do pipeline.**

Exemplos:

* `push` para a branch `main`
* `pull_request` aberto ou atualizado
* `tag` com `v*` para releases
* comandos manuais (`workflow_dispatch`)

**Vantagem:** pipelines rodam **somente quando necessário**, economizando tempo e recursos.

---

### 6. **O que são artefatos e por que são importantes no pipeline?**

**Artefatos** são os **resultados gerados por etapas do pipeline** que podem ser reutilizados em etapas seguintes.

Exemplos:

* Bundles (`dist/`)
* Resultados de testes (logs, coverage)
* PDFs, screenshots, arquivos zipados

**Importância:**

* Permite separar build/test de deploy.
* Ajuda em diagnósticos e rastreabilidade.
* Evita retrabalho: compila-se uma vez, reaproveita-se depois.

---

### 7. **Quais são as ferramentas mais populares de CI/CD no mercado?**

| Ferramenta              | Características principais                          |
| ----------------------- | --------------------------------------------------- |
| **GitHub Actions**      | Nativo no GitHub, simples para projetos open source |
| **GitLab CI**           | Integração tight com GitLab, flexível e robusto     |
| **CircleCI**            | Performance e foco em automação de builds rápidos   |
| **Bitbucket Pipelines** | Integrado ao Bitbucket, simples e direto            |
| **Jenkins**             | Muito flexível, mas exige configuração e manutenção |
| **Azure DevOps**        | Ideal para ecossistema Microsoft e enterprise       |

Para front-end moderno, **GitHub Actions e GitLab CI** são os mais usados.

---

### 8. **Como CI/CD contribui para a qualidade de software e para o time de front-end?**

* **Executa lint, testes e builds automaticamente**, garantindo consistência.
* Detecta falhas cedo, antes do merge.
* Evita regressões silenciosas com testes de snapshot/E2E.
* Permite **pré-visualizar branches** (ex: deploy em preview URLs).
* Automatiza deploys em Netlify, Vercel, AWS, etc.
* Garante que o código entregue está validado em ambiente controlado.

**Resultado:** menos retrabalho, mais foco em evolução.

---

### 9. **Como um workflow básico de GitHub Actions funciona?**

Um workflow é definido em `.github/workflows/nome.yml`.

Exemplo básico:

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instala dependências
        run: npm install
      - name: Builda o projeto
        run: npm run build
```

**Funciona assim:**

1. Ao fazer push no repositório, ele inicia.
2. Faz o checkout do código.
3. Instala dependências e roda comandos definidos.

---

### 10. **O que é o `.yaml` usado em pipelines e por que é o formato comum?**

* `.yaml` (YAML Ain't Markup Language) é um formato leve, legível e **declarativo**, ideal para descrever processos como CI/CD.
* Facilita versionamento junto com o código.
* Usado por padrão em **GitHub Actions, GitLab CI, CircleCI**, entre outros.

**Exemplo:**

```yaml
name: Testes

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
```

É preferido por ser fácil de entender, mesmo sem experiência em programação de scripts.