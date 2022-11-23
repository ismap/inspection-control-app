import * as React from 'react';

import { useState, useEffect } from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import axios from 'axios';

/* Components */
import ListItem from '../components/ListItem';

const HomeScreen = ({ navigation }) => {

    const url_vehicleaccess = 'http://192.168.1.200:81/accesovehicular/api/?access_inspection_completed=false';

    const [ access_data, set_access_data ] = useState([])
    const [ is_fetching, set_is_fetching ] = useState(false);

    // Call Access Data
    useEffect(() => {

        axios({
        method: 'GET',
        url :url_vehicleaccess,
        headers: {"Accept-Language":"es-es"}
        })
        .then((response) => {
        set_access_data(response.data)
        })
        .catch((error) => {
        console.log(error)
        })

    }, [])

    const onRefresh =  () => {
        set_is_fetching(true);

        axios({
        method: 'GET',
        url: url_vehicleaccess,
        headers: {"Accept-Language":"es-es"}
        })
        .then((response) => {
        set_access_data(response.data)
        set_is_fetching(false)
        })
        .catch((error) => {
        set_is_fetching(false)
        console.log(error)
        })
    };

    return(
      <View style={styles.container}>
        <FlatList data={access_data} keyExtractor={(item) => item.id} renderItem={ ({ item } ) => <ListItem navigation={ navigation } item = { item } />} onRefresh={onRefresh} refreshing={is_fetching} />
      </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
})