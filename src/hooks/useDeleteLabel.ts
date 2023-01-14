import { useState } from 'react'

import { Label } from '~/types/label'

interface ApiParams {
  owner: string
  repo: string
  token: string
  label: Label
}

export const useDeleteLabel = (): {
  removeLabel: ({ owner, repo, token, label }: ApiParams) => void
  isLoading: boolean
  isError: boolean
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const removeLabel = ({ owner, repo, token, label }: ApiParams): void => {
    setIsLoading(true)
    setIsError(false)

    fetch(`https://api.github.com/repos/${owner}/${repo}/labels/${label.name}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.status !== 204) {
          throw new Error('Labelsの削除に失敗しました')
        }
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => setIsLoading(false))
  }

  return { removeLabel, isLoading, isError }
}
