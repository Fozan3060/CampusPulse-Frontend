'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

useEffect(() => {
  if (isLoading) return

  setTimeout(() => {
    if (isAuthenticated) {
      router.replace('/dashboard')
    } else {
      router.replace('/auth/login')
    }
  }, 1000)
}, [isAuthenticated, isLoading, router])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400'>
      <div className='text-center'>
        <div className='inline-block'>
          <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
        </div>
        <p className='mt-4 text-white text-lg font-medium'>
          Loading CampusPulse...
        </p>
      </div>
    </div>
  )
}
