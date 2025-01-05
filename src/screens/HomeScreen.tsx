import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadData} from '../utils/storage';
import healthTipsConfig from '../config/healthTips.json';
import Background from '../components/Background';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setGenderType,
  setUserAge,
  setUserBmiValue,
  setUserHeigts,
  setUserWeight,
  setBmiFeedback,
  setBmiHealthTips,
  resetState
} from '../redux/bmiSlice';

// Get device dimensions
const {width, height} = Dimensions.get('window');

// Define navigation types
type RootStackParamList = {
  home: undefined;
  result: undefined;
};

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'home'>;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenProps>(); // Navigation with typing

  const [age, setAge] = useState<number | null>(0);
  const [gender, setGender] = useState<string>('male');
  const [userheight, setUserHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number | null>(0);
  const [bmi, setBmi] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [healthTips, setHealthTips] = useState<string>('');

  // useEffect(() => {
  //   loadData({setAge, setGender, setUserHeight, setWeight});
  // }, []);

  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem('age', age);
  //     await AsyncStorage.setItem('gender', gender);
  //     await AsyncStorage.setItem('height', userheight);
  //     await AsyncStorage.setItem('weight', weight);
  //     Alert.alert('Success', 'Your data has been saved successfully.');
  //   } catch (error) {
  //     console.error('Failed to save data to local storage', error);
  //     Alert.alert('Error', 'Failed to save your data. Please try again.');
  //   }
  // };

  // const storeData = async () => {
  //   dispatch(
  //     setGenderType({
  //       genderType: gender,
  //     }),
  //   );
  //   dispatch(
  //     setUserAge({
  //       age: age,
  //     }),
  //   );
  //   dispatch(
  //     setUserHeigts({
  //       userheight: userheight,
  //     }),
  //   );
  //   dispatch(
  //     setUserWeight({
  //       weight: weight,
  //     }),
  //   );
  //   dispatch(
  //     setUserBmiValue({
  //       bmiValue: bmi,
  //     }),
  //   );
  //   dispatch(
  //     setBmiFeedback({
  //       feedback: feedback
  //     })
  //   )
  //   dispatch(
  //     setBmiHealthTips({
  //       healthTips: healthTips
  //     })
  //   )
  // };

  // const calculateBMI = async () => {
  //   const heightInMeters = userheight / 100;
  //   const weightInKg = weight;

  //   if (!heightInMeters || !weightInKg || !age) {
  //     Alert.alert('Invalid Input', 'Please enter valid values for all fields.');
  //     return;
  //   }

  //   const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
  //   setBmi(calculatedBmi);
  //   //saveData();

  //   if (calculatedBmi < 18.5) {
  //     setFeedback('Underweight');
  //     setHealthTips(healthTipsConfig.underweight);
  //   } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
  //     setFeedback('Normal weight');
  //     setHealthTips(healthTipsConfig.normal);
  //   } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
  //     setFeedback('Overweight');
  //     setHealthTips(healthTipsConfig.overweight);
  //   } else {
  //     setFeedback('Obesity');
  //     setHealthTips(healthTipsConfig.obesity);
  //   }

  //   await storeData();

  //   console.log(calculatedBmi);
  //   console.log('====================================');
  //   console.log(feedback);
  //   console.log(healthTips);
  //   console.log('====================================');
  //   setTimeout(() => {
  //     navigation.navigate('result');
  //     resetFields();
  //   }, 2000);
  // };

  const calculateBMI = async () => {
    const heightInMeters = userheight / 100;
    const weightInKg = weight;
  
    if (!heightInMeters || !weightInKg || !age) {
      Alert.alert('Invalid Input', 'Please enter valid values for all fields.');
      return;
    }
  
    // Calculate BMI and determine feedback and health tips
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    let calculatedFeedback = '';
    let calculatedHealthTips = '';
  
    if (calculatedBmi < 18.5) {
      calculatedFeedback = 'Underweight';
      calculatedHealthTips = healthTipsConfig.underweight;
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      calculatedFeedback = 'Normal weight';
      calculatedHealthTips = healthTipsConfig.normal;
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      calculatedFeedback = 'Overweight';
      calculatedHealthTips = healthTipsConfig.overweight;
    } else {
      calculatedFeedback = 'Obesity';
      calculatedHealthTips = healthTipsConfig.obesity;
    }
  
    // Update local state for UI
    setBmi(calculatedBmi);
    setFeedback(calculatedFeedback);
    setHealthTips(calculatedHealthTips);
  
    // Dispatch values to Redux
    dispatch(setGenderType({ genderType: gender }));
    dispatch(setUserAge({ age }));
    dispatch(setUserHeigts({ userheight }));
    dispatch(setUserWeight({ weight }));
    dispatch(setUserBmiValue({ bmiValue: calculatedBmi }));
    dispatch(setBmiFeedback({ feedback: calculatedFeedback }));
    dispatch(setBmiHealthTips({ healthTips: calculatedHealthTips }));
  
    // Navigate to the result screen after a delay
    setTimeout(() => {
      navigation.navigate('result');
      resetFields();
    }, 2000);
  };
  

  const resetFields = async () => {
    setAge(0);
    setGender('male');
    setUserHeight(0);
    setWeight(0);
    setBmi(null);
    setFeedback('');
    setHealthTips('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleView}>
          <Image
            source={require('../assets/appLogo.png')}
            style={{width: 70, height: 70}}
          />
          <Image
            source={require('../assets/woman.png')}
            style={{width: 50, height: 50, marginRight: width * 0.1}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            height: height * 0.68,
            //backgroundColor: 'gray',
            marginTop: height * 0.01,
          }}>
          <View
            style={{
              width: width / 3,
              //backgroundColor: 'yellow',
              height: height * 0.68,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {gender === 'Male' ? (
              <Image
                source={require('../assets/men.png')}
                style={styles.menIcon}
              />
            ) : (
              <Image
                source={require('../assets/women.png')}
                style={styles.menIcon}
              />
            )}
          </View>
          <View style={{marginTop: 10}}>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.55,
                height: height * 0.05,
                marginTop: 10,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.label}>Gender</Text>
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.35,
                height: height * 0.08,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => setGender('Male')}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                }}>
                <Text style={styles.label1}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('FeMale')}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                }}>
                <Text style={styles.label1}>F</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.55,
                height: height * 0.05,
                marginTop: 10,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.label}>Age</Text>
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.45,
                height: height * 0.08,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                //value={age}
                onChangeText={value => setAge(Number(value))}
              />
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.55,
                height: height * 0.05,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.labe2}>cm</Text>
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.45,
                height: height * 0.08,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                //10value={age}
                onChangeText={value => setUserHeight(Number(value))}
              />
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.55,
                height: height * 0.05,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.labe2}>kg</Text>
            </View>
            <View
              style={{
                //backgroundColor: 'silver',
                width: width * 0.45,
                height: height * 0.08,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                //value={age}
                onChangeText={value => setWeight(Number(value))}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: width - 40,
            height: height * 0.13,
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => calculateBMI()}>
            <Background>
              <Text style={styles.btnText}>Calculate</Text>
            </Background>
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.card, styles.shadowProp]}>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.06,
              justifyContent: 'center',
            }}>
            <Text style={styles.label}>Your gender type</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: width * 0.45,
              //backgroundColor: 'red',
            }}>
            <Image
              source={require('../assets/man.png')}
              style={{width: width * 0.2, height: height * 0.1}}
            />
          </View>
        </View>
        <View style={[styles.card1, styles.shadowProp]}>
          <View
            style={{
              width: width * 0.5,
              height: height * 0.06,
              justifyContent: 'center',
            }}>
            <Text style={styles.label}>Enter Your age</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width * 0.45,
              //backgroundColor: 'red',
            }}>
            <Image
              source={require('../assets/adult.png')}
              style={{width: width * 0.2, height: height * 0.12}}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
            />
          </View>
        </View> */}
        {/* <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
        /> */}

        {/* <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker> */}

        {/* <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="Enter your height in cm"
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight in kg"
        />

        <Button title="Calculate BMI" onPress={calculateBMI} />
        <Button title="Reset" onPress={resetFields} color="red" />

        {bmi !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>Your BMI: {bmi.toFixed(2)}</Text>
            <Text style={styles.feedback}>{feedback}</Text>
            <Text style={styles.healthTips}>{healthTips}</Text>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  menIcon: {
    width: width / 2,
    height: height * 0.6,
    //width: 100,
    //height: 400,
  },
  btn: {
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
  btnText: {
    fontSize: height * 0.025,
    fontFamily: 'Kanit-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Kanit-Medium',
    textAlign: 'left',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
    marginHorizontal: 10,
    color: '#301934',
  },
  label1: {
    fontSize: 20,
    fontFamily: 'Kanit-SemiBold',
    color: '#301934',
  },
  labe2: {
    fontSize: 15,
    fontFamily: 'Kanit-Medium',
    marginHorizontal: 10,
    color: '#301934',
  },
  input: {
    height: height * 0.07,
    width: width * 0.4,
    borderColor: 'silver',
    backgroundColor: '#fff',
    elevation: 5,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 60,
    fontFamily: 'Kanit-Medium',
    fontSize: 25,
    //marginBottom: 15,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedback: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  healthTips: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  titleView: {
    width: width,
    height: height / 10,
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: height * 0.2,
    marginTop: height * 0.02,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    //elevation: 4
  },
  card1: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: height * 0.2,
    marginTop: height * 0.02,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width / 3,
    //elevation: 4
  },
  shadowProp: {
    elevation: 4,
    shadowColor: '#52006A',
  },
});

export default HomeScreen;
