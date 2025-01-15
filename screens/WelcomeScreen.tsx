import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation} : any) {
  return (
    <ImageBackground 
    source={{uri:'https://4kwallpapers.com/images/walls/thumbs_3t/20496.jpg'}} 
    style={styles.container}
    >
      <Text style={{fontSize:30, color:'white'}}>Welcome</Text>
      <Button 
       title='LOGIN'
       onPress={()=> navigation.navigate('Login')}
       />
       <Button 
       title='REGISTRATE'
       onPress={()=> navigation.navigate('Registro')}
       />
       <Text style={{fontSize:30, color:'white'}}>Dennis Proaño</Text>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})