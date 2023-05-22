import { createContext, type PropsWithChildren, useContext, useState } from 'react'

interface Issue {
  id?: string
  name?: string
  type?: string
}

interface Status {
  id: number
  name: string
}
interface Project {
  status: Status
  projects: Issue[]
}
interface ProjectsContext {
  projects: Project[]
  setProjects: (project: Project[]) => void
}

const projectsContext = createContext<ProjectsContext | null>(null)

export default function useProjects () {
  return useContext(projectsContext)
}

export function ProjectsProvider ({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<Project[]>([])

  return <projectsContext.Provider
  value={{ projects, setProjects }}
  >
    {children}
  </projectsContext.Provider>
}
