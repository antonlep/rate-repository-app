import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async ({
    ownername,
    repositoryname,
    rating,
    review,
  }) => {
    const reviewData = {
      ownerName: ownername,
      repositoryName: repositoryname,
      rating: parseInt(rating),
      text: review,
    }
    const data = await mutate({ variables: { review: reviewData } })
    return { data }
  }

  return [createReview, result]
}

export default useCreateReview
