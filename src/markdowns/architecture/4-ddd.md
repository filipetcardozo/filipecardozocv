# Part 4: Domain-Driven Design (DDD)

---

## 1. O que é DDD e por que importância?

**Resumo:**
Domain-Driven Design (DDD) propõe que a estrutura e a linguagem do código reflitam de forma fiel o domínio de negócio. Por meio de colaboração intensa com especialistas, constrói-se uma linguagem ubíqua que guia modelos ricos e coerentes. A prática ajuda a dividir sistemas complexos em contextos claros, mantendo o foco nas regras que trazem valor.

---

## 2. Conceitos essenciais

* **Bounded Context:** define limites explícitos onde um determinado modelo é válido, evitando termos ambíguos entre equipes diferentes.
* **Entidades e Value Objects:** permitem representar objetos do domínio com identidade e valores imutáveis, tornando a modelagem mais expressiva.
* **Aggregates:** agrupam entidades sob uma raiz única, garantindo invariantes e simplificando a persistência e a consistência de transações.

---

## 3. Relação do DDD com microserviços

Os conceitos de Bounded Context e Context Mapping ajudam a identificar fronteiras naturais do domínio, muitas vezes coincidindo com os limites de um microserviço. Ao alinhar código e negócio, cada serviço obtém coesão interna e comunicação bem definida com os demais, simplificando a evolução independente das equipes.

## 4. O que significa linguagem ubíqua?

Trata-se de um vocabulário comum e rigorosamente definido entre todos os envolvidos no projeto. Ele evita ambiguidades, garantindo que termos técnicos e de negócio tenham o mesmo significado para desenvolvedores e especialistas, fortalecendo a comunicação e a modelagem.

---

## 5. Qual o papel dos especialistas de domínio?

São os responsáveis por transmitir conhecimento profundo do negócio aos desenvolvedores. A participação ativa desses especialistas é essencial para validar modelos, esclarecer regras e garantir que o software reflita com precisão os processos e objetivos da empresa.

---

## 6. DDD estratégico vs tático

O lado estratégico define a visão geral do domínio e como os diferentes contextos se relacionam, guiando decisões de integração e limites. O tático, por sua vez, trata da implementação concreta usando padrões como Entities, Value Objects e Repositories, permitindo modelar as regras com riqueza de detalhes.

---

## 7. Como identificar agregados?

Procure entender quais entidades precisam manter invariantes sólidas e que são geralmente alteradas em uma mesma operação. Esses grupos formam um aggregate sob uma raiz que controla o acesso e garante a consistência transacional necessária.

---

## 8. Por que usar Domain Events?

Domain Events sinalizam que algo relevante aconteceu no domínio e permitem que outras partes da aplicação reajam sem criar dependências diretas. Eles servem para rastrear mudanças importantes e integrar diferentes contextos ou sistemas de forma assíncrona.

---

## 9. Quando aplicar arquitetura em camadas com DDD?

A arquitetura em camadas torna-se útil quando precisamos isolar responsabilidades: apresentação, aplicação, domínio e infraestrutura. Essa divisão melhora a manutenção e permite testar cada camada de forma independente, evitando que detalhes técnicos contaminem as regras de negócio.

---

## 10. Armadilhas comuns ao adotar DDD

Entre as principais armadilhas estão modelos que se tornam complexos demais sem necessidade, afastando o time de negócio. Outro risco é a comunicação insuficiente com especialistas, gerando uma linguagem ubíqua pobre e mal alinhada. Nesses casos, o esforço de aplicar DDD pode superar os ganhos esperados.

