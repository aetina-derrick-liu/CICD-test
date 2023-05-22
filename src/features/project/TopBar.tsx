import SelectBox from '../../components/Input/SelectBox'
import ShareIcon from '@heroicons/react/24/outline/ShareIcon'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'

const periodOptions = [
  { name: 'Classification', value: 'TODAY' },
  { name: 'Object Detection', value: 'YESTERDAY' },
  { name: 'Project1', value: 'THIS_WEEK' },
  { name: 'Project2', value: 'LAST_WEEK' },
  { name: 'Project3', value: 'THIS_MONTH' },
  { name: 'Project4', value: 'LAST_MONTH' }
]

function DashboardTopBar ({ updateDashboardPeriod }: any) {
  const updateSelectBoxValue = ({ updateVar, value }: any) => {
    updateDashboardPeriod(value)
  }

  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[50vw]">
            <div className=" ">
            <SelectBox
                options={periodOptions}
                containerStyle="w-72 bg-white"
                labelStyle="hidden "
                defaultValue="TODAY"
                updateFormValue={updateSelectBoxValue}
            />
            </div>
            <div className="text-right ">
                <button className=" inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center
                 text-center rounded-lg h-12 px-4 text-sm min-h-12 font-semibold btn-sm normal-case"><ArrowPathIcon className="w-4 mr-2"/>Refresh Data</button>
                <button className="inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center
                 text-center rounded-lg h-12 px-4 text-sm min-h-12 font-semibold btn-sm normal-case"><ShareIcon className="w-4 mr-2"/>Share</button>
            </div>
        </div>
  )
}

export default DashboardTopBar
