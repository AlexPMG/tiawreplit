const express = require('express'); 
const path = require('path'); 
const jsonServer = require('json-server'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
// 1. Serve os arquivos estáticos (HTML, CSS, JS) da pasta 'public' 
app.use(express.static(path.join(__dirname, 'public'))); 
// 2. Configura o JSON Server para rodar na rota '/api' 
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json')); 
const middlewares = jsonServer.defaults(); 
app.use('/api', middlewares, router); 
// 3. Garante que o site abra na 'homepage.html' ao acessar o link 
app.get('/', (req, res) => { 
res.sendFile(path.join(__dirname, 'public', 'homepage.html')); 
}); 
// Inicia o servidor 
app.listen(PORT, () => { 
console.log(`Servidor rodando com sucesso!`); 
});