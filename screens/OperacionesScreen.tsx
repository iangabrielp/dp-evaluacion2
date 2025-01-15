import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database'; 
//FIREBASE
import { db } from '../config/Config';

export default function OperacionesScreen() {
  const [idoperaciones, setidoperaciones] = useState('');
  const [precio, setprecio] = useState('');
  const [cantidad, setcantidad] = useState('');
  const [descripcion, setdescripcion] = useState('');

  // Obtener la referencia a la base de datos
  const db = getDatabase(); 

  // Función para manejar la validación y guardar
  function guardar() {
    const precioNumber = parseFloat(precio);

    // Verificar si el precio es negativo
    if (precioNumber < 0) {
      Alert.alert('Error', 'El precio no puede ser negativo.');
      return;
    }

    // Verificar si el precio está fuera del rango permitido
    if (precioNumber < 1 || precioNumber > 20) {
      Alert.alert(
        'Advertencia',
        'El precio está fuera del rango permitido (entre $1 y $20). ¿Deseas continuar?',
        [
          {
            text: 'Sí',
            onPress: () => {
              // Guardar en la base de datos
              set(ref(db, 'prueba2/' + idoperaciones), {
                price: precio,
                quantity: cantidad,
                description: descripcion,
              });
              Alert.alert('Éxito', 'Operación guardada correctamente');
              limpiarCamposRegistro();
            },
          },
          {
            text: 'No',
            style: 'cancel',
          },
        ]
      );
    } else {
      // Guardar en la base de datos si el precio es válido
      set(ref(db, 'prueba2/' + idoperaciones), {
        cost: precio,
        quanti: cantidad,
        description: descripcion,
      });
      Alert.alert('Éxito', 'Operación guardada correctamente');
      limpiarCamposRegistro();
    }
  }

  //  limpiar 
  const limpiarCamposRegistro = () => {
    setidoperaciones('');
    setprecio('');
    setcantidad('');
    setdescripcion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>
      <TextInput
        placeholder='Ingresar Id'
        style={styles.input}
        onChangeText={(texto) => setidoperaciones(texto)}
        value={idoperaciones}
      />
      <TextInput
        placeholder='Ingresar precio'
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(texto) => setprecio(texto)}
        value={precio}
      />
      <TextInput
        placeholder='Ingresar cantidad'
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(texto) => setcantidad(texto)}
        value={cantidad}
      />
      <TextInput
        placeholder='Ingresar descripcion'
        style={styles.input}
        onChangeText={(texto) => setdescripcion(texto)}
        value={descripcion}
      />
      <Button title='Guardar' onPress={() => guardar()} color="#4CAF50" />
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
