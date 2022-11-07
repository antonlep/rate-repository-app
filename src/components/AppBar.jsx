import AppBarTab from './AppBarTab'
import { StyleSheet, ScrollView, View } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'flex-end',
  },
})
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab desc="Repositories" link="/repositories" />
        <AppBarTab desc="Sign in" link="/signin" />
      </ScrollView>
    </View>
  )
}

export default AppBar
