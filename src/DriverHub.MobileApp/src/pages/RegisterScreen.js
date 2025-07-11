import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AuthService from '../services/AuthService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nomeError, setNomeError] = useState('');
  const [sobrenomeError, setSobrenomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for success
  const { theme, toggleTheme, currentTheme } = useTheme();

  const validateEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    let valid = true;

    // Reset errors and success state
    setNomeError('');
    setSobrenomeError('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setRegistrationSuccess(false);

    if (!nome) {
      setNomeError('O nome é obrigatório.');
      valid = false;
    }

    if (!sobrenome) {
      setSobrenomeError('O sobrenome é obrigatório.');
      valid = false;
    }

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
      return;
    }

    try {
      await AuthService.register(nome, sobrenome, email, password);
      setRegistrationSuccess(true);
    } catch (error) {
      console.log('RegisterScreen: Error caught', error.message);
      setGeneralError(error.message || 'Ocorreu um erro durante o cadastro.');
    }
  };

  if (registrationSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <Text style={[styles.successMessage, { color: currentTheme.colors.text }]}>Cadastro realizado com sucesso!</Text>
        <Button title="Fazer Login" onPress={() => navigation.navigate('Login')} color={currentTheme.colors.buttonPrimary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Icon name={theme === 'light' ? 'moon-o' : 'sun-o'} size={24} color={currentTheme.colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>Cadastro</Text>
      <TextInput
        style={[styles.input, { backgroundColor: currentTheme.colors.inputBackground, borderColor: currentTheme.colors.inputBorder, color: currentTheme.colors.text }]}
        placeholder="Nome"
        placeholderTextColor={currentTheme.colors.text === '#333' ? '#888' : '#bbb'}
        value={nome}
        onChangeText={(text) => { setNome(text); setNomeError(''); setGeneralError(''); }}
        autoCapitalize="words"
      />
      {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

      <TextInput
        style={[styles.input, { backgroundColor: currentTheme.colors.inputBackground, borderColor: currentTheme.colors.inputBorder, color: currentTheme.colors.text }]}
        placeholder="Sobrenome"
        placeholderTextColor={currentTheme.colors.text === '#333' ? '#888' : '#bbb'}
        value={sobrenome}
        onChangeText={(text) => { setSobrenome(text); setSobrenomeError(''); setGeneralError(''); }}
        autoCapitalize="words"
      />
      {sobrenomeError ? <Text style={styles.errorText}>{sobrenomeError}</Text> : null}

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

      <Button title="Cadastrar" onPress={handleRegister} color={currentTheme.colors.buttonPrimary} />
      {generalError ? <Text style={styles.generalErrorText}>{generalError}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={[styles.loginButtonText, { color: currentTheme.colors.linkText }]}>Já tem conta? Faça login</Text>
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
  loginButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
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
  successMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RegisterScreen;