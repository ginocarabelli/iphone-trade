import Cookies from "js-cookie";

export async function fetchUserById(userId: number) {
    const token = Cookies.get("token")
    try {

        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo obtener el usuario`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error en fetchUserById:", error)
        throw error
    }
}
