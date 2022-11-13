import { gql } from '@apollo/client'
import { PERSON_DETAILS, REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`

export const ME = gql`
  query {
    me {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`
