import { Popover, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

function MyPopover ({ children }: { children: React.ReactNode }) {
  return (
    <Popover className="relative h-full outline-none">
        {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
        <Popover.Button>
            <div className='h-full flex items-center   outline-none '>
                <EllipsisVerticalIcon
                className={'text-center transition-all w-6 h-6 cursor-pointer ui-open:transform'}/>
            </div>
        </Popover.Button>
        <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
        <Popover.Panel className="absolute z-10 bg-white outline-none  ">
            {children}
            {/* <img src="/solutions.jpg" alt="" /> */}
      </Popover.Panel>
      </Transition>
        </>
        )}
    </Popover>
  )
}
export default MyPopover
