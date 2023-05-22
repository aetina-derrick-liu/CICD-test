import { useMutation, useQuery, useQueryClient, type QueryFunction } from 'react-query'
import JSZip from 'jszip'
import { datasetEndpoint } from '@constants/endpoints'

export interface Image {
  name: string
  url: string
}
export interface DeleteDataParams {
  datasetId: string
  images: string[]
}
export interface IDataset {
  id: string
  name?: string
  type: string
  format: string
  description?: string
  created_on?: string
  last_modified?: string
}

const fetchImages: QueryFunction<Image[], [string, string]> = async ({ queryKey }) => {
  if (queryKey.length < 2) {
    return []
  }

  const response = await fetch(`${datasetEndpoint}/${queryKey[1]}/images`)
  const blob = await response.blob()
  const zip = await JSZip.loadAsync(blob)
  const files = Object.values(zip.files)
  const images = await Promise.all(files.map(async (file) => {
    const blob = await file.async('blob')
    return URL.createObjectURL(blob)
  }))
    .then((urls) => {
      return urls.map((url, index) => {
        return {
          name: files[index].name,
          url
        }
      })
    })
    .catch((error) => {
      console.error(error)
      return []
    })
  return images
}
const fetchDataset: QueryFunction<IDataset, [string, string]> = async ({ queryKey }) => {
  if (queryKey.length < 2) {
    return []
  }
  const response = await fetch(`${datasetEndpoint}/${queryKey[1]}`)
  const data = await response.json()
  return data
}

export function useDelete () {
  const queryClient = useQueryClient()
  const deleteImages = useMutation(async ({ datasetId, images }: DeleteDataParams) => {
    if (!datasetId) {
      return
    }
    const response = await fetch(`${datasetEndpoint}/${datasetId}/images`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ images })
    })
    if (!response.ok) {
      throw new Error('Failed to delete data')
    }
    return datasetId
  }, {
    onSuccess: (deleteId) => {
      void queryClient.invalidateQueries(['dataset-images', deleteId])
    }
  })

  const deleteDatasetImages = async ({ datasetId, images }: DeleteDataParams) => {
    return await deleteImages.mutateAsync({ datasetId, images })
  }

  return deleteDatasetImages
}

export function useDataset (datasetId: string) {
  const { data, isLoading, isError, error, refetch } =
    useQuery(['dataset', datasetId], fetchDataset, {
      refetchOnWindowFocus: true
    })

  return { data, isLoading, isError, error, refetch }
}

export function useDatasetImages (datasetId: string) {
  const { data, isLoading, isError, error, refetch } =
    useQuery(['dataset-images', datasetId], fetchImages, {
      refetchOnWindowFocus: true
    })

  return { data, isLoading, isError, error, refetch }
}

export function useImage (datasetId: string, imageName: string) {
  const { data, isLoading, isError, error, refetch } =
    useQuery(['image', datasetId, imageName], async () => {
      const response = await fetch(`${datasetEndpoint}/${datasetId}/annotator/${imageName}`)
      console.log(response)
      const blob = await response.blob()
      return URL.createObjectURL(blob)
    }, {
      refetchOnWindowFocus: true
    })

  return { data, isLoading, isError, error, refetch }
}
