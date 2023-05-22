import { useState } from 'react'
export interface FormFuncInput {
  updateType: string
  value: string
}

type updateFormFunc = (Input: FormFuncInput) => void

interface Props {
  labelTitle?: string
  labelStyle?: string
  type?: string
  containerStyle?: string
  defaultValue?: string
  placeholder?: string
  updateFormValue: updateFormFunc
  updateType: string
}

function InputText (props: Props) {
  const { labelTitle, labelStyle = '', type = 'text', containerStyle = '', defaultValue, placeholder = '', updateFormValue, updateType } = props
  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (val: string) => {
    setValue(val)
    updateFormValue({ updateType, value: val })
  }

  return (
        <div className={`flex flex-col w-full ${containerStyle}`}>
            <label className=" flex select-none items-center justify-between py-2 px-1 text-base">
                <span className={` text-sm text-base-content ${labelStyle}`}>{labelTitle}</span>
            </label>
            <input type={type} value={value} placeholder={ placeholder} onChange={(e) => { updateInputValue(e.target.value) }}
            className=" flex-shrink h-12 px-4 text-base border-/50 border-[1px] outline-/50 rounded-l-full rounded-r-full
             bg-current/50 w-full transition-all focus:outline-[2px] focus:outline-offset-2 focus:outline-current/20 " />
        </div>
  )
}

export default InputText
