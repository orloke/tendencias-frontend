# GitHub Dev Analytics - Frontend 🚀

Este é o repositório do **Frontend** da plataforma GitHub Dev Analytics, desenvolvido em **Next.js** com TypeScript. A aplicação consome serviços de um backend NestJS e apresenta uma interface moderna, dinâmica e 100% responsiva para análise de dados do GitHub.

---

## 🔗 Link de Produção

A aplicação está hospedada e rodando em produção na Vercel:
👉 **[https://tendencias-frontend.vercel.app/](https://tendencias-frontend.vercel.app/)**

---

## 👨‍💻 Dados de Contato

*   **Nome:** Júnior Dering
*   **E-mail:** juniordering@hotmail.com
*   **GitHub:** [https://github.com/orloke](https://github.com/orloke)

---

## 🛠️ Tecnologias Utilizadas e Justificativas

1.  **Next.js (v16+) & React 19**: 
    *   *Justificativa:* Utilizado devido ao suporte nativo ao App Router, Server Components e Server Actions. Isso permite que a maior parte da lógica pesada e requisições ao backend ocorram do lado do servidor (SSR), melhorando a velocidade de carregamento (FCP), SEO e a segurança.
2.  **Tailwind CSS (v4)**:
    *   *Justificativa:* Permite a prototipagem rápida e desenvolvimento de uma interface moderna e limpa com carregamento instantâneo de estilos. Facilita o desenvolvimento de temas claros e escuros natively.
3.  **Recharts**:
    *   *Justificativa:* Uma biblioteca de gráficos robusta e otimizada para React, utilizada para renderizar a distribuição percentual de linguagens de programação do perfil de forma interativa e responsiva.
4.  **React Hot Toast**:
    *   *Justificativa:* Fornece notificações de toast elegantes e não bloqueantes para feedbacks de erro de login, cadastro ou buscas realizadas.
5.  **Lucide React**:
    *   *Justificativa:* Fornece ícones vetoriais modernos e leves, integrando-se perfeitamente aos estilos do Tailwind.

---

## 📝 Descrição da Solução Proposta

O frontend consiste em um **Portal de Análise do GitHub** focado na experiência do usuário. Ele oferece:
*   **Fluxo de Autenticação Segura**: Telas de login e cadastro integradas a cookies de sessão no navegador.
*   **Dashboard Interativo**: Painel principal onde o usuário pode pesquisar perfis públicos do GitHub.
*   **Análise Detalhada**: Exibe o perfil completo do desenvolvedor, estatísticas consolidadas (estrelas, forks) e um gráfico de pizza interativo mostrando as linguagens preferidas do desenvolvedor com base no inventário de repositórios.

---

## 🚀 Instruções de Instalação e Execução

### 1. Requisitos Prévios
*   **Node.js** (versão 20 ou superior)
*   **NPM** ou **Yarn**

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz da pasta `frontend`:
```env
# URL do seu backend NestJS
API_URL="http://localhost:8080"
```

### 3. Instalação das Dependências
Instale todos os pacotes necessários:
```bash
npm install
```

### 4. Executar em Desenvolvimento
Inicie o servidor local na porta **3000**:
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 5. Compilar para Produção
Gere o build otimizado da aplicação:
```bash
npm run build
npm run start
```

---

## 📐 Arquitetura e Decisões Técnicas

*   **Padrão de Resposta de Server Actions (`{ data, error }`)**:
    Em produção, o Next.js oculta por padrão qualquer mensagem de erro que seja lançada (`throw new Error`) de dentro de um Server Action. Para contornar essa restrição sem criar brechas de segurança ou "gambiarras", o helper `apiFetch` intercepta os erros do backend e os retorna em formato de objeto de dados. O componente cliente então lê a propriedade e exibe o toast correto, mantendo o código tipado e robusto.
*   **Middleware de Proteção de Rotas**:
    O arquivo `middleware.ts` intercepta requisições à rota `/dashboard` e redireciona usuários não autenticados de volta ao login (`/`), garantindo que dados privados nunca sejam exibidos.
*   **Suporte a Temas (Dark/Light Mode)**:
    Implementado utilizando `next-themes` para persistência de tema escolhido no navegador com suporte a transições suaves de cor.

---


## ℹ️ Outras Informações Relevantes

*   **Validação de Formulários**: Validações de e-mail e força de senha executadas em tempo real no cliente via `zod` integrada ao `react-hook-form`.
*   **Compatibilidade com Hydration**: Todos os componentes dinâmicos verificam se o cliente foi montado, evitando erros de hidratação típicos de SSR com datas ou temas persistidos.
