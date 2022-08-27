const interviewDb = require("../Models/interviewModel");

module.exports.createInterview = async (userId, interviewerId, request) => {
    const interview = await interviewDb.create({
        userId,
        interviewerId,
        request
    });
    return interview;
}

module.exports.interviewById = async (id) => {
    const interview = await interviewDb.findById(id);
    return interview;
}

module.exports.interviewByInterviewerId = async (interviewerId) => {
    const interviews = await interviewDb.find({ interviewerId });
    return interviews;
}

module.exports.interviewByUserId = async (userId) => {
    const interviews = await interviewDb.find({ userId });
    return interviews;
}

module.exports.interviewerPopulate = async (requests) => {
    const requestData = await interviewDb.populate(requests, {
        path: "interviewerId",
        select: ["name", "pic", "interviewer", "email", "mobile", "company", "_id"]
    });
    return requestData;
}

module.exports.interviewUserPopulate = async (requests) => {
    const requestData = await interviewDb.populate(requests, {
        path: "userId",
        select: ["name", "pic", "interviewer", "email", "mobile", "domain", "_id"]
    });
    return requestData;
}

module.exports.saveRequest = async (request) => {
    await request.save();
}

module.exports.updateInterviewById = async (id,body) => {
    const interview = await interviewDb.findByIdAndUpdate(id,body)
    return interview;
}