# Escopo — TP3 (MVP) — Cliente

## Título
MVP TP3: Fluxo Cliente — cadastro, login, listagem de restaurantes e realização de pedido

## Descrição curta
Entregável mínimo: sistema que permite a um cliente se cadastrar, fazer login, visualizar restaurantes e cardápios e enviar um pedido que fica persistido no backend.

## Funcionalidades (telas / endpoints)
### Frontend (telas)
- Tela de Cadastro (nome, email, senha)
- Tela de Login (email, senha)
- Tela Lista de Restaurantes (nome, categoria, tempo estimado)
- Tela Cardápio do Restaurante (itens, preço, botão 'Adicionar ao pedido')
- Tela Checkout / Confirmar Pedido (resumo do pedido, botão 'Enviar pedido')

### Backend (endpoints mínimos)
- `POST /auth/register` — registrar cliente
- `POST /auth/login` — autenticar cliente (retorna token ou session id)
- `GET /restaurants` — retornar lista de restaurantes
- `GET /restaurants/:id/menu` — retornar cardápio do restaurante
- `POST /orders` — criar novo pedido (dados: clienteId, restauranteId, itens, total)

## Critérios de aceitação (o que precisa funcionar)
1. Cliente consegue se cadastrar e receber confirmação (200 / success).
2. Cliente consegue fazer login e obter credencial simples (token ou session id).
3. Cliente vê pelo menos 2 restaurantes na `GET /restaurants`.
4. Cliente consegue abrir o cardápio de um restaurante e ver itens.
5. Cliente consegue enviar um pedido (`POST /orders`) e este pedido é salvo no backend (persistência em arquivo/DB).
6. O vídeo de demonstração mostrará todo o fluxo (cadastro → login → escolha → pedido).

## Observações / simplificações
- Se não for possível implementar autenticação completa, use um identificador simples (ex.: `clientId`) para simular usuário autenticado.
- Persistência mínima aceitável: arquivo JSON local ou SQLite/MongoDB.
- Priorize o fluxo completo (end-to-end) mesmo que o frontend seja simples (HTML estático + fetch).

## Arquivos relacionados
- `backend/` — código do servidor e endpoints
- `frontend/` — páginas simples ou app React
- `docs/como_rodar.md` — instruções para executar localmente
- `Videos/demo_tp3.mp4` — gravação da demonstração
