import SideBar from './ProjectSidebar'
import PageContent from '../PageContent'

function ProjectLayout () {
  return (
        <>
        <div className=' flex h-screen min-w-[100vw] overflow-y-scroll'>
        <SideBar/>
        <PageContent/>
        </div>

</>
  )
}

export default ProjectLayout
