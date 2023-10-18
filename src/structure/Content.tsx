import { } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Home from '../pages/Home'

//mport Logo from '../assets/logo.png'


// Content Interface
interface ContentProps {

}

// Content Function: The content for the website.
const Content: React.FC<ContentProps> = () => {

  return (
    <div id="content" className='flex flex-col h-screen overflow-y-auto'>
      <Header />
      <div className='flex flex-col grow'>
        <Routes>
          <Route path='/'>
            <Route index element={ <Home /> } />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default Content