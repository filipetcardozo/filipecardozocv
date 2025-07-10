## 📁 2 - Modern Bundlers: Comparison & Estratégia

---

### 1. **Quais são as vantagens de Vite sobre Webpack em projetos modernos?**

Vite foi projetado para tirar proveito das **capacidades modernas do navegador**, com foco em **desempenho e simplicidade**.

**Principais vantagens sobre Webpack:**

* ⚡ **Startup instantâneo:** Vite serve código via ESM diretamente no dev, sem bundling inicial.
* 🔄 **HMR extremamente rápido:** mudanças afetam apenas os módulos alterados (sem rebuild global).
* 🧩 **Configuração mínima:** menos boilerplate, DX mais fluida.
* 🔧 **Baseado em esbuild na dev e Rollup no build final:** rápido no dev, otimizado na produção.

Ideal para SPAs modernas com foco em produtividade e performance local.

---

### 2. **Como esbuild atinge alta performance em comparação com bundlers baseados em JavaScript?**

**esbuild** é escrito em **Go**, uma linguagem compilada com alta performance e gerenciamento eficiente de memória.

**Vantagens de performance:**

* Transpila e empacota em **processo único e multithread**.
* Usa **ASTs internos otimizados**, sem overhead de parse manual.
* Evita sistema de plugins pesados e transforma arquivos diretamente, sem IO desnecessário.

Benchmark: esbuild é geralmente **10–100x mais rápido** que Webpack em builds frios.

---

### 3. **Quando faz sentido escolher Rollup em vez de Webpack ou Vite?**

Rollup é ideal quando:

* Você está **construindo uma biblioteca ou SDK** que será consumida por outros projetos.
* Precisa de **bundles pequenos e altamente otimizados**, com controle sobre *tree shaking* e *output format*.
* O público-alvo exige **diversos formatos** (ESM, CommonJS, UMD).

Rollup é menos adequado para aplicações grandes e interativas (SPAs), onde Vite ou Webpack oferecem soluções mais completas.

---

### 4. **Qual a diferença entre bundlers que operam em tempo de execução vs. tempo de build?**

| **Tempo de execução (dev)**     | **Tempo de build (prod)**                    |
| ------------------------------- | -------------------------------------------- |
| Serve código sem empacotar.     | Gera bundles otimizados.                     |
| Vite usa ESM direto no browser. | Webpack e Rollup criam arquivos minificados. |
| Foco em velocidade de feedback. | Foco em performance final.                   |

**Bundlers modernos (como Vite)** usam ESM puro no desenvolvimento, evitando builds desnecessários e acelerando iteração.

---

### 5. **Quais bundlers oferecem suporte nativo a TypeScript sem configuração adicional?**

* **Vite**: suporta TypeScript out of the box (usa esbuild no dev para transpilar, sem checagem de tipo).
* **esbuild**: transpila `.ts` com suporte nativo, mas **não faz type checking**.
* **Parcel**: detecta `.ts` automaticamente e lida com isso sem config.
* **Rollup e Webpack**: precisam de loaders/plugins (`ts-loader`, `rollup-plugin-typescript2`), não funcionam nativamente.

Resumo: **Vite e Parcel** oferecem melhor DX para TypeScript com zero-config.

---

### 6. **Como cada bundler lida com HMR (Hot Module Replacement) e por que isso importa em DX?**

| Bundler     | HMR                                                     | Observações                          |
| ----------- | ------------------------------------------------------- | ------------------------------------ |
| **Vite**    | Instantâneo via ESM                                     | Altamente granular, rápido, isolado  |
| **Webpack** | Plugin `webpack-dev-server` ou `webpack-hot-middleware` | Mais pesado e global                 |
| **Parcel**  | Interno e automático                                    | Funciona bem, mas menos customizável |
| **esbuild** | Sem HMR nativo (ainda)                                  | Foco em build, não devserver         |
| **Rollup**  | Não nativo, exige plugins (ex: `@rollup/plugin-hot`)    | Pouco usado para dev HMR             |

**Por que importa:**

* HMR rápido reduz o ciclo de feedback dev → build → ver resultado.
* Melhor para produtividade e testes de UI.

---

### 7. **O que diferencia a abordagem de plugins no Vite e no Webpack?**

| Aspecto         | **Webpack**                          | **Vite**                         |
| --------------- | ------------------------------------ | -------------------------------- |
| Modelo          | Baseado em *hooks* no ciclo de build | Baseado em plugins do **Rollup** |
| Complexidade    | Alta (interação com internals)       | Simples, declarativo             |
| Compatibilidade | Muitos plugins legados e maduros     | Plugins de Rollup ou Vite-native |

**Resumo:**

* Webpack tem poder e flexibilidade, mas **muito boilerplate**.
* Vite prioriza **composição simples** e adota convenções modernas.

---

### 8. **Em que cenários Parcel pode ser uma escolha mais eficiente que alternativas como Rollup?**

Parcel é ideal quando:

* Você quer **zero configuração real**, inclusive para assets e CSS.
* O time é pequeno ou está em prototipagem rápida.
* Precisa de empacotamento automático para **múltiplos tipos de arquivos** (JS, TS, CSS, HTML, imagens, etc).

Parcel faz **auto detect e auto install** de dependências, o que agiliza bootstrap de projetos.

Não é tão leve ou personalizável quanto Rollup, mas **excelente para times focados em entrega rápida sem overhead técnico.**

---

### 9. **Como as decisões de arquitetura do bundler afetam tempo de CI/CD em grandes projetos?**

* Bundlers com **ciclo de build lento** (Webpack, Rollup sem otimização) **aumentam o tempo de pipeline**.
* **Builds determinísticos e paralelizados (esbuild, Vite)** aceleram testes e releases.
* Estratégias como **caching de build** (ex: `cache-loader`, `turboRepo`) exigem bundlers previsíveis e compatíveis.
* Separação de **chunks reutilizáveis** (ex: Design System) economiza tempo de build e reduz redundância.

**Em larga escala**, escolha de bundler pode **economizar horas/dia em pipelines de integração.**

---

### 10. **Como o suporte a SSR (Server-Side Rendering) varia entre bundlers modernos?**

| Bundler     | Suporte a SSR                          | Notas                                     |
| ----------- | -------------------------------------- | ----------------------------------------- |
| **Webpack** | Sim, usado por Next.js                 | Totalmente customizável, mas mais verboso |
| **Vite**    | Sim (Vite SSR APIs, Nuxt 3, SvelteKit) | Leve, mas ainda em amadurecimento         |
| **Rollup**  | Sim, para bibliotecas ou SSR manual    | Precisa configuração manual               |
| **esbuild** | Limitado (não foca em SSR)             | Precisa camada adicional                  |
| **Parcel**  | Suporte incipiente                     | Não é sua especialidade                   |

SSR exige controle do ambiente (Node/browser), suporte a módulos comuns, e capacidade de gerar bundles distintos para client e server. **Vite e Webpack** são os mais usados nesse cenário.