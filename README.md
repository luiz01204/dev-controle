🛠️ Dev Controle
Sistema para gerenciar atendimentos de chamados, feito com Next.js. Tem login com Google, rotas protegidas, e até um canal desprotegido pros clientes abrirem chamados com e-mail. Simples, direto e funcional.

🔥 Funcionalidades
Login com conta do Google (via NextAuth)

Rotas protegidas para usuários autenticados

Cadastro de clientes

Criação de chamados vinculados aos clientes

Página /open onde o cliente pode abrir chamado usando só o e-mail (rota desprotegida)

Cada usuário só vê os dados dos seus próprios clientes/chamados

🧪 Tecnologias Usadas
Next.js 15

React 19

NextAuth.js com Google OAuth

Prisma ORM + MongoDB

React Hook Form + Zod pra validação

Tailwind CSS na estilização

Axios para requisições

React Icons para ícones

📦 Instalação
bash
Copiar
Editar
git clone https://github.com/seu-user/dev-controle
cd dev-controle
npm install
Crie um arquivo .env com as variáveis necessárias:

env
Copiar
Editar
DATABASE_URL=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
🚀 Rodando o projeto
bash
Copiar
Editar
npm run dev
Acesse: http://localhost:3000

🧠 Estrutura de pastas
bash
Copiar
Editar
/app
 └── (rotas do Next 13+)
/lib
 └── (configs de auth, prisma, etc)
/components
 └── (componentes reutilizáveis)
📢 Observações
A rota /open é pública e permite que os clientes abram chamados com base no e-mail cadastrado.

Os dados são separados por usuário. Cada um vê apenas seus próprios chamados/clientes.

✌️ Licença
MIT
