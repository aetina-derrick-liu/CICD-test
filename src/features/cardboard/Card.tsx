
import { StopCircleIcon, UserCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
interface Props {
  project: { _id: string, name: string, type?: string }
}

function Card (props: Props) {
  const { project } = props
  const deleteProject = () => {
    fetch(`http://172.23.70.61:3000/api/project?projectId=${project._id}`, {
      method: 'DELETE'
    })
      .then(async res => await res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  let textColor
  switch (project.type) {
    case 'classification':
      textColor = ' text-yellow-600'
      break
    case 'segmentation':
      textColor = ' text-red-800'
      break
    case 'Object Detection':
      textColor = ' text-green-800'
      break
    default:
      textColor = ' text-green-800'
  }
  return (
    <>
    <div className={' flex cursor-pointer rounded px-2 py-3 border shadow-md bg-white min-w-full '}>
        <div className="flex h-full w-full flex-col">
          <div className="flex justify-between text-xs ">
            <div className="flex">SW-</div>
            <div className=' flex gap-1'>
            <UserCircleIcon className=' w-4 h-4' />
            <TrashIcon onClick={() => { deleteProject() }} className=' w-4 h-4 rounded-full transition-all hover:bg-red-400/50'/>
            </div>

          </div>
    <Link to={`/app/project/${project._id}/workflow`}>
          <span className={'py-1 text-sm   '} >{project.name}</span>
          <div className="mt-1 flex justify-between  text-xs items-center gap-1 ">
            <div className=' flex items-center gap-1'>
            <StopCircleIcon className=' w-3 h-3' />
            <span className={`${textColor}`}>{project.type}</span>
            </div>
          </div>
          </Link>

        </div>

      </div>
      <div className="h-2"></div>

    </>
  )
}

export default Card
