const express = require('express');
const cors= require('cors');

const dotenv = require('dotenv');
require('./models/dbconect');

//configure Dot ENV
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());//to connect with Frontend
app.use(express.json()); //JSON Parser
//temp check
app.get('/', (req, res) => {
    res.send('Helooo....')
})
app.use('/api/v1/user',require('./routers/user_routers'));
app.use('/api/v1/updateuser',require('./routers/user_routers'));

app.listen(PORT, () => {
    console.log(`Application started on PORT ${PORT}`);
})