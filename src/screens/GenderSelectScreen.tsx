import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import Background from '../components/Background';
import { useDispatch } from 'react-redux';
import { setGenderType } from '../redux/genderSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
    gender: undefined,
    home: undefined,
};

type GenderSelectScreenProps = StackNavigationProp<RootStackParamList, 'gender'>

const GenderSelectScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<GenderSelectScreenProps>(); // Navigation with typing

    const selectedGenderType = (gender: any) => {
        dispatch(setGenderType({
            genderType: gender
        }))
        navigation.navigate('home')
    }
  return (
    <Background>
      <View>
        <Text style={styles.subTitle}>SELECT YOUR GENDER TYPE</Text>
      </View>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={() => selectedGenderType('male')}>
        <Image source={require('../assets/men.png')} style={styles.menIcon} />
        </TouchableOpacity>
        <View style={styles.devider}/>
        <TouchableOpacity onPress={() => selectedGenderType('female')}>
        <Image
          source={require('../assets/women.png')}
          style={styles.womenIcon}
        />
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  menIcon: {
    width: width / 2,
    height: height * 0.6,
    //width: 100,
    //height: 400,
  },
  womenIcon: {
    width: width / 2,
    height: height * 0.6,
    //width: 100,
    //height: 400,
  },
  mainTitle: {
    fontSize: height * 0.15,
    fontFamily: 'Kanit-SemiBold',
    color: '#fff',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: height * 0.045,
    fontFamily: 'Kanit-Light',
    color: '#fff',
    textAlign: 'center',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    //backgroundColor: 'red',
    alignItems: 'center',
    height: height / 1.3
  },
  devider: {
    borderWidth: 0.5,
    borderColor: '#DCD7D5',
    height: height / 1.6,
  }
});

export default GenderSelectScreen;
