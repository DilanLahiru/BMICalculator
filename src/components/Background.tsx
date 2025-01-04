import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Get device dimensions
const { width, height } = Dimensions.get('window')

const Background = ({children} : {children: React.ReactNode}) => {
  return (
    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={['#301934','#5d3a6f']} style={styles.container}>
        {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: { 
      width: width - 90,
      //width: 50,
      height: height * 0.08,
      //height: 50,
      backgroundColor: '#301934',
      //marginTop: height * 0.03,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
     },
});

export default Background