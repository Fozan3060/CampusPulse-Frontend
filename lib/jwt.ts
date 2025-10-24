export function decodeJWT(token: string): any {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      console.error("[JWT] Invalid token format")
      return null
    }

    // Decode the payload (second part)
    const payload = parts[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch (error) {
    console.error("[JWT] Error decoding token:", error)
    return null
  }
}

export function extractUserFromToken(token: string) {
  const decoded = decodeJWT(token)
  if (!decoded) return null

  return {
    id: decoded.userId || decoded.sub || decoded.id || "",
    email: decoded.email || "",
    username: decoded.username || "",
    role: (decoded.role || "user") as "user" | "admin",
  }
}
