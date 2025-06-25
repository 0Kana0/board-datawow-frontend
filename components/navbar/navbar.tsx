import React from 'react'
import Logo from './logo'
import SigninButton from './signinbutton'
import "../../styles/navbar.css"
import Menu from './menu'

const Navbar = () => {
  return (
    <nav>
      {/**Logo */}
      <Logo />
      {/**SigninButton */}
      <SigninButton />
      {/**Menu */}
      <Menu />
    </nav>
  )
}

export default Navbar