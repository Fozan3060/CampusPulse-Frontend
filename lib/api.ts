const API_BASE_URL = "http://localhost:3001/api"

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("refreshToken")
}

function setTokens(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

function clearTokens() {
  if (typeof window === "undefined") return
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("user")
}

async function apiCall<T>(endpoint: string, options: RequestInit = {}, requiresAuth = false): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (requiresAuth) {
    const token = getAccessToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    let data: any = null
    const contentType = response.headers.get("content-type")
    const contentLength = response.headers.get("content-length")

    // Only try to parse JSON if there's content
    if (contentLength !== "0" && contentType?.includes("application/json")) {
      try {
        data = await response.json()
      } catch (parseError) {
        console.warn(`[API Warning] Failed to parse JSON response from ${endpoint}:`, parseError)
        data = null
      }
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || response.statusText || "Unknown error"
      console.error(`[API Error] ${options.method || "GET"} ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        message: errorMessage,
        responseData: data,
      })
      return {
        success: false,
        error: errorMessage,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error(`[API Network Error] ${options.method || "GET"} ${endpoint}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    }
  }
}

export const authApi = {
  register: async (username: string, email: string, password: string) => {
    return apiCall<{ accessToken: string; refreshToken: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    })
  },

  login: async (email: string, password: string) => {
    return apiCall<{ accessToken: string; refreshToken: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  logout: async () => {
    const refreshToken = getRefreshToken()
    return apiCall(
      "/auth/logout",
      {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
      },
      true,
    )
  },

  refreshToken: async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      console.error("[API Error] No refresh token available")
      return { success: false, error: "No refresh token" }
    }

    return apiCall<{ accessToken: string }>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
    })
  },

  getUserProfile: async () => {
    return apiCall<{ id: number; username: string; email: string; role: string }>("/users/me", {}, true)
  },
}

export const adminApi = {
  addEvent: async (eventData: any) => {
    return apiCall(
      "/admin/add-event",
      {
        method: "POST",
        body: JSON.stringify(eventData),
      },
      true,
    )
  },
}

export { getAccessToken, getRefreshToken, setTokens, clearTokens }
