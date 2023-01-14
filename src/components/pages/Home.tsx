import { FC, useCallback, useEffect, useState } from 'react'

import { LabelsTable } from '~/components/organisms/LabelsTable'
import { useGetLabels } from '~/hooks/useGetLabels'
import { useMoveLabels } from '~/hooks/useMoveLabels'
import { PlusIcon } from '~/icons/PlusIcon'

export const Home: FC = () => {
  const [exportOwner, setExportOwner] = useState('')
  const [exportRepo, setExportRepo] = useState('')
  const [exportToken, setExportToken] = useState('')

  const [importOwner, setImportOwner] = useState('')
  const [importRepo, setImportRepo] = useState('')
  const [importToken, setImportToken] = useState('')

  const {
    labels: exportLabels,
    setLabels: setExportLabels,
    getLabels: getExportLabels,
    isLoading: isExportLoading,
    isError: isExportError
  } = useGetLabels()
  const {
    labels: importLabels,
    setLabels: setImportLabels,
    getLabels: getImportLabels,
    isLoading: isImportLoading,
    isError: isImportError
  } = useGetLabels()

  const { postLabels, isLoading: isPostLoading, isError: isPostError, isOk: isPostOk } = useMoveLabels()
  const handleSubmit = useCallback(() => {
    postLabels({ owner: importOwner, repo: importRepo, token: importToken, labels: exportLabels })
  }, [importOwner, importRepo, importToken, exportLabels])

  useEffect(() => {
    if (isPostOk) {
      setExportLabels([])
      setImportLabels([])
      getImportLabels({ owner: importOwner, repo: importRepo, token: importToken })
    }
  }, [isPostOk])

  return (
    <div className="container mx-auto px-2">
      <h1 className="my-2 text-3xl font-bold">mv labels</h1>
      <hr className="mb-2" />
      <div className="md:flex md:gap-5">
        <div className="basis-1/2">
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
        <div className="basis-1/2">
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
      </div>
      <hr className="mb-2" />
      <div className="mb-2 flex items-center gap-5">
        <button
          className="shrink-0 cursor-pointer rounded-lg border bg-green-300 py-1 px-6 font-bold disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-green-100 disabled:text-slate-500 disabled:shadow-none"
          disabled={
            exportLabels.length === 0 || importOwner === '' || importRepo === '' || importToken === '' || isPostLoading
          }
          onClick={handleSubmit}
        >
          {isPostLoading ? (
            <div className="flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : (
            <span>Move Label</span>
          )}
        </button>
        <div>
          {isPostError ? (
            <p className="text-sm text-red-500">ラベルの登録に失敗しました</p>
          ) : isPostLoading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : isPostOk ? (
            <p className="text-sm text-green-500">登録完了しました！</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div>
        <div>
          <div className="text-md font-medium text-slate-900">インポート先に残っているラベル</div>
          {isImportError ? (
            <p className="text-sm text-red-500">エラーが発生しました</p>
          ) : isImportLoading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : importLabels.length === 0 ? (
            <p className="text-sm text-slate-500">ラベルはありません</p>
          ) : (
            <LabelsTable
              labels={importLabels}
              setLabels={setImportLabels}
              removeParams={{ owner: importOwner, repo: importRepo, token: importToken }}
            />
          )}
        </div>
        <div className="my-2">
          <PlusIcon className="h-10 w-10 stroke-slate-500 stroke-2" />
        </div>
        <div>
          <div className="text-slate-901 text-sm font-medium">追加されるラベル (エクスポートされるラベル)</div>
          {isExportError ? (
            <p className="text-sm text-red-500">エラーが発生しました</p>
          ) : isExportLoading ? (
            <p className="text-sm text-slate-500">Loding...</p>
          ) : exportLabels.length === 0 ? (
            <p className="text-sm text-slate-500">ラベルはありません</p>
          ) : (
            <LabelsTable labels={exportLabels} setLabels={setExportLabels} />
          )}
        </div>
      </div>
    </div>
  )
}
