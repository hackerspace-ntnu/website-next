import { useState } from 'react'
import './App.css'

import TypeWriter from './TypeWriter'

const init_code = '#include <hckspc.h>\n\n \
int main(void)\n \
{\n \
\thckspc::website.attach("86.232.45.122");\n \
\thckspc::website.redirect("/about");\n \
}'

function App() {

  const [code, setCode] = useState(init_code);

  return (
    <div className=''>
      {/* Header */}
      <div className='flex flex-col justify-center p-4 h-20 bg-secondary-900'>
        <p className='text-text-50 font-black text-3xl'>HACKERSPACE</p>
      </div>

      {/* Content */}
      <div className='p-4'>
        <p className='text-text-50 font-black text-3xl'>Testing</p>

        <TypeWriter className='text-primary-500 font-mono display-linebreak whitespace-pre-line' text={code} delay={10} />
      </div>
    </div>
  )
}

export default App
