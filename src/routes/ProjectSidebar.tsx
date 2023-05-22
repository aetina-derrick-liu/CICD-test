/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'

// const iconClasses = 'h-6 w-6'
const iconClasses = 'w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'

const routes = [
  {
    path: '/app/cardboard',
    icon: <HomeIcon className={iconClasses}/>,
    name: 'Home'
  },
  {
    path: '/app/project/:id/workflow',
    icon: <ArrowPathIcon className={iconClasses}/>,
    name: 'Training workflow'
  },
  {
    path: '/app/project/:id/overview',
    icon: <Squares2X2Icon className={iconClasses}/>, // icon component
    name: 'Overview'// name that appear in Sidebar
  },
  {
    path: '/app/project/:id/dataset',
    icon: <DocumentTextIcon className={iconClasses}/>,
    name: 'Dataset'
  }

]

export default routes
