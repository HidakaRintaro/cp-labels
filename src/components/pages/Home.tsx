import { FC, useState } from 'react'

import { useGetLabels } from '~/hooks/useGetLabels'
import { calcLightnessSwitch } from '~/utils/calcLightnessSwitch'

export const Home: FC = () => {
  const [exportOwner, setExportOwner] = useState('')
  const [exportRepo, setExportRepo] = useState('')
  const [exportToken, setExportToken] = useState('')

  const { labels, getLabels, isLoading, isError } = useGetLabels()

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold">mv labels</h1>
      <hr />
      <div>
        <h2 className="text-xl font-bold">export</h2>
        <div className="mb-6 flex gap-6">
          <div className="basis-1/3">
            <label className="mb-2 block text-sm font-medium text-slate-900">owner</label>
            <input
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
              onChange={event => setExportOwner(event.target.value)}
              value={exportOwner}
            />
          </div>
          <div className="basis-1/3">
            <label className="mb-2 block text-sm font-medium text-slate-900">repo</label>
            <input
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
              onChange={event => setExportRepo(event.target.value)}
              value={exportRepo}
            />
          </div>
          <div className="basis-1/3">
            <label className="mb-2 block text-sm font-medium text-slate-900">token</label>
            <input
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
              onChange={event => setExportToken(event.target.value)}
              value={exportToken}
            />
          </div>
          <button
            className="shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-slate-50 px-6 font-bold"
            onClick={() => getLabels({ owner: exportOwner, repo: exportRepo, token: exportToken })}
          >
            送信
          </button>
        </div>
      </div>
      {labels.length === 0 ? (
        <p>ラベルはありません</p>
      ) : isError ? (
        <p>エラーが発生しました</p>
      ) : isLoading ? (
        <p>Loding...</p>
      ) : (
        <div>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th colSpan={2} className="border-b p-4 text-left font-medium">
                    {labels.length} labels
                  </th>
                  <th className="border-b" />
                  <th className="border-b" />
                </tr>
              </thead>
              <tbody>
                {labels.map(label => (
                  <tr key={label.id}>
                    <td className="border-b border-slate-100 p-4 font-bold">
                      <div
                        className="inline-block rounded-full px-[10px] text-xs leading-[22px]"
                        style={{
                          backgroundColor: `#${label.color}`,
                          color: `hsl(0deg, 0%, calc(${calcLightnessSwitch(label.color)} * 100%))`
                        }}
                      >
                        <span>{label.name}</span>
                      </div>
                    </td>
                    <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.description}</td>
                    <td className="w-16 border-b border-slate-100 p-4 text-xs text-slate-500">
                      <span className="cursor-pointer hover:text-blue-500 hover:underline">Edit</span>
                    </td>
                    <td className="w-16 border-b border-slate-100 p-4 text-xs text-slate-500">
                      <span className="cursor-pointer hover:text-blue-500 hover:underline">Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
