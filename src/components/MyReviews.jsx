import { FlatList, View, Pressable, StyleSheet } from 'react-native'
import { useLocation } from 'react-router-native'
import Text from './Text'
import theme from '../theme'
import { format, parseISO } from 'date-fns'
import * as Linking from 'expo-linking'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'

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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.item}>
      <View style={styles.leftPanel}>
        <Text style={styles.rating} color="primary" fontSize="topbar">
          {review.rating}
        </Text>
      </View>
      <View style={styles.rightPanel}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const SingleRepository = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })
  if (loading) {
    return <Text>loading...</Text>
  }

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
      // ...
    />
  )
}

export default SingleRepository
