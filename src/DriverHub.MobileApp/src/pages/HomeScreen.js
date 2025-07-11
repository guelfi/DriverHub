import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation, route }) => {
  const { nome, sobrenome } = route.params || {};
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>Bem-vindo ao DriverHub!</Text>
      {nome && sobrenome && (
        <Text style={[styles.welcomeText, { color: currentTheme.colors.text }]}>Olá, {nome} {sobrenome}!</Text>
      )}
      <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>Sua jornada começa aqui.</Text>
      {/* Adicione mais conteúdo aqui conforme o desenvolvimento */}
      <Button title="Sair" onPress={() => navigation.navigate('Login')} color={currentTheme.colors.buttonPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;