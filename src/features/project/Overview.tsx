import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import TopBar from './TopBar'
import LittleCard from '../../components/Cards/StatsCard'
import InputText from '../../components/Input/InputText'
import Charts from '../charts'

const statsData = [
  { title: 'Training資訊1', value: '100%', icon: <UserGroupIcon color=' green' className=' w-8 h-8 ml-2'/>, description: 'Training資訊輔助說明' },
  { title: 'Accuracy', value: '100%', icon: <CreditCardIcon color=' green' className=' w-8 h-8 ml-2'/>, description: '衡量model的準確率' },
  { title: 'Precision', value: '30%', icon: <CircleStackIcon color=' green' className=' w-8 h-8 ml-2'/>, description: 'tp/(tp+tf)' },
  { title: 'Recall', value: '20%', icon: <UsersIcon color=' green' className=' w-8 h-8 ml-2'/>, description: '↙ 300 (22%) 有幾個是預測正確的' }
]

function Overview () {
  const updateDashboardPeriod = (newRange: string) => {
    // Dashboard range changed, write code to refresh your values
  }
  return (
   <div className="grid p-4 gap-8 w-full">
      {/* Select content */}
      <TopBar updateDashboardPeriod={updateDashboardPeriod}/>
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6" >
         {statsData.map((data, index) => {
           return <LittleCard key={index} {...data}/>
         })}
      </div>
        {/** ---------------------- Input Text ------------------------- */}
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 '>
         <InputText type="text" updateType="prjectName" containerStyle="w-3/4" labelTitle="Input Text" updateFormValue={(val) => { }} />
         <InputText type="text" updateType="prjectName" containerStyle="w-3/4" labelTitle="Input Text" updateFormValue={(val) => { }} />
      </div>
        {/** ---------------------- Different charts ------------------------- */}
        <Charts/>
   </div>
  )
}

export default Overview
