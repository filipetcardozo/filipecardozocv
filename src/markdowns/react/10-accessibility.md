# Part 10: Acessibilidade (a11y) em React e Next.js

---

## 1. Por que acessibilidade é importante mesmo em apps internos?



* Inclusão: garante acesso a pessoas com deficiência visual, motora ou cognitiva.
* Legalidade: em muitos países, é exigência legal (ex: ADA nos EUA, LBI no Brasil).
* Qualidade de software: boas práticas de a11y melhoram usabilidade geral.
* ROI: reduz suporte, aumenta retenção de usuários e prepara para escalabilidade.

---

## 2. Como React contribui para acessibilidade por padrão?



* Usa `label` corretamente associado a `input` via `htmlFor`.
* Usa eventos normalizados (`onClick`, `onKeyDown`) com compatibilidade entre navegadores.
* Permite uso de atributos como `aria-*`, `role`, `tabIndex` de forma declarativa.

Porém, não garante acessibilidade sozinho. Cabe ao dev cuidar da semântica e fluxo.

---

## 3. O que é WAI-ARIA e quando devemos usar atributos `aria-*`?


WAI-ARIA é um conjunto de atributos para melhorar a acessibilidade quando HTML semântico não é suficiente.

**Exemplos:**

* `aria-hidden="true"` para esconder algo de leitores de tela.
* `aria-live="polite"` para anunciar mudanças dinâmicas.
* `aria-label`, `aria-describedby` para inputs e botões sem texto visível.

---

## 4. Como garantir que modais sejam acessíveis?



* O foco deve mover para o modal ao abrir e retornar ao trigger ao fechar.
* O modal deve ter `role="dialog"` e `aria-modal="true"`.
* Não deve ser focável por fora (trapping).
* Usar bibliotecas acessíveis como `@radix-ui/react-dialog` ou `react-aria`.

---

## 5. Como tornar botões e links acessíveis com apenas teclado?



* Use `<button>` e `<a>` reais (não divs clicáveis).
* Se usar `div`, adicione:

```tsx
role="button" tabIndex={0} onKeyDown={handleKey}
```

* Teste com `Tab` e `Enter/Espaço` para navegar e ativar.

---

## 6. Como testar acessibilidade de componentes React?

**Ferramentas práticas:**

* `axe-core` com `jest-axe` ou `@axe-core/react` para testes automatizados.
* `storybook-addon-a11y` para detectar problemas durante desenvolvimento.
* DevTools de navegadores com aba "Accessibility".
* Plugins como Lighthouse ou tota11y.

---

## 7. Qual a função do atributo `alt` em imagens? Quando omitir?



* `alt` descreve a imagem para leitores de tela.
* Imagens decorativas devem ter `alt=""` (vazio).
* Não usar `alt` é erro de acessibilidade.

No `next/image`, basta passar `alt` normalmente:

```tsx
<Image src="..." alt="Logo da empresa" />
```

---

## 8. Como lidar com cores e contraste?



* Use contraste mínimo de 4.5:1 entre texto e fundo.
* Ferramentas como WebAIM Contrast Checker ajudam.
* Nunca use cor como única forma de transmitir informação (ex: "erros em vermelho").

---

## 9. Como criar componentes reutilizáveis acessíveis (ex: Input, Button)?



* Use HTML semântico como base (`<button>`, `<label>`, `<input>`).
* Propague atributos como `aria-*`, `id`, `htmlFor`, `disabled` via props.
* Permita override de `role`, `tabIndex`, `aria-describedby`.
* Foque em acessibilidade desde a API do componente.

---

## 10. Como tornar Single Page Applications (SPA) mais acessíveis?



* Atualize `document.title` dinamicamente.
* Anuncie mudanças de rota com `aria-live`:

```tsx
<div role="region" aria-live="polite">{pageTitle}</div>
```

* Mova foco para o topo ou h1 após mudança de rota.

React Router e Next.js exigem cuidados extras porque não há reload completo.