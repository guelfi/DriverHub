const axios = require('axios');

const API_URL = 'http://localhost:5217/api';
const ADMIN_EMAIL = 'guelfi@msn.com';
const ADMIN_SENHA = '@5ST73EA4x';
const ADMIN_SENHA_INCORRETA = 'SenhaErrada123';
const MOTORISTA_EMAIL = `motorista.teste.${Date.now()}@driverhub.com`;
const MOTORISTA_SENHA = 'Motorista@123';
const MOTORISTA_SENHA_INCORRETA = 'SenhaErrada456';

let adminToken = '';
let motoristaToken = '';

const runTest = async (name, testFn) => {
    try {
        console.log(`\n--- TESTE: ${name} ---`);
        await testFn();
        console.log('-> SUCESSO');
    } catch (error) {
        console.error('-> FALHA');
        console.error(error.response ? { status: error.response.status, data: error.response.data } : error.message);
        process.exit(1);
    }
};

const assertStatus = (response, expectedStatus) => {
    if (response.status !== expectedStatus) {
        throw new Error(`Status esperado: ${expectedStatus}, Recebido: ${response.status}`);
    }
};

const main = async () => {
    await runTest('Login de Admin (Falha - Senha Incorreta)', async () => {
        try {
            await axios.post(`${API_URL}/Admin/login`, { email: ADMIN_EMAIL, senha: ADMIN_SENHA_INCORRETA });
        } catch (error) {
            assertStatus(error.response, 401);
        }
    });

    await runTest('Login de Admin (Sucesso)', async () => {
        const response = await axios.post(`${API_URL}/Admin/login`, { email: ADMIN_EMAIL, senha: ADMIN_SENHA });
        assertStatus(response, 200);
        adminToken = response.data.token;
    });

    await runTest('Registrar Motorista (Sucesso)', async () => {
        const response = await axios.post(`${API_URL}/Auth/register`, { nome: 'Motorista', sobrenome: 'Teste', email: MOTORISTA_EMAIL, senha: MOTORISTA_SENHA });
        assertStatus(response, 200);
    });

    await runTest('Login de Motorista (Falha - Senha Incorreta)', async () => {
        try {
            await axios.post(`${API_URL}/Auth/login`, { email: MOTORISTA_EMAIL, senha: MOTORISTA_SENHA_INCORRETA });
        } catch (error) {
            assertStatus(error.response, 401);
        }
    });

    await runTest('Login de Motorista (Sucesso)', async () => {
        const response = await axios.post(`${API_URL}/Auth/login`, { email: MOTORISTA_EMAIL, senha: MOTORISTA_SENHA });
        assertStatus(response, 200);
        motoristaToken = response.data.token;
    });

    await runTest('Obter Perfil do Motorista (Sucesso)', async () => {
        const response = await axios.get(`${API_URL}/Motorista/profile`, { headers: { Authorization: `Bearer ${motoristaToken}` } });
        assertStatus(response, 200);
    });

    await runTest('Obter Contagem de Motoristas (Sucesso)', async () => {
        const response = await axios.get(`${API_URL}/Admin/motorist-count`, { headers: { Authorization: `Bearer ${adminToken}` } });
        assertStatus(response, 200);
    });

    await runTest('Listar Motoristas (Sucesso)', async () => {
        const response = await axios.get(`${API_URL}/Admin/motoristas?pageNumber=1&pageSize=5`, { headers: { Authorization: `Bearer ${adminToken}` } });
        assertStatus(response, 200);
    });

    console.log('\n--- TODOS OS TESTES FORAM CONCLUÍDOS COM SUCESSO! ---');
};

main();
