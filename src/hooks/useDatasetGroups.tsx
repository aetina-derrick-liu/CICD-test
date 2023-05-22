import { useMutation, useQuery, useQueryClient } from 'react-query'
import { datasetGroupEndpoint } from '@constants/endpoints'
import { type IDataset } from './useDataset'

export interface IDatasetGroup {
  id?: string
  name?: string
  description?: string
  created_on?: string
  last_modified?: string
  train_dataset: IDataset
  eval_dataset: IDataset
  test_dataset: IDataset
}

export function useCreate (newDataset: IDataset, cb: any) {
  // create dataset

  fetch(datasetGroupEndpoint, {
    method: 'POST',
    body: JSON.stringify({ name: newDataset.name, description: newDataset.description, type: newDataset.type, format: newDataset.format }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async res => await res.json())
    .then(data => {
      console.log(data)
      cb()
    }
    )
    .catch(err => { console.log(err) })
}

export function useDelete () {
  const queryClient = useQueryClient()

  const deleteDatasetGroupMutation = useMutation<string, Error, string>(async (id) => {
    const response = await fetch(`${datasetGroupEndpoint}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete dataset group')
    }

    return id
  }, {
    onSuccess: (deleteId) => {
      queryClient.removeQueries(['datasetGroup', deleteId])
      // 更新 `datasetGroups` query，讓 UI 重新 render
      void queryClient.invalidateQueries<IDatasetGroup[]>('datasetGroups')
    }
  })

  const deleteDatasetGroup = async (id: string) => {
    return await deleteDatasetGroupMutation.mutateAsync(id)
  }

  return deleteDatasetGroup
}

function DatasetGroups () {
  const fetchDatasetGroups = async () => {
    const response = await fetch(datasetGroupEndpoint)
    const data = await response.json()
    return data
  }
  const { data, isLoading, isError, error, refetch } = useQuery('datasetGroups', fetchDatasetGroups)

  return { data, isLoading, isError, error, refetch }
}

export default DatasetGroups
