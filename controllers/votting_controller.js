const candidateModel = require('../model/candidate_model');
const CandidateModel = require('../model/candidate_model');
const UserModel = require('../model/user_model');


//vote method
async function vote(req,res)
{
    try
    {
        const userData = await UserModel.findOne({_id : req.user.uid});

        //check admin or not
        if(userData.role === 'admin')
        {
            return res.status(403).json({
                status : 403,
                msg : 'admin can\'t vote',
            });
        }

        //cheack voted or not
        if(userData.isVoted)
        {
            return res.status(402).json({
                status : 402,
                msg : 'Already Voted',
            });
        }

        //find candidate
        const candidateData = await candidateModel.findOne({_id:req.params.cid});
        
        //update detail
        candidateData.votes.push({
            voter : req.user.uid
        });
        candidateData.TotalVotes++;

        //user vote change
        userData.isVoted = true;

        //save in databse
        await candidateData.save();
        await userData.save();
        
        //send response
        res.status(202).json({
            status : 202,
            msg : 'voted',
        });

    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            status : 500,
            msg : 'Internal Server Error',
        });
    }
}

//poll method 
async function voteCount(req,res)
{
    try
    {
        const candidates = await candidateModel.find().sort({TotalVotes:'desc'});

        const result = candidates.map((data)=>{
            return {
                candidates : data.name,
                counts : data.TotalVotes,
                party : data.party,
            }
        });

        return res.status(200).json({
            staus:200,
            data : result,
        });
    }
    catch(e)
    {
        return res.status(500).json({
            staus:500,
            msg : 'Internal Server Error',
        });
    }
}



module.exports ={
    vote,
    voteCount,
}