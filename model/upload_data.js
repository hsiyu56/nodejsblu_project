const mongoose = require('mongoose');
const upload_data = new mongoose.Schema({
    userid:{
        type: String,
    },
    log:{
        type: String,
    },
    num:{
        type: Number,
    },
    danger:{
        type: String,
    },
    posttime: {
        type: Date,
        default: Date.now(),
    },
});

const udata = mongoose.model('upload_data', upload_data);
module.exports = udata;