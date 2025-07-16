import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RelatoriosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Relatórios</Text>
      <Text style={styles.subtitle}>Funcionalidade para visualização de relatórios em desenvolvimento...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default RelatoriosScreen;