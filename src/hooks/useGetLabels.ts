import { Dispatch, useState } from 'react'

import { Label } from '~/types/label'

interface LabelsParam {
  owner: string
  repo: string
  token: string
}

export const useGetLabels = (): {
  labels: Label[]
  setLabels: Dispatch<React.SetStateAction<Label[]>>
  getLabels: ({ owner, repo, token }: LabelsParam) => void
  isLoading: boolean
  isError: boolean
} => {
  const [labels, setLabels] = useState<Label[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setisError] = useState(false)

  const getLabels = ({ owner, repo, token }: LabelsParam): void => {
    setIsLoading(true)
    setisError(false)

    fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.status === 200) {
          setLabels(await response.json())
        } else {
          throw new Error('APIからのLablesの取得に失敗しました')
        }
      })
      .catch(() => {
        setisError(true)
        setLabels([])
      })
      .finally(() => setIsLoading(false))
  }
  return { labels, setLabels, getLabels, isLoading, isError }
}
