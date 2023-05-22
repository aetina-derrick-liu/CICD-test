import { useState, useRef } from 'react'
import DatasetCard from './DatasetCard'
import { FolderPlusIcon } from '@heroicons/react/24/outline'
import Modal from '@components/Modals/FormModal'
import SelectBox, { type FormFuncInput } from '@components/Input/SelectBox'
import InputText from '@components/Input/InputText'
import DatasetGroups, { useCreate } from '@hooks/useDatasetGroups'
import { type IDataset } from '@hooks/useDataset'

const DATASET_TYPES = [{ name: 'Classification', value: 'image_classification' }, { name: 'Object Detection', value: 'object_detection' }]
const Dataset = () => {
  const [showModal, setShowModal] = useState(false)
  const newDataset = useRef<IDataset>({ id: '', name: '', description: '', type: 'image_classification', format: 'default' })
  const { data, isLoading, isError, error, refetch } = DatasetGroups()

  const updateFormValue = ({ updateType, value }: FormFuncInput) => {
    console.log(updateType, value)
    newDataset.current = { ...newDataset.current, [updateType]: value, format: value === 'image_classification' ? 'default' : 'kitti' }
  }

  return (
        <div className=' w-full flex flex-col'>
            {/* <div className=' w-full'>
                <UploadForm />
            </div> */}
            <div className=' grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-2'>
            {/*  render dataset as a table */}
                <div className=' container rounded-md p-2 my-2' onClick={() => { setShowModal(true) }}>

                    <label htmlFor="dropzone-file" className="flex rounde flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className={'flex flex-col items-center justify-center pt-5 pb-6 '}>
                            <FolderPlusIcon className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to create a new dataset </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Object-Detection or Classification</p>
                        </div>
                    </label>
                </div>
            { isLoading
              ? <div>Loading...</div>
              : isError
                ? <div>{(error as Error).message}</div>
                : data.map((dataset: any) => {
                  return <DatasetCard key={dataset._id} {...dataset}/>
                })
            }
            <Modal open={showModal} onClose={() => { setShowModal(false) }} title='Create a new Dataset'
            onSave={() => {
              useCreate(newDataset.current, refetch)
            }}>
                <SelectBox labelTitle='Dataset Type' containerStyle=' w-1/2'
                updateFormValue={updateFormValue}
                updateType='type' options={DATASET_TYPES}/>
                <div className=' w-3/4 flex flex-col'>
                    <InputText labelTitle='Dataset Name' type='text' updateType='name' updateFormValue={updateFormValue}/>
                    <InputText labelTitle='Dataset Description' type='text' updateType='description' updateFormValue={updateFormValue}/>
                </div>
            </Modal>

            </div>
        </div>
  )
}

export default Dataset
