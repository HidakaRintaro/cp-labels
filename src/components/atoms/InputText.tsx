import { ChangeEvent, ComponentProps, FC } from 'react'

type InputTextProps = {
  labelTitle: string
  id: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
} & Omit<ComponentProps<'input'>, 'type' | 'className'>

export const InputText: FC<InputTextProps> = props => {
  const { labelTitle, id, ...other } = props
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-900">
        {labelTitle}
      </label>
      <input
        {...other}
        type="text"
        className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-1.5 text-base text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
}
