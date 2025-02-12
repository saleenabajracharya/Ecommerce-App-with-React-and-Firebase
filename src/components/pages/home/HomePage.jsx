import React from 'react'
import { Layout } from '../../layout/Layout'
import { HeroSection } from '../../heroSection/HeroSection'
import { Category } from '../../category/Category'
import { HomePageProductCard } from '../../homePageProductCard/HomePageProductCard'
import { SmallScreenSearch } from '../../searchBar/SmallScreenSearch'
import { Track } from '../../track/Track'
export const HomePage = () => {
  return (
    <div>
        <Layout>
        <SmallScreenSearch/>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        </Layout>
    </div>
  )
}
