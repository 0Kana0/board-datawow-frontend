"use client"
import React, { useState }  from 'react'
import "../../../styles/auth.css"
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const AuthPage = () => {
  const [authInfo, setAuthInfo] = useState({
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    signIn("credentials", {
      username: authInfo.username,
      redirect: true,
      callbackUrl: '/'
    })
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-signin">
          <p>Sign in</p>
          <div className="auth-form">
            <input 
              type="text" 
              placeholder="Username" 
              name='username'
              value={authInfo.username}
              onChange={handleChange}
              className="auth-input" 
            />
            <button className="auth-button" onClick={()=>handleSubmit()}>Sign In</button>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-logo">
          <Image 
            src='/0fbc43f49761bea793b24e9f6af1620580a39d2f.png' 
            width={300}
            height={230}
            alt='auth image'
            className='auth-img'
          />
          <Link href="/" className="auth-link">a Board</Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPage