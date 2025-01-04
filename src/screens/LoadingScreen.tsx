import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  loading: undefined;
  home: undefined;
};

type LoadingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'loading'
>;

const LoadingScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProps>(); // Navigation with typing

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('gender');
  //   }, 3000);
  // }, []);

  const getStarted = () => {
    navigation.navigate('home');
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View
        style={{
          width: width - 50,
          //backgroundColor: 'red',
          height: height * 0.15,
        }}>
        <Text style={styles.mainTitle}>
          {'Get Started with\nTracking Your Health!'}
        </Text>
      </View>
      <View
        style={{
          width: width - 50,
          //backgroundColor: 'gray',
          height: height * 0.1,
        }}>
        <Text style={styles.subTitle}>
          Calculate your BMI and stay on top of your wellness journey,
          effortlessly.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => getStarted()}
        style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
        <Image source={require('../assets/next.png')} style={{width: 20, height: 10, marginLeft: 20}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    backgroundColor: '#301934',
  },
  logo: {
    width: width / 1,
    height: height * 0.4,
  },
  mainTitle: {
    fontSize: height * 0.04,
    fontFamily: 'Kanit-Medium',
    color: '#fff',
    //textAlign: 'left',
  },
  subTitle: {
    fontSize: height * 0.02,
    fontFamily: 'Kanit-Light',
    color: '#fff',
    //textAlign: 'left',
  },
  btnText: {
    fontSize: height * 0.02,
    fontFamily: 'Kanit-Medium',
    color: '#301934',
    textAlign: 'center',
  },
  btn: {
    width: width - 120,
    height: height * 0.065,
    backgroundColor: '#F4F3FF',
    marginTop: height * 0.03,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
});

export default LoadingScreen;
