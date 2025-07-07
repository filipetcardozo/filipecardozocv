# Part 2: Event Driven Architecture

---

## 1. O que é Event Driven Architecture (EDA)?

**Definição resumida:**
Event Driven Architecture (EDA) é um estilo que estrutura a comunicação por meio de eventos publicados e assinados por diferentes componentes. Cada serviço emite eventos representando fatos já ocorridos, e demais serviços reagem de forma assíncrona. Dessa maneira, elimina-se a dependência direta entre produtores e consumidores, permitindo escalar partes do sistema isoladamente.

---

## 2. Quais benefícios essa abordagem traz?

* Desacoplamento completo entre quem produz os eventos e quem os consome, permitindo adicionar novos consumidores sem alterar o produtor.
* Escalabilidade independente para cada fluxo de eventos, pois serviços podem aumentar suas filas ou partições de acordo com a demanda específica.
* Facilita extensões futuras: basta escutar eventos já existentes ou publicar novos para habilitar funcionalidades sem tocar em sistemas legados.

---

## 3. Desafios ao adotar EDA

* Garantir consistência eventual e tratar mensagens duplicadas ou fora de ordem, já que a comunicação assíncrona aumenta a chance de falhas.
* Manter visibilidade do fluxo, implementando monitoramento e rastreamento de eventos distribuídos para facilitar a detecção de gargalos e erros.
* Definir contratos e esquemas de eventos estáveis, planejando versionamento para que mudanças não quebrem consumidores existentes.

## 4. O que é um event broker?

O event broker é a peça central da EDA responsável por receber, armazenar e encaminhar eventos aos interessados. Exemplos comuns são Kafka e RabbitMQ. Ele garante durabilidade das mensagens, gerencia assinaturas dos consumidores e oferece mecanismos de escala e tolerância a falhas.

---

## 5. Exemplos de tipos comuns de eventos

São frequentes eventos de criação, atualização ou remoção de entidades de domínio, carregando identificadores e dados relevantes. Também existem eventos de notificação de sistema, indicando ocorrências como conclusão de tarefas, erros ou simples "heartbeats" que demonstram a saúde do serviço emissor.

---

## 6. Como garantir ordenação dos eventos?

Para manter a ordem, é comum particionar os tópicos ou filas utilizando chaves determinísticas, de forma que todos os eventos de uma mesma entidade sejam processados na sequência correta. Quando não for possível, podem ser adotados mecanismos de versionamento e reordenação no consumidor, garantindo que mensagens fora de ordem sejam tratadas apropriadamente.

---

## 7. Diferença entre comandos e eventos

Comandos representam ordens explícitas para que um serviço execute determinada ação, geralmente esperam uma resposta imediata e possuem um destino único. Eventos, por outro lado, relatam que algo aconteceu e podem ser consumidos por múltiplos ouvintes sem que o produtor saiba quem são. Eles não exigem retorno, apenas notificam o fato ocorrido.

---

## 8. Quando EDA não é recomendada?

A EDA costuma trazer mais ganhos em domínios complexos ou altamente distribuídos. Em aplicações simples, com poucas integrações ou requisitos de consistência estrita, os benefícios podem não justificar a complexidade adicional. Se transações fortes e sincronismo são imprescindíveis, abordagens mais tradicionais podem ser preferíveis.

---

## 9. Quais tecnologias suportam EDA?

Diversas soluções permitem implementar EDA: brokers distribuídos como Kafka, que oferece alta vazão e persistência, ou filas tradicionais como RabbitMQ. Plataformas de nuvem também fornecem serviços gerenciados (AWS SNS/SQS, Google Pub/Sub), reduzindo esforço de operação. A escolha depende de requisitos de escalabilidade, latência e tolerância a falhas.

---

## 10. Como definir o esquema dos eventos?

Defina um padrão de serialização claro (como JSON ou Avro) e documente todos os campos obrigatórios. Para evoluir os eventos, utilize versionamento ou campos opcionais, garantindo compatibilidade com consumidores mais antigos. Ferramentas como Schema Registry ajudam a controlar as mudanças e evitar incompatibilidades.

