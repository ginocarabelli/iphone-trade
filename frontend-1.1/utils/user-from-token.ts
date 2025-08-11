import jwt_decode from "jwt-decode"

export interface JwtPayload {
    sub: string        // El email o username
    //role?: string      Depende de cómo armes tu token
    exp?: number
    iat?: number
}

export function getUserFromToken(token: string): { username: string; role: string } | null {
    try {
        const decoded = jwt_decode<JwtPayload>(token)
        return {
            username: decoded.sub,
            role: "USER",
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error)
        return null
    }
}
