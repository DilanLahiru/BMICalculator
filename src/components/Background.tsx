import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Get device dimensions
const { width } = Dimensions.get('window')

const Background = ({children} : {children: React.ReactNode}) => {
  return (
    <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#301934','#5d3a6f']} style={styles.container}>
        {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
     },
});

export default Background