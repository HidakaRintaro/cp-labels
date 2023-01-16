import { ChangeEvent, ComponentProps, FC, useState } from 'react'

import { EyeIcon } from '~/icons/EyeIcon'
import { EyeSlashIcon } from '~/icons/EyeSlashIcon'

type InputPasswordProps = {
  labelTitle: string
  id: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
} & Omit<ComponentProps<'input'>, 'type' | 'className'>

export const InputPassword: FC<InputPasswordProps> = props => {
  const { labelTitle, id, ...other } = props
  const [isReveal, setIsReveal] = useState(false)

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-900">
        {labelTitle}
      </label>
      <div className="relative">
        <input
          {...other}
          type={isReveal ? 'text' : 'password'}
          id={id}
          className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-1.5 text-base text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          aria-label="Toggle token display"
          className="absolute left-auto right-3 top-2 text-slate-500"
          onClick={() => setIsReveal(b => !b)}
        >
          {isReveal ? (
            <EyeIcon className="h-6 w-6 fill-none stroke-current stroke-2" />
          ) : (
            <EyeSlashIcon className="h-6 w-6 fill-none stroke-current stroke-2" />
          )}
        </button>
      </div>
    </div>
  )
}
