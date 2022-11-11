import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`)
    return token
    //   return rawProducts ? JSON.parse(rawProducts) : [];
  }

  async setAccessToken(accessToken) {
    // const currentProducts = await this.getProducts();
    // const newProducts = [...currentProducts, productId];

    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    )
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage
