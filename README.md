# 🛠️ Dev Controle

Sistema para **gerenciar atendimentos de chamados**, feito com Next.js. Tem login com Google, rotas protegidas, e até um canal desprotegido pros clientes abrirem chamados com e-mail. Simples, direto e funcional.

## 🔥 Funcionalidades

- Login com conta do **Google** (via NextAuth)
- Rotas protegidas para usuários autenticados
- Cadastro de **clientes**
- Criação de **chamados** vinculados aos clientes
- Página `/open` onde o **cliente pode abrir chamado** usando só o e-mail (rota desprotegida)
- Cada usuário só vê os dados dos seus próprios clientes/chamados

## 🧪 Tecnologias Usadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [NextAuth.js](https://next-auth.js.org/) com Google OAuth
- [Prisma ORM](https://www.prisma.io/) + MongoDB
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) pra validação
- [Tailwind CSS](https://tailwindcss.com/) na estilização
- [Axios](https://axios-http.com/) para requisições
- [React Icons](https://react-icons.github.io/react-icons/) para ícones

## 📦 Instalação

```bash
git clone https://github.com/seu-user/dev-controle
cd dev-controle
npm install
```

## 🛡️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis abaixo:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-random-secret
```

> 💡 Dica: Gere um `AUTH_SECRET` com algo tipo `openssl rand -base64 32`.

## 🚀 Rodando o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🧠 Estrutura de pastas

```
/app
 └── (rotas do Next 13+)
/lib
 └── (configs de auth, prisma, etc)
/components
 └── (componentes reutilizáveis)
```

## 📢 Observações

- A rota `/open` é **pública** e permite que os **clientes abram chamados** com base no e-mail cadastrado.
- Os dados são separados por usuário. Cada um vê **apenas seus próprios chamados/clientes**.

## ✌️ Licença

MIT