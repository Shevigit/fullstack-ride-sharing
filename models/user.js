const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    driveringLicense: { type: String },//רשיון נהיגה
    gender: { type: String, enum: ['זכר', 'נקבה'], required: true },
   // role: { type: String, enum: ['נהג', 'נוסע'], required: true },
    driverSuggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }], // נסיעות כנהג
    passengerSuggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }], // נסיעות כנוסע
    createdAt: { type: Date, default: Date.now, index: true }
});
module.exports=mongoose.model('User', UserSchema)
