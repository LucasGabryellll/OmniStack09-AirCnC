const express = require('express');
//require: Serve para importar uma dependencia externa
//express: micro framework
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http =require('http');

const routes = require('./routes');//n é modulo entao precisa do caminho
 
const app = express();
const server = http.Server(app); //pega o servidor e extrai
const io = socketio(server);

mongoose.connect('mongodb+srv://OmniStack:OmniStack@cluster0-mmnog.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

// app.get():
//    1º parâmetro: É a rota
//    2º parâmetro: Uma função

//GET: buscar informação do back
//POST: criar nova informação
//PUT: editar informação
//DELETE: deletar informação

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors()); //pode configurar qual enderenço pode acessar
app.use(express.json()); //fala que as req vão usar o formato JSON
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));//quando se tem upload na app
app.use(routes);

server.listen(3333); //Porta para rodar a aplicação "localhost 3333"