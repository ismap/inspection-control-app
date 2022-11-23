import * as React from "react";

import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Card, Title, Paragraph, Text } from 'react-native-paper';

const ListItem = ({ navigation, item }) => {

    const { id, access_date, access_truck, access_trailer , access_control} = item;

    return(

        <View style={styles.container}>

            <Pressable onPress={() => navigation.navigate('CreateInspectionScreen', {id: id})}>

                <View style={styles.card}>

                    <View style={styles.cardDate}>
                        <Text>{access_date}</Text>
                    </View>

                    <View>
                        <Text>{access_control}</Text>
                        <Text style={styles.cardVehicle}>T{access_truck} C{access_trailer}</Text>
                    </View>

                    <View>
                        <Image style={{ width: 35, height: 35 }} source={require('../img/right.png')} />
                    </View>

                </View>

            </Pressable>


        </View>

    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //borderWidth: 1,
        //borderColor: 'black',
        borderRadius: 15,
        padding: 15
    },
    cardDate: {
        fontWeight: 'bold'
    },
    cardVehicle: {
        fontWeight: 'bold'
    }
})