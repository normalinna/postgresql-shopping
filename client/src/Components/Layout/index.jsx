import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import CartModal from "../CartModal"
import Header from "../Header"

import './styles.scss'

const Layout = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
      setOpen(!open)
  }

  return (
    <>
      <Header toggle={toggle} />
      {open && <CartModal toggle={toggle}/>}
      <div className="main">
        <Outlet />
      </div>
      <footer className="footer">
         Company Name © 2022
      </footer>
    </>
  )
}
  
  export default Layout