import { gql } from '@apollo/client'
import { PERSON_DETAILS, REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
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
