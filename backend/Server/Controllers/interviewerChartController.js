const { interviewByInterviewerId } = require("../Services/interviewService");


module.exports.interviewerChart = async(req,res) => {
    try {
        const id = req.user._id;
        const interviewData = await interviewByInterviewerId(id)
        if (interviewData.length !==0 ) {
            const order = interviewData.map((data) => data.status);
            const uniqueOrder = [...new Set(order)];
            const data = [];
            for (const  unique of uniqueOrder ) {
                let count = 0;
                for ( const ord of order ) {
                    if ( unique === ord ) {
                        count ++;
                    }
                }
                data.push(count);
            }

            const requests = interviewData.length;
            const completedInterviews = interviewData.filter((data) => ( data.status === 'Completed' ))
            const interviews = completedInterviews.length

            res.status(200).json({
                orderStatus:uniqueOrder,
                orderStatusValue:data,
                interviews,
                requests
            })
        } else {
            res.send({message:"Data not found"})
        }
    } catch (error) {
        res.status(500).send(error);
    }
}