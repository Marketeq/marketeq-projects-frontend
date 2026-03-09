'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth'
import { InvitationsAPI } from '@/service/http/invitations'
import { Button } from '@/components/ui'
import Cookies from 'js-cookie'

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setUser } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  const inviteToken = searchParams.get('token')

  const signInWithAnotherAccount = () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    setUser(null)
    const redirect = inviteToken
      ? `/accept-inviations?token=${inviteToken}`
      : '/accept-inviations'
    router.push(`/sign-in?redirect=${encodeURIComponent(redirect)}`)
  }

  useEffect(() => {
    const authToken = Cookies.get('access_token')
    
    if (!inviteToken) {
      setStatus('error')
      setMessage('Invalid invitation link')
      return
    }

    if (!authToken) {
      // Redirect to sign-in with return URL
      router.push(`/sign-in?redirect=/accept-invitation?token=${inviteToken}`)
      return
    }

    // Accept the invitation
    InvitationsAPI.acceptInvitation(inviteToken)
      .then((response) => {
        setStatus('success')
        setMessage('Invitation accepted successfully!')
        setTimeout(() => router.push('/my-team'), 2000)
      })
      .catch((error) => {
        const rawMessage = error?.response?.data?.message || error.message || 'Failed to accept invitation'
        if (String(rawMessage).includes('Invitation email mismatch')) {
          setStatus('error')
          setMessage('You are signed in with a different account. Please sign in using the invited email address and try again.')
          return
        }
        setStatus('error')
        setMessage(rawMessage)
      })
  }, [inviteToken, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-500" />
            <h2 className="text-xl font-semibold">Accepting invitation...</h2>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-green-600">{message}</h2>
            <p className="text-gray-600 mt-2">Redirecting to your team...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-500 text-4xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-6 space-y-2">
              <Button className="w-full" onClick={() => router.push('/my-team')}>
                Go to My Team
              </Button>
              <Button
                variant="outlined"
                className="w-full"
                onClick={signInWithAnotherAccount}
              >
                Sign In
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}