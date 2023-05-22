
import Training from './Training'
import { useParams } from 'react-router-dom'
import Overview from './Overview'
import { ProjectProvider } from '@hooks/useProject'

function renderSettingType (settingType: string | undefined) {
  switch (settingType) {
    case 'overview':
      return <Overview />
    case 'workflow':
      return <Training />
  }
}

function Project () {
  const { internalType } = useParams()
  const projectId = useParams<{ projectId: string }>().projectId

  console.log(projectId)

  return (
    <>
    <ProjectProvider>
    {renderSettingType(internalType)}
    </ProjectProvider>
    </>

  )
}

export default Project
