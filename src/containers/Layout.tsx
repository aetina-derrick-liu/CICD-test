import LeftSideBar from './LeftSideBar'
import PageContent from './PageContent'
import Login from '@features/user/Login'
import { useCookies } from 'react-cookie'

function Layout () {
  const [cookies, setCookie] = useCookies()
  // check if token is present in cookies
  if (cookies.token == null) {
    window.location.href = '/login'
    return <Login/>
  }

  return (
        <div className=' flex h-screen w-screen overflow-y-scroll'>
        <LeftSideBar/>
        <PageContent/>
        </div>
  )
}

export default Layout
