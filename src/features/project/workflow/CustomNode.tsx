import { Handle, Position } from 'reactflow'
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
interface Props {
  data: any
  isConnectable: boolean
}

function TextUpdaterNode ({ data, isConnectable }: Props) {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className={' cursor-pointer rounded px-2 py-3 shadow-md bg-white w-56 '}>
        <div className="flex h-full w-full flex-col">
          <div className="flex justify-between text-xs  ">
            <div className="flex text-">{data.label}</div>
            <BookmarkIcon className=' w-4 h-4' />
          </div>
          <span className={'py-1 text-sm   '} >{data.description}</span>
          <div className="mt-1 flex  text-xs gap-2 ">
            <CheckIcon className=' w-4 h-4 border border- rounded-full text-'/>
            <span >{data.status}</span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </>
  )
}

export default TextUpdaterNode
