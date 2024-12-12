'use client' // This indicates that this is a client component

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import AuthRedirect from '@/components/AuthRedirect'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  const { data: session, status } = useSession()

  // Redirect logic based on session status
  useEffect(() => {
    if (status === 'unauthenticated') {
      // Optionally handle redirection or other logic here
    }
  }, [status])

  if (status === 'loading') {
    return <p>Loading...</p> // Show loading state while fetching session
  }

  return <>{session ? children : <AuthRedirect lang={locale} />}</>
}
