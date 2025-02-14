import React from 'react'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../footer/Footer'
import { SmallScreenSearch } from '../searchBar/SmallScreenSearch'
export const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <SmallScreenSearch/>
        <div className="main-content min-vh-90 pt-5">
            {children}
        </div>
        <Footer/>
    </div>
  )
}
