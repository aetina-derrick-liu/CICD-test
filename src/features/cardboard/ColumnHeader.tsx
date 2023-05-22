import React, { useRef, useState } from 'react'
import Modal from '@components/Modals/FormModal'
import InputText from '@components/Input/InputText'
import { type project, type Status } from './CardColumn'
import SelectBox from '@components/Input/SelectBox'
import useProjects from '@hooks/useProjects'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

const periodOptions = [
  { name: 'Object Detection', value: 'objectdetection' },
  { name: 'Classification', value: 'classification' },
  { name: 'Segmentation', value: 'segmentation' }
]
const backboneOptions = [
  { name: 'ResNet50', value: 'ResNet50' },
  { name: 'DarkNet 19/53', value: 'DarkNet 19/53' },
  { name: 'VGG16', value: 'VGG16' }
]
const modelOptions = [
  { name: 'YOLO', value: 'YOLO' }
]

const ColumnHeader = ({ status }: { status: Status }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { projects, setProjects } = useProjects()

  const newProject = useRef<project>({ name: '', type: periodOptions[0].value })
  const updateSelectBoxValue = ({ updateVar, value }) => {
    newProject.current = { ...newProject.current, type: value }
  }
  const saveNewProject = async () => {
    const newData = [...projects]
    const index = newData.findIndex((item) => item.status._id === status._id)
    newProject.current = { ...newProject.current, statusId: status._id }
    // fetch post
    const projectInfo = await fetch('http://172.23.70.61:3000/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject.current)
    })
      .then(async (res) => await res.json())
      .then(async (projectInfo) => {
        const configInfo = await fetch('http://172.23.70.61:3000/api/config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ projectId: projectInfo._id, type: projectInfo.type })
        }).then(async (res) => await res.json())
        console.log(configInfo)
        return projectInfo
      })
      // .then(async (projectInfo) => {
      //   // create dataset
      //   const datasetInfo = await fetch('http://172.23.70.61:3000/api/dataset/addsample', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ projectId: projectInfo._id, type: projectInfo.type })
      //   }).then(async (res) => await res.json())
      //   console.log(datasetInfo)
      //   return projectInfo
      // })

    newData[index].projects.push(projectInfo) && setProjects(newData)
  }
  const updateFormValue = (data) => {
    newProject.current = { ...newProject.current, name: data.value }
  }
  return (
      <>
      <div className="flex h-10 justify-between px-2 pb-3 w-full ">
        <div className=' p-1'>
          <p className="mr-0 mb-5 text-sm font-bold  ">{status.name}</p>
        </div>
        <div className=' cursor-pointer transition-all hover:bg-gray-400 p-1 hover:text-white'
        onClick={() => { setIsOpen(true) }} >
        <PlusIcon className='mr-0 mb-5 w-5 h-5 ' />
        </div>

      </div>
      <Modal title='Add new project'
      open={isOpen}
      onClose={() => { setIsOpen(false) }}
      onSave={() => { saveNewProject() }}>
              <InputText type="text" updateType="prjectName" containerStyle="mt-4 w-3/4" labelTitle="Project Name" updateFormValue={updateFormValue}/>

              <SelectBox
              options={periodOptions}
              labelTitle=" Select Project type"
              labelStyle=" justify-start"
              containerStyle="w-full sm:w-3/4 mt-4"
              defaultValue=" Object Detection"
              updateFormValue={updateSelectBoxValue}
              />

              <SelectBox
              options={backboneOptions}
              labelTitle=" Select Backbone "
              containerStyle="w-full sm:w-3/4 mt-4"
              defaultValue=" ResNet50"
              updateFormValue={() => {}}
             />

              <SelectBox
              options={modelOptions}
              labelTitle=" Select Model type"
              containerStyle="w-full sm:w-3/4 mt-4"
              defaultValue=" YOLO "
              updateFormValue={(e) => { }}
              />
        </Modal>
        </>
  )
}
export default ColumnHeader
