const express = require ('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router(); 
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);//rota listagem de spots por tech
routes.post('/spots', upload.single('thumbnail') , SpotController.store);//rota do upload de imagem

routes.get('/dashboard', DashboardController.show); //rota da listagem de todos os spots

routes.post('/spots/:spot_id/bookings', BookingController.store);//rota encadeada(para user que quer criar uma reserva)


routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);


    //req: requisição, o que o user está enviando 
    //res: devolver uma reposta para requisição
    //return res.send('Hello Word') //send: envia um texto
    
    
    
        //json = estrutura de dados (notação de obj)
            // Só envia objs ou array

module.exports = routes; //exporta rotas para que a app conheça