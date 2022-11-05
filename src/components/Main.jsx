import { View, StyleSheet } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import AppBar from './AppBar'
import theme from '../theme'

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.backgroundDark,
  },
  middle: {
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.main}>
      <AppBar />
      <View style={styles.middle}>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/repositorylist" element={<RepositoryList />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
