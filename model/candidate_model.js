const mongoose = require('mongoose');
const { type } = require('os');

//candidate schema
const candidateSchema = mongoose.Schema({
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
    party:
    {
        type:String,
        require:true,
        unique : true,
    },
    votes:[
        {
            voter:
            {
                type:mongoose.Schema.Types.ObjectId,
                require:true,
            },
            votedAt:
            {
                type:Date,
                default:Date.now()
            }
        }
    ],
    TotalVotes:
    {
        type:Number,
        default:0,
    }
});


//candidate mdoel
const candidateModel = mongoose.model('candidate',candidateSchema);

//export candidate schema
module.exports = candidateModel;