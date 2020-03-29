const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //grava apenas a referencia do user que criou o spot
        ref: 'User'
    }
}, {
    toJSON: { //toda vez que um spot for convertido em JSON calcule os virtuals automaticamente
        virtuals: true,
    }
});

//virtual: computa pelo javaScript mas não existe dentro do banco
SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.0.110:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);