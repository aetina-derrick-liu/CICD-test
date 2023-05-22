import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SelectBox from '@components/Input/SelectBox'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import ErrorText from '@components/Typography/ErrorText'

function SettingBar () {
  const [BatchSize, setBatchSize] = useState(40)
  const [epochs, setEpochs] = useState(40)

  const notify = () => {
    const resolveWithSomeData = new Promise<string>(resolve => setTimeout(() => { resolve(' OK') }, 3000))
    void toast.promise(
      resolveWithSomeData,
      {
        pending: {
          render () {
            return 'Waiting for data initial'
          }
          // other options
        },
        success: {
          render (data: any) {
            return 'Start Training'
          },
          // other options
          icon: <CheckIcon className=' w-4 h-4 text-'/>
        },
        error: {
          render ({ data }: any) {
            // When the promise is rejected, data will contain the error
            return <ErrorText>{data.message}</ErrorText>
          }
        }
      }
    )
  }

  const modelsOptions = [{ name: 'ResNet50', value: 'ResNet50' }, { name: 'DenseNet', value: 'DenseNet' }, { name: 'PeopleNet', value: 'PeopleNet' }]
  const exportOptions = [{ name: 'etlt', value: 'etlt' }, { name: 'tensorRT', value: 'tensorRT' }]
  const GPUOptions = [{ name: 'T4', value: 'T4' }, { name: 'Tesla', value: 'Tesla' }]

  return (
        <div className="w-full h-full  bg-white shadow-lg flex flex-col rounded  text-start py-4 overflow-y-scroll ">
            <div className=" w-full mx-5 flex flex-col pr-20 ">
                <div className=" w-full mb-5 text-lg font-medium " >Training Options</div>
                <div className=" w-full m-2 flex flex-col  gap-2">
                <SelectBox updateFormValue={() => {}} labelTitle=' Model Select' options={modelsOptions}/>

                <div className=" w-full my-2 " >BatchSize:   {BatchSize}</div>
                <input type="range" min="0" max="100" value={BatchSize} onChange={(e: any) => { setBatchSize(e.target.value) }} className=" range-forest" />
                <div className=" w-full my-2 " >Epochs:      {epochs}</div>
                <input type="range" min="0" max="100" value={epochs} onChange={(e: any) => { setEpochs(e.target.value) }} className=" range-success" />
                <SelectBox updateFormValue={() => {}} labelTitle=' Models Export' options={exportOptions}/>
                <SelectBox updateFormValue={() => {}} labelTitle=' GPU options' options={GPUOptions}/>
                </div>
            </div>
            <div className=" w-full p-4 rounded cursor-pointer text-md flex justify-between text-white">
                <button className=" btn-sm rounded w-1/2 cursor-pointer mr-2 bg-red-700 hover:bg-red-500 py-2 ">Delete</button>
                <button onClick={notify} className=' btn-sm rounded w-1/2 cursor-pointer bg-green-500 hover:bg-green-300 '>Run</button>
            </div>
            <ToastContainer />

        </div>
  )
}
export default SettingBar
