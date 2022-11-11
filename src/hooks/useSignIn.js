import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const credentials = { username: username, password: password }
    const res = await mutate({ variables: { credentials: credentials } })
    if (res.data.authenticate) {
      const token = res.data.authenticate.accessToken
      await authStorage.setAccessToken(token)
      apolloClient.resetStore()
      return { data: token }
    }
    return { data: '' }
  }

  return [signIn, result]
}

export default useSignIn
