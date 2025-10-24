'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { authApi, setTokens, clearTokens } from './api'
import { extractUserFromToken } from './jwt'

interface User {
  id: string | number
  email: string
  username: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  userRole: 'user' | 'admin'
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode  }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Prevent running on the server
    if (typeof window === 'undefined') return

    const initializeAuth = async () => {
      try {
        console.log('[v0] Initializing auth...')
        const refreshToken = localStorage.getItem('refreshToken')
        const accessToken = localStorage.getItem('accessToken')

        console.log(
          '[v0] Tokens found - refreshToken:',
          !!refreshToken,
          'accessToken:',
          !!accessToken
        )

        if (refreshToken) {
          console.log('[v0] Attempting to refresh token and fetch profile...')
          const [refreshResponse, profileResponse] = await Promise.all([
            authApi.refreshToken(),
            authApi.getUserProfile()
          ])

          console.log('[v0] Refresh response:', refreshResponse)
          console.log('[v0] Profile response:', profileResponse)

          if (refreshResponse.success && refreshResponse.data) {
            const { accessToken: newAccessToken } = refreshResponse.data
            setTokens(newAccessToken, refreshToken)

            if (profileResponse.success && profileResponse.data) {
              const profileData = profileResponse.data
              setUser({
                id: profileData.id,
                email: profileData.email,
                username: profileData.username,
                role: (profileData.role as 'user' | 'admin') || 'user'
              })
              console.log('[v0] User authenticated with profile data:', profileData)
            } else {
              const userData = extractUserFromToken(newAccessToken)
              if (userData) setUser(userData)
              console.log('[v0] User authenticated via token extraction')
            }

            setIsAuthenticated(true)
          } else {
            console.log('[v0] Refresh failed:', refreshResponse.error)
            clearTokens()
            setIsAuthenticated(false)
          }
        } else if (accessToken) {
          console.log('[v0] Using existing access token, fetching profile...')
          const profileResponse = await authApi.getUserProfile()
          console.log('[v0] Profile response:', profileResponse)

          if (profileResponse.success && profileResponse.data) {
            const profileData = profileResponse.data
            setUser({
              id: profileData.id,
              email: profileData.email,
              username: profileData.username,
              role: (profileData.role as 'user' | 'admin') || 'user'
            })
            setIsAuthenticated(true)
            console.log('[v0] User authenticated with profile data')
          } else {
            const userData = extractUserFromToken(accessToken)
            if (userData) {
              setUser(userData)
              setIsAuthenticated(true)
              console.log('[v0] User authenticated via token extraction')
            }
          }
        } else {
          console.log('[v0] No tokens found, user not authenticated')
          setIsAuthenticated(false)
        }
      } catch (err) {
        console.error('[v0] Error initializing auth:', err)
        clearTokens()
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authApi.login(email, password)
      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data
        setTokens(accessToken, refreshToken)

        const profileResponse = await authApi.getUserProfile()
        if (profileResponse.success && profileResponse.data) {
          const profileData = profileResponse.data
          setUser({
            id: profileData.id,
            email: profileData.email,
            username: profileData.username,
            role: (profileData.role as 'user' | 'admin') || 'user'
          })
        } else {
          const userData = extractUserFromToken(accessToken)
          if (userData) setUser(userData)
        }

        setIsAuthenticated(true)
        return true
      } else {
        setError(response.error || 'Login failed')
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authApi.register(username, email, password)
      if (response.success) return true
      setError(response.error || 'Registration failed')
      return false
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearTokens()
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  // Only log on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[v0] AuthProvider rendered. isAuthenticated:', isAuthenticated)
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userRole: user?.role || 'user',
        isLoading,
        error,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
