const User = require('../models/User');

//index: retorna uma listagem de sessões 
//show: retorna uma unica sessão
//store: criar uma sessão
//update: alterar uma sessão
//destroy: destroir uma sessão


module.exports = {//comunica o user com o DancoDados
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });//se user ja existir retorna o mesmo

        if(!user){
            user = await User.create({ email });
            //cria novo user se não tiver nenhum com o email escolhido
        }

        return res.json(user);
    }
};
