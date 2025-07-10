🔒 Segurança em Aplicações Web
1. O que é OWASP Top 10? Por que ele é relevante?
É uma lista das 10 vulnerabilidades mais críticas em aplicações web, publicada pela OWASP (Open Web Application Security Project).

Relevância:

Serve como referência global de boas práticas.

É usada por empresas para auditorias, treinamentos e compliance.

Muitos ataques bem-sucedidos exploram falhas listadas ali (XSS, SQL Injection, etc).

2. O que é XSS e como preveni-lo em front-end moderno?
Cross-Site Scripting (XSS) ocorre quando código malicioso é injetado e executado no navegador do usuário.

Prevenção:

Escape de conteúdo dinâmico (nunca renderizar HTML vindo de dados sem sanitização).

Uso estrito de APIs DOM seguras (evitar innerHTML, usar textContent).

Implementar Content Security Policy (CSP) para restringir execuções.

3. O que é CSRF e quais estratégias você usa para mitigá-lo?
Cross-Site Request Forgery (CSRF) força um usuário autenticado a realizar ações sem consentimento em outro site.

Mitigações:

Tokens anti-CSRF com verificação de origem.

SameSite cookies (SameSite=Strict ou Lax).

Verificação de headers customizados (ex: X-CSRF-Token).

Importante: APIs REST com JWT geralmente evitam CSRF usando cookies não compartilhados e CORS restrito.

4. O que é autenticação vs. autorização?
Autenticação: validar quem é o usuário (ex: login).

Autorização: decidir o que o usuário pode acessar após autenticado.

Ambas são necessárias e devem ser tratadas separadamente, tanto no front-end quanto na API.

5. Quais os riscos de armazenar tokens no localStorage?
Tokens no localStorage são acessíveis via JavaScript.
Se houver um XSS, o atacante pode ler e exfiltrar o token.

Alternativas mais seguras:

Cookies HTTP-only com SameSite e Secure.

Tokens curtos + refresh tokens rotativos.

Uso de memória volátil (em contextos mais restritos).

6. O que são secure headers e por que configurá-los corretamente?
São cabeçalhos HTTP que reforçam a segurança do navegador:

Content-Security-Policy – mitiga XSS.

Strict-Transport-Security – força HTTPS.

X-Content-Type-Options – evita MIME-sniffing.

X-Frame-Options – evita clickjacking.

Importância: protegem contra uma ampla gama de ataques client-side com uma configuração simples no servidor.

7. Como validar dados no front-end e por que isso não basta?
Validação no front-end:

Garante boa UX (feedback rápido).

Reduz chamadas inválidas à API.

Mas não é suficiente, pois pode ser ignorada ou manipulada:

DevTools permitem alterar o DOM.

Requisições podem ser falsificadas por ferramentas como Postman.

Por isso, a validação definitiva deve estar no backend, com os mesmos critérios (ou mais estritos).

8. O que é princípio do menor privilégio no contexto de front-end?
Significa que cada parte da aplicação só deve ter acesso ao necessário para sua função.

Exemplos:

Um componente visual não deve conhecer o token do usuário.

Usuário logado como “leitor” não deve ver rotas de administração nem em código-fonte.

Ajuda a reduzir superfícies de ataque e isolar falhas.

9. O que são ataques de injeção e como proteger formulários contra eles?
São ataques onde entradas do usuário manipulam comandos de sistemas subjacentes (ex: SQL, shell, XML, etc).

Proteção:

Escapar/parametrizar dados sempre (backend).

Evitar concatenação de strings para gerar comandos.

Validar tipo, formato e limites no front-end e backend.

Em formulários React, por exemplo, inputs não devem jamais ser usados para compor comandos diretamente.

10. Como garantir segurança em comunicações entre microfrontends ou SPAs?
Isolamento de domínios/escopos de execução (Shadow DOM, iframe sandboxing, event scoping).

Uso de tokens limitados em escopo e tempo, com mecanismos de renovação centralizados.

Validação mútua entre frontends via contratos versionados.

Não confiar no front-end para decisões críticas — sempre validar permissões no backend.

Evitar o compartilhamento direto de contexto via window global.