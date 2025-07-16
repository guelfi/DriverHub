import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext';

import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import HomeScreen from './src/pages/HomeScreen';
import MeuKmScreen from './src/pages/MeuKmScreen';
import ResultadosDiariosScreen from './src/pages/ResultadosDiariosScreen';
import DespesasScreen from './src/pages/DespesasScreen';
import RelatoriosScreen from './src/pages/RelatoriosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MeuKm" component={MeuKmScreen} options={{ title: 'Meu KM' }} />
          <Stack.Screen name="ResultadosDiarios" component={ResultadosDiariosScreen} options={{ title: 'Resultados Diários' }} />
          <Stack.Screen name="Despesas" component={DespesasScreen} options={{ title: 'Despesas' }} />
          <Stack.Screen name="Relatorios" component={RelatoriosScreen} options={{ title: 'Relatórios' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}