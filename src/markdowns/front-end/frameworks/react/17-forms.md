### ✅ 1. **Qual biblioteca de formulários você costuma usar em projetos React? Por quê?**

“Tenho utilizado bastante o `react-hook-form`, principalmente pela performance e simplicidade. Ele é baseado em refs e evita re-renderizações desnecessárias, o que é ótimo em formulários grandes.
Já usei o `Formik` também, que oferece uma API declarativa mais próxima do React tradicional — e com integração natural com o `Yup` para validações. Escolho conforme o contexto: `react-hook-form` para performance, `Formik` se for necessário mais controle imperativo.”

---

### ✅ 2. **Como você lida com validação de formulários? Já integrou com bibliotecas como Yup ou Zod?**

“Sim, geralmente integro `Yup` ou `Zod` como schema resolver junto com o `react-hook-form`. Isso me dá uma forma escalável e reutilizável de definir regras, além de separar responsabilidades.
Gosto de criar schemas fora do componente, mantendo o JSX limpo e validando os dados antes mesmo do submit. Em formulários sensíveis (ex: cadastro de usuários ou checkout), essa validação centralizada faz muita diferença na manutenção e confiabilidade.”

---

### ✅ 3. **Como você trata erros e feedbacks visuais ao usuário em formulários?**

“Normalmente deixo os feedbacks bem visíveis e granulares. Com `react-hook-form`, uso o `formState.errors` para exibir mensagens específicas embaixo de cada campo.
Também trabalho com mensagens genéricas no topo quando necessário, como erro de autenticação ou campos faltando.
Além disso, adiciono estilos visuais como borda vermelha, foco automático e até scroll para o erro, para melhorar a UX — principalmente em dispositivos móveis.”

---

### ✅ 4. **Como você lida com formulários dinâmicos, onde os campos mudam com base em interações do usuário?**

“Já implementei formulários dinâmicos em contextos como onboarding ou criação de regras condicionais.
Com `react-hook-form`, uso `useWatch` para reagir a valores de outros campos e decidir o que renderizar. Também já usei arrays dinâmicos com `useFieldArray` para permitir múltiplos inputs de forma controlada.
O segredo é manter a lógica de exibição desacoplada da lógica de validação, para garantir consistência e previsibilidade.”

---

### ✅ 5. **Você já teve que integrar formulários com APIs externas? Como garante que os dados enviados estão corretos e seguros?**

“Sim, em diversos contextos — tanto para envio de dados quanto para preenchimento inicial (ex: editar perfil).
Valido os dados antes do envio com o schema (`Yup`, `Zod`) e geralmente adiciono uma camada de sanitização no backend também. Para segurança e robustez, incluo timeouts, tratativas de erro e loading states.
Gosto de exibir mensagens claras pós-submit, inclusive diferenciando erros de validação, rede e servidor.”