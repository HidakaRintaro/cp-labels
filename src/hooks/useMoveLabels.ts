import { useState } from 'react'

import { Label } from '~/types/label'

interface ApiParams {
  owner: string
  repo: string
  token: string
  labels: Label[]
}

export const useMoveLabels = (): {
  postLabels: ({ owner, repo, token, labels }: ApiParams) => void
  isLoading: boolean
  isError: boolean
  isOk: boolean
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isOk, setIsOk] = useState(false)

  const postLabels = ({ owner, repo, token, labels }: ApiParams): void => {
    setIsLoading(true)
    setIsError(false)
    setIsOk(false)

    labels.forEach(label => {
      const { name, description, color } = label
      fetch(`https://api.github.com/repos/${owner}/${repo}/labels`, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          color
        })
      })
        .then(async response => {
          if (response.status === 201) {
            setIsOk(true)
          } else {
            throw new Error('Labelsの作成に失敗しました')
          }
        })
        .catch(() => {
          setIsError(true)
        })
        .finally(() => setIsLoading(false))
    })
  }

  return { postLabels, isLoading, isError, isOk }
}
