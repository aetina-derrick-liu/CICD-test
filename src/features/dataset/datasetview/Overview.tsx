import { useParams, Link } from 'react-router-dom'
import { datasetEndpoint } from '@constants/endpoints'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import UploadFormModal from '@components/Modals/UploadFormModal'
import MyPopover from '@components/Popover'
import { useDelete, useDatasetImages } from '@hooks/useDataset'

export default function OverviewTab () {
  const { datasetId } = useParams<{ datasetId: string }>()
  if (!datasetId) {
    return <div>dataset Not Found</div>
  }
  const [showModal, setShowModal] = useState(false)

  const endpointUrl = `${datasetEndpoint}/${datasetId}/upload`
  const { data, isLoading, isError, error, refetch } = useDatasetImages(datasetId)
  const deleteDatasetImages = useDelete()
  const handleDelete = async (datasetId: string, images: string[]) => {
    await deleteDatasetImages({ datasetId, images })
  }

  if (!data) {
    return <div>No Images</div>
  }

  return <div className=' flex flex-col'>
    <div className='font-bold py-2 flex justify-between '>
    <span>Upload Datasets</span>
    </div>
    <UploadFormModal onSave={() => { void refetch() }} endpointUrl={endpointUrl} size='lg' open={showModal} title="Upload Dataset" onClose={() => { setShowModal(false) }}/>

    <div className="container mx-auto px-4" >
        <div
        className={'flex items-center justify-center max-w-xl mx-auto w-full mb-4'} onClick={() => { setShowModal(true) }}>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className={'flex flex-col items-center justify-center pt-5 pb-6 '}>
                    <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
            </label>
        </div>
    </div>
      { isLoading
        ? <div>Loading...</div>
        : isError
          ? <div>{(error as Error).message}</div>
          : <>
              <div className=' py-2 border-b'>{data.length} Assets in Dataset</div>
              <div className=' flex gap-2 py-2 flex-wrap'>
                  {data?.map((image, index) => (
                  <div key={index} className=' flex flex-col text-center border'>
                      <div className=''>
                          <img src={image.url} alt="JPEG" className=' w-52 h-36 object-cover object-center'/>
                      </div>
                      <div className=' h-10 flex items-center p-2 justify-between bg-info/70 text-secondary shadow-lg '>
                          <span className=' max-w-[208px] overflow-x-hidden'>{image.name}</span>
                          {/* <EllipsisVerticalIcon className=' w-6 h-6 cursor-pointer'/> */}
                              <MyPopover>
                              <div className=' flex flex-col'>
                              <Link to={`/app/dataset/${datasetId}/annotator/${image.name}`}>
                                <div className=" flex items-center border w-full cursor-pointer transition-all hover:bg-light/30" >
                                    <PencilIcon className='ml-1 w-6 h-6 text-primaryColor' aria-hidden="true" />
                                    <div className="flex p-2 w-full" >
                                        <span className="text-sm font-medium w-full">
                                        {'Annotatation '}
                                        </span>
                                        <span className="text-sm font-medium w-full">
                                        {' '}
                                        </span>
                                    </div>

                                </div>
                                </Link>
                                <div className=" flex items-center border w-full cursor-pointer transition-all hover:bg-light/30" onClick={() => {
                                  void handleDelete(datasetId, [image.name])
                                }} >
                                    <TrashIcon className='ml-1 w-6 h-6 text-danger' aria-hidden="true" />
                                    <div className="flex p-2 w-full" >
                                        <span className="text-sm font-medium w-full">
                                        {'Delete  '}
                                        </span>
                                        <span className="text-sm font-medium w-full">
                                        {' Image '}
                                        </span>
                                    </div>
                                </div>
                              </div>
                              </MyPopover>
                      </div>
                  </div>
                  ))}
              </div>
           </>
      }
    </div>
}
