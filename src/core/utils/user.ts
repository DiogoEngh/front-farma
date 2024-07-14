import * as jwt from 'jwt-decode';

function getUsernameFromToken(token: string) {
    try {
        const decodedToken = jwt.jwtDecode(String(token));
        return decodedToken;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}

export default getUsernameFromToken;