import Link from 'next/link'
import React from 'react'

const SigninButton = () => {
  return (
    <div className="signin-desktop">
      <Link 
        href="/auth" 
        className='button'
      >
        Sign In
      </Link>
    </div>
  )
}

export default SigninButton