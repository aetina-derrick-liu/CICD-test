import { useEffect } from 'react'
import { datasetEndpoint } from '@constants/endpoints'
import { useImage } from '@hooks/useDataset'
import { useParams } from 'react-router-dom'

export default function Annotator () {
  // get asset in router /annoator?asset=assetId
  const { asset } = useParams<{ asset: string }>()
  const { datasetId } = useParams<{ datasetId: string }>()
  if (!asset) {
    return <div>Asset Not Found</div>
  }
  const { data, isLoading, isError, error } = useImage(datasetId, asset)
  useEffect(() => {
    document.title = 'Annotator'
  }, [])
  return <div className=' container'>
      <div className='font-bold py-2 flex '>
        <img src={data}/>
      <span>Datasets Annotation</span>
      </div>
      </div>
}
