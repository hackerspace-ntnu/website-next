import { FaUser } from 'react-icons/fa'

import Modal from '../structure/Modal'
import Button from '../components/Button'
import Field from '../components/Field'

// AuthModal Function: Modal for authenticating the user.
const AuthModal: React.FC = () => {
  return (
    <Modal
      title="Authentication"
      icon={<FaUser />}
    >
      <Field 
        title="Email"
        required
      />
      
      <Field 
        title="Password"
        type='password'
        required
      />
      <div className='flex flex-row space-x-2 w-full'>
        <Button className="btn-primary hover:btn-primary-hover active:btn-primary-active disabled:btn-gray-active w-full" big>Sign in</Button>
        <Button big disabled className="btn-primary hover:btn-primary-hover active:btn-primary-active disabled:btn-gray-active w-full">Disabled</Button>
      </div>
    </Modal>
  )
}

export default AuthModal
