### 1. **O que é Liquibase e para que ele é utilizado em projetos de banco de dados?**

Liquibase é uma ferramenta de **versionamento de banco de dados** usada para gerenciar alterações no schema de forma controlada, rastreável e automatizada. Ele é especialmente útil em projetos onde múltiplos desenvolvedores colaboram ou em ambientes com **deploy contínuo**, porque garante que todos os ambientes fiquem **sincronizados com as mesmas mudanças estruturais** no banco de dados — como criação de tabelas, adição de colunas, índices, constraints etc.

---

### 2. **O que é um changelog no Liquibase?**

Um `changelog` é o arquivo principal que contém a **lista de alterações** que devem ser aplicadas ao banco de dados. Ele serve como uma espécie de **histórico de versões** do schema. O `changelog` pode incluir um ou mais `changeSets`, cada um descrevendo uma operação única, como criar uma tabela ou alterar um índice. Além disso, changelogs podem ser **modulares**, importando outros arquivos.

---

### 3. **Quais formatos de arquivo podem ser usados para escrever changelogs?**

Liquibase suporta vários formatos de `changelog`, incluindo:

* **XML**
* **YAML**
* **JSON**
* **SQL**

O formato XML é o mais tradicional e amplamente documentado, mas YAML e JSON são mais legíveis para humanos. O formato SQL permite escrever comandos SQL diretamente, porém com menos controle semântico para rollback e metadados.

---

### 4. **O que é um changeSet e quais são seus principais atributos?**

Um `changeSet` é a **menor unidade de alteração** no Liquibase. Ele representa uma mudança atômica no schema e possui três atributos principais:

* `id`: Identificador único da alteração.
* `author`: Nome do autor, usado para diferenciar colaboradores.
* `changes`: A lista de operações (como `createTable`, `addColumn`, etc).

Outros atributos importantes incluem:

* `runOnChange`: reexecuta se o conteúdo mudar.
* `runAlways`: força execução toda vez.
* `preConditions`: verifica condições antes da execução.
* `context` e `labels`: filtram execução por ambiente ou propósito.

---

### 5. **Como o Liquibase garante que um changeSet não seja executado mais de uma vez?**

Liquibase registra cada `changeSet` executado na tabela **`DATABASECHANGELOG`**. Essa tabela armazena o `id`, `author`, `filename` e um **checksum** do conteúdo do changeSet. Na próxima execução, o Liquibase consulta essa tabela e **ignora qualquer changeSet que já tenha sido aplicado com o mesmo checksum**, garantindo **idempotência**.

---

### 6. **Qual a diferença entre os comandos `update` e `rollback`?**

* `update`: aplica todos os `changeSets` ainda **não executados** ao banco de dados, na ordem definida no `changelog`.
* `rollback`: desfaz alterações aplicadas, com base em um `rollback` definido no próprio `changeSet`, ou usando comandos como `rollbackCount`, `rollbackToDate` ou `rollbackToTag`.

O `rollback` exige que cada `changeSet` tenha uma instrução explícita de reversão, caso contrário o Liquibase não consegue desfazer a operação.

---

### 7. **O que é o arquivo `DATABASECHANGELOG`?**

É uma **tabela de controle criada automaticamente** pelo Liquibase no banco de dados. Ela registra todos os `changeSets` que foram executados com sucesso, incluindo:

* `id`, `author`, `filename`
* `dateExecuted`
* `checksum`
* `description` e `comments`

Essa tabela permite ao Liquibase saber o que já foi executado, ajudando a **evitar duplicação**, identificar divergências e garantir consistência entre execuções.

---

### 8. **Como você aplica as alterações definidas no changelog para o banco de dados?**

O comando mais comum é:

```bash
liquibase update
```

Esse comando conecta-se ao banco, lê o changelog, compara com a `DATABASECHANGELOG`, e executa apenas os `changeSets` que **ainda não foram aplicados**. Isso pode ser feito via CLI, integrado em pipelines, ou embutido no build (por exemplo, com Maven ou Gradle).

---

### 9. **O que acontece se você rodar `liquibase update` com um changeSet já aplicado?**

Por padrão, **nada acontece**. O Liquibase detecta na `DATABASECHANGELOG` que aquele `changeSet` já foi executado e com o mesmo checksum, e o ignora.

Se o conteúdo do `changeSet` mudar (sem alterar o `id` ou `author`), o checksum será diferente, e o Liquibase irá lançar um **erro de checksum mismatch**, a menos que `runOnChange="true"` esteja configurado ou você defina um novo `validCheckSum`.

---

### 10. **Como configurar o Liquibase para se conectar a um banco de dados?**

Existem várias formas. A mais comum é via CLI com um `liquibase.properties` contendo:

```properties
url=jdbc:postgresql://localhost:5432/meubanco
username=admin
password=senha
driver=org.postgresql.Driver
changeLogFile=changelog.xml
```

Também é possível passar os parâmetros via linha de comando ou variáveis de ambiente em pipelines. O driver JDBC precisa estar disponível no classpath para que a conexão funcione.

