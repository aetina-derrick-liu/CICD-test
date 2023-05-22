import SimpleTab, { type Item } from '@components/Tabs'
import OverviewTab from './Overview'
import UploadTab from './Upload'
import { useDataset } from '@hooks/useDataset'
import { useParams } from 'react-router-dom'

const Tabs: Item[] = [
  { label: 'Overview', key: 'overview', children: <OverviewTab/> },
  { label: 'Dataset Management', key: 'setting', children: <UploadTab/> }
]

function DatasetView () {
  const { datasetId } = useParams<{ datasetId: string }>()
  if (!datasetId) {
    return <div>Dataset Not Found</div>
  }
  const { data } = useDataset(datasetId)
  if (!data) {
    return <div>Dataset Not Found</div>
  }

  return (
        <div className=' container h-full'>
            <div className=' text-2xl font-bold'>{data.name}</div>
            <div className=' flex justify-center h-full'>
              <SimpleTab items={Tabs} />
            </div>
        </div>

  )
}
export default DatasetView
