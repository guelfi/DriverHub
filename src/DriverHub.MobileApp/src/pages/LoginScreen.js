import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AuthService from '../services/AuthService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState(''); // New state for general error
  const { theme, toggleTheme, currentTheme } = useTheme();

  const validateEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    let valid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setGeneralError(''); // Reset general error

    if (!email) {
      setEmailError('O e-mail é obrigatório.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      valid = false;
    }

    if (!password) {
      setPasswordError('A senha é obrigatória.');
      valid = false;
    }

    if (!valid) {
      return; // Stop if validation fails
    }

    try {
      const result = await AuthService.login(email, password);
      if (result && result.token) {
        navigation.navigate('Home', { nome: result.nome, sobrenome: result.sobrenome }); // Pass nome and sobrenome
        console.log('Token:', result.token);
      } else {
        // This case should ideally not be reached if AuthService throws on invalid credentials
        setGeneralError('Credenciais inválidas.');
      }
    } catch (error) {
      console.log('LoginScreen: Error caught', error.message);
      setGeneralError(error.message || 'Ocorreu um erro durante o login.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Icon name={theme === 'light' ? 'moon-o' : 'sun-o'} size={24} color={currentTheme.colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>Login</Text>
      <TextInput
        style={[styles.input, { backgroundColor: currentTheme.colors.inputBackground, borderColor: currentTheme.colors.inputBorder, color: currentTheme.colors.text }]}
        placeholder="E-mail"
        placeholderTextColor={currentTheme.colors.text === '#333' ? '#888' : '#bbb'}
        value={email}
        onChangeText={(text) => { setEmail(text); setEmailError(''); setGeneralError(''); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={[styles.passwordContainer, { borderColor: currentTheme.colors.inputBorder, backgroundColor: currentTheme.colors.inputBackground }]}>
        <TextInput
          style={[styles.passwordInput, { color: currentTheme.colors.text }]}
          placeholder="Senha"
          placeholderTextColor={currentTheme.colors.text === '#333' ? '#888' : '#bbb'}
          value={password}
          onChangeText={(text) => { setPassword(text); setPasswordError(''); setGeneralError(''); }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color={currentTheme.colors.text} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <Button title="Entrar" onPress={handleLogin} color={currentTheme.colors.buttonPrimary} />
      {generalError ? <Text style={styles.generalErrorText}>{generalError}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        <Text style={[styles.registerButtonText, { color: currentTheme.colors.linkText }]}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  registerButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
    fontSize: 12,
  },
  generalErrorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
});

export default LoginScreen;