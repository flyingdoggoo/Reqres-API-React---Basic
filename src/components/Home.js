import React from 'react'
import bocchiLogo from '../assets/images/bocchi.jpg'
const Home = () => {
    return (<>
        <img
          src={bocchiLogo}
          width="100%"
          height="100%"
          className="d-inline-block align-top"
          alt="Bocchi the Rock logo"
        ></img>
    </>)
}
export default Home