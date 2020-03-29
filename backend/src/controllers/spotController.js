const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res){
        const { tech } = req.query; 

        const spots = await Spot.find({ techs: tech })//faz uma listagem da tech escolhidas

        return res.json(spots);
    },

    async store(req, res){

        const{ filename } = req.file; //nome do arq que foi salvo, para salvar no banco 
        const{ company, techs, price } = req.body;
        const{ user_id } = req.headers; //definir constexto da requisição(autenticação, idioma)

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),//percorre a String e tira espaços e ,
            price,
        })

        return res.json(spot)
    }
};