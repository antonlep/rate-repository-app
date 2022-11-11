import AppBarTab from './AppBarTab'
import { StyleSheet, ScrollView, View, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import Text from './Text'
import useSignOut from '../hooks/useSignOut'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

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
  const { data, error, loading } = useQuery(ME)
  const [signOut] = useSignOut()

  console.log('me: ' + JSON.stringify(data))

  if (!data || data.me === null) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
          <AppBarTab desc="Repositories" link="/repositorylist" />
          <AppBarTab desc="Sign in" link="/signin" />
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
          <AppBarTab desc="Repositories" link="/repositorylist" />
          <Pressable style={styles.button} onPress={signOut}>
            <Text color="light" fontSize="topbar">
              Sign out
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    )
  }
}

export default AppBar
