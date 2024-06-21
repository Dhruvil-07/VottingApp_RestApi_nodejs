const jwt = require('jsonwebtoken');

//gen token
async function gen_token(playload)
{
    try
    {
        const token = await jwt.sign(playload,"shah@123");
        return token;
    }
    catch(e)
    {
        console.log(e);
    }
    
}

//verfiy token
const jwtauthmiddelwware = (req,res,next)=>{

    try
    {
        const authorization = req.headers.authorization;
        if(!authorization)
        {
            res.status(404).json({
                status:404,
                msg:'Token Not Found',
            })
        }

        const token = req.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token,"shah@123");

        console.log(decode);

        req.user = decode;

        next();
    
    }catch(e)
    {
        res.status(500).json({
            status:500,
            msg:'Invalid token',
        })
    }
   
}


module.exports = {
    gen_token,
    jwtauthmiddelwware,
}