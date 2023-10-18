import classNames from 'classnames';
import { } from 'react'

import { FaInstagram, FaFacebook, FaSlack } from 'react-icons/fa'

import Logo from '../assets/logo.png'


// Footer Interface
interface FooterProps {

}

// Footer Function: The footer for the website.
const Footer: React.FC<FooterProps> = () => {
  const footerClasses = {
    'text-text-950 dark:text-text-50': true,
    'w-full p-8': true,
    'bg-accent-500': true,
    'space-y-28': true
  }

  const footerSectionWrapperClasses = {
    'flex flex-row': true,
    'divide-x-2 divide-accent-800 dark:divide-accent-200': true,
  };

  const footerSectionClasses = {
    'flex flex-col space-y-8': true,
    'w-full px-20': true,
  }

  return (
    <div className={classNames(footerClasses)}>
      <div className={classNames(footerSectionWrapperClasses)}>
        <div className={classNames(footerSectionClasses)}>
          <div className='flex flex-row items-center space-x-8'>
            <img className='h-16 w-16' src={Logo} />
            <p className='dark:text-text-50 text-text-950 font-black text-3xl'>HACKERSPACE</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Har du funnet en bug?</p>
            <p>Send gjerne en mail til DevOps,
            bruk #dev-public kanalen på Slack,
            eller gi oss forslag til forbedringer på GitHub.</p>
          </div>
        </div>
        <div className={classNames(footerSectionClasses)}>
          <div className='space-y-2'>
            <p className='font-bold'>Verksted</p>
            <p>Realfagbygget, A-blokka</p>
            <p>Høgskoleringen 5, 7034 Trondheim</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Åpningstider</p>
            <p>Alle hverdager, 10:15 - 18:00</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Kontakt oss</p>
            <a href='mailto:hackerspace-styret@idi.ntnu.no'>hackerspace-styret@idi.ntnu.no</a>
            <div className='flex flex-row justify-start space-x-8 h-10'>
              <FaInstagram className='h-full w-10' />
              <FaFacebook className='h-full  w-10' />
              <FaSlack className='h-full  w-10' />
            </div>
          </div>
        </div>
        <div className={classNames(footerSectionClasses)}>
          <p>Hackerspace ipsum dolor sit amet, coding enthusiasts consectetur adipiscing elit. Pythno ac volutpat felis. Quisque eget nisi id terminal vehicula suscipit. In hac habitasse machine learning dictumst. Vivamus cursus metus VR tech tristique, fostering creativity elementum libero tristique. Integer sagittis sapien sit amet odio venenatis, programming vitae fringilla ligula convallis. Our dynamic community et arcu at ante rutrum volutpat. Aliquam erat volutpat. Sed id efficitur lorem. Fusce nec ligula ullamcorper, innovation laoreet elit vel, feugiat nulla. Join us today luctus scelerisque ipsum, at facilisis odio. Sed lacinia, cutting-edge</p>
        </div>
      </div>
      <div className='flex flex-row space-x-32 justify-center'>
        <p className='text-2xl font-light'>NTNU</p>
        <p className='text-2xl font-light'>Nettverket KID</p>
        <p className='underline'>Vilkår for bruk av nettside</p>
        <p>© 2023 Hackerspace NTNU</p>
      </div>
    </div>
  )
}

export default Footer