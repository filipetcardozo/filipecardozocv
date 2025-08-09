## **10 questões sobre Front-end em React/Next.js hospedado na Azure**, com **níveis variados (básico, intermediário, avançado)**, todas estruturadas **como perguntas de entrevista** seguidas por **respostas completas e contextualizadas do ponto de vista de um candidato experiente**:

---

### 1. **Como você faz o deploy de uma aplicação React estática na Azure?**

Para aplicações React puramente estáticas, uso o serviço **Azure Static Web Apps**. Ele oferece deploy direto a partir de um repositório GitHub ou Azure DevOps, com build automático via GitHub Actions.
O processo envolve configurar o `build` script no `package.json`, apontar o diretório de saída (geralmente `build/`) e definir o branch de produção. Também é possível adicionar rotas personalizadas e regras de autenticação via `staticwebapp.config.json`.

---

### 2. **Como você lidaria com variáveis de ambiente em uma aplicação Next.js na Azure?**

No Next.js, utilizo variáveis via `process.env`. Para expor variáveis ao cliente, prefixo com `NEXT_PUBLIC_`.
Na Azure, se uso App Service, defino essas variáveis nos Application Settings. Para Static Web Apps, é possível adicioná-las no portal, e o Azure cuida de injetá-las no momento do build.
Para dados sensíveis (como chaves de API), uso **Azure Key Vault**, acessado no servidor via `getServerSideProps` ou funções serverless.

---

### 3. **Quais formas você conhece para hospedar uma aplicação Next.js com SSR na Azure?**

O Next.js com SSR requer um ambiente Node.js ativo. As opções que uso incluem:

* **Azure App Service (Linux)** com Node runtime, ideal para SSR e API routes.
* **Azure Container Apps** se empacoto tudo via Docker.
* **Azure Functions** (via Vercel adapter ou custom build) em Static Web Apps, mas com limitações.
  Avalio o volume de tráfego e o cold start para escolher entre Serverless e instâncias persistentes.

---

### 4. **Como você gerencia o versionamento de deploys e rollback em React/Next.js no Azure?**

Uso **GitHub Actions** ou Azure DevOps com pipelines CI/CD. No caso do Azure App Service, ativo **deployment slots** (`staging`, `production`) para testar antes do swap.
Em Static Web Apps, utilizo PR previews e posso desfazer merges.
Além disso, mantenho os builds versionados (por exemplo, no Azure Blob Storage ou CDN) e, se necessário, configuro fallback para versões anteriores via Front Door ou regras de roteamento.

---

### 5. **Como você garante que sua aplicação React/Next.js esteja segura ao ser exposta na internet via Azure?**

* Coloco a aplicação atrás de **Azure Front Door** para WAF e HTTPS com TLS atualizado.
* Configuro **CSP headers** para evitar XSS.
* Habilito **auth via Azure AD B2C ou AAD**, conforme o público-alvo.
* Mantenho todas as dependências atualizadas com ferramentas como `npm audit` ou Snyk.
* Para rotas protegidas, uso middlewares em Next.js (`middleware.ts`) e validação de sessão com tokens armazenados com HttpOnly cookies.

---

### 6. **Como você implementa cache eficiente para páginas Next.js no Azure?**

Uso **Incremental Static Regeneration (ISR)** com `revalidate` configurado em `getStaticProps`. As páginas são reconstruídas sob demanda e cacheadas.
Na borda, uso **Azure CDN** ou **Front Door** para servir conteúdo cacheado globalmente.
Para SSR, uso `Cache-Control` nos headers via `getServerSideProps` e crio regras no Azure Front Door para TTL.
Para páginas com dados sensíveis ou dinâmicos, evito cache público e uso session-aware responses.

---

### 7. **Como você lida com autenticação corporativa (Azure AD) em aplicações React ou Next.js na Azure?**

Uso o pacote **@azure/msal-browser** no React para autenticação client-side com Azure AD.
Para Next.js com SSR, prefiro NextAuth.js com o provedor `AzureAD`, ou configuro autenticação manual via `passport-azure-ad`.
Configuro o aplicativo no **Azure AD (App Registration)** com Redirect URIs, permissões e scopes corretos.
Para proteger rotas server-side, valido o token JWT em `getServerSideProps` ou em APIs com middleware (`express-jwt`, por exemplo).
Quando possível, uso **Easy Auth** no App Service para delegar essa responsabilidade ao Azure.

---

### 8. **Como você faria monitoramento completo de uma aplicação Next.js na Azure?**

* Integro o front-end com **Application Insights**, usando o SDK JavaScript para rastrear erros, page views, dependências e tempos de carregamento.
* No servidor (SSR ou APIs), também uso Application Insights com integração automática no App Service ou manual via SDK.
* Para métricas customizadas, utilizo `trackEvent`, `trackMetric`, etc.
* Também configuro alertas no Azure Monitor e crio dashboards com Workbooks para acompanhar indicadores-chave (LCP, TTFB, etc.).

---

### 9. **Como você faria blue/green deploys em uma aplicação React hospedada no Azure App Service?**

Utilizo **deployment slots**. Faço o deploy na slot `staging`, executo testes automáticos ou manuais, e só então promovo o slot para `production` com um **swap**.
Essa abordagem permite rollback instantâneo.
Configuro também **traffic splitting** entre slots, permitindo canary releases (por exemplo, 10% para `staging`, 90% para `production`).
Além disso, mantenho logs e rastreamento separado por slot para debugging.

---

### 10. **Quais são os desafios de hospedar uma aplicação híbrida (SSG + SSR) em Next.js no Azure e como você os supera?**

O principal desafio é que partes SSG podem ser servidas por CDN, enquanto SSR exige execução em Node. No Azure:

* Divido a aplicação: estáticos vão para **Azure Static Web Apps** ou **Blob + CDN**.
* As partes dinâmicas vão para **App Service** ou **Container App**.
* Uso **Azure Front Door** para roteamento baseado em path: `/static/*` para CDN, `/app/*` para App Service.
  Também configuro cache fine-grained, headers corretos e autenticação consistente entre camadas.