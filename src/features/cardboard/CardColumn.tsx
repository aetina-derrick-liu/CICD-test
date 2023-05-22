import { Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './StrictModeDroppable'
import Card from './Card'
import ColumnHeader from './ColumnHeader'

export interface project {
  _id: string
  name: string
  type?: string
}
export interface Status {
  _id: string
  name: string
}

interface CardData {
  status: Status
  projects: project[]
}

interface Props {
  cardData: CardData
  columnIndex: number
}

const CardBoardColumn = (props: Props) => {
  const {
    cardData: { status, projects = [] },
    columnIndex
  } = props

  const cards = projects.map((project, index: number) => {
    return (
      // render each Draggable card using map
      <Draggable draggableId={project._id} key={project._id} index={index}>
        {/* // draggableId: id of card  */}
        {(provided: any, snapshot: any) => (
          // expand the necessary props of react-beautiful-dnd
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {/* card component */}
            <Card project={project} />
          </div>
        )}
      </Draggable>
    )
  })

  return (
    <div className="flex h-full flex-col w-72 ">
      <ColumnHeader status={status} />

      <StrictModeDroppable droppableId={`${columnIndex}`} key={`${columnIndex}`}>
        {/* // droppableId: the Id of card column */}

        {(provided: any, snapshot: any) => (
          <div className="h-full" {...provided.droppableProps} ref={provided.innerRef}>
            <div>{cards}</div>
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  )
}

export default CardBoardColumn
