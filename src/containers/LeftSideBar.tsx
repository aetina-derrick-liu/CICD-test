import { useLocation, NavLink } from 'react-router-dom'
import routes from '../routes/Sidebar'
import SidebarSubmenu from './SideBbarSubmenu'

function LeftSideBar () {
  const location = useLocation()

  const isOpen = true

  return (
<div className={` border border-r w-64 pt-14 h-full transition-transform bg-white 
 ${isOpen ? '' : ' '} `} aria-label="Sidebar">
   <div className="h-full w-full  pb-4 overflow-y-auto bg-white dark:bg-gray-800 ">
      <ul className="space-y-2 flex flex-col flex-wrap w-full">
         {routes.map((route, k) => {
           return (
               <li key={k} className="relative flex-shrink-0 flex-col flex-wrap items-stretch">
                  {
                     (route.submenu != null)
                       ? <SidebarSubmenu {...route}/>
                       : (<NavLink end to={route.path} className={({ isActive }) => `flex items-center py-3 px-3  text-base font-normal dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                       semibold`}>
                        {route.icon}
                        <span className="ml-3">{route.name}</span>
                                            {
                                                location.pathname === route.path
                                                  ? (<span className=" absolute z-50 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primaryColor "
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
export default LeftSideBar
