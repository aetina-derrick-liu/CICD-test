import SelectBox from '../../components/Input/SelectBox'
import ShareIcon from '@heroicons/react/24/outline/ShareIcon'

const periodOptions = [
  { name: 'Object Detection', value: 'Object Detection' },
  { name: 'Classification', value: 'classification' },
  { name: 'Segmentation', value: 'segmentation' }
]

function TopBar () {
  return (
        <div className=" flex max-w-[50vw]">

            <div className="text-right flex w-full h-full ">
            <SelectBox
                options={periodOptions}
                containerStyle="w-72 bg-white"
                labelStyle="hidden "
                updateFormValue={() => {}}
            />
            <div>
                <button className="inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center
                 text-center rounded-lg h-12 px-4 text-sm min-h-12 font-semibold btn-sm normal-case"><ShareIcon className="w-4 mr-2"/>Share</button>

            </div>
            </div>
        </div>
  )
}

export default TopBar
