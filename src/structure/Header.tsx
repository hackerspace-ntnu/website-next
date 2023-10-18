import { useState } from 'react'

import Logo from '../assets/logo.png'
import { FaMoon, FaSun } from 'react-icons/fa'

import { useModal } from '../context/modal/ModalHook'
import Button from '../components/Button'


// Header Interface
interface HeaderProps {

}

// Header Function: The header for the website.
const Header: React.FC<HeaderProps> = () => {
  const modal = useModal();

  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(d => !d)
    document.body.classList.toggle("dark")
  }

  return (
    <div className='flex flex-row items-center justify-between p-8 h-20 bg-secondary-200 dark:bg-secondary-900'>
      <div className='flex flex-row items-center space-x-8'>
        <img className='h-16 w-16' src={Logo} />
        <p className='dark:text-text-50 text-text-950 font-black text-3xl'>HACKERSPACE</p>
      </div>
      <div className='flex flex-row items-center'>
        <button onClick={toggleTheme} className='p-4 h-min rounded-full text-white'>
          {
            dark ? <FaSun /> : <FaMoon />
          }
        </button>
        <Button onClick={() => modal.open("auth")} className='btn-primary hover:btn-primary-hover active:btn-primary-active'>Sign in</Button>
      </div>
    </div>
  )
}

export default Header