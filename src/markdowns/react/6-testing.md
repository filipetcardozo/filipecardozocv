# Part 6: Testing em React e Next.js

---

## 1. Quais tipos de testes aplicamos em apps React?



1. **Unitário:** testa funções isoladas (ex: reducers, utils).
2. **Integração:** testa componentes com subcomponentes e interações.
3. **E2E (end-to-end):** testa o fluxo real do usuário em navegador (com Playwright, Cypress).

---

## 2. Qual a melhor biblioteca para testes unitários de componentes React?



* **React Testing Library (RTL):** foca no comportamento, não na implementação.
* Usa queries como `getByText`, `getByRole` — imita a forma como o usuário interage.

Evite testar detalhes de implementação, como classes CSS ou estruturas internas.

---

## 3. Como testar hooks customizados?


Use o `@testing-library/react-hooks` ou `renderHook` da RTL para executar o hook isoladamente:

```ts
const { result } = renderHook(() => useCounter());
expect(result.current.count).toBe(0);
```

Evite acoplar a testes de componentes se o hook for puramente lógico.

---

## 4. Como simular requisições HTTP em testes?


Use mocks:

* `jest.fn()` para funções locais.
* `msw` (Mock Service Worker) para simular APIs reais de forma declarativa.

**Exemplo com `msw`:**

```ts
rest.get('/api/user', (req, res, ctx) => res(ctx.json({ name: 'Filipe' })))
```

Permite testes mais realistas sem acesso à internet.

---

## 5. Como testar componentes Next.js com `getServerSideProps` ou `getStaticProps`?



* Extraia a lógica de dados para funções puras.
* Teste essas funções separadamente.
* Para E2E, use Playwright simulando um ambiente com SSR real.

Evite tentar testar diretamente `getServerSideProps` como se fosse uma função React.

---

## 6. Como lidar com contextos (Theme, Auth) nos testes?


Crie um `wrapper` de contexto para ser usado nos testes:

```ts
const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
render(<Dashboard />, { wrapper });
```

Assim, você consegue testar qualquer componente que dependa de contexto.

---

## 7. Como testar interações (cliques, inputs, etc)?


Use `fireEvent` ou `userEvent` da RTL:

```ts
fireEvent.click(screen.getByText('Salvar'))
expect(screen.getByText('Sucesso')).toBeInTheDocument()
```

**Dica:** use `findBy*` para elementos assíncronos (após fetchs).

---

## 8. O que é um teste frágil e como evitá-lo?


Teste frágil é aquele que quebra com pequenas mudanças não funcionais.

**Evite:**

* `getByTestId` como regra geral.
* Testar estrutura interna ou estilos.
* Depender de tempos fixos (ex: `setTimeout` com `wait`).

Prefira queries acessíveis e foco em comportamento.

---

## 9. Qual a diferença entre testes unitários e E2E?



* **Unitário:** roda rápido, barato, cobre lógica isolada.
* **E2E:** testa o sistema como um todo, com navegadores reais, mas são mais lentos e sensíveis.

**Exemplo:** login com falha:

* Unitário: `authReducer`
* E2E: usuário digita credenciais, clica, e vê erro

---

## 10. Como configurar testes com Jest no Next.js?



1. Instale:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

2. Crie `jest.config.js` e `setupTests.js`.

3. Configure aliases e mocks no Jest (ex: `next/router`, `next/image`).

Use presets como `next/jest` se estiver usando Next.js 13+.