 const CreateSuccess = (statusCode, SuccessMessage,data)=>{
    const suceesobj= {
        status:statusCode,
        message:SuccessMessage,
        data:data
    }
    return suceesobj
}
module.exports = { CreateSuccess };