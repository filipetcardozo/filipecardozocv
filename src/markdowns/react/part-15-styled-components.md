### ✅ 1. **Como funciona o isolamento de escopo de estilos em Styled Components?**

**Resposta (formato entrevista):**
“Styled Components gera automaticamente uma classe com um nome único e hash aleatório para cada componente estilizado. Isso garante que os estilos sejam escopados ao componente, evitando conflitos com outros componentes, mesmo que usem tags ou nomes semelhantes.
Na prática, isso me dá mais previsibilidade e evita o clássico problema de ‘vazamento de estilo’ — algo que é comum quando se trabalha com CSS global ou até mesmo com BEM em larga escala.”

---

### ✅ 2. **Quais são os benefícios práticos do uso de Styled Components em relação a CSS tradicional ou pré-processadores como SASS?**

**Resposta:**
“O principal benefício é o acoplamento entre estilo e comportamento. Com Styled Components, eu tenho o CSS junto da lógica de renderização, o que facilita a leitura e manutenção.
Além disso, os estilos são dinâmicos — posso usar props, acessar temas e até fazer *nesting* ou interpolar valores de JS.
Comparado ao SASS, não preciso me preocupar com escopo ou ordem de importação. E diferente do CSS global, tudo é modular e previsível. Também ganho vantagens com o autocompletion e tipagem de props no editor, o que melhora a produtividade.”

---

### ✅ 3. **Como funcionam as props nos styled components? Dê um exemplo.**

**Resposta:**
“Posso passar props diretamente para o styled component e usá-las para modificar dinamicamente o estilo.
Um exemplo simples seria:

```tsx
const Button = styled.button`
  background-color: ${(props) => (props.primary ? 'blue' : 'gray')};
`;
```

Essa abordagem permite criar componentes altamente reutilizáveis e personalizáveis, sem duplicar lógica. No contexto de um design system, por exemplo, isso é super valioso.”

---

### ✅ 4. **Como Styled Components lida com temas (themings)? Qual é o papel do `ThemeProvider`?**

**Resposta:**
“O `ThemeProvider` injeta um tema global via contexto React, permitindo que qualquer styled component acesse valores como cores, espaçamentos ou fontes por meio das props de tema.
Isso me permite centralizar decisões de design e manter consistência visual em todo o app.
No dia a dia, por exemplo, uso isso para alternar entre tema claro e escuro, ou para aplicar tokens de design definidos com o time de design.”

```tsx
<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

---

### ✅ 5. **Quais são os principais trade-offs ao usar Styled Components em um projeto grande?**

**Resposta:**
“Os benefícios são claros, mas há alguns pontos de atenção:

* **Performance:** como ele gera estilos em tempo de execução, isso pode impactar apps com muitos componentes ou renderizações frequentes.
* **Tamanho do bundle:** se usado sem otimização, pode crescer bastante — especialmente se não houver deduplicação.
* **Server-side rendering:** funciona, mas precisa de configuração extra para evitar flash of unstyled content (FOUC).
* **Debugging:** embora as ferramentas tenham evoluído, depurar estilos inline ainda pode ser menos direto que com CSS Modules ou Tailwind.

Dito isso, em projetos onde colaboração com design é intensa e o estilo depende muito de lógica de UI, acho Styled Components uma ótima escolha.”