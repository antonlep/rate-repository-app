import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import Text from './Text'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
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

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username length must be at least 1')
    .max(30, 'Username length must be at most 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password length must be at least 5')
    .max(50, 'Password length must be at most 50'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Passwords dont match'),
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.field}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.field}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        style={styles.field}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" color="light">
          Sign up
        </Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      const { data } = await signIn({ username, password })
      console.log(data)
      navigate('/', { replace: true })
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
        // style={styles.main}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  )
}

export default SignUp
