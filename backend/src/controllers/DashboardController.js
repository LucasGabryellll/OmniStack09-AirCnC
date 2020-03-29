const Spot = require('../models/Spot'); 

module.exports = {
    async show(req, res){
        const { user_id } = req.headers; //buscar id dos user logados

        const spots = await Spot.find({ user: user_id }); // busca spots do user no banco

        return res.json(spots);
    }
}