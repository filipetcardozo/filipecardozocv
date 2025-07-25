# Part 16: Testing Library com React e Next.js

---

## 1. Qual é a filosofia da Testing Library?

"Test the way the user uses your app." Em vez de testar implementação (como classes CSS ou chamadas internas), a TL prioriza interação com elementos reais, como um usuário faria.

---

## 2. Qual a diferença entre `getBy`, `queryBy`, `findBy`?

* `getBy`: erro se o elemento **não existe**.
* `queryBy`: retorna `null` se não encontrado.
* `findBy`: é **assíncrono** (resolve uma `Promise`). úteis para loaders e efeitos.

---

## 3. Por que evitar `getByTestId` em excesso?

`data-testid` deve ser o último recurso. Prefira `getByRole`, `getByLabelText`, `getByText` — que refletem o uso real da UI.

---

## 4. Como testar interações (click, change, submit)?

Use `userEvent` da `@testing-library/user-event`:

```ts
userEvent.click(screen.getByRole('button'));
userEvent.type(screen.getByLabelText('Nome'), 'Filipe');
```

---

## 5. Como testar componentes com `useEffect` e chamadas assíncronas?

Espere o efeito com `findBy` ou `waitFor`:

```ts
await waitFor(() => expect(screen.getByText(/Carregado/)).toBeInTheDocument());
```

Evite `setTimeout`, pois é frágil.

---

## 6. Como testar renderização condicional?

Renderize com diferentes props ou contextos:

```ts
render(<Componente ativo={true} />);
expect(screen.getByText('Ativo')).toBeVisible();
```

---

## 7. Como mockar `fetch` ou `axios`?

* Use `jest.mock()` para bibliotecas.
* Para `fetch`, use `jest.fn()` ou bibliotecas como `msw`:

```ts
global.fetch = jest.fn(() => Promise.resolve(...)) as jest.Mock;
```

---

## 8. Como testar componentes que usam `next/router`?

Use mock:

```ts
jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
```

Ou crie um wrapper com contexto para testes mais completos.

---

## 9. Como testar componentes com Context API?

Crie um wrapper:

```ts
const renderWithContext = (ui) => render(<MeuProvider>{ui}</MeuProvider>);
```

Ideal para autenticação, tema, idioma.

---

## 10. Como testar rotas protegidas ou SSR no Next.js?

SSR: extraia função e teste isoladamente (unit test).
Para rotas protegidas: simule cookies, contexto ou redirecionamento via mock de `next/router` e `next-auth`.

---

## 11. Como lidar com erros como "act(...) warning"?

Sempre aguarde interações assíncronas. Use:

```ts
await act(async () => {
  userEvent.click(...);
});
```

Ou prefira `findBy`/`waitFor`, que já usam `act` por baixo.

---

## 12. Como testar componentes que usam `useForm` (React Hook Form)?

Renderize com `FormProvider`:

```ts
render(
  <FormProvider {...methods}>
    <MeuForm />
  </FormProvider>
);
```

Simule submissão com `userEvent.type` e `click` no botão.

---

## 13. Como testar componentes que usam `useSWR`, `React Query`, ou `useEffect` assíncrono?

Use `waitFor` para aguardar a renderização final.
Para `useSWR`/`useQuery`, mocke `fetch` ou configure um provider customizado com `cacheProvider` isolado.

---

## 14. Como garantir acessibilidade nos testes?

Use queries como `getByRole`, `getByLabelText`, `getByAltText`, etc.
Combine com `axe-core` ou `jest-axe` para validação automática de acessibilidade.

---

## 15. Como estruturar os testes para manutenção e legibilidade?

* Nomeie arquivos como `MeuComp.test.tsx`
* Use `describe` para agrupar.
* Prefira nomes que expressem comportamento, não implementação:

```ts
describe('Login', () => {
  it('exibe erro se senha estiver errada', () => { ... })
});
```