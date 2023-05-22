import { Tab } from '@headlessui/react'
import React from 'react'

export interface Item {
  label: string
  key: string
  children: React.ReactNode
}

interface Props {
  containerStyle?: string
  panelStyle?: string
  items: Item[]
}

function classNames (...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function SimpleTab ({ items = [], containerStyle = '', panelStyle = '' }: Props) {
  return (
    <div className={`w-full  px-2 py-4 sm:px-0 ${containerStyle}`}>
      <Tab.Group>
        <Tab.List className="flex space-x-1 p-1 mb-4">
            {
                items?.map((item) => (
                    <Tab key={item.key} className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm leading-5 font-medium border-b-2 transition-all outline-none',
                        selected
                          ? 'bg-white border-info'
                          : 'border-opacity-0 border-white text-textPrimary hover:bg-light/30 '
                      )
                    }>
                        {item.label}
                    </Tab>
                ))
            }
        </Tab.List>
        <Tab.Panels className={` h-full  ${panelStyle}` }>
            {items.map((item, index) => (
                <Tab.Panel className={' h-full'} key={item.key}>
                    {item.children}
                </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
