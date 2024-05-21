const candidateModel = require('../model/candidate_model');
const userModel = require('../model/user_model');

//candidate resgister
async function reg_candidate(req,res)
{
    try
    {
        const userData = await userModel.findOne({_id:req.user.uid});
        
        if(!(userData.role === 'admin'))
        {   
            res.status(403).json({
                status:403,
                msg: 'You are not an admin',
            });
        }

        const body_payload = req.body;

        const newCandidate = new candidateModel(body_payload);

        const result = await newCandidate.save();

        res.status(201).json({
            status:201,
            msg: 'Candidate Created',
            CandidateData : result,
        });
    }
    catch(e)
    {
        res.status(500).json({
            status:500,
            msg: 'Inernal Server Error',
        });
    }
}

//candidate show
async function show_candidate(req,res)
{
    try
    {
        const candidateData = await candidateModel.find();
        res.status(200).json({
            status : 200,
            msg : 'success',
            totalcandidate : candidateData.length,
            data : candidateData
        });
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            status : 500,
            msg : 'Internal Server error',
        });
    }
}


//candidate update
async function update_candidate(req,res)
{
    try
    {
        const userData = await userModel.findOne({_id : req.user.uid});

        if(!(userData.role === 'admin'))
        {
            res.status(403).json({
                status:403,
                msg:'only admin can change candidate data',
            });
        }    

        const CandidateData = await candidateModel.findOne({ _id : req.params.cid});

        if(!CandidateData)
        {   
            res.json(404).json({
                status:404,
                msg:'Candidate Not Found / Invalid Id',
            });
        }    

        //get body data 
        const bodyPayload = req.body;

        const updatedData = await candidateModel.findByIdAndUpdate(req.params.cid,bodyPayload);

        res.status(202).json({
            status: 202,
            msg: 'Updated',
        });
        

    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({
            status : 500,
            msg : 'Internal Serever Error'
        });
    }
}

module.exports = {
    reg_candidate,
    show_candidate,
    update_candidate,   
}