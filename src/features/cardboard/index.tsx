import { DragDropContext } from 'react-beautiful-dnd'
import CardBoardColumn from './CardColumn'
import TopBar from './TopBar'
import useProjects from '@hooks/useProjects'
import { useEffect } from 'react'

interface Issue {
  id?: string
  name?: string
  type?: string
}

interface Status {
  _id: number
  name: string
}

interface CardData {
  status: Status
  projects: Issue[]
}

function CardBoard () {
  const { projects, setProjects } = useProjects()

  useEffect(() => {
    fetch('http://172.23.70.61:3000/api/statuses')
      .then(async res => await res.json()).then(data => {
        // data is an array of statues
        const cardBoardData: CardData[] = data.map((status: any) => {
          return {
            status: {
              _id: status._id,
              name: status.name
            },
            projects: []
          }
        })
        return cardBoardData
      })
      .then((cardBoardData) => {
        void fetch('http://172.23.70.61:3000/api/projects')
          .then(async res => await res.json()).then(async data => {
            // data is an array of projects
            await data.forEach((project: any) => {
              const statusIndex = cardBoardData.findIndex((cardData: CardData) => cardData.status._id === project.statusId)
              cardBoardData[statusIndex].projects.push(project)
            }
            )
            setProjects(cardBoardData)
          })
      })
      .catch(err => { console.log(err) })
  }, [])

  const onDragEnd = (e: any) => {
    const { source, destination } = e
    if (!destination) {
      return
    }
    const newData = [...projects]
    const [removeItem] = newData[source.droppableId].projects.splice(source.index, 1)
    newData[destination.droppableId].projects.splice(destination.index, 0, removeItem)
    setProjects(newData)
  }

  const columns = projects.map((cardData: CardData, columnIndex: number) => {
    const propsToColumn = { cardData, columnIndex }
    return <CardBoardColumn key={`${columnIndex}`} {...propsToColumn} />
  })
  return (
      <div className="flex h-full flex-col gap-4  ">
          {/** ---------------------- Select Period Content ------------------------- */}
          <TopBar/>
          {/** ---------------------- Drag-Drop Placeholder ------------------------- */}

          <DragDropContext
            onDragEnd={(e: any) => {
              onDragEnd(e)
            }}
            onDragStart={(e: any) => {
            }}
          >
            <div className="flex h-full mt-2 gap-4 overflow-x-scroll">{columns}</div>
          </DragDropContext>
        </div>
  )
}

export default CardBoard
