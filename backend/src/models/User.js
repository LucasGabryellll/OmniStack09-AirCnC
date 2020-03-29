const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: String,
})//passa o que o user vai ser(atr dos user)

module.exports = mongoose.model('User', UserSchema);//mongo sabe que o user so tem campo de email

