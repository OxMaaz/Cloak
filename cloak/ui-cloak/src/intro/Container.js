import React from 'react'
import Header from './Header'
import Description from './Description'
import Footer from './Footer'
import Qna from './Qna'

const Container = () => {
  return (
    <div className='bg-[#FFF7F7]'>
      <Header />
      <Description />
      <Qna/>
      <Footer />

    </div>
  )
}

export default Container
