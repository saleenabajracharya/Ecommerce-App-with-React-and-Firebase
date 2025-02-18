import React, { useContext } from 'react'
import { Layout } from '../../layout/Layout'
import { HeroSection } from '../../heroSection/HeroSection'
import { Category } from '../../category/Category'
import { HomePageProductCard } from '../../homePageProductCard/HomePageProductCard'
import { SmallScreenSearch } from '../../searchBar/SmallScreenSearch'
import { Track } from '../../track/Track'
import { myContext } from '../../../context/myContext'
export const HomePage = () => {
  const context = useContext(myContext);
  if (!context) {
    console.error("Context is not available. Make sure MyState wraps the component.");
    return <p>Error: Context not found</p>;
  }
  const {name} = context
  return (
        <Layout>
        <SmallScreenSearch/>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        {name}
        </Layout>
  )
}
