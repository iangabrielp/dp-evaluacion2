import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasenia, setcontrasenia] = useState('')
   
    // Función para manejar los errores
    const handleError = (errorCode: string) => {
        let titulo = '';
        let mensaje = '';

        switch (errorCode) {
            case 'auth/email-already-in-use':
                titulo = 'Email ya en uso';
                mensaje = 'El correo ingresado ya está asociado a una cuenta.';
                break;
            case 'auth/invalid-email':
                titulo = 'Correo inválido';
                mensaje = 'Por favor, ingresa un correo electrónico válido.';
                break;
            case 'auth/weak-password':
                titulo = 'Contraseña débil';
                mensaje = 'La contraseña debe tener al menos 6 caracteres.';
                break;
            default:
                titulo = 'ERROR';
                mensaje = 'Verificar credenciales';
                break;
        }

        Alert.alert(titulo, mensaje);
    };

    // Función de Registro
    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia, )
            .then((userCredential) => {
                // Registro exitoso
                const user = userCredential.user;
                Alert.alert('Registro Exitoso', 'Cuenta creada correctamente');
                limpiarCamposRegistro();

                navigation.navigate('Login');
            })
            .catch((error) => {
                handleError(error.code);
            });
    }

    // Función para limpiar campos de Registro
    const limpiarCamposRegistro = () => {
        setcorreo('');
        setcontrasenia('');
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                placeholder='Ingresar correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
                value={correo}
            />
            <TextInput
                placeholder='Ingresar contraseña'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(texto) => setcontrasenia(texto)}
                value={contrasenia}
            />
            
            <Button title='Registro' onPress={() => registro()} color="#4CAF50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 15,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
