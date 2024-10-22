const isUserAuthorized = (req, res, next) => {
    const { role } = req.body;

    if(role !== "admin") {
       return res.status(403).send({statusCode: 403, message:"Sorry, you are unauthorized"})

    }
    next()
}

module.exports = isUserAuthorized;