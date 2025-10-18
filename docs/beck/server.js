const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const restaurantsFile = "./data/restaurants.json";
const ordersFile = "./data/orders.json";

// Cria pasta data se não existir
if (!fs.existsSync("./data")) fs.mkdirSync("./data");

// Cria arquivo restaurants.json com dados iniciais
if (!fs.existsSync(restaurantsFile)) {
  fs.writeFileSync(restaurantsFile, JSON.stringify([
    { id: 1, name: "Pizzaria do João", category: "Pizza", time: "30min", menu: [
        { id: 1, name: "Pizza Margherita", price: 30 },
        { id: 2, name: "Pizza Calabresa", price: 35 }
    ]},
    { id: 2, name: "Lanches da Ana", category: "Lanche", time: "25min", menu: [
        { id: 1, name: "X-Burguer", price: 20 },
        { id: 2, name: "X-Salada", price: 22 }
    ]}
  ], null, 2));
}

// Cria arquivo orders.json vazio se não existir
if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));

// --- Endpoints ---

// Registro simples
app.post("/auth/register", (req,res) => {
    const { name, email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message:"Dados inválidos" });
    res.status(200).json({ message:"Usuário registrado", clientId: Date.now() });
});

// Login simples
app.post("/auth/login", (req,res) => {
    const { email, password } = req.body;
    if(email && password) res.json({ token: "token-simples-" + Date.now() });
    else res.status(401).json({ message: "Credenciais inválidas" });
});

// Lista de restaurantes
app.get("/restaurants", (req,res) => {
    const restaurants = JSON.parse(fs.readFileSync(restaurantsFile));
    res.json(restaurants);
});

// Cardápio de restaurante
app.get("/restaurants/:id/menu", (req,res) => {
    const id = parseInt(req.params.id);
    const restaurant = JSON.parse(fs.readFileSync(restaurantsFile)).find(r => r.id === id);
    if(restaurant) res.json(restaurant.menu);
    else res.status(404).json({ message:"Restaurante não encontrado" });
});

// Criar pedido
app.post("/orders", (req,res) => {
    const { clientId, restaurantId, items, total } = req.body;
    if(!clientId || !restaurantId || !items) return res.status(400).json({ message:"Dados inválidos" });

    const orders = JSON.parse(fs.readFileSync(ordersFile));
    const newOrder = { id: Date.now(), clientId, restaurantId, items, total, status:"recebido" };
    orders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(orders,null,2));
    res.status(201).json({ message:"Pedido criado", orderId:newOrder.id });
});

// Servidor rodando
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

