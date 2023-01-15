import { FC, useCallback, useEffect, useState } from 'react'

import { Button } from '~/components/atoms/Button'
import { Head } from '~/components/atoms/Head'
import { InputText } from '~/components/atoms/InputText'
import { LabelsTable } from '~/components/organisms/LabelsTable'
import { useGetLabels } from '~/hooks/useGetLabels'
import { useMoveLabels } from '~/hooks/useMoveLabels'
import { usePageTracking } from '~/hooks/useTracking'
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

  usePageTracking()

  return (
    <>
      <Head title="cp labels" />
      <div className="container mx-auto px-2">
        <h1 className="my-2 text-3xl font-bold">mv labels</h1>
        <hr className="mb-2" />
        <div className="md:flex md:gap-5">
          <div className="basis-1/2">
            <h2 className="text-xl font-bold">export</h2>
            <div className="mb-6 gap-6">
              <InputText
                labelTitle="owner"
                id="export-owner"
                value={exportOwner}
                onChange={event => setExportOwner(event.target.value)}
              />
              <InputText
                labelTitle="repo"
                id="export-repo"
                value={exportRepo}
                onChange={event => setExportRepo(event.target.value)}
              />
              <InputText
                labelTitle="token"
                id="export-token"
                value={exportToken}
                onChange={event => setExportToken(event.target.value)}
              />
              <Button
                disabled={exportOwner === '' || exportRepo === '' || exportToken === ''}
                onClick={useCallback(() => {
                  getExportLabels({ owner: exportOwner, repo: exportRepo, token: exportToken })
                }, [exportOwner, exportRepo, exportToken])}
              >
                Get Label
              </Button>
            </div>
          </div>
          <div className="basis-1/2">
            <h2 className="text-xl font-bold">import</h2>
            <div className="mb-6 gap-6">
              <InputText
                labelTitle="owner"
                id="import-owner"
                value={importOwner}
                onChange={event => setImportOwner(event.target.value)}
              />
              <InputText
                labelTitle="repo"
                id="import-repo"
                value={importRepo}
                onChange={event => setImportRepo(event.target.value)}
              />
              <InputText
                labelTitle="token"
                id="import-token"
                value={importToken}
                onChange={event => setImportToken(event.target.value)}
              />
              <Button
                disabled={importOwner === '' || importRepo === '' || importToken === ''}
                onClick={useCallback(() => {
                  getImportLabels({ owner: importOwner, repo: importRepo, token: importToken })
                }, [importOwner, importRepo, importToken])}
              >
                Get Label
              </Button>
            </div>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="mb-2 flex items-center gap-5">
          <Button
            disabled={
              exportLabels.length === 0 ||
              importOwner === '' ||
              importRepo === '' ||
              importToken === '' ||
              isPostLoading
            }
            onClick={handleSubmit}
            color="green"
          >
            {isPostLoading ? (
              <div className="inline-flex items-center text-center">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              'Move Label'
            )}
          </Button>
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
    </>
  )
}
