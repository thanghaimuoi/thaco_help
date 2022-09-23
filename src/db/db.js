const mongoose = require('mongoose')

mongoose.connect(process.env.CONECTION_STR || 'mongodb://127.0.0.1:27017/thaco_help', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((v) => {
    console.log("connect database server success!")
});
