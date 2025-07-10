## 📁 3 - Bundlers na Prática: Casos Reais e Otimizações

---

### 1. **Como configurar lazy loading de componentes com Webpack ou Vite em uma SPA React?**

**React + Webpack/Vite** já suportam lazy loading via `React.lazy()` e `Suspense`.

```tsx
const SettingsPage = React.lazy(() => import('./SettingsPage'))

<Suspense fallback={<Loading />}>
  <SettingsPage />
</Suspense>
```

* Webpack cria um chunk separado automaticamente.
* Vite também, desde que o `import()` seja dinâmico.
* Opcionalmente, pode-se nomear chunks em Webpack:

  ```js
  () => import(/* webpackChunkName: "settings" */ './SettingsPage')
  ```

---

### 2. **Quais técnicas você utiliza para reduzir o bundle inicial em produção?**

* **Code splitting** por rota, componente ou feature.
* **Tree shaking** com `sideEffects: false` no `package.json`.
* **Lazy loading de bibliotecas pesadas** (ex: charts, editores).
* Usar **CDN para libs estáticas** (ex: React, Lodash via unpkg/skypack).
* **Evitar bundling de código morto** (importar funções específicas, não toda a lib).
* **Compressão com Brotli ou Gzip** no servidor.

---

### 3. **Como identificar e resolver problemas de duplicação de dependências no bundle?**

Ferramentas:

* **Webpack Bundle Analyzer**
* `vite-bundle-visualizer`
* `rollup-plugin-visualizer`

**Sinais comuns:**

* Múltiplas versões de `react`, `lodash`, etc.
* Bundles muito maiores que o esperado.

**Como resolver:**

* Declarar dependências como **singletons** (ex: no Module Federation).
* Usar **resolutions** no `package.json` para forçar versão única.
* Mover dependências para `peerDependencies` se forem compartilhadas.

---

### 4. **O que é "vendor chunk" e como separá-lo corretamente em builds?**

Vendor chunk é um bundle separado contendo **dependências de terceiros** (ex: React, lodash, axios).

**Por que separar:**

* Essas libs mudam menos que o app → permitem **cache mais durável**.

**Webpack:**

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      }
    }
  }
}
```

**Vite** faz isso automaticamente com base no `node_modules`.

---

### 5. **Como analisar e otimizar bundles usando ferramentas como Webpack Bundle Analyzer?**

**Webpack:**

```bash
npm install --save-dev webpack-bundle-analyzer
```

Adicione ao `plugins`:

```js
new BundleAnalyzerPlugin()
```

A ferramenta gera uma interface visual que mostra:

* Quais arquivos estão ocupando mais espaço.
* Quais dependências são duplicadas.
* Quais partes podem ser separadas.

**Vite:**

```bash
npm install --save-dev rollup-plugin-visualizer
```

Configure como plugin e abre um gráfico interativo por bundle.

---

### 6. **Qual o impacto de importar grandes bibliotecas de forma global e como mitigar isso?**

**Impactos:**

* Bundle enorme → aumento no tempo de carregamento.
* Dificuldade para aplicar tree shaking.
* Possível quebra do cache se qualquer linha do vendor mudar.

**Como mitigar:**

* Importar somente o que é necessário (ex: `import debounce from 'lodash/debounce'`).
* Usar bibliotecas **modulares ou ESM-ready**.
* Carregar libs pesadas dinamicamente (ex: editores ricos, charts).

---

### 7. **Como configurar fallback para assets (ex: fontes, imagens) em ambientes offline?**

**Abordagens:**

* Usar **Service Workers** (via Workbox, Next PWA, etc).
* Cache controlado de assets estáticos.
* Fallback programado em CSS/JS:

  ```css
  font-family: 'CustomFont', 'Arial', sans-serif;
  ```
* Verificação JS para carregar alternativa:

  ```js
  const img = new Image()
  img.onerror = () => loadFallbackImage()
  ```

**Vite e Webpack** permitem customizar onde e como assets são copiados no build, o que ajuda no controle de cache e fallback.

---

### 8. **Como empacotar múltiplas entradas (multi-entry) para microfrontends ou projetos multi-páginas?**

**Webpack:**

```js
entry: {
  dashboard: './src/dashboard/index.js',
  auth: './src/auth/index.js'
},
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist')
}
```

**Vite (experimental):**

```js
build: {
  rollupOptions: {
    input: {
      main: 'index.html',
      admin: 'admin.html'
    }
  }
}
```

**Em microfrontends**, cada entrada pode ser um bundle remoto consumido por Module Federation, import() dinâmico ou SystemJS.

---

### 9. **Como garantir compatibilidade com browsers legados ao empacotar com esbuild ou Vite?**

* **esbuild** transpila apenas ES6+, então para suporte real a ES5 é preciso pós-processar com Babel.
* **Vite** usa esbuild por padrão, mas pode ser estendido com `vite-plugin-legacy`.

```ts
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [legacy({ targets: ['defaults', 'ie >= 11'] })]
}
```

Adicionalmente:

* Use polyfills controlados (ex: core-js, polyfill.io).
* Evite syntax moderna (optional chaining, nullish coalescing) se não suportada.

---

### 10. **Como lidar com falhas silenciosas de build (ex: erros de tree shaking ou minificação)?**

**Detectar:**

* Ativar logs detalhados.
* Analisar bundle com ferramentas visuais.
* Habilitar `warnings: true` no config do bundler.

**Soluções:**

* Garantir que bibliotecas sejam ESM (`"module"` no `package.json`).
* Usar `sideEffects: false` em bibliotecas próprias.
* Evitar `eval`, funções dinâmicas, ou chamadas que impedem minificação segura.
* Substituir minificadores (ex: trocar Terser por ESBuildMinifyPlugin se necessário).