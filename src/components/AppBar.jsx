import AppBarTab from './AppBarTab'
import { StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 20 + Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
})
const AppBar = () => {
  return (
    <>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab desc="Repositories" link="/repositories" />
        <AppBarTab desc="Sign in" link="/signin" />
      </ScrollView>
    </>
  )
}

export default AppBar
