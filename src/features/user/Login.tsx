import { useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorText from '../../components/Typography/ErrorText'
import InputText, { type formFuncInput } from '../../components/Input/InputText'
import { useCookies } from 'react-cookie'

function Login () {
  const [cookies, setCookie] = useCookies(['token'])
  const INITIAL_LOGIN_OBJ = {
    name: '',
    password: ''
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (loginObj.name.trim() === '') { setErrorMessage('Email Id is required! (use any value)'); return }
    if (loginObj.password.trim() === '') { setErrorMessage('Password is required! (use any value)') } else {
      setLoading(true)
      // Call API to check user credentials and save token in localstorage
      // fetch login API and save token in localstorage
      try {
        const res = await fetch('http://172.23.70.61:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginObj)
        })
        if (res.status !== 200 && !res.ok) throw new Error('Something went wrong')

        const { token } = await res.json()

        if (token) {
          // expired date is 7 days from now
          setCookie('token', token, { path: '/', maxAge: 7 * 24 * 60 * 60 })
          setLoading(false)
          window.location.href = '/app/cardboard'
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateFormValue = ({ updateType, value }: formFuncInput) => {
    setErrorMessage('')
    console.log(updateType, value)
    setLoginObj({ ...loginObj, [updateType]: value })
  }

  return (
        <div className="min-h-screen flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1 border rounded-xl">
                <div className=' '>
                        {/* <LandingIntro /> */}
                </div>
                <div className='py-24 px-10 '>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={(e) => { submitForm(e) }}>

                        <div className="mb-4">

                            <InputText type="text" defaultValue={loginObj.name} updateType="name" containerStyle="mt-4" labelTitle="Account" updateFormValue={updateFormValue} labelStyle={''} placeholder={''}/>

                            <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} labelStyle={''} placeholder={''}/>

                        </div>

                        <div className='text-right text-'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text- hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={'btn mt-2 w-full btn-' + (loading ? ' loading' : '')}>Login</button>

                        <div className='text-center mt-4'>Dont have an account yet? <Link to="/register"><span className="  inline-block  hover:text- hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Login
