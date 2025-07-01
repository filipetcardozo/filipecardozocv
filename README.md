# Filipe Cardozo — Currículo & Learning Hub

Este repositório serve a **dois propósitos complementares**:

1. **Currículo interativo**
   Uma aplicação **Next.js** que incorpora, via `iframe`, a versão sempre atualizada do meu currículo hospedado no Notion — publicada em **filipecardozo.dev**.

2. **Rota oculta `/learning`**
   Um espaço onde centralizo **tópicos técnicos comumente abordados em entrevistas**. Aqui, você encontrará perguntas e respostas sobre fundamentos importantes da engenharia de software — *React, arquitetura, testes, microfrontends, etc.*
   A maior parte das questões e respostas foram **geradas com auxílio de IA (como ChatGPT)**, sob minha curadoria, com foco em **clareza, profundidade e contexto prático**, não em decorar frases prontas.

---

## Principais Características

| Recurso                     | Descrição                                                               |
| --------------------------- | ----------------------------------------------------------------------- |
| **Build estático (SSG)** | Deploy ultra-rápido via Vercel.                                         |
| **Next.js 15**           | Pages Router simples e eficaz.                                          |
| **Material UI (MUI)**    | Componentes acessíveis, com theming claro/escuro.                       |
| **Responsivo**           | Layout adaptado a qualquer dispositivo.                                 |
| **/learning**            | Repositório de tópicos técnicos com explicações humanizadas.            |
| **IA como apoio**        | Grande parte do conteúdo técnico foi gerado via IA sob revisão crítica. |

---

## Estrutura do Projeto

```
/
├─ public/                # PDFs (Currículo, Carta) e ícones
├─ src/
│  ├─ components/         # Botões flutuantes, layout
│  ├─ pages/
│  │  ├─ index.tsx        # Currículo (iframe)
│  │  └─ learning/[…].tsx # Tópicos técnicos
│  └─ utils/md.ts         # Markdown → HTML
└─ theme.ts               # Customização do MUI
```

---

## Tecnologias Utilizadas

* **Next.js 15** – Pages Router (com SSG)
* **Material UI** – Componentes modernos com suporte a tema
* **TypeScript** – Tipagem estática segura
* **Remark/Rehype** – Parser de markdown
* **Vercel** – Deploy e CDN global

---

## Rodando localmente

```bash
npm install      # Instala dependências
npm run dev      # Inicia o servidor em http://localhost:3000
npm run build    # Gera versão estática
npm run start    # Servidor de produção local
```

A rota `/learning` será renderizada automaticamente a partir dos arquivos `.md` colocados em `src/content/`.

---

## Sobre a geração de conteúdo da rota `/learning`

Grande parte das perguntas e respostas presentes na seção `/learning` foram elaboradas com apoio de **IA generativa** para maximizar:

* Clareza e legibilidade
* Cobertura de tópicos técnicos reais
* Qualidade em contexto de entrevista

A curadoria, organização e intenção por trás da seção são **minhas** — mas reconheço o papel da IA como uma ferramenta poderosa nesse processo. O objetivo **não é decorar respostas**, mas oferecer uma base para **reflexão crítica e explicações bem estruturadas**.

---

## Licença

Código sob **MIT**.
Conteúdo dos tópicos `/learning` pode ser usado para estudo, com atribuição recomendada.

---

Se quiser sugerir perguntas melhores, abrir discussões ou contribuir com outros temas, **pull requests são bem-vindos.**
