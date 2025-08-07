### 1. **Como implementar estratégias de rollback seguras em changeSets complexos?**

Para changeSets complexos, uso o atributo `<rollback>` dentro do próprio `changeSet`, especificando **comandos reversíveis explícitos**. Evito confiar em rollback automático, pois ele só funciona para alguns tipos de alterações (como `createTable`).

Além disso, aplico práticas como:

* Testes de rollback em ambiente de staging
* Scripts de rollback versionados manualmente
* Uso de feature toggles ou toggles temporários quando os rollbacks não são triviais

Essa abordagem garante controle total sobre reversões e minimiza risco em produção.

---

### 2. **Como o Liquibase lida com alterações conflitantes quando múltiplas branches fazem alterações no mesmo schema?**

Liquibase não tem controle nativo de merge de branches. Ele depende da **ordem dos changeSets** e de sua unicidade (`id`, `author`, `filename`). Se duas branches criam changeSets com o mesmo `id` e `author`, ocorrerá um erro de checksum ou conflito.

Para evitar isso:

* Defino uma **convenção de nomenclatura** por time ou funcionalidade
* Integro validação no pipeline (`liquibase validate`)
* Faço merge dos changelogs com revisão manual
* Em branches long-lived, rebaso frequentemente para alinhar changeSets

---

### 3. **O que é `validCheckSum`, e em quais situações ele é necessário?**

`validCheckSum` permite que você **aceite um novo hash** para um changeSet que teve seu conteúdo alterado, sem alterar o `id` ou `author`.

Uso quando:

* Corrijo um erro ortográfico ou comentário
* Ajusto espaçamento/brancos
* Faço uma mudança que não impacta a lógica do changeSet já aplicado

Assim, evito que o Liquibase acuse erro de integridade, validando explicitamente que a nova versão é aceitável.

Exemplo:

```xml
<validCheckSum>7:abc123</validCheckSum>
```

---

### 4. **Como usar Liquibase com versionamento de banco de dados em ambientes com deploy contínuo?**

Para deploy contínuo com Liquibase, integro o `updateSQL` e `update` nos pipelines (GitHub Actions, Jenkins, etc). Algumas boas práticas que sigo:

* Cada PR gera seu próprio changeSet com `id` único
* Os changeSets são validados com `liquibase validate`
* O pipeline executa `updateSQL` para revisar os comandos antes do `update`
* As execuções são rastreadas com `DATABASECHANGELOG`

Isso mantém o banco versionado junto ao código, com rastreabilidade total e compatível com automação.

---

### 5. **Como prevenir falhas de execução de changeSets em múltiplos nós ou instâncias concorrentes?**

Liquibase utiliza um **lock de execução** por padrão via a tabela `DATABASECHANGELOGLOCK`. Quando um processo inicia, ele adquire o lock e impede que outras instâncias apliquem mudanças simultaneamente.

Para garantir isso:

* Confirmo que todas instâncias compartilham o mesmo banco
* Configuro o Liquibase corretamente para verificar locks (`--shouldRun=true`)
* Evito execuções paralelas não orquestradas (ex: scripts manuais simultâneos)

Essa abordagem evita race conditions e corrupção do schema.

---

### 6. **Quais são os riscos de usar `runAlways="true"` e em que situações é apropriado?**

O principal risco é que o changeSet será **executado toda vez** que `update` for rodado, o que pode causar:

* Recriação de objetos
* Perda de dados
* Aumento no tempo de deploy

É apropriado apenas para:

* População de dados temporários
* Recriação de views que devem ser atualizadas a cada execução
* Ambientes de desenvolvimento com dados voláteis

Mas nunca uso `runAlways="true"` em alterações destrutivas ou em produção.

---

### 7. **Como o Liquibase pode ser integrado com ferramentas de CI/CD como Jenkins, GitHub Actions ou Azure DevOps?**

Crio pipelines com etapas específicas para Liquibase, como:

* Instalação do Liquibase CLI
* Execução de `liquibase validate` para garantir integridade
* Execução de `updateSQL` para revisão
* Execução de `update` com variáveis de ambiente ou secrets

Também uso:

* Plugins oficiais (ex: Liquibase Jenkins plugin)
* Containers Docker com Liquibase pré-instalado
* Variáveis seguras para credenciais de banco

Com isso, mantenho rastreabilidade, rollback seguro e deploy auditável.

---

### 8. **Como automatizar a geração de changelogs a partir de um banco de dados existente?**

Uso o comando:

```bash
liquibase generateChangeLog
```

Ele inspeciona o schema atual e gera um changelog completo. Isso é útil para:

* Migrar bancos legados para Liquibase
* Gerar baseline de um projeto já existente

Porém, **sempre reviso o resultado manualmente**, pois ele pode conter informações redundantes ou ordens subótimas.

Alternativamente, posso usar `diffChangeLog` para comparar dois bancos e gerar apenas o delta.

---

### 9. **O que são `customChange` e `customPrecondition` e quando você deveria implementá-los?**

São extensões do Liquibase que permitem criar lógica customizada em Java:

* `customChange`: define uma nova operação, ex: criar partições em múltiplas tabelas dinamicamente.
* `customPrecondition`: executa lógica antes de aplicar o changeSet, ex: verificar metadados ou status de replicação.

Uso quando o Liquibase não suporta nativamente o que preciso fazer, e **preciso de controle programático** sobre a execução. Mas são usados com cautela, pois aumentam a complexidade e requerem deploy do JAR.

---

### 10. **Como auditar e validar a consistência entre o schema real do banco e os changelogs aplicados?**

Uso o comando `liquibase diff` para comparar:

* O schema atual do banco
* O estado esperado baseado no changelog

Também posso usar `liquibase diffChangeLog` para gerar um changelog com as diferenças. Essa abordagem é essencial em ambientes com múltiplas fontes de alteração (ex: scripts manuais, ferramentas externas).

Além disso:

* Valido a integridade com `liquibase validate`
* Monitoro o `DATABASECHANGELOG` em produção para garantir que nenhum changeSet foi pulado
