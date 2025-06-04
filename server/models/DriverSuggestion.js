const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({

    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    address: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    genderPreference: { type: String, enum: ['מעדיף לא לומר', 'נקבה', 'זכר'], default: 'מעדיף לא לומר' },

passengers: [

        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
            countSeat: { type: Number, required: true, index: true }
        }
    ],
    status: { type: String, enum: ['פעיל', 'בוטל', 'הושלם'], default: 'פעיל' },
    createdAt: { type: Date, default: Date.now, index: true },

});
module.exports = mongoose.model('Suggestion', SuggestionSchema)
