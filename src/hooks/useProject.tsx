import { createContext, type PropsWithChildren, useContext, useState } from 'react'

interface ProjectInfo {
  _id: string
  name: string
  statusId: string
  type?: string
}

interface ProjectContext {
  project: ProjectInfo
  setProject: (project: ProjectInfo) => void
}

const projectContext = createContext<ProjectContext | null>(null)

export function useProject () {
  return useContext(projectContext)
}

export function ProjectProvider ({ children }: PropsWithChildren) {
  const [project, setProject] = useState<ProjectInfo>({
    _id: '',
    name: '',
    statusId: ''
  })

  return <projectContext.Provider
    value={{ project, setProject }}
  >
    {children}
  </projectContext.Provider>
}
