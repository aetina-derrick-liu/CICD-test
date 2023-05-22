import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  submenu: Array<{ name: string, path: string, icon: JSX.Element }>
  name: string
  icon: JSX.Element
}

function SidebarSubmenu ({ submenu, name, icon }: Props) {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
        <div className='flex-col hover:bg-gray-100 dark:hover:bg-gray-700 py-3 px-3'>

            {/** Route header */}
            <div className='w-full flex justify-between text-base cursor-pointer font-normal text-gray-900 dark:text-white  gap-3 ' onClick={() => { setIsExpanded(!isExpanded) }}>
                <div className=' flex mr-3'>
                {icon}
                <span className="ml-3">{name}</span>
                </div>
                <div>
                <ChevronDownIcon className={'w-5 h-5 mt-1 mr-4 float-right delay-400 duration-500 transition-all  ' + (isExpanded ? 'rotate-180' : '')}/>
                </div>
            </div>

            {/** Submenu list */}
            <div className={' w-full ' + (isExpanded ? '' : 'hidden')}>
                <ul className={'flex flex-col flex-wrap py-2 text-sm items-stretch '}>
                {
                    submenu.map((m, k) => {
                      return (
                          <li key={k} className="relative flex flex-shrink-0 flex-wrap items-stretch">
                                <Link to={m.path} className=" flex px-4 py-2 text-sm mt-3 ">
                                    {m.icon}
                                    <span className="mx-3">{m.name}</span>
                                    {
                                            location.pathname === m.path
                                              ? (<span className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg- "
                                                aria-hidden="true"></span>)
                                              : null
                                    }
                                </Link>
                            </li>
                      )
                    })
                }
                </ul>
            </div>
        </div>
  )
}

export default SidebarSubmenu
