const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'), //separa pastas por , de acordo com o sistema
        filename: (req, file, cb) =>{
            //cb = função chamada assim que o arq tiver pronto
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); //retorna nome sem extenção
            
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};