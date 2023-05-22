// All components mapping with path for internal routes

import { lazy } from 'react'

const Project = lazy(async () => await import('../pages/Internal/Project'))
const CardBoard = lazy(async () => await import('../pages/Internal/CardBoard'))
const Dataset = lazy(async () => await import('../pages/Internal/Dataset'))
const DatasetView = lazy(async () => await import('../pages/Internal/DatasetView'))
const Annotator = lazy(async () => await import('../pages/Internal/Annotator'))

// const Training = lazy(async () => await import('../pages/Internal/CardBoard))

// const Blank = lazy(async () => await import('../pages/protected/Blank'))
// const Charts = lazy(async () => await import('../pages/protected/Charts'))
// const ProfileSettings = lazy(async () => await import('../pages/protected/ProfileSettings'))
const routes = [
  {
    path: '/cardboard',
    component: CardBoard
  },
  {
    path: '/dataset/:datasetId',
    component: DatasetView
  },
  {
    path: '/dataset/:datasetId/annotator/:asset',
    component: Annotator
  },
  {
    path: '/dataset',
    component: Dataset
  },
  {
    path: '/:projectId/:internalType',
    component: Project
  }

]

export default routes
