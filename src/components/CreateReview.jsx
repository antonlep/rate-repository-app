import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import Text from './Text'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  field: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    fontSize: theme.fontSizes.subheading,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
  },
})

export const initialValues = {
  ownername: '',
  repositoryname: '',
  rating: 0,
  review: '',
}

export const validationSchema = yup.object().shape({
  ownername: yup.string().required('Repository owner name is required'),
  repositoryname: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').max(100).min(0),
})

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownername"
        placeholder="Repository owner name"
        style={styles.field}
      />
      <FormikTextInput
        name="repositoryname"
        placeholder="Repository name"
        style={styles.field}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles.field}
      />
      <FormikTextInput
        name="review"
        placeholder="Review"
        style={styles.field}
        multiline={true}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" color="light">
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const navigate = useNavigate()
  const [createReview] = useCreateReview()

  const onSubmit = async (values) => {
    const { ownername, repositoryname, rating, review } = values

    try {
      const { data } = await createReview({
        ownername,
        repositoryname,
        rating,
        review,
      })
      const repositoryId = data.data.createReview.repositoryId
      navigate(`/${repositoryId}`)
      //   navigate(`/${data.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  )
}

export default CreateReview
