import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    userHasReviewed
    watchersCount
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    createdAt
    id
    rating
    repository {
      name
      id
    }
    repositoryId
    text
    user {
      username
      id
    }
    userId
  }
`

export const PERSON_DETAILS = gql`
  fragment PersonDetails on User {
    username
    id
  }
`
