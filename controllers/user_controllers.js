const userModel = require('../model/user_model');
const jwtauth = require('../auth_service/jwt_auth');

//signup controller
async function user_signup(req,res)
{   
    try
    {
        const body_payload = req.body;
        const newUser = new userModel(body_payload);
        const result = await newUser.save();

        res.status(201).json({
            status:201,
            msg : 'User Register Succcessfully',
            userData : result,
        }); 
    }
    catch(e)
    {
        res.status(500).json({
            status:500,
            msg : 'Internal Server Error',
        });
    }
}


//login controller
async function user_login(req,res)
{
    try
    {
        const body_payload = req.body;

        const user = await userModel.findOne({adharnumber:body_payload.adharnumber});

        if(!user)
        {
            res.status(401).json({
                status:401,
                msg : 'User Not found',
            });
        }

        // if(!(await userModel.compare) )
        // {
        //     res.status(401).json({
        //         status:401,
        //         msg : 'Invalid Password',
        //     });
        // }

        const token_payload = {
            uid : user.id,
        }

        console.log(token_payload);


        res.status(200).json({
            status:200,
            msg : 'User found',
            data : user,
            token : await jwtauth.gen_token(token_payload),     
        });
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            status:500,
            msg : 'Internal Server Error',
        });
    }
}

//profile view controller
async function get_profile(req,res)
{
    try
    {
        const userData = await userModel.findOne({_id:req.user.uid});

        res.status(200).json({
            status : 200,
            msg : 'Successs',
            data : userData,
        });
    }
    catch(e)
    {
        res.status(500).json({
            status : 500,
            msg : 'Ineternal Server Error',
        });
    }
}

module.exports = {
    user_signup,
    user_login,
    get_profile,
}