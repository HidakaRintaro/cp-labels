import { Dispatch, FC, useCallback } from 'react'

import { useDeleteLabel } from '~/hooks/useDeleteLabel'
import { Label } from '~/types/label'

interface LabelsTableProps {
  labels: Label[]
  setLabels: Dispatch<React.SetStateAction<Label[]>>
  removeParams?: {
    owner: string
    repo: string
    token: string
  }
}

export const LabelsTable: FC<LabelsTableProps> = props => {
  const { labels, removeParams, setLabels } = props
  const { removeLabel, isLoading: isRemoveLoading, isError: isRemoveError } = useDeleteLabel()
  const handleDeleteLabelClick = useCallback(
    (label: Label) => {
      const labelsFiltered = labels.filter(l => l.id !== label.id)
      if (removeParams !== undefined) {
        const yesno = confirm('本当にラベルを削除しますか？')
        if (!yesno) {
          return
        }
        const { owner, repo, token } = removeParams
        removeLabel({ owner, repo, token, label })
      }
      setLabels(labelsFiltered)
    },
    [labels, removeParams, setLabels, isRemoveLoading, isRemoveError]
  )

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th className="border-b p-4 text-left font-medium">Label name</th>
            <th className="border-b p-4 text-left font-medium">Description</th>
            <th className="border-b p-4 text-left font-medium">Color</th>
            <th className="border-b" />
          </tr>
        </thead>
        <tbody>
          {labels.map(label => (
            <tr key={label.id}>
              <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.name}</td>
              <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.description}</td>
              <td className="border-b border-slate-100 p-4 text-xs text-slate-500">#{label.color}</td>
              <td className="w-16 border-b border-slate-100 p-4 text-xs text-slate-500">
                <span
                  className="cursor-pointer hover:text-blue-500 hover:underline"
                  onClick={() => handleDeleteLabelClick(label)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
