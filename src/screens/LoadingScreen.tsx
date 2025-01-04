import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import Background from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  loading: undefined;
  gender: undefined;
};

type LoadingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'loading'
>;

const LoadingScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProps>(); // Navigation with typing

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('gender');
    }, 3000);
  }, []);

  return (
    <Background>
      <Image source={require('../assets/mainLogo.png')} style={styles.logo} />
      <Text style={styles.mainTitle}>BMI</Text>
      <Text style={styles.subTitle}>Calculator</Text>
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: width / 1.5,
    height: height * 0.4,
  },
  mainTitle: {
    fontSize: height * 0.15,
    fontFamily: 'Kanit-SemiBold',
    color: '#fff',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: height * 0.04,
    fontFamily: 'Kanit-Light',
    color: '#fff',
    textAlign: 'left',
  },
});

export default LoadingScreen;
