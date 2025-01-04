import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoadDataProps {
  setAge: (value: string) => void;
  setGender: (value: string) => void;
  setUserHeight: (value: string) => void;
  setWeight: (value: string) => void;
}

export const loadData = async ({ setAge, setGender, setUserHeight, setWeight }: LoadDataProps): Promise<void> => {
  try {
    const savedAge = await AsyncStorage.getItem('age');
    const savedGender = await AsyncStorage.getItem('gender');
    const savedHeight = await AsyncStorage.getItem('height');
    const savedWeight = await AsyncStorage.getItem('weight');

    if (savedAge) setAge(savedAge);
    if (savedGender) setGender(savedGender);
    if (savedHeight) setUserHeight(savedHeight);
    if (savedWeight) setWeight(savedWeight);
  } catch (error) {
    console.error('Failed to load data from local storage', error);
  }
};
