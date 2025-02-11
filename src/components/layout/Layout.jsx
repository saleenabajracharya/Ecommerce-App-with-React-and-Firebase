import React from 'react'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/Footer'

export const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <div className="main-content min-vh-100 pt-5">
            {children}
        </div>
        <Footer/>
    </div>
  )
}
