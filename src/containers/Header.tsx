import { useDispatch, useSelector } from 'react-redux'

function Header () {
  const { isOpen } = useSelector((state: { leftSidebar: { isOpen: boolean } }) => state.leftSidebar)
  const { pageTitle } = useSelector((state: { header: { pageTitle: string } }) => state.header)
  const dispatch = useDispatch()

  return (
        <div className=" top-0 w-full bg- ">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button aria-controls="logo-sidebar" type="button" onClick={() => { dispatch(leftSidebarSlice.actions.openLeftSidebar({ sidebarState: !isOpen })) }} className={`inline-flex items-center p-2 text-sm outline-none text-gray-500 rounded-lg
         hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${isOpen ? 'hidden' : 'hidden'} `}>
            <span className="sr-only">Open sidebar</span>
         </button>
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{pageTitle}</span>
      </div>
    </div>
  </div>
</div>
  )
}
export default Header
