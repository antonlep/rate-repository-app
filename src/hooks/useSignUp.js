import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_UP } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP)
  // const authStorage = useAuthStorage()
  // const apolloClient = useApolloClient()

  const signUp = async ({ username, password }) => {
    const credentials = { username: username, password: password }
    const res = await mutate({ variables: { user: credentials } })
    // if (res.data.authenticate) {
    //   const token = res.data.authenticate.accessToken
    //   await authStorage.setAccessToken(token)
    //   apolloClient.resetStore()
    //   return { data: token }
    // }
    return { res }
  }

  return [signUp, result]
}

export default useSignUp
