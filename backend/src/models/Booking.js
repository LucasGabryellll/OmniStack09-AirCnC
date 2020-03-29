const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //grava apenas a referencia do user que criou o spot
        ref: 'User'
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        //grava apenas a referencia do user que criou o spot
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
