# Part 7: Arquitetura de Estado em React e Next.js

---

## 1. Quando usar `useState`, `useReducer`, Context ou Zustand?

**Resumo objetivo:**

* `useState`: estado local e simples, acoplado a um componente.
* `useReducer`: múltiplos campos correlacionados ou lógica de transição mais complexa.
* Context: leitura global ou configurações que raramente mudam (tema, idioma).
* Zustand: dados globais reativos com leitura e escrita desacopladas.

---

## 2. Quais problemas aparecem ao usar Context API como store reativa?


Toda vez que você muda o `value` de um Context, **todos os consumidores re-renderizam**. Mesmo que apenas uma pequena parte do estado tenha mudado.

**Solução:** use `use-context-selector` ou Zustand para evitar re-renderizações em cascata.

---

## 3. Quais critérios usar para escolher Redux Toolkit vs Zustand em projetos grandes?

**Resumo comparativo:**

| Critério    | Zustand           | Redux Toolkit      |
| ----------- | ----------------- | ------------------ |
| Verbosidade | Baixa             | Média              |
| Devtools    | Sim               | Sim (nativamente)  |
| Middleware  | Manual (plugin)   | Integrado          |
| Tipagem     | Automática via TS | Requer boilerplate |
| Ecossistema | Mais leve         | Mais maduro        |

Se você precisa de controle sofisticado, persistência, middlewares e time grande → Redux. Para apps mais dinâmicos, responsivos e com menor overhead → Zustand.

---

## 4. Como manter o estado sincronizado entre Server e Client (SSR)?



* No lado servidor, obtenha os dados via `fetch`, `cookies`, etc.
* No lado cliente, reidrate o estado usando props iniciais.

**Exemplo com Zustand:**

```ts
const useStore = create((set) => ({ user: null, setUser: (u) => set({ user: u }) }));

export function Page({ user }) {
  const setUser = useStore((s) => s.setUser);
  useEffect(() => { setUser(user); }, []);
}
```

Esse padrão evita flashs de tela e garante consistência entre server/client.

---

## 5. Como evitar "prop drilling" profundo sem overengineering?



* Até 2 níveis de props pode ser aceitável.
* Acima disso, considere extrair para contexto ou store externa (Zustand).
* Alternativas modernas: `useContextSelector`, `Recoil`, `Jotai` — permitem acesso seletivo ao estado global.

---

## 6. Como compartilhar estado entre tabs ou janelas?



* Use `localStorage` + `storage` event para sincronizar.
* Para casos mais reativos: `BroadcastChannel API` ou Zustand com plugin de sincronização.

Isso é útil para apps com login, carrinho, ou preferências que devem ser refletidas ao vivo entre abas.

---

## 7. Como evitar que um estado global vaze entre usuários no SSR?



* Nunca crie stores fora de escopos de função. Elas devem ser criadas dentro de cada request (ex: `getServerSideProps`).
* Evite variáveis globais fora do handler.
* Se usar Zustand/Redux, crie uma nova instância da store por request, não uma singleton.

---

## 8. Qual o papel de ferramentas como React Query ou SWR na arquitetura de estado?


Elas não são "state managers" tradicionais. Gerenciam **estado remoto** (fetch, cache, revalidação).

**React Query, SWR, TanStack Query:** evitam que você tenha que controlar loading, error e cache manualmente.

Podem conviver com Zustand/Redux (estado de UI ou local).

---

## 9. Como isolar lógica de estado de componentes em React?


Crie custom hooks (`useCounter`, `useAuth`, etc.) para encapsular a lógica e expor apenas a interface pública.

**Vantagens:**

* Facilita testes unitários.
* Melhora reuso e manutenção.
* Reduz acoplamento entre UI e lógica.

---

## 10. Como testar stores e hooks que usam estado global?



* Para Zustand, basta importar o store e testar a lógica diretamente.
* Para Redux, use `configureStore` e `Provider` nos testes.
* Em ambos os casos, **resete o estado após cada teste** para evitar vazamento de dados.