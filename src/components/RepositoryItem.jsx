import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  lefttop: {
    flex: 1,
  },
  righttop: {
    flex: 4,
  },
  language: {
    flexDirection: 'row',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  bottomItem: {
    flex: 1,
  },
})

const count1k = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  } else {
    return count.toString()
  }
}

const repositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.lefttop}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
        </View>
        <View style={styles.righttop}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text>{item.description}</Text>
          <View style={styles.language}>
            <Text color="light" backgroundColor="primary">
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <Text fontWeight="bold">{count1k(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.bottomItem}>
          <Text fontWeight="bold">{count1k(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.bottomItem}>
          <Text fontWeight="bold">{count1k(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.bottomItem}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default repositoryItem
