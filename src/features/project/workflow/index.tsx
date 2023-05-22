import { useEffect, useState } from 'react'
import ReactFlow, { Background, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import SettingBar from './TrainSetting'
import TextUpdaterNode from './CustomNode'
import { useProject } from '@hooks/useProject'

const initialNodes = [
  {
    id: 'node-1',
    position: { x: 100, y: 100 },
    data: { label: 'Dataset', description: 'Import Datasets', status: 'done' },
    type: 'customNode'
  },
  {
    id: 'node-2',
    position: { x: 100, y: 250 },
    data: { label: 'Augmentation', description: 'Not Selected', status: 'done' },
    type: 'customNode',
    animated: true
  },
  {
    id: 'node-3',
    position: { x: 100, y: 400 },
    data: { label: 'Model Select', description: 'ResNet50', status: 'done' },
    type: 'customNode'
  },
  {
    id: 'node-4',
    position: { x: 100, y: 550 },
    data: { label: 'Validation', description: 'Not Selected', status: 'done' },
    type: 'customNode'
  }
]
const reactFlowStyle = {
  width: '10%',
  height: 10
}
const nodeTypes = { customNode: TextUpdaterNode }
const initialEdges = [{ id: 'edge-1', source: 'node-1', target: 'node-2', animated: true }, { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true }, { id: 'edge-3', source: 'node-3', target: 'node-4', animated: true }]
function WorkFlow () {
  const { project } = useProject()
  useEffect(() => {
    console.log(project)
  }, [project])
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [state, setState] = useState(false)
  return (
    <>
    <div className=' w-full h-full flex justify-center items-center'>
        <ReactFlow defaultNodes={nodes} edges={edges} onClick={() => { setState((current) => (!current)) }} nodeTypes={nodeTypes} fitView>
      <Background className=' bg-/50' variant='lines' />
      <MiniMap/>
    </ReactFlow>
    </div>
    <div className={` w-[280px] shadow-2xl h-full fixed z-20 top-0
    translate-x-0 transition-all text-third bg-secondary ${state ? 'right-0' : 'right-[-280px]'}`}>
    <SettingBar/>
    </div>
    </>

  )
}

export default WorkFlow
