import Button from '@components/Buttons'
import { Link } from 'react-router-dom'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import MyPopover from '@components/Popover'
import { useDelete } from '@hooks/useDatasetGroups'
import Modal from '@components/Modals/FormModal'
import { useState } from 'react'
import InputText from '@components/Input/InputText'
interface IDatasetGroup {
  _id?: string
  name?: string
  description?: string
  created_on?: string
  last_modified?: string
  train_dataset: IDataset
  eval_dataset: IDataset
  test_dataset: IDataset
}
interface IDataset {
  id: string
  name: string
  description: string
  created_on?: string
  last_modified?: string
  type?: string
  format?: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatasetCard = ({ _id, name, description, train_dataset, eval_dataset, test_dataset }: IDatasetGroup) => {
  const [showModal, setShowModal] = useState(false)
  const deleteDatasetGroup = useDelete()
  // datasetGroups
  const handleDelete = async (id: string) => {
    try {
      await deleteDatasetGroup(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
        <div className=' border-gray-300 rounded-md p-2 my-2'>
            <div className="max-w-sm rounded  shadow-lg">
                <img className="w-full" src="/src/assets/card-sample.jpg" alt="Sunset in the mountains"/>
                <div className="px-6 py-4 w-full">
                    <div className="font-bold text-xl mb-2 flex justify-between w-full">
                      <span>{name}</span>
                      <MyPopover>
                      <div className="  flex items-center border w-full bg-white cursor-pointer transition-all hover:bg-light/50 px-1" onClick={() => {
                        setShowModal(true)
                      }} >
                        <PencilSquareIcon className=' w-6 h-6 text-primary' />
                        <div className="flex py-2 px-1 w-full" >
                            <span className="text-sm font-medium w-full">
                            {'Edit '}
                            </span>
                        </div>
                    </div>
                    <div className="  flex items-center border w-full bg-white cursor-pointer transition-all hover:bg-light/50 px-1" onClick={() => {
                      if (!_id) {
                        return
                      }
                      void handleDelete(_id)
                    }} >
                        <TrashIcon className=' w-6 h-6 text-danger' />
                        <div className="flex py-2 px-1 w-full" >
                            <span className="text-sm font-medium w-full">
                            {'Delete'}
                            </span>
                        </div>
                    </div>

                    </MyPopover>
                    </div>
                    <p className="text-gray-700 text-base">
                    {description}
                    </p>

                </div>
                <div className="px-6 pt-2 pb-2 flex justify-center gap-3">

                    <Link to={`/app/dataset/${train_dataset.id}`}>
                      <Button onClick={() => { }} className="  flex w-16 items-center justify-center rounded-2xl bg-primaryColor transition-all duration-300 hover:bg-primaryColor/80" type='default' >Train</Button>
                    </Link>
                    <Link to={`/app/dataset/${test_dataset.id}`}>
                    <Button onClick={() => { }} className="  flex w-16 items-center justify-center rounded-2xl bg-primaryColor transition-all duration-300 hover:bg-primaryColor/80" type='default' >Test</Button>
                    </Link>
                    {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#class</span> */}
                    <Link to={`/app/dataset/${eval_dataset.id}`}>
                    <Button className="flex w-16 items-center justify-center rounded-2xl bg-primaryColor transition-all duration-300 hover:bg-primaryColor/80" type='default' >Val</Button>
                    </Link>
                </div>
                </div>
                <Modal open={showModal} title="Edit DatasetGroup Classes" onClose={() => { setShowModal(false) }}>
    <InputText labelTitle='Label name' placeholder="Add a label" updateType='' updateFormValue={() => {}}/>

  </Modal>
        </div>

  )
}

export default DatasetCard
