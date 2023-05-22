import { useLocation, NavLink } from 'react-router-dom'
import routes from '../../routes/ProjectSidebar'

function SideBar () {
  const location = useLocation()
  const isOpen = true

  return (
<div className={` border border-r w-64 pt-14 h-full transition-transform bg-white  border-gray-200
 ${isOpen ? '' : ' '} dark:bg-gray-800 dark:border-gray-700 hidden md:block`} aria-label="Sidebar">
   <div className="h-full  pb-4 overflow-y-auto bg-white dark:bg-gray-800 ">
      <ul className="space-y-2 flex flex-col flex-wrap">
         {routes.map((route, k) => {
           return (
               <li key={k} className="relative flex-shrink-0 flex-col flex-wrap items-stretch">
                  {
                       (<NavLink end to={route.path} className={({ isActive }) => `flex items-center py-3 px-4  text-base font-normal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                       ${isActive ? 'font-semibold bg- ' : 'font-normal'}`}>
                        {route.icon}
                        <span className="ml-3">{route.name}</span>
                                            {
                                                location.pathname === route.path
                                                  ? (<span className=" absolute z-50 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg- "
                                                aria-hidden="true"></span>)
                                                  : null
                                            }

                     </NavLink>)
                  }

               </li>
           )
         })}
      </ul>
   </div>
</div>
  )
}
export default SideBar
