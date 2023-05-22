import NoSymbolIcon from '@heroicons/react/24/outline/NoSymbolIcon'

function InternalPage () {
  return (
    <div className=" p-4 flex h-screen w-full  justify-center items-center sm:ml-64">
   <div className="text-center">
                <div className="max-w-md">
                <NoSymbolIcon className="h-48 w-48 inline-block" color='gray'/>
                <h1 className="text-5xl  font-bold text-gray-300">404 - Not Found</h1>
                </div>
            </div>
    </div>
  )
}

export default InternalPage
