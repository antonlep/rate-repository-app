import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { Formik } from 'formik'
import { View, Pressable, Text } from 'react-native'
import { initialValues, validationSchema } from '../components/SignIn'
import FormikTextInput from '../../components/FormikTextInput'

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="usernameInput"
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        testID="passwordInput"
        name="password"
        placeholder="Password"
      />
      <Pressable onPress={onSubmit}>
        <Text fontSize="subheading" color="light">
          Submit
        </Text>
      </Pressable>
    </View>
  )
}

const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  )
}

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn
      const { debug, getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      )

      debug()

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(getByPlaceholderText('Password'), 'password')
      fireEvent.press(getByText('Submit'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        })
      })
    })
  })
})
