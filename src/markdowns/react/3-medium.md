### 1. Quais são as duas **regras dos React Hooks** e por que quebrá-las causa bugs?

1. **Chame hooks apenas em funções React** (componentes ou outros hooks).
2. **Chame-os sempre no topo da função**, jamais em loops, condições ou funções internas.

Essas regras garantem que a ordem dos hooks permaneça estável entre renders. Se ela variar, o React associará estados e efeitos aos índices errados, gerando leaks ou exceções. O plugin `eslint-plugin-react-hooks` faz análise estática justamente para bloquear esses erros em tempo de desenvolvimento. ([dev.to][1], [simplilearn.com][2])

---

### 2. Quando usar **`useNavigate`** (React Router v6) em vez de `<Link>` ou do antigo `useHistory`?

* `useNavigate()` devolve uma função `navigate()` que muda a rota programaticamente.
* Substitui `history.push()`/`history.replace()` do v5 e é ideal em fluxos imperativos (login, erro 403, salvamento de formulário).
* `<Link>` continua melhor para navegação declarativa em hyperlinks.
* Por ser hook, `useNavigate` só funciona dentro de componentes dentro de um `<Router>`; fora disso lança erro. ([geeksforgeeks.org][3], [geeksforgeeks.org][4])

---

### 3. Diferença entre **`useRef`**, **`createRef`**, **`forwardRef`** e **`useImperativeHandle`** — e um caso real para cada um

| API                   | Para que serve                                                        | Exemplo de uso                                                  |
|------------------------|------------------------------------------------------------------------|------------------------------------------------------------------|
| `useRef()`            | Referência mutável que **sobrevive a renders**; não provoca re-render. | Guardar id do `setTimeout`, focar um input.                     |
| `createRef()`         | Cria ref **nova a cada render**; é mais comum em classes.              | Componente de classe legado.                                    |
| `forwardRef()`        | “Túnel” para passar uma ref por um componente wrapper.                 | Biblioteca de UI que quer permitir foco num `<button>` interno. |
| `useImperativeHandle()` | Expõe **métodos controlados** quando alguém pega a ref.              | Date-picker que precisa oferecer `open()` / `close()`.          |

Isso evita vazamento de detalhes internos e mantém a tipagem sob controle. ([greatfrontend.com][5], [intervue.io][6])

---

### 4. Por que **Context API** pode gerar re-renders em cascata e como otimizar?

O valor de um contexto é comparado por **referência**: se ele muda, **todos** os consumidores renderizam de novo. Estratégias:

* **Memoizar** o valor com `useMemo` para só mudar quando necessário.
* **Dividir contextos** (theme, user, locale) em vez de um “contexto gigante”.
* Usar bibliotecas com **seletores** (Zustand, Jotai, `use-context-selector`) quando o estado é muito dinâmico. ([greatfrontend.com][7])

---

### 5. Quando escolher **`getStaticProps`**, **`getStaticPaths`** ou **`getServerSideProps`** no Next.js?

| Função               | Quando roda                               | Use quando…                                                               |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| `getStaticProps`     | **Build time**                            | Página pode ser pré-gerada — ex.: blog, landing page.                     |
| `getStaticPaths`     | **Build time** junto com `getStaticProps` | Você precisa de rotas dinâmicas geradas estaticamente (produto/`[slug]`). |
| `getServerSideProps` | **A cada request**                        | Dados mudam por usuário ou segundo (dashboard, paywall).                  |

Escolher errado afeta SEO, performance e custo de hospedagem. ([lambdatest.com][8])

---

### 6. Como funcionam **variáveis de ambiente** no Next.js e como evitar vazá-las para o cliente?

* Crie arquivos `.env.local`, `.env.production` etc.
* Só variáveis que começam com **`NEXT_PUBLIC_`** são injetadas no bundle do navegador; as demais permanecem no servidor.
* Assim você pode expor `NEXT_PUBLIC_API_BASE_URL` e manter `DB_PASSWORD` seguro. ([lambdatest.com][8])

---

### 7. Qual o papel de **code splitting automático** no Next.js e quando recorrer a **`next/dynamic`**?

* Por rota, o framework já gera bundles separados, reduzindo o JS inicial. ([geeksforgeeks.org][9])
* Para casos pontuais (editor WYSIWYG, gráfico pesado) use:

```ts
import dynamic from 'next/dynamic';
const RichEditor = dynamic(() => import('./RichEditor'), { ssr: false, loading: () => <Spinner/> });
```

Isso cria um chunk que só é carregado no cliente e, se definido `ssr:false`, evita renderizar no servidor. ([mentorcruise.com][10])

---

### 8. Como o **`next/image`** otimiza imagens?

* Gera formatos modernos (AVIF/WebP) on-the-fly.
* Ajusta tamanho conforme breakpoints e DPR.
* Faz lazy-loading automático.
  Configurações em `next.config.js` (`deviceSizes`, `domains`) permitem refinar compressão ou permitir CDN externo. ([geeksforgeeks.org][9])

---

### 9. O que é **Styled JSX** e por que ele ainda aparece em entrevistas?

É o motor CSS-in-JS **nativo** do Next.js; mantém escopo por componente (gera hashes de classe) sem configurar nada extra:

```jsx
<style jsx>{`
  button { background:#0070f3; }
`}</style>
```

É útil quando você quer isolamento rápido sem adotar Tailwind ou CSS Modules, e continua sendo citado porque demonstra entender o ecossistema base do framework. ([lambdatest.com][8])

---

### 10. Como evitar **race conditions em `useEffect`** quando o usuário digita rápido e dispara múltiplas buscas?

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(res => res.json())
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });

  return () => controller.abort(); // cancela requisição antiga
}, [query]);
```

* Cada alteração em `query` cancela a chamada anterior via **`AbortController`**.
* Evita que a resposta “lenta” sobrescreva o estado mais recente. ([medium.com][11], [greatfrontend.com][12])