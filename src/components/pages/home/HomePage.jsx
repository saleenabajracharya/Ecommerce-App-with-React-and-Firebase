import React from 'react'
import { Layout } from '../../layout/Layout'
import { HeroSection } from '../../heroSection/HeroSection'
import { Category } from '../../category/Category'
import { HomePageProductCard } from '../../homePageProductCard/HomePageProductCard'

export const HomePage = () => {
  return (
    <div>
        <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        </Layout>
    </div>
  )
}
