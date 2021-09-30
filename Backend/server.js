require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const bodyParser  = require('body-parser');



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// app.use(fileUpload({
//     useTempFiles: true
// }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));


//==================DB================================
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('MongoDB conection Sucess')
})


//=================ROUTES==============================
//students and teachers
app.use('/academic', require('./routes/auth/academicrouter'))
app.use('/nonacademic', require('./routes/auth/nonacademicrouter'))

const paymentsRouter = require("./routes/finance/payments.js");
const expencesRouter = require("./routes/finance/expences.js");
app.use("/payment",paymentsRouter);
app.use("/expences",expencesRouter);

// Library Routes
const books = require('./routes/library/books');
app.use('/api/books', books);

//===================PORT==============================
const PORT = process.env.PORT || 6060
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})