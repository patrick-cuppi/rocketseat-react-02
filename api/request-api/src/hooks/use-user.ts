import { useCallback, useState } from "react"
import { fetcher } from "../helpers/api"
import type { User } from "../models/user"

export default function useUser() {

  const [user, setUser] = useState<User | null>(null)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'saving'>('idle')

  const getUser = useCallback(async (id: string) => {
    try {
      setRequestStatus('loading')

      const data = await fetcher(`/users/${id}`)
      setUser(data)
    } catch (error) {
      console.log(error)
      alert('Ocorreu um erro ao buscar o usuário')
    } finally {
      setRequestStatus('idle')
    }
  }, [])

  return {
    user,
    userRequestStatus: requestStatus,
    getUser
  }
}