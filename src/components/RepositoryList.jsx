import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'
import AppBar from './AppBar'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  option: {
    fontSize: theme.fontSizes.body,
  },
})

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate()
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

  const onSubmit = ({ item }) => {
    navigate(`/${item.id}`)
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={pressableItem}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState()
  console.log(selectedValue)

  const { repositories, fetchMore } = useRepositories({
    first: 5,
    ordering: selectedValue,
  })

  const onEndReach = () => {
    console.log('You have reached the end of the list')
    fetchMore()
  }

  return (
    <>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.option}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </>
  )
}

export default RepositoryList
