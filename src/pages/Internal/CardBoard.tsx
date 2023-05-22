import CardBoard from '../../features/cardboard'
import { ProjectsProvider } from '@hooks/useProjects'
function InternalPage () {
  return (
    <ProjectsProvider>
      <CardBoard />
    </ProjectsProvider>
  )
}

export default InternalPage
