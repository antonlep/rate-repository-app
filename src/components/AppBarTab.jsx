import { View, StyleSheet } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
})

const AppBarTab = ({ desc, link }) => {
  return (
    <View style={styles.button}>
      <Link to={link}>
        <Text color="light" fontSize="topbar">
          {desc}
        </Text>
      </Link>
    </View>
  )
}

export default AppBarTab
