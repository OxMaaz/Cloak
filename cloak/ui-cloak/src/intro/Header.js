import React from 'react'
import { useNavigate } from 'react-router-dom';
import Description from './Description';

const Header = () => {

  const navigate = useNavigate();
  return (
    <div >


      <>

        {/* logo on the left side */}
        <h1>Cloak</h1>
        {/* "how it works" on the right side*/}
        <h4 onClick={() => navigate(<Description />)}>How it works?</h4>

      </>

      {/* at the bottom of the logo */}
      <button style={{border: '4px solid red'}} onClick={() => navigate('/cloak')}>Launch app</button>


    </div>
  )
}

export default Header
