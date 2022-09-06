import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Client from '../components/Client';
import Accueil from '../components/Accueil';
import Produit from '../components/Produit';
import Commande from '../components/Commande';
import Chiffre from '../components/Chiffre';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Client" component={Client}/>
      <Stack.Screen name="Produit" component={Produit} />
      <Stack.Screen name="Commande" component={Commande} />
      <Stack.Screen name="Chiffre" component={Chiffre} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;