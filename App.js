
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Detalhes from './screens/Detalhes';
import Formulario from './screens/Formulario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#5267D9' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F4F5FA' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'TaskFlow' }}
        />

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{ title: 'Detalhes da tarefa' }}
        />

        <Stack.Screen
          name="Formulario"
          component={Formulario}
          options={{
            title: 'Nova tarefa',
            headerBackVisible: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
