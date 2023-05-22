import React, { useEffect, useState, type ChangeEvent } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'

interface IUploadForm {
  endpointUrl: string
}

interface IDropZone {
  onFilesSelected: (files: FileList) => void
  formDataList: FormData[]
  setFormDataList: (formData: FormData[]) => void
}

function DropZone ({ onFilesSelected, formDataList, setFormDataList }: IDropZone) {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    // 如果檔案清單為空，就返回
    if (!fileList) return
    console.log(fileList)
    const fileArray = Array.from(fileList)
    const newformDataList = [...formDataList]

    console.log(fileArray)
    // 將所有檔案讀取為 URL 並存儲到預覽圖片的陣列中
    Promise.all(
      fileArray.map(async (file) => {
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
    if (files.length > 0) {
      onFilesSelected(files)
    }
    const fileArray = Array.from(files)
    console.log(files)
    console.log(fileArray)
    // 將所有檔案讀取為 URL 並存儲到預覽圖片的陣列中
    Promise.all(
      fileArray.map(async (file) => {
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => { resolve(reader.result?.toString() ?? '') }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })
    )
      .then((urlArray) => {
        const newPreviewImages = [...previewImages, ...urlArray]
        setPreviewImages(newPreviewImages)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
    <div
      className={`flex items-center justify-center max-w-xl mx-auto w-full mb-4 ${
        isDragging ? 'bg-red-200' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      >
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${isDragging ? ' text-gray-300' : 'text-gray-400'}`}>
            <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileInputChange} />
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

function UploadForm ({ endpointUrl }: IUploadForm) {
  const [formDataList, setFormDataList] = useState<FormData[]>([])
  useEffect(() => {
    console.log('formDataList', formDataList)
  }, [formDataList])

  function handleFilesSelected (files: FileList) {
    for (let i = 0; i < files.length; i++) {
      void uploadFile(files[i])
    }
  }

  async function uploadFile (file: File) {
    const newformDataList = [...formDataList]
    const newformData = new FormData()
    newformData.append('file', file)
    newformDataList.push(newformData)
    setFormDataList(newformDataList)
  }

  return (
    <div className="container mx-auto px-4 w-[1024px]">
        {/* <Button onClick={() => { void onSubmit() }} type='' className=' bg-green-100 text-black' >Submit</Button> */}

      <DropZone formDataList={formDataList} setFormDataList={setFormDataList} onFilesSelected={handleFilesSelected} />
    </div>
  )
}

export default UploadForm
