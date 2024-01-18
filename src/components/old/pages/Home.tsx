import Bg from '../assets/bg.jpg'

import TypeWriter from '../components/TypeWriter'
import Page from '../structure/Page';


// Home Function: This is the homepage, should be located at (/).
const Home: React.FC = () => {
  const numbers = Array.from({ length: 5 }, (_, index) => 1 + index);
  
  return (
    <Page>
      <div className='relative'>
        <div className='flex items-center justify-center overflow-hidden h-content'>
          <img className='h-full w-full shrink-0' src={Bg} />
        </div>
        <p className='absolute top-2/3 left-10 text-text-50 font-black text-3xl'>Hello</p>
      </div>
      <p className='text-text-50 font-black text-3xl'>Some fancy stuff</p>
      {
        numbers.map((i, n) => (
          <TypeWriter key={i} className='text-primary-500 font-mono display-linebreak whitespace-pre-line w-min hover:animate-ping' text={"website.redirect('/about')"} delay={n ** 4} />
        ))
      }
      {
        numbers.map((i, n) => (
          <TypeWriter key={i} className='text-primary-500 font-mono display-linebreak whitespace-pre-line w-min hover:animate-ping' text={"website.redirect('/about')"} delay={n ** 4} />
        ))
      }
      {
        numbers.map((i, n) => (
          <TypeWriter key={i} className='text-primary-500 font-mono display-linebreak whitespace-pre-line w-min hover:animate-ping' text={"website.redirect('/about')"} delay={n ** 4} />
        ))
      }
      {
        numbers.map((i, n) => (
          <TypeWriter key={i} className='text-primary-500 font-mono display-linebreak whitespace-pre-line w-min hover:animate-ping' text={"website.redirect('/about')"} delay={n ** 4} />
        ))
      }
      {
        numbers.map((i, n) => (
          <TypeWriter key={i} className='text-primary-500 font-mono display-linebreak whitespace-pre-line w-min hover:animate-ping' text={"website.redirect('/about')"} delay={n ** 4} />
        ))
      }
    </Page>
  )
}

export default Home
