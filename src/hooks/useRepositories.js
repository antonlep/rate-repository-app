import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order) => {
  let options = {}
  switch (order) {
    case 'latest':
      options = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
      break
    case 'highest':
      options = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      break
    case 'lowest':
      options = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      break
    default:
      options = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: options,
  })

  if (loading) {
    return { undefined, loading }
  }
  const repositories = data.repositories
  return { repositories, loading }
}

export default useRepositories
