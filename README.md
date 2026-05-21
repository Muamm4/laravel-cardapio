# 🍕 Cardápio Digital Whitelabel (Premium Edition)

Um sistema de alta performance para cardápios online e gestão de pedidos via WhatsApp, desenvolvido com foco total em conversão e experiência do usuário mobile. Este projeto é um **Whitelabel**, permitindo a adaptação rápida para qualquer restaurante, pizzaria ou lanchonete.

## 🚀 Visão Geral

O sistema une a robustez de um painel administrativo completo com a fluidez de um aplicativo nativo para o cliente final, utilizando a tecnologia de **PWA (Progressive Web App)** e suporte a **NativePHP Mobile**.

### 🌟 Principais Funcionalidades

#### 📱 Para o Cliente (Experiência App-Like)
- **PWA (Progressive Web App)**: O cardápio pode ser instalado diretamente no celular do cliente, funcionando como um app sem a necessidade de baixar da App Store/Play Store.
- **Navegação Mobile-First**: Interface otimizada com **Bottom Navigation** (barra inferior), respeitando as *Safe Areas* de dispositivos modernos (notch e barras de gestos).
- **Sistema de Contas**: Cadastro de usuários para salvar dados de perfil e histórico de pedidos.
- **Gestão de Endereços**: Suporte a múltiplos endereços salvos por usuário, com definição de endereço padrão para agilizar o checkout.
- **Carrinho Inteligente**: Persistência de itens, cálculo automático de totais e interface fluida.
- **Checkout via WhatsApp**: Geração de pedidos estruturados enviados diretamente para o WhatsApp do restaurante.
- **Suporte a Promoções**: Destaque visual para produtos em oferta com preços riscados e badges.

#### 🛠️ Para o Administrador (Painel de Gestão)
- **Dashboard de Métricas**: Visão geral de pedidos, produtos e categorias.
- **Gestão de Categorias**: CRUD completo com controle de ordem de exibição e status.
- **Gestão de Produtos**: Controle de estoque, upload de imagens, preços promocionais e descrições.
- **Gestão de Pedidos**: Fluxo de aceitação/recusa de pedidos com visualização detalhada dos itens e dados do cliente.
- **Ações Rápidas**: Aprovação ou recusa de pedidos diretamente pelo Dashboard.

---

## 📸 Screenshots

| Cardápio Público | Painel Administrativo | Carrinho de Compras |
| :---: | :---: | :---: |
| ![Cardápio Público](./screenshots/public-menu.png) | ![Painel Admin](./screenshots/admin-dashboard.png) | ![Carrinho](./screenshots/cart-drawer.png) |

| Gestão de Produtos | Detalhes do Pedido | Fluxo de Checkout |
| :---: | :---: | :---: |
| ![Produtos](./screenshots/admin-products.png) | ![Pedido](./screenshots/admin-order-detail.png) | ![Checkout](./screenshots/checkout-flow.png) |

---

## 🛠️ Stack Tecnológica

O projeto utiliza o estado da arte do ecossistema PHP e JavaScript:

- **Backend**: [Laravel 13](https://laravel.com) (Framework PHP)
- **Frontend**: [React](https://react.dev) com [Inertia.js](https://inertiajs.com) (SPA Experience)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com)
- **Estado**: [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento de estado leve)
- **Banco de Dados**: SQLite (Simplicidade e portabilidade)
- **Performance**: [Laravel Octane](https://laravel.com/docs/octane) com [FrankenPHP](https://frankenphp.dev) (Respostas em milissegundos)
- **Distribuição**: PWA (Web App Instalável) & [NativePHP](https://nativephp.com) (App Nativo)

---

## ⚙️ Instalação e Configuração

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js & NPM

### Passo a Passo
1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd laravel-cardapio
   ```

2. **Instalar dependências**
   ```bash
   composer install
   npm install
   ```

3. **Configurar ambiente**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Banco de Dados**
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

5. **Assets e Storage**
   ```bash
   npm run build
   php artisan storage:link
   ```

6. **Execução (Modo Performance)**
   ```bash
   php artisan octane:start --host=0.0.0.0 --port=8000
   ```

---

## 🎯 Customização (Whitelabel)

Para adaptar este sistema para um novo cliente:
1. **Cores**: Altere as cores primárias no `tailwind.config.js`.
2. **Identidade**: Atualize a logo no componente `AppLogo.tsx`.
3. **WhatsApp**: Configure o número do administrador no `.env` (`ADMIN_WHATSAPP`).
4. **PWA**: Atualize o `manifest.json` e os ícones em `public/icons/` para a marca do cliente.

---

## 📄 Licença
Este projeto é distribuído sob a licença MIT.
