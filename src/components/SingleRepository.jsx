import RepositoryItem from './RepositoryItem'
import { FlatList, View, Pressable, StyleSheet } from 'react-native'
import { useLocation } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import * as Linking from 'expo-linking'
import { format, parseISO } from 'date-fns'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  separator: {
    height: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
  },
  upperPart: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  leftPanel: {
    borderColor: theme.colors.primary,
  },
  rightPanel: {
    flexDirection: 'column',
    paddingLeft: 20,
    flex: 1,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ item }) => {
  // Repository's information implemented in the previous exercise
  const onSubmit = () => {
    Linking.openURL(item.url)
  }
  return (
    <View style={styles.upperPart}>
      <RepositoryItem item={item} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" color="light">
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.item}>
      <View style={styles.leftPanel}>
        <Text style={styles.rating} color="primary" fontSize="topbar">
          {review.rating}
        </Text>
      </View>
      <View style={styles.rightPanel}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const location = useLocation()
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: location.pathname.substring(1) },
    fetchPolicy: 'cache-and-network',
  })
  if (loading) {
    return <Text>loading...</Text>
  }
  const item = data.repository
  const reviewNodes = item.reviews
    ? item.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
      // ...
    />
  )
}

export default SingleRepository
