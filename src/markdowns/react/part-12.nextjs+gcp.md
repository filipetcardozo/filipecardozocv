# Part 12: Google Cloud Platform (GCP) para Desenvolvedores Next.js e React

---

## 1. Quais serviços GCP são mais usados com apps Next.js?

**Resposta clara:**

* **Cloud Run**: deploy de containers HTTP escaláveis sob demanda.
* **App Engine**: deploy sem container, com abstração de infraestrutura.
* **Cloud Storage**: arquivos estáticos (imagens, PDFs, etc).
* **Firestore / Cloud SQL**: banco de dados.
* **Cloud Functions**: funções serverless isoladas.
* **Cloud CDN**: cache global para performance.

---

## 2. Como fazer deploy de uma app Next.js no Cloud Run?

**Resumo prático:**

1. Gere build com `next build`.
2. Crie um `Dockerfile` com Node.js.
3. Faça deploy com:

```bash
gcloud run deploy --source . --region=us-central1
```

Cloud Run detecta e configura escalonamento automático, HTTPS, autenticação, etc.

---

## 3. Quais as vantagens e limitações do App Engine para apps React/Next?

**Vantagens:**

* Sem configuração de infraestrutura.
* Escala automática e rápida.
* Suporte a ambientes customizados (Node.js).

**Limitações:**

* Menos controle que Cloud Run.
* Build mais "opinioso".
* Não é ideal para Server Components intensivos ou streaming via React 18.

---

## 4. Como usar Firestore com React ou Next.js?

**Resposta clara:**

* Use SDK Web (`firebase/firestore`) no client.
* Em Server Components, use `firebase-admin` para acessar dados com privilégios.

**Exemplo no server:**

```ts
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();
const data = await db.collection('users').get();
```

---

## 5. Como lidar com autenticação Firebase + Next.js no App Router?

**Resposta clara:**

* Use `firebase-admin` em Server Components.
* Valide cookies JWT usando `verifyIdToken`.

**Fluxo:**

1. Client loga com Firebase.
2. Envia token via cookie.
3. Server valida o token no carregamento da página.

---

## 6. Como usar Cloud Storage com Next.js para upload e download?

**Resposta clara:**

* No client, envie o arquivo para uma rota da API Next.js.
* Na rota, use o SDK `@google-cloud/storage` para enviar para o bucket.

**Exemplo:**

```ts
const storage = new Storage();
storage.bucket('meu-bucket').upload(file);
```

Recomenda-se usar Signed URLs ou IAM para controle de acesso.

---

## 7. Como habilitar CDN e caching com GCP para apps Next.js?

**Resposta clara:**

* Use **Cloud CDN** com balanceador de carga HTTP(S).
* Configure headers `Cache-Control` no Next.js (`next.config.js` ou headers dinâmicos).

**Exemplo:**

```ts
res.setHeader('Cache-Control', 'public, max-age=3600');
```

---

## 8. Como monitorar e debugar apps Next.js no GCP?

**Ferramentas chave:**

* **Cloud Logging**: visualize logs via `console.log` no server.
* **Cloud Trace**: analisa latências.
* **Cloud Monitoring**: métricas e alertas.
* Integre com Sentry ou LogRocket para o client.

---

## 9. Quais boas práticas de segurança ao usar GCP com apps web?

**Resposta clara:**

* Use `IAM` para controlar acesso granular.
* Não exponha segredos no client; use `dotenv` e `Secret Manager`.
* Ative `HTTPS`, `WAF` e `DDoS Protection`.
* Restrinja serviços por região quando possível.

---

## 10. Como estruturar um monorepo com apps Next.js e funções GCP?

**Resposta clara:**

* Use `Turborepo` com workspaces (pnpm ou yarn).
* Separe `apps/web`, `packages/ui`, `functions/api`.
* Configure o deploy das `functions` via `gcloud functions deploy` apontando para a pasta correta.

Isso permite escalabilidade modular e reuso entre web, API e workers.