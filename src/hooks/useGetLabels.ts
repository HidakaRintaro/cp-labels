import { useState } from 'react'

import { Label } from '~/types/label'

interface LabelsParam {
  owner: string
  repo: string
  token: string
}

export const useGetLabels = () => {
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
      .then(async response => setLabels(await response.json()))
      .catch(e => {
        setisError(true)
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  return { labels, getLabels, isLoading, isError }
}
