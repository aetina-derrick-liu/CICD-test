import { Fragment, useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'

interface Props {
  open?: boolean
  children?: React.ReactNode
  title?: string
  size?: string
  endpointUrl?: string
  onSave?: () => void
  onClose?: () => void

}

interface IDropZone {
  onFilesSelected: (files: FileList) => void
  formDataList: FormData[]
  setFormDataList: (formData: FormData[]) => void
}
const maxSizeInBytes = 2 * 1024 * 1024 // 2MB

function DropZone ({ onFilesSelected, formDataList, setFormDataList }: IDropZone) {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    // 如果檔案清單為空，就返回
    if (!fileList) return
    const fileArray = Array.from(fileList)
    const newformDataList = [...formDataList]

    // console.log(fileArray)
    // 將所有檔案讀取為 URL 並存儲到預覽圖片的陣列中
    await Promise.all(
      fileArray.map(async (file) => {
        if (file.size > maxSizeInBytes) {
          alert('檔案大小超過 2MB')
          return
        }
        return await new Promise<string>((resolve, reject) => {
          const newformData = new FormData()
          newformData.append('file', file)
          newformDataList.push(newformData)

          const reader = new FileReader()
          reader.onload = () => { resolve(reader.result?.toString() ?? '') }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })
    )
      .then((urlArray) => {
        console.log(newformDataList)
        const newPreviewImages = [...previewImages, ...urlArray]
        setFormDataList(newformDataList)

        setPreviewImages(newPreviewImages)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleDragEnter (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  function handleDragOver (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragLeave (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  function handleDrop (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    const newformDataList = [...formDataList]
    if (files.length > 0) {
      onFilesSelected(files)
    }
    const fileArray = Array.from(files)
    // 將所有檔案讀取為 URL 並存儲到預覽圖片的陣列中

    Promise.all(
      fileArray.map(async (file) => {
        const newformData = new FormData()
        newformData.append('file', file)
        newformDataList.push(newformData)
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          console.log(file.size)
          if (file.size > maxSizeInBytes) {
            alert('檔案大小超過 2MB')
            reject(new Error('file size over 2MB'))
          }
          reader.onload = () => { resolve(reader.result?.toString() ?? '') }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })
    )
      .then((urlArray) => {
        if (urlArray.length === 0) {
          return
        }
        console.log(urlArray)
        const newPreviewImages = [...previewImages, ...urlArray]
        setPreviewImages(newPreviewImages)
        setFormDataList(newformDataList)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
    <div
      className={`flex items-center justify-center max-w-xl mx-auto w-full mb-4 ${
        isDragging ? 'bg-red-400' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      >
    <label htmlFor="dropzone-file" className={`flex transition-allflex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800
     dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 
     dark:hover:border-gray-500 dark:hover:bg-gray-600
     ${isDragging ? ' bg-green-200' : ''}`}>
        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${isDragging ? ' text-gray-300' : 'text-gray-400'}`}>
            <ArrowUpTrayIcon className={'w-10 h-10 mb-3 text-gray-400 '} fill="none" stroke="currentColor" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input accept=".jpg, .png" id="dropzone-file" type="file" className="hidden" onChange={handleFileInputChange} />
    </label>

    </div>
    <div className=' flex flex-wrap gap-2'>
    {previewImages.length > 0 && previewImages.map((url, index) => (<div key={index}>
            <img src={url} alt="" className=' w-52 h-36 object-cover object-center'/>
        </div>)

    )}
</div>
    </>
  )
}

export default function UploadFormModal ({ open, children, endpointUrl, title = 'Default Title', onSave = () => {}, onClose = () => {} }: Props) {
  const [formDataList, setFormDataList] = useState<FormData[]>([])
  function handleFilesSelected (files: FileList) {
    for (let i = 0; i < files.length; i++) {
      void uploadFile(files[i])
    }
  }

  const onSubmit = async () => {
    await Promise.all((formDataList.map(async (formData) => {
      if (!endpointUrl) {
        return
      }
      const request = new Request(endpointUrl, {
        method: 'POST',
        body: formData
      })
      await fetch(request)
        .then((response) => {
          console.log(response)
          if (response.ok) {
            console.log('文件上传成功！')
            // 在此处进行上传成功后的处理，例如显示上传成功信息或者显示上传的图片等
            onSave()
          } else {
            console.log('文件上传失败！')
            console.error(response)
            // 在此处进行上传失败后的处理，例如显示上传失败信息等
          }
        })
        .catch((error) => {
          console.error('文件上传出错！')
          console.error(error)
          // 在此处进行上传出错后的处理，例如显示上传出错信息等
        })
    })))
  }
  const cancelButtonRef = useRef(null)
  async function uploadFile (file: File) {
    const newformDataList = [...formDataList]
    const newformData = new FormData()
    newformData.append('file', file)
    newformDataList.push(newformData)
    setFormDataList(newformDataList)
  }
  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={(e) => { onClose() }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"

        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 " />
        </Transition.Child>

        <div className="fixed inset-0 z-10  overflow-y-auto">
          <div className="flex min-h-full items-end  justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-y-scroll py-4
              rounded-lg bg-white text-left shadow-xl
              transition-all sm:my-8 sm:w-full sm:max-w-6xl  ">
                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title as="h3" className="font-semibold text-2xl pb-6 text-center">
                        {title}
                      </Dialog.Title>
                      <DropZone formDataList={formDataList} setFormDataList={setFormDataList} onFilesSelected={handleFilesSelected} />
                      {/* {children} */}
                    </div>
                  </div>
                </div>
                <div className=" mt-3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-success px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      void onSubmit()
                      onClose()
                      onSave()
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      onClose()
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
