import { FC, useCallback, useState } from 'react'

import { useGetLabels } from '~/hooks/useGetLabels'

export const Home: FC = () => {
  const [exportOwner, setExportOwner] = useState('')
  const [exportRepo, setExportRepo] = useState('')
  const [exportToken, setExportToken] = useState('')

  const [importOwner, setImportOwner] = useState('')
  const [importRepo, setImportRepo] = useState('')
  const [importToken, setImportToken] = useState('')

  const {
    labels: exportLabels,
    getLabels: getExportLabels,
    isLoading: isExportLoading,
    isError: isExportError
  } = useGetLabels()
  const {
    labels: importLabels,
    getLabels: getImportLabels,
    isLoading: isImportLoading,
    isError: isImportError
  } = useGetLabels()

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">mv labels</h1>
      <hr className="mb-2" />
      <div className="flex gap-5">
        <div className="basis-1/2">
          <div>
            <h2 className="text-xl font-bold">export</h2>
            <div className="mb-6 gap-6">
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">owner</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={event => setExportOwner(event.target.value)}
                  value={exportOwner}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">repo</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={event => setExportRepo(event.target.value)}
                  value={exportRepo}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">token</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={event => setExportToken(event.target.value)}
                  value={exportToken}
                />
              </div>
              <button
                className="shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-slate-50 py-1 px-6 font-bold disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none"
                disabled={exportOwner === '' || exportRepo === '' || exportToken === ''}
                onClick={useCallback(() => {
                  getExportLabels({ owner: exportOwner, repo: exportRepo, token: exportToken })
                }, [exportOwner, exportRepo, exportToken])}
              >
                Get Label
              </button>
            </div>
          </div>
          {isExportError ? (
            <p className="text-red-500">エラーが発生しました</p>
          ) : isExportLoading ? (
            <p>Loding...</p>
          ) : exportLabels.length === 0 ? (
            <p>ラベルはありません</p>
          ) : (
            <div>
              <div className="text-sm font-medium text-slate-900">エクスポートするラベル</div>
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
                    {exportLabels.map(label => (
                      <tr key={label.id}>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.name}</td>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.description}</td>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">#{label.color}</td>
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
        <div className="basis-1/2">
          <div>
            <h2 className="text-xl font-bold">import</h2>
            <div className="mb-6 gap-6">
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">owner</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={event => setImportOwner(event.target.value)}
                  value={importOwner}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">repo</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={event => setImportRepo(event.target.value)}
                  value={importRepo}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-medium text-slate-900">token</label>
                <input
                  className="block h-8 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1  focus:ring-blue-500"
                  onChange={event => setImportToken(event.target.value)}
                  value={importToken}
                />
              </div>
              <button
                className="shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-slate-50 py-1 px-6 font-bold disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none"
                disabled={importOwner === '' || importRepo === '' || importToken === ''}
                onClick={useCallback(() => {
                  getImportLabels({ owner: importOwner, repo: importRepo, token: importToken })
                }, [importOwner, importRepo, importToken])}
              >
                Get Label
              </button>
            </div>
          </div>
          {isImportError ? (
            <p className="text-red-500">エラーが発生しました</p>
          ) : isImportLoading ? (
            <p>Loding...</p>
          ) : importLabels.length === 0 ? (
            <p>ラベルはありません</p>
          ) : (
            <div>
              <div className="text-sm font-medium text-slate-900">インポート先に残っているラベル</div>
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
                    {importLabels.map(label => (
                      <tr key={label.id}>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.name}</td>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">{label.description}</td>
                        <td className="border-b border-slate-100 p-4 text-xs text-slate-500">#{label.color}</td>
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
      </div>
    </div>
  )
}
