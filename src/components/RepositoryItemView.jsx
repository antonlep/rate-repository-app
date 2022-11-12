import RepositoryItem from './RepositoryItem'
import { View, Pressable, StyleSheet } from 'react-native'
import { useLocation } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import * as Linking from 'expo-linking'

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
})

const RepositoryItemView = () => {
  const location = useLocation()
  const item = location.state
  const onSubmit = () => {
    Linking.openURL(item.url)
  }

  return (
    <View>
      <RepositoryItem item={item} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" color="light">
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  )
}

export default RepositoryItemView
