### 1. **O que são e para que servem os `preConditions` em um `changeSet`?**

`preConditions` são verificações feitas **antes da execução de um changeSet ou changelog**, que determinam se a alteração deve ou não ser aplicada. Elas são usadas para **evitar falhas ou duplicações**, garantindo que certas condições estejam satisfeitas.

Exemplos de uso:

* Verificar se uma tabela existe (`tableExists`)
* Validar a versão do banco
* Conferir o valor de uma coluna

Se a condição falhar, o Liquibase pode ser configurado para **parar a execução**, apenas avisar, ou continuar.

---

### 2. **Como o Liquibase pode ser usado com diferentes perfis/ambientes (dev, stage, prod)?**

O Liquibase suporta dois mecanismos para lidar com múltiplos ambientes:

* **Contexts:** permitem marcar changeSets com tags como `context="dev"` ou `context="prod"`. Na execução, você especifica qual contexto deseja aplicar (`--contexts=prod`).
* **Profiles com arquivos de propriedades:** você pode ter arquivos como `liquibase-dev.properties` ou `liquibase-prod.properties`, apontando para diferentes bancos e com configurações específicas por ambiente.

Isso evita aplicar mudanças sensíveis no ambiente errado.

---

### 3. **Qual a diferença entre `update`, `updateCount` e `updateToTag`?**

* `update`: aplica **todos os changeSets pendentes** do changelog.
* `updateCount`: aplica apenas os **N primeiros changeSets pendentes** (`--count=3` aplica os três primeiros).
* `updateToTag`: aplica até alcançar o changeSet marcado com uma **tag específica**, útil para deploys controlados.

Esses comandos ajudam no controle progressivo de alterações, principalmente em pipelines ou cenários de rollback.

---

### 4. **O que são as `labels` no Liquibase e como elas podem ser usadas?**

`labels` são **tags flexíveis** associadas a changeSets que permitem filtrá-los dinamicamente em tempo de execução. Por exemplo:

```xml
<changeSet id="123" author="filipe" labels="financeiro,critico">
```

Ao rodar:

```bash
liquibase update --labels=financeiro
```

Somente changeSets com esse label são aplicados. É útil para **categorizar mudanças por equipe, módulo ou criticidade**, de forma mais granular que os `contexts`.

---

### 5. **Explique o uso do atributo `runOnChange` em um `changeSet`.**

`runOnChange="true"` indica que o Liquibase deve **reexecutar o changeSet se seu conteúdo for alterado** (mesmo que o `id` e `author` sejam os mesmos).

Sem esse atributo, qualquer mudança no conteúdo causaria um **erro de checksum mismatch**.

É útil, por exemplo, em scripts de views ou stored procedures, onde a alteração é relevante mesmo sem mudar a identidade do changeSet.

---

### 6. **O que acontece se o `author` ou o `id` de um `changeSet` forem alterados?**

O Liquibase usa `id + author + filename` como chave para identificar um changeSet. Se você **mudar o `id` ou o `author`**, o Liquibase **vai considerar que é um novo changeSet** e tentará aplicá-lo novamente, mesmo que o conteúdo seja o mesmo.

Isso pode causar erros de duplicação (ex: "tabela já existe"). Por isso, esses campos devem ser **imutáveis após o deploy**.

---

### 7. **Como é possível gerar um script SQL de atualização sem aplicar as alterações diretamente?**

Você pode usar o comando:

```bash
liquibase updateSQL
```

Ele gera um **script SQL com os comandos que seriam aplicados** (como `CREATE TABLE`, `ALTER COLUMN`), sem de fato alterar o banco. Isso é útil para revisões manuais, auditorias ou aplicação por DBAs.

Também é possível redirecionar para um arquivo:

```bash
liquibase updateSQL > script.sql
```

---

### 8. **Como você organiza múltiplos arquivos de changelog em projetos maiores?**

Uso um `master changelog` que **importa outros arquivos** por módulo ou por sprint, usando `include` ou `includeAll`. Exemplo:

```xml
<databaseChangeLog>
  <include file="users/changelog.xml"/>
  <include file="orders/changelog.xml"/>
</databaseChangeLog>
```

Isso traz modularidade e facilita manutenção. Também separo por ambiente ou tipo de alteração (`DDL`, `DML`, etc).

---

### 9. **É possível parametrizar um changelog? Como isso é feito?**

Sim, usando **placeholders** como `${nomeTabela}` e passando os valores via CLI ou `liquibase.properties`. Exemplo:

```xml
<createTable tableName="${nomeTabela}">
```

E no `liquibase.properties`:

```properties
nomeTabela=usuarios
```

Também é possível passar via linha de comando:

```bash
liquibase --nomeTabela=usuarios update
```

Isso torna o changelog reutilizável em diferentes cenários.

---

### 10. **O que são `contexts` no Liquibase e como eles diferem de `labels`?**

`contexts` são usados para **filtrar changeSets por ambiente** de forma mais rígida. Ex: `context="dev"`, `context="prod"`.

Já `labels` são **mais flexíveis**, permitindo múltiplas categorias por changeSet e uso em cenários mais amplos (módulo, time, tipo de alteração).

Enquanto `contexts` são mais focados em **controle de ambiente**, `labels` são voltados à **classificação lógica** e múltiplos eixos de segmentação.
