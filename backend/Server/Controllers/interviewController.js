const { createInterview, interviewByUserId, interviewerPopulate, interviewByInterviewerId, interviewUserPopulate, interviewById, saveRequest, updateInterviewById } = require('../Services/interviewService');

module.exports.createInterview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { interviewerId, request } = req.body;
        await createInterview(userId, interviewerId, request);
        return res.status(200).json({ message: "Request send succefully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message, error })
    }
}

module.exports.getRequest = async (req, res) => {
    try {
        const request = await interviewByInterviewerId(req.user._id);
        if (request.length === 0) {
            res.status(500).json({ message: "No requests found" })
        } else {
            const requestData = await interviewUserPopulate(request);
            requestData.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt;
            });
            res.send({
                status: "success",
                requests: requestData
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, error })
    }
}

module.exports.interviewShedule = async (req, res) => {
    try {
        const { requestId, date, time, link } = req.body;
        const request = await interviewById(requestId)
        if (request) {
            request.date = date;
            request.time = time;
            request.link = link;
            request.confirmed = true;
            request.status = "Confirmed";
            console.log(request);
            await saveRequest(request);
            res.status(200).json({ message: "Interview scheduled" })
        } else {
            res.status(401).json({ message: "Request not found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.cancelInterview = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await interviewById(requestId);
        if (request) {
            request.link = "Nill"
            request.cancelled = true;
            request.status = "Cancelled";
            await saveRequest(request);
            res.status(200).json({ message: "Interview cancelled" })
        } else {
            res.status(401).json({ message: "Request not found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const requests = await interviewByUserId(userId);
        if (requests.length !== 0) {
            const requestData = await interviewerPopulate(requests)
            requestData.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt
            });
            res.send({ status: "success", requests: requestData })
        } else {
            res.send({ message: "No requests found!" });
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getupcomingInterviews = async (req, res) => {
    try {
        const request = await interviewByUserId(req.user._id);
        if (request.length === 0) {
            res.status(500).json({ message: "No upcoming interviews" })
        } else {
            const requestData = await interviewerPopulate(request);
            const upcoming = requestData.filter((data) => {
                return (
                    data.userConfirmed === true &&
                    data.date.getTime() >= new Date().getTime()
                );
            });
            const upcomingCount = upcoming.length;

            const pending = requestData.filter((data) => {
                return data.confirmed === false && data.cancelled === false;
            })
            const pendingCount = pending.length;

            const completed = requestData.filter((data) => {
                return data.status === "Completed";
            });
            const completedCount = completed.length;

            upcoming.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt;
            });
            res.send({
                upcoming,
                pending,
                completed,
                upcomingCount,
                pendingCount,
                completedCount
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message, error })
    }
}

module.exports.getupcomingData = async (req, res) => {
    try {
        const requests = await interviewByInterviewerId(req.user._id);
        if (requests.length !== 0) {
            const requestData = await interviewUserPopulate(requests);
            const upcoming = requestData.filter((data) => {
                return (
                    data.userConfirmed === true &&
                    data.date.getTime() >= new Date().getTime()
                );
            });
            const upcomingCount = upcoming.length;

            const pending = requestData.filter((data) => {
                return data.confirmed === false && data.cancelled === false;
            })
            const pendingCount = pending.length;

            const completed = requestData.filter((data) => {
                return data.status === "Completed";
            });
            const completedCount = completed.length;

            upcoming.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt;
            });
            res.send({
                upcoming,
                pending,
                completed,
                upcomingCount,
                pendingCount,
                completedCount
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.setInterviewStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await interviewById(req.params?.id);
        if (request) {
            request.status = status;
            await saveRequest(request);
            res.status(200).json({ message: "Status updated" })
        } else {
            res.status(401).json({ message: "Request not found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.uploadFeedback = async (req, res) => {
    try {
        const file = req.file && req.file.path;
        const request = await interviewById(req.params?.id);
        if (request) {
            request.feedback = file;
            request.status = "Completed";
            await saveRequest(request);
            res.status(200).json({ message: "Feedback uploaded" })
        } else {
            res.status(401).json({ message: "Request not found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.userConfirmation = async (req, res) => {
    try {
        const { requestId } = req.body;
        const query = {
            userConfirmed: true,
            status: "Confirmed"
        }
        const confirming = await updateInterviewById(requestId, query)
        if (confirming) {
            res.status(200).send({ message: "Cancelled" });
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    } catch (error) {
        res.send(500).error
    }
}

module.exports.userCancellation = async (req, res) => {
    try {
        const { requestId } = req.body;
        const query = {
            userCancelled: true,
            status: "Cancelled"
        }
        const cancellation = await updateInterviewById(requestId, query)
        if (cancellation) {
            res.status(200).send({ message: "Cancelled" });
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.userCompletedInterviews = async (req, res) => {
    try {
        const userId = req.user._id;
        const interviews = await interviewByUserId(userId);
        if (interviews.length !== 0) {
            const myInterviews = interviews.filter((data) => {
                if (data.status === "Completed") {
                    return data;
                }
            });
            const Data = await interviewerPopulate(myInterviews);
            Data.sort((dateA, dateB) => {
                return dateB.createdAt - dateA.createdAt
            })
            res.status(200).json({ status: 'success', interviews: Data });
        }
    } catch (error) {
        res.status(500).send(error)
    }
}