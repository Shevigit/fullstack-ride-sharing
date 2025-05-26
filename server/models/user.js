const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    userName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    driveringLicense: {
        type: String,
        required: function () {
            return this.hasCar;
        }
    },
    gender: { type: String, enum: ['זכר', 'נקבה'], required: true },
    driverSuggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }], // נסיעות כנהג
    passengerSuggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }], // נסיעות כנוסע
    createdAt: { type: Date, default: Date.now, index: true }
});
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

