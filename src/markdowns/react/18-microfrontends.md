### ✅ 1. **O que são Microfrontends e em que cenários eles fazem sentido?**

“Microfrontends levam a filosofia de microserviços para a camada de UI. Em vez de um grande front-end monolítico, quebramos a interface em ‘pedaços’ autônomos — cada um com código, deploy e time próprios.
Eles fazem sentido quando a aplicação é grande e várias squads precisam entregar features de ponta a ponta sem depender de um repositório único ou releases sincronizados. É especialmente útil quando equipes querem evoluir stacks diferentes (ex.: React + Vite numa parte, Angular em outra) ou quando o domínio de negócio é muito amplo.”

---

### ✅ 2. **Quais abordagens você conhece para implementar Microfrontends? Já aplicou alguma?**

“As três mais comuns:

1. **Iframes** – isolamento total, mas integração limitada.
2. **Build-time composition** – como `Module Federation` no Webpack, onde o host resolve módulos remotos durante o build.
3. **Runtime composition** – carregar MFEs via `import()` dinâmico, SystemJS ou Web Components.

No meu último projeto, usamos **Webpack Module Federation** com CI/CD independente. Cada time publicava um bundle em um S3, e o contêiner consumia as URLs em tempo de execução. O ganho de autonomia foi enorme.”

---

### ✅ 3. **Quais os principais desafios ao trabalhar com Microfrontends? Como você lidou com eles?**

“Minhas maiores dores foram:

* **Consistência visual**: resolvemos criando um Design System compartilhado publicado no npm, versionado semântico.
* **Comunicação entre MFEs**: optamos por um `event bus` simples via `window.dispatchEvent` + tipos TypeScript para contratos.
* **Tamanho do bundle inicial**: atacamos com `lazy loading`, `preload` seletivo e smart caching.
* **Dependências duplicadas**: configuramos React, React-DOM e o Design System como singletons no Module Federation.”

---

### ✅ 4. **Como funciona o isolamento entre Microfrontends? Há riscos de conflitos?**

“O isolamento não é automático; precisamos disciplina. Usamos:

* **CSS Modules + BEM** para evitar vazamento de estilos.
* **Shadow DOM** em partes superisoladas (ex.: widgets de terceiros).
* **Singletons** das libs core no `Module Federation` para não carregar várias versões de React.
* Nomenclatura única em `CustomEvents` para que um MFE não capture evento do outro por engano.”

---

### ✅ 5. **Quais são os trade-offs ao adotar Microfrontends? Recomendaria em qualquer projeto?**

“Não. Eles trazem **overhead de build, orquestração e comunicação**. Se o produto é menor ou feito por um único time, a complexidade não compensa.
Eu recomendo quando:

* Múltiplas squads precisam escalar de forma independente.
* Há necessidade de tecnologia heterogênea.
* O domínio exige releases frequentes isolados.

Caso contrário, um monorepo modular ou uma SPA bem arquitetada resolve.”

---

### ✅ 6. **Como você gerencia versões e contratos entre MFEs para evitar breaking changes?**

“Estabelecemos **versionamento semântico estrito**. Cada MFE publica um pacote (ou bundle remoto) com `major.minor.patch`.
Quebra de contrato = major bump. No host, travamos a versão major, mas permitimos `~minor` updates automáticos.
Também usamos **tests de contrato** (Consumer-Driven Contracts) em CI, garantindo que mudanças num MFE não quebrem outro silenciosamente.”

---

### ✅ 7. **Como lidar com autenticação e autorização em uma arquitetura de Microfrontends?**

“Centralizamos o token de autenticação em um `Auth MFE singleton`. Ele expõe um SDK leve que os outros MFEs consomem.
Esse SDK fornece métodos como `getToken()`, `onAuthChange()`. Assim evitamos múltiplos redirects ou estados divergentes de login.
No lado visual, mantemos a seção de conta (avatar, logout) também como um MFE compartilhado no topo da página.”

---

### ✅ 8. **Qual é o papel de um ‘gateway’ ou ‘orchestrator’ em Microfrontends? Já implementou?**

“O ‘orchestrator’ (ou shell/contêiner) é responsável por:

* Carregar os MFEs (via script ou import).
* Gerenciar *routing* entre eles.
* Compartilhar dependências e contexto global (tema, i18n, auth).

Já implementei usando **Single SPA**: cada MFE registra seu aplicativo, e o contêiner decide qual exibir com base na rota. Em outro projeto, fizemos um contêiner caseiro com React Router + `import()` dinâmico.”

---

### ✅ 9. **Como você garante performance (LCP, TTI) em páginas compostas por vários MFEs?**

“Minhas práticas principais:

1. **Critical rendering path**: só carrego MFEs visíveis na *viewport*.
2. **Pré-fetch** de MFEs abaixo da dobra usando `link rel="prefetch"`.
3. **Shared chunk caching** – React e Design System vêm de um CDN em cache fortemente versionado.
4. Monitoramos Web Vitals por MFE, não só globalmente, para achar gargalos.”

---

### ✅ 10. **Já enfrentou migração de monolito para Microfrontends? Como faria um plano de transição?**

“Sim. O roteiro que sigo:

1. **Estrangular**: identificar fronteiras naturais (ex.: módulo de pagamentos) e extrair como primeiro MFE.
2. **Configurar contêiner** com routing e sharing de dependências.
3. **Rodar side-by-side**: partes novas em MFE, o resto ainda no monolito.
4. **Medir e ajustar** performance, DX, CI/CD.
5. **Iterar até ‘fatiar’ todo o monolito**.

O segredo é não tentar re-escrever tudo; é evolutivo, sempre mantendo o negócio rodando.”