const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedUser = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY
        );

        req.user = decodedUser;
        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

module.exports = auth;