import React from 'react'
import Row from '../../../components/Row'
import Hero from '../../../components/client/Hero'

type Props = {}

const Home = (props: Props) => {
  return (
    <>
    
    <Row rowID='1' rateSpin={true} title="Phim đang chiếu" fetchURL={ `https://api.themoviedb.org/3/movie/popular?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN&page=1`} />
    <Row rowID='2' title="Voucher đang có" fetchURL={ `https://api.themoviedb.org/3/movie/popular?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN&page=2`} />
    <Row rowID='3' title="Top comment" fetchURL={ `https://api.themoviedb.org/3/movie/popular?api_key=9bd1fca078c46b654329af4ca6eef6b3&language=vi-VN&page=3`} />
    <Hero />
    
    
    </>
  )
}

export default Home