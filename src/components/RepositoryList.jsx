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

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState()
  console.log(selectedValue)

  const onSubmit = ({ item }) => {
    navigate(`/${item.id}`)
  }

  const { repositories } = useRepositories(selectedValue)

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
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.option}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={pressableItem}
      />
    </>
  )
}

export default RepositoryList
