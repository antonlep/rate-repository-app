import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  let orderBy = ''
  let orderDirection = ''
  switch (variables.ordering) {
    case 'latest':
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
      break
    case 'highest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'lowest':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
    default:
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
  }

  const variablesUpd = {
    orderBy: orderBy,
    orderDirection: orderDirection,
    ...variables,
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables: variablesUpd,
    }
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  if (loading) {
    return { undefined, loading }
  }
  // const repositories = data.repositories
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositories
