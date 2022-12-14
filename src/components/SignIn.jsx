import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import Text from './Text'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import AppBar from './AppBar'

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
  username: '',
  password: '',
}

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username length must be at least 3'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'Password length must be at least 3'),
})

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        testID="usernameInput"
        name="username"
        placeholder="Username"
        style={styles.field}
      />
      <FormikTextInput
        testID="passwordInput"
        name="password"
        placeholder="Password"
        style={styles.field}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" color="light">
          Submit
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const navigate = useNavigate()
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
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
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  )
}

export default SignIn
