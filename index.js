const express = require('express');
const cors= require('cors');
const dotenv = require('dotenv');
require('./models/dbconect');
const swaggerUi = require('swagger-ui-express')
const roleRouter = require('./routers/role_Router')
const authRouter = require('./routers/auth_Router')
const userRouter = require('./routers/user_Rouer');
const cookieParser = require('cookie-parser');
const swaggerSpec = require('./swagger')
const swaggerJSDoc = require('swagger-jsdoc')
//configure Dot ENV
dotenv.config();
const app = express();
app.use(express.json()); //JSON Parser
app.use(cors());//to connect with Fronten
app.use(cookieParser());
// app.use(express.static((__dirname + '/public')));
// app.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.use('/api/v1/role',roleRouter);
app.use('/api/v1/auth',authRouter);
// app.use('/api/v1/auth/send-mail',require('./routers/auth_Router'))
app.use('/api/v1/user',userRouter);

app.use((obj,req,res,next)=>{
    const statusCode = obj.status || '500';
    const message = obj.message || 'Internal Server Error';
    return res.status(statusCode).json({
        sucess:[200,201,204].some(a=> a===obj.status) ? true : false,
        status:statusCode,
        message:message,
        data:obj.data
    })
})
// app.use('/api/v1/updateuser',require('./routers/user_routers'));


    app.listen(PORT, () => {
        console.log(`Application started on PORT ${PORT}`);
    })