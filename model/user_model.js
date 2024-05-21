const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { throwDeprecation } = require('process');

//user schema
const userSchema = mongoose.Schema({
    name :
    {
        type:String,
        require:true,
    },
    age:
    {
        type:Number,
        require:true,
    },
    password:
    {
        type:String,
        require:true,
    },
    phonenumber:
    {
        type:String,
        require:true,
    },
    adharnumber :
    {
        type:Number,
        require:true,
        unique:true,
    },
    role:
    {
        type:String,
        require:true,
        enum : ['voter','admin'],
        default : 'voter'
    },
    isVoted:
    {
        type:Boolean,
        default : 'false',
    }
});


//password hashing
userSchema.pre('save',async function(next){
    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashval = await bcrypt.hash(this.password,salt);
        this.password = hashval;
        next();
    }
    catch(e)
    {
        console.log(e);
    }
});


//password comapre method
userSchema.methods.comparepwd = function()
{
    console.log("method called");
}

userSchema.methods.comparePassword = async function(userpwd)
{
    try
    {
        const isMatched = await bcrypt.compare(userpwd,this.password);
        return isMatched;
    }
    catch(e)
    {
        throw e;
    }
}

//user model
const userModel = mongoose.model('user',userSchema);

//export model
module.exports = userModel;