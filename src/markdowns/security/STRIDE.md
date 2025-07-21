## ✅ STRIDE – Modelagem de Ameaças

---

### 1. **O que é o modelo STRIDE e qual seu propósito na engenharia de software?**

**STRIDE** é um modelo de modelagem de ameaças criado pela Microsoft que ajuda engenheiros a identificar, classificar e mitigar **ameaças de segurança** em sistemas.
Seu propósito é estruturar o raciocínio sobre **possíveis falhas de segurança** desde o design da aplicação, associando cada tipo de ameaça a um **componente do sistema** (usuário, dados, processos, etc.).

---

### 2. **O que significa cada letra da sigla STRIDE e quais tipos de ameaças elas representam?**

* **S – Spoofing**: falsificação de identidade (ex: login com credenciais de outro usuário).
* **T – Tampering**: adulteração de dados ou código (ex: modificação maliciosa de payloads).
* **R – Repudiation**: negação de ações sem rastreamento (ex: um usuário alega que não fez uma transação).
* **I – Information Disclosure**: vazamento de dados sensíveis (ex: resposta de API com dados privados).
* **D – Denial of Service**: indisponibilidade do sistema (ex: flood de requisições).
* **E – Elevation of Privilege**: acesso não autorizado a funcionalidades administrativas.

---

### 3. **Como o STRIDE se diferencia de abordagens tradicionais de segurança baseadas em checklist?**

Checklists são úteis para **verificação posterior**, mas STRIDE é um modelo **proativo e sistemático**.
Ele permite:

* Pensar nas **classes de ameaça** enquanto o sistema é **projetado**, não apenas depois.
* Raciocinar **por tipo de ativo** (ex: usuário, endpoint, banco) e prever cenários específicos.
* Adaptar medidas de mitigação **customizadas**, não genéricas.

---

### 4. **Em qual etapa do ciclo de desenvolvimento você aplicaria STRIDE e por quê?**

Idealmente durante a **fase de design e arquitetura**, antes da implementação.
Isso permite:

* Prever **vulnerabilidades estruturais**.
* Influenciar decisões sobre autenticação, criptografia, logging, rate limiting, etc.
* Reduzir o custo de mitigação (mais barato prevenir que corrigir pós-deploy).

---

### 5. **Como o STRIDE se relaciona com o princípio de segurança por design?**

STRIDE operacionaliza o princípio de **"Secure by Design"** ao forçar o arquiteto a:

* Questionar como cada componente pode ser explorado.
* Estabelecer limites claros de confiança.
* Introduzir segurança como **requisito funcional e não apenas não funcional**.

---

### 6. **Como Spoofing e Elevation of Privilege diferem em termos de impacto e mitigação?**

* **Spoofing** visa **assumir a identidade de outro usuário**, geralmente explorando falhas de autenticação.

  * **Mitigação**: autenticação forte (ex: MFA), tokens seguros, certificados.
* **Elevation of Privilege (EoP)** ocorre **após autenticação**: um usuário com acesso limitado obtém permissões elevadas.

  * **Mitigação**: controle granular de permissões (RBAC, ABAC), validação no backend.

**Spoofing = identidade**
**EoP = escopo de poder**

---

### 7. **Dê um exemplo prático de cada ameaça do STRIDE em um sistema web moderno.**

* **S – Spoofing**: login via OAuth mal configurado permite falsificação de identidade.
* **T – Tampering**: alteração do corpo de uma requisição PUT em uma API sem validação de integridade.
* **R – Repudiation**: ausência de logs em endpoints críticos permite negar ações (ex: exclusão de arquivos).
* **I – Information Disclosure**: headers indevidos (`X-Powered-By`) revelam tecnologias usadas.
* **D – DoS**: API pública sem rate limiting fica indisponível após ataque automatizado.
* **E – EoP**: usuário normal acessa rota `/admin` sem checagem de permissão no backend.

---

### 8. **Como o modelo STRIDE pode orientar decisões de arquitetura em microserviços?**

* **Spoofing**: obrigatoriedade de autenticação entre serviços (mTLS ou tokens JWT).
* **Tampering**: uso de HMAC ou assinatura de mensagens em filas/eventos.
* **Repudiation**: logs com rastreabilidade e correlação entre chamadas (trace IDs).
* **Disclosure**: criptografia em trânsito e em repouso + controles de acesso.
* **DoS**: circuit breakers, rate limiting, retry policies.
* **EoP**: separação clara de papéis entre serviços (princípio do menor privilégio).

---

### 9. **Quais ferramentas ou práticas ajudam a aplicar STRIDE de forma eficaz em times ágeis?**

* **Threat Modeling Workshops**: reuniões com devs, PO e segurança para revisar arquitetura.
* **Ferramentas visuais**:

  * [Microsoft Threat Modeling Tool](https://aka.ms/threatmodelingtool)
  * [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/)
* **Diagrama de fluxo de dados (DFD)**: ajuda a mapear ativos e limites de confiança.
* **Automação em PRs**: checklists de ameaça por tipo de funcionalidade.

---

### 10. **Quais as limitações do STRIDE e quando complementá-lo com outros modelos (ex: DREAD, PASTA)?**

**Limitações:**

* STRIDE foca em **ameaças técnicas**, não riscos de negócio.
* Não atribui **severidade ou probabilidade** — só classifica o tipo.
* Requer experiência para não gerar ruído (ex: ameaças irrelevantes).

**Complementar com:**

* **DREAD**: para priorizar riscos com base em impacto e probabilidade.
* **PASTA (Process for Attack Simulation and Threat Analysis)**: abordagem mais robusta e voltada a compliance e risco organizacional.
* **Kill Chain / MITRE ATT\&CK**: focados em comportamento de atacantes reais.