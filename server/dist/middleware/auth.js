import jwt from 'jsonwebtoken';
// interface JwtPayload {
//   username: string;
// }
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const token = req.headers['authorization']?.split(' ')[1] || "";
    if (!token) {
        res.sendStatus(401); // Unauthorized
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY || "") || { username: "" };
    if (!data) {
        res.sendStatus(403); // Forbidden
    }
    next();
};
