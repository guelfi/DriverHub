import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation, route }) => {
  const { nome, sobrenome } = route.params || {};
  const { currentTheme, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Icon name={theme === 'light' ? 'moon-o' : 'sun-o'} size={24} color={currentTheme.colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>Bem-vindo ao DriverHub!</Text>
      {nome && sobrenome && (
        <Text style={[styles.welcomeText, { color: currentTheme.colors.text }]}>Olá, {nome} {sobrenome}!</Text>
      )}
      <Text style={[styles.subtitle, { color: currentTheme.colors.text }]}>Sua jornada começa aqui.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.appButton, { backgroundColor: currentTheme.colors.buttonPrimary }]}
          onPress={() => navigation.navigate('MeuKm')} // Assuming 'MeuKm' is the route name
        >
          <Text style={[styles.appButtonText, { color: currentTheme.colors.buttonText }]}>Meu KM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.appButton, { backgroundColor: currentTheme.colors.buttonPrimary }]}
          onPress={() => navigation.navigate('ResultadosDiarios')} // Assuming 'ResultadosDiarios' is the route name
        >
          <Text style={[styles.appButtonText, { color: currentTheme.colors.buttonText }]}>Resultados Diários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.appButton, { backgroundColor: currentTheme.colors.buttonPrimary }]}
          onPress={() => navigation.navigate('Despesas')} // Assuming 'Despesas' is the route name
        >
          <Text style={[styles.appButtonText, { color: currentTheme.colors.buttonText }]}>Lançar Despesas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.appButton, { backgroundColor: currentTheme.colors.buttonPrimary }]}
          onPress={() => navigation.navigate('Relatorios')} // Assuming 'Relatorios' is the route name
        >
          <Text style={[styles.appButtonText, { color: currentTheme.colors.buttonText }]}>Relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.appButton, { backgroundColor: currentTheme.colors.buttonPrimary }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.appButtonText, { color: currentTheme.colors.buttonText }]}>Sair</Text>
        </TouchableOpacity>
      </View>
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
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
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
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Adjust as needed
  },
  appButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15, // Increased space between buttons
  },
  appButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;