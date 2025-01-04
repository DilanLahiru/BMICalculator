import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { resetState } from '../redux/bmiSlice';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  result: undefined;
  home: undefined;
};

type ResultScreenProps = StackNavigationProp<RootStackParamList, 'result'>;

const ResultScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ResultScreenProps>(); // Navigation with typing
  const {age, genderType, userheight, weight, bmiValue, feedback, healthTips} =
    useSelector((state: RootState) => state.root);

const goBack = () => {
  dispatch(resetState())
  navigation.navigate('home');
}

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          height: height * 0.08,
          //backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View style={{width: width / 8}}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={require('../assets/Leftarrow.png')}
            style={{width: 30, height: 20}}
          />
          </TouchableOpacity>
        </View>
        <View style={{width: width / 1.5}}>
          <Text style={styles.header}>Calculation Result</Text>
        </View>
      </View>
      <View style={styles.subView}>
        <Text style={styles.label}>BMI Score</Text>
      </View>
      <View
        style={{
          width: width - 50,
          //backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.15,
          marginTop: height * 0.02,
        }}>
        <Text
          style={{
            fontSize: 80,
            fontFamily: 'Kanit-Bold',
            color:
              feedback === 'Underweight'
                ? '#f5631a'
                : feedback === 'Normal weight'
                ? '#81b622'
                : feedback === 'Overweight'
                ? '#ff2511'
                : feedback === 'Obesity'
                ? '#970c10'
                : '#fff',
          }}>
          {bmiValue?.toFixed(2) || 0}
        </Text>
      </View>
      <View style={styles.subTagView}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Kanit-Medium',
            color:
              feedback === 'Underweight'
                ? '#f5631a'
                : feedback === 'Normal weight'
                ? '#81b622'
                : feedback === 'Overweight'
                ? '#ff2511'
                : feedback === 'Obesity'
                ? '#970c10'
                : '#fff',
          }}>
          {feedback || ''}
        </Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.labe3}>{`Gender : ${'     '}${
          genderType || ''
        }`}</Text>
      </View>
      <View style={styles.tagView}>
        <Text style={styles.labe3}>{`Age : ${'     '}${age || 0}`}</Text>
      </View>
      <View style={styles.tagView}>
        <Text style={styles.labe3}>{`Height : ${'     '}${
          userheight || 0
        } cm`}</Text>
      </View>
      <View style={styles.tagView}>
        <Text style={styles.labe3}>{`Weight : ${'     '}${
          weight || 0
        } kg`}</Text>
      </View>
      <View
        style={{
          width: width - 50,
          height: height * 0.18,
          backgroundColor: '#ddffe7',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: height * 0.05,
          borderRadius: 15,
          borderColor: '#81b622',
          borderWidth: 2,
        }}>
        <View
          style={{
            width: width - 90,
            //backgroundColor: 'red',
            height: 40,
            justifyContent: 'center',
          }}>
          <Text style={styles.reminderText}>Reminder ...</Text>
        </View>
        <View
          style={{
            width: width - 90,
            //backgroundColor: 'red',
            height: height * 0.1,
            justifyContent: 'flex-start',
            paddingTop: 10,
          }}>
          <Text style={styles.reminderSubText}>{healthTips || ''}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Kanit-Medium',
    //textAlign: 'left',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
    textAlign: 'center',
    color: '#301934',
  },
  label1: {
    fontSize: 80,
    fontFamily: 'Kanit-Bold',
    color: '#81b622',
  },
  labe2: {
    fontSize: 25,
    fontFamily: 'Kanit-Medium',
    color: '#81b622',
  },
  labe3: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
    color: '#341948',
  },
  reminderText: {
    fontSize: 18,
    fontFamily: 'Kanit-SemiBold',
    color: '#59981a',
  },
  reminderSubText: {
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
    color: '#59981a',
  },
  subView: {
    width: width - 50,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.05,
    marginTop: height * 0.03,
  },
  subTagView: {
    width: width - 50,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.05,
  },
  tagView: {
    width: width - 50,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.05,
    marginTop: height * 0.01,
  },
});

export default ResultScreen;
