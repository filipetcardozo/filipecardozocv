# Markdowns que precisamos construir:

- Sólidos conhecimentos em arquiteturas de software, como: monolito, microserviços, EventDriven Architecture, Hexagonal Architecture, DDD;
- Necessário experiência com ferramentas de versionamento de código (Git);
- Experiência em Containers utilizando Docker, Docker Compose;
- Experiência em CI/CD;
- Experiência com bancos de dados relacionais e não relacionais (MongoDB, Redis, Postgres SQL);
- Processamento Async com message brokers, por exemplo: Azure Service Bus, EventHub, Apache Kafka, AWS SQS, RabbitMQ;
- Compreensão dos diferentes tipos de protocolo HTTP, AMQP, TCP, TLS;
- Experiência com testes unitários e integração, TDD;
- Experiência em métodos ágeis.


Arquitetura de files:

```
markdowns/
├─ foundations/
│  ├─ programming/
│  │  # compilers vs interpreters, typing systems (static/dynamic, strong/weak)
│  │  # code complexity, basic refactoring, readability best practices
│  ├─ paradigms/                # OO, functional, reactive
│  │  # declarative vs imperative, metaprogramming, logic programming
│  ├─ data-structures/
│  │  # less common ones: tries, segment trees, bloom filters
│  └─ algorithms/
│     # asymptotic analysis, algorithm optimization, parallelism
│     # graph algorithms, dynamic programming, distributed algorithms
├─ architecture/
│  ├─ styles/                   # layered, hexagonal, ddd, event-driven
│  │  # microservices vs monolith, self-contained systems, serverless patterns
│  ├─ integration/              # rest, graphql, messaging, cqrs/saga
│  │  # gRPC, event sourcing, API gateway patterns
│  ├─ scalability/              # cache, sharding, rate-limit, backpressure
│  │  # auto-scaling strategies, circuit breakers, advanced load balancing
│  └─ decisions/                # ADRs, trade-offs, ilities
│     # total cost of ownership (TCO), debt vs investment, evolutionary architecture
├─ front-end/
│  ├─ frameworks/
│  │  ├─ react/
│  │  ├─ angular/
│  │  └─ vue/
│  │     # advanced patterns (complex hooks, state sync, DI), performance tuning
│  ├─ state-management/         # redux, zustand, rxjs
│  │  # distributed state management, back-end state synchronization
│  ├─ styling/                  # css, tailwind, css-in-js
│  │  # design systems, accessibility (a11y)
│  ├─ build-tooling/            # bundlers, lint, format, test runners
│  │  # optimization pipelines, dynamic code splitting, bundle analysis
│  └─ performance/              # web vitals, hydration, code-splitting
│     # prefetching, lazy loading, optimized PWA
├─ back-end/
│  ├─ languages/                # typescript, csharp, java, go
│  │  # memory models, native concurrency, profiling
│  ├─ frameworks/               # .net, spring, nestjs, express, fastapi
│  │  # middleware patterns, modularization, built-in observability
│  ├─ data-access/              # orm, sql, nosql, migrations (liquibase)
│  │  # query tuning, locking, replication
│  ├─ messaging/                # kafka, rabbit, idempotency
│  │  # messaging patterns (competing consumers, fanout, dead letter)
│  └─ performance/              # perf, profiling, concurrency
│     # contention, lock-free algorithms, pooling
├─ mobile/
│  ├─ native/                   # android, ios
│  │  # lifecycle, battery optimization, native UI patterns
│  └─ cross/                    # react-native, .net-maui, flutter
│     # native bridge (native modules), build optimization
├─ data/
│  ├─ databases/                # modeling, indexes, transactions
│  │  # partitioning, replication, complex query tuning
│  ├─ streaming/                # kappa, lambda, event-time
│  │  # exactly-once semantics, event ordering
│  └─ analytics/                # warehousing, lake, batch vs stream
│     # dimensional modeling, analytical query optimization
├─ devops-cloud/
│  ├─ ci-cd/
│  │  # feature flags, progressive delivery, trunk-based with gates
│  ├─ containers/
│  │  # container security, multi-stage builds
│  ├─ kubernetes/
│  │  # custom operators, service mesh
│  ├─ observability/            # logs, metrics, tracing, SLO/SLA
│  │  # intelligent alerting, distributed tracing
│  └─ cloud-providers/          # aws, az, gcp
│     # multi-cloud strategy, cost optimization, vendor lock-in
├─ security/
│  ├─ appsec/                   # threat modeling, secure defaults
│  │  # secure coding guidelines, secure dependency injection
│  ├─ authn-authz/              # oauth2/oidc, jwt, mfa
│  │  # delegated authorization, passwordless auth
│  └─ secrets-compliance/       # vault, kms, gdpr
│     # compliance automation, pipeline security
├─ testing-quality/
│  ├─ unit/
│  ├─ integration/
│  ├─ e2e/
│  ├─ contract-testing/
│  └─ performance-testing/
│     # chaos engineering, fault injection
├─ system-design/
│  ├─ fundamentals/             # cap, pacelc, hashing, consistency
│  │  # quorum reads/writes, gossip protocols
│  └─ exercises/
│     # real-world challenges with traffic, latency, and cost constraints
├─ practices/
│  ├─ principles/               # solid, clean code, 12-factor
│  │  # YAGNI, KISS, DRY, design by contract
│  └─ process/                  # agile, xp, trunk-based, code review
│     # incident response process, blameless postmortem
└─ tools/
   ├─ git/
   │  # advanced git flows, rebase vs merge, keeping a clean history
   ├─ editor-setup/
   │  # productivity with plugins, advanced debugging
   └─ productivity/
      # task automation, focus management, keyboard shortcuts
```