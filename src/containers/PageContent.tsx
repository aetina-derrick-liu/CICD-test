import { Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { Suspense, lazy } from 'react'
import SuspenseContent from './SuspenseContent'

const Page404 = lazy(async () => await import('../pages/404'))

function PageContent () {
  return (
      <div className={'h-full w-full'}>
        <div className={'flex flex-col h-full w-full  bg- text-/90  '}>
            <div className="overflow-y-auto flex h-full pt-8 px-6 ">
                <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                  return (
                                        <Route
                                            key={key}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                  )
                                })
                            }
                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                </Suspense>
            </div>
        </div>
        </div>
  )
}

export default PageContent
