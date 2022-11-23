import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import InspectionScreen from './screens/InspectionScreen';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inspección de Unidades' /*screenOptions={{header: (props) => <CustomNavigationBar {...props} /> , }}*/>
        <Stack.Screen name='Inspección de Unidades' component={HomeScreen} />
        <Stack.Screen name='CreateInspectionScreen' component={InspectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

};
