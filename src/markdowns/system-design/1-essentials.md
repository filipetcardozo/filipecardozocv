### 1. **O que é System Design e por que é importante em projetos de software escaláveis?**

**System Design** é o processo de definir a arquitetura, componentes, dados e infraestrutura de um sistema para atender a requisitos funcionais e não funcionais.
É importante porque:

* Garante **escalabilidade** e **resiliência**
* Minimiza **gargalos de performance**
* Favorece **evolução do sistema** sem reescrita completa
* Reduz o **acoplamento entre times e serviços**

---

### 2. **Qual a diferença entre escalabilidade horizontal e vertical? Dê exemplos.**

* **Escalabilidade horizontal**: adicionar mais máquinas para dividir a carga.
  Ex: adicionar instâncias de backend em um load balancer.

* **Escalabilidade vertical**: aumentar os recursos de uma máquina (CPU, RAM).
  Ex: trocar um servidor de 4 cores por um de 32 cores.

> Horizontal é preferida em sistemas modernos por permitir crescimento infinito e tolerância a falhas.

---

### 3. **Como funciona o modelo cliente-servidor em aplicações web modernas?**

* O **cliente** (browser, app) envia requisições HTTP para o **servidor** (backend).
* O servidor processa, acessa banco de dados se necessário, e retorna uma **resposta**.
* Stateless: cada requisição é independente (no REST, por exemplo).

Hoje, há também **CDNs, gateways, caches e balanceadores** nesse fluxo.

---

### 4. **O que é um Load Balancer e qual o seu papel em uma arquitetura distribuída?**

Um **Load Balancer** distribui o tráfego entre múltiplas instâncias de um serviço, balanceando carga.

**Papéis:**

* Reduzir **sobrecarga de instâncias**
* Fornecer **failover automático**
* Melhorar **latência**
* Suportar **escalabilidade horizontal**

Exemplos: NGINX, AWS ELB, HAProxy.

---

### 5. **Explique o conceito de alta disponibilidade (HA). Como atingi-la?**

**Alta disponibilidade (HA)** significa que o sistema continua acessível mesmo em caso de falhas.

**Práticas para alcançá-la:**

* Redundância (múltiplas instâncias)
* Balanceamento de carga
* Failover automático
* Infraestrutura distribuída (multi-zone, multi-region)
* Health checks constantes

---

### 6. **Qual a diferença entre consistência forte e eventual em sistemas distribuídos?**

* **Consistência forte**: toda leitura reflete a última escrita em qualquer nó.
  Ex: sistemas bancários.

* **Consistência eventual**: os nós podem divergir temporariamente, mas convergem com o tempo.
  Ex: DNS, feeds sociais.

> Decidir entre elas envolve trade-offs entre performance e integridade.

---

### 7. **O que é cache e como ele pode ser usado para melhorar performance?**

**Cache** é um armazenamento temporário para evitar acessos repetidos ao backend ou ao disco.

**Usos:**

* Cache em CDN (assets estáticos)
* Cache no client (localStorage, SWR, Apollo)
* Cache em backend (Redis, Memcached)
* Cache por camada (app, DB, DNS)

**Benefícios:** menor latência, menos load em serviços downstream, resposta instantânea.

---

### 8. **Como escolher entre banco de dados relacional (SQL) e não-relacional (NoSQL)?**

* **SQL** (ex: PostgreSQL, MySQL):

  * Estrutura tabular e relacional
  * Forte consistência
  * Ideal para dados estruturados e relacionamentos complexos

* **NoSQL** (ex: MongoDB, DynamoDB):

  * Schema flexível
  * Alta escalabilidade horizontal
  * Ideal para dados semi-estruturados, alto throughput

> A escolha depende de **modelo de dados**, **volume** e **requisitos de consistência/escalabilidade**.

---

### 9. **O que é particionamento (sharding) e quando ele é necessário?**

**Sharding** é dividir dados grandes em **partes menores (shards)**, distribuídas entre servidores.

**Usado quando:**

* O volume de dados/demanda de acesso excede a capacidade de um único nó
* É necessário escalabilidade horizontal do banco

**Exemplo**: particionar usuários por ID hash entre múltiplos bancos.

---

### 10. **Quais são os principais gargalos de I/O em aplicações web e como mitigá-los?**

**Gargalos comuns:**

* Acesso ao banco de dados (latência alta)
* Requisições síncronas em série
* Transferência de arquivos grandes
* Escritas em disco
* Esperas por serviços externos (ex: APIs)

**Mitigações:**

* Cache
* Batch e paralelismo
* Async/Await com retry
* Streaming
* Compressão de payloads
* CDN para conteúdo estático