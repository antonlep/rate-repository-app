import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  errorField: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    fontSize: theme.fontSizes.subheading,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style]

  if (error) {
    return <NativeTextInput style={styles.errorField} {...props} />
  }
  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
