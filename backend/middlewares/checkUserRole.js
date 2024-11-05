const jwt = require("jsonwebtoken");
//controllo se c'è un token e da userRole alla request da usare nelle routes
const checkUserRole = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    const token = authorizationHeader && authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({ statusCode: 403, message: "Unauthorized access, token missing" });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Aggiungo il ruolo dello user alla richiesta
        req.userRole = decoded.role;

        next();
    } catch (error) {
        return res.status(401).send({ statusCode: 401, message: "Invalid token" });
    }
};

module.exports = checkUserRole;
