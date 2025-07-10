### 1. **O que é um empacotador (bundler) e qual problema ele resolve em aplicações modernas?**

Um **empacotador** (ou *bundler*) é uma ferramenta que **pega o código-fonte de uma aplicação (JS, CSS, imagens, etc.) e transforma em um ou mais arquivos otimizados** — chamados *bundles* — prontos para serem executados no navegador.

#### Problema resolvido:

* Em aplicações modernas, o código é modular e espalhado em múltiplos arquivos.
* Browsers não entendem nativamente `import`/`require` de módulos fora do ESModules.
* Bundlers resolvem essas dependências, transformam o código (ex: transpilar TypeScript) e consolidam tudo em arquivos otimizados para **performance, cache e compatibilidade**.

---

### 2. **Quais são as principais diferenças entre bundlers e task runners (como Gulp ou Grunt)?**

| Aspecto        | **Bundlers**                           | **Task Runners (Gulp/Grunt)**         |
| -------------- | -------------------------------------- | ------------------------------------- |
| Foco principal | Empacotar e transformar módulos        | Executar tarefas genéricas            |
| Modelo         | Orientado a módulos e dependências     | Orientado a fluxo de tarefas          |
| Exemplo de uso | Resolver imports, criar bundle JS      | Minificar CSS, mover arquivos, copiar |
| Estado atual   | Padrão para SPAs e frameworks modernos | Menos usado para apps modernas        |

**Resumo:** bundlers são centrados em código modular e build de aplicações; task runners são scripts de automação genéricos.

---

### 3. **Como funciona a construção do grafo de dependências em um bundler como o Webpack?**

O Webpack começa por um arquivo de entrada (ex: `index.js`) e **analisa todos os `import` ou `require`** presentes. Para cada módulo importado, ele repete o processo de forma recursiva.

O resultado é um **grafo direcionado acíclico (DAG)** onde:

* Cada nó é um módulo.
* Cada aresta é uma dependência entre módulos.
* O grafo é percorrido para gerar um único ou múltiplos bundles com a ordem correta de execução.

Isso garante que o código seja empacotado com **todas as dependências resolvidas, na ordem certa e sem duplicação desnecessária.**

---

### 4. **O que significa "code splitting" e como ele impacta a performance?**

**Code splitting** é a prática de dividir o código em múltiplos bundles menores em vez de gerar um único arquivo grande.

#### Impacto:

* **Reduz o tempo de carregamento inicial**, pois apenas o código necessário para a rota atual é carregado.
* Permite **lazy loading** de partes da aplicação, melhorando o TTI (Time to Interactive).
* Ajuda no **cache de longo prazo** (código raro muda pouco, então o navegador reutiliza).

Exemplo com React + Webpack: usar `React.lazy()` ou `import()` dinâmico para carregar componentes sob demanda.

---

### 5. **Como o processo de *tree shaking* elimina código morto durante o build?**

**Tree shaking** é uma técnica que remove código não utilizado (dead code) de módulos JavaScript.

Funciona da seguinte forma:

* Requer que o código use **ESModules (`import/export`)**, que são estáticos e analisáveis em tempo de build.
* O bundler analisa **quais exports são realmente usados** no grafo de dependência.
* Os que não são usados são **removidos** do bundle final.

Essa técnica **reduz o tamanho do bundle** e **evita que bibliotecas grandes importem funcionalidades não utilizadas.**

---

### 6. **Qual a diferença entre módulos CommonJS, ESModules e UMD no contexto de empacotamento?**

| Padrão        | Característica                 | Suporte                                                                                      |
| ------------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| **CommonJS**  | `require()` / `module.exports` | Node.js, Webpack                                                                             |
| **ESModules** | `import` / `export`            | Padrão moderno do ECMAScript, suportado nativamente em browsers modernos e bundlers modernos |
| **UMD**       | Universal Module Definition    | Compatível com Node, AMD e script global (fallback)                                          |

#### Contexto de empacotamento:

* Bundlers preferem ESModules para tree shaking.
* CommonJS não permite análise estática completa (limita otimizações).
* UMD é útil para bibliotecas distribuídas em múltiplos ambientes (ex: browsers antigos).

---

### 7. **O que é "bundle size" e por que ele afeta a experiência do usuário?**

**Bundle size** é o tamanho final (em KB/MB) dos arquivos JS/CSS enviados ao navegador.

#### Por que importa:

* Quanto maior o bundle, **mais lento é o carregamento** (especialmente em redes móveis).
* Aumenta o tempo de parsing e execução no navegador (custo de CPU).
* Impacta métricas como **LCP (Largest Contentful Paint)** e **TTI (Time to Interactive)** — cruciais para SEO e UX.

**Ideal:** bundles pequenos, divididos e cacheáveis.

---

### 8. **Como um bundler lida com assets não-JS (CSS, imagens, SVGs)?**

Via **loaders (Webpack)** ou **plugins (Vite, Rollup)** que transformam arquivos não-JS em algo que pode ser referenciado em JS.

* **CSS:** pode ser transformado em strings JS, extraído para arquivos separados ou convertido em módulos CSS.
* **Imagens/SVGs:** podem ser injetados como base64 (inlining) ou copiados para o `dist` com links relativos.
* Bundlers modernos permitem configurar **limites de tamanho**, hash para cache busting e compressão automática.

---

### 9. **O que são source maps e como eles impactam debug e performance?**

**Source maps** são arquivos que mapeiam o código transformado/minificado de volta para o código-fonte original.

* Permitem **debug em produção com stack traces legíveis**.
* Ferramentas de desenvolvimento (Chrome DevTools) usam source maps para mostrar o código original mesmo após transpilar ou minificar.

**Cuidado:**

* Ativá-los em produção pode vazar estrutura de código.
* Também aumentam o tempo de build e o tamanho do bundle.

---

### 10. **Qual o papel de *loaders* e *plugins* na arquitetura do Webpack?**

#### **Loaders:**

Transformam **tipos de arquivos** (ex: `.ts`, `.scss`, `.svg`) em módulos JS que o Webpack pode entender.

Exemplos:

* `babel-loader` → transpila JS moderno.
* `ts-loader` → compila TypeScript.
* `css-loader` + `style-loader` → lida com CSS.

#### **Plugins:**

Estendem o Webpack com **funcionalidades mais amplas**, como:

* Gerar HTML (`HtmlWebpackPlugin`)
* Limpar diretórios (`CleanWebpackPlugin`)
* Minificar (`TerserPlugin`)
* Extração de CSS (`MiniCssExtractPlugin`)

Plugins atuam no **ciclo de vida do Webpack**, não apenas em arquivos individuais.