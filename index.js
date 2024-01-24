const express = require('express');
const cors= require('cors');
const dotenv = require('dotenv');
require('./models/dbconect');
//configure Dot ENV
dotenv.config();
const app = express();
app.use(express.json()); //JSON Parser
app.use(cors());//to connect with Frontend
const PORT = process.env.PORT || 5000;
//temp check
app.use('/api/v1/role',require('./routers/role_Router'));
app.use('/api/v1/role/upadate',require('./routers/role_Router'));
app.use('/api/v1/allrole',require('./routers/role_Router'));
app.use('/api/v1/role/deleteRole',require('./routers/role_Router'));

app.use('/api/v1/register',require('./routers/user_routers'));
app.use('/api/v1/user',require('./routers/user_routers'));
// app.use('/api/v1/updateuser',require('./routers/user_routers'));


app.listen(PORT, () => {
    console.log(`Application started on PORT ${PORT}`);
})