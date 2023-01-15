import { ComponentProps, FC, MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  disabled: boolean
  onClick: (event: MouseEventHandler<HTMLButtonElement>) => void
  color?: 'defualt' | 'green' | 'blue'
} & Omit<ComponentProps<'button'>, 'type' | 'color'>

export const Button: FC<ButtonProps> = props => {
  const { children, color = 'defualt', ...other } = props

  const btnColorStyle =
    color === 'green'
      ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300 disabled:bg-green-200 disabled:text-slate-500'
      : color === 'blue'
      ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 disabled:bg-blue-500'
      : 'border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-200 focus:ring-slate-300 disabled:text-slate-400 disabled:hover:bg-slate-50'

  return (
    <button
      {...other}
      type="button"
      className={
        'w-full rounded-lg border px-5 py-2 text-center text-sm font-bold focus:outline-none focus:ring-2 disabled:cursor-not-allowed md:w-auto ' +
        btnColorStyle
      }
    >
      {children}
    </button>
  )
}
