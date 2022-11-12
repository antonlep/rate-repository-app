import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'
import AppBar from './AppBar'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const navigate = useNavigate()

  const onSubmit = ({ item }) => {
    navigate(`/${item.id}`, { state: item })
  }

  const { repositories } = useRepositories()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const pressableItem = ({ item }) => {
    return (
      <Pressable onPress={() => onSubmit({ item })}>
        {RepositoryItem({ item })}
      </Pressable>
    )
  }

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={pressableItem}
      />
    </>
  )
}

export default RepositoryList
