import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';


export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('')
    const [contrasenia, setcontrasenia] = useState('')
    const [ver, setver] = useState(false)
    const [correoRestablecer, setcorreoRestablecer] = useState('')

    // Función para manejar los errores
    const handleError = (errorCode: string) => {
        let titulo = '';
        let mensaje = '';

        switch (errorCode) {
            case 'auth/wrong-password':
                titulo = 'Error en la contraseña';
                mensaje = 'Contraseña incorrecta. Verificar';
                break;
            case 'auth/user-not-found':
                titulo = 'Usuario no encontrado';
                mensaje = 'Por favor verificar el email ingresado';
                break;
            default:
                titulo = 'ERROR';
                mensaje = 'Verificar credenciales';
                break;
        }

        Alert.alert(titulo, mensaje);
    };


    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigation.navigate('Welcome');
                limpiarCamposLogin();
            })
            .catch((error) => {
                handleError(error.code);
            });


    }

    // Función para limpiar campos de Login
    const limpiarCamposLogin = () => {
        setcorreo('');
        setcontrasenia('');
    };

    function restablecer() {
        sendPasswordResetEmail(auth, correoRestablecer)
            .then(() => {
                // Password reset email sent!
                // ..
                Alert.alert('Mensaje, Se ha enviado un mensaje a su correo')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                Alert.alert(errorCode, errorMessage)
            });

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title='Login' onPress={() => login()} color="#4CAF50" />

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={[styles.link, styles.marginTop]}>Crear una cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setver(!ver)}>
                <Text style={styles.link}>Olvidaste la contraseña? Da clic aquí</Text>
            </TouchableOpacity>

            <Modal visible={ver} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder='Ingresar correo'
                            style={styles.input}
                            onChangeText={(texto) => setcorreoRestablecer(texto)}
                            value={correoRestablecer}
                        />
                        <Button title='Enviar' onPress={() => restablecer()} />
                        <Button title='Cerrar' onPress={() => setver(!ver)} color={'red'} />
                    </View>
                </View>
            </Modal>


        </View>
    )
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
    link: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    marginTop: {
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
})