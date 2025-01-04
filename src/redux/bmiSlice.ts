import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BmiSlice {
  genderType: string;
  age: number | null;
  userheight: number | null;
  weight: number | null;
  bmiValue: number | null;
  feedback: string;
  healthTips: string;
}

const initialState: BmiSlice = {
  genderType: '',
  age: 0,
  userheight: 0,
  weight: 0,
  bmiValue: 0,
  feedback: '',
  healthTips: '',
};

const bmiSlice = createSlice({
  name: 'bmi',
  initialState,
  reducers: {
    setGenderType: (state, action: PayloadAction<{genderType: string}>) => {
      state.genderType = action.payload.genderType;
      console.log('GENDER Value :' + state.genderType);
    },
    setUserAge: (state, action: PayloadAction<{age: number | null}>) => {
      state.age = action.payload.age;
      console.log('AGE Value :' + state.age);
    },
    setUserHeigts: (state, action: PayloadAction<{userheight: number | null}>) => {
      state.userheight = action.payload.userheight;
      console.log('HEIGHT Value :' + state.userheight);
    },
    setUserWeight: (state, action: PayloadAction<{weight: number | null}>) => {
      state.weight = action.payload.weight;
      console.log('WEIGHT Value :' + state.weight);
    },
    setUserBmiValue: (
      state,
      action: PayloadAction<{bmiValue: number | null}>,
    ) => {
      state.bmiValue = action.payload.bmiValue;
      console.log('BMI Value :' + state.bmiValue);
    },
    setBmiFeedback: (state, action: PayloadAction<{feedback: string}>) => {
      state.feedback = action.payload.feedback;
      console.log('FEEDBACK Value :' + state.feedback);
    },
    setBmiHealthTips: (state, action: PayloadAction<{healthTips: string}>) => {
      state.healthTips = action.payload.healthTips;
      console.log('HealthTips Value :' + state.healthTips);
    },
    resetState: () => initialState,
  },
});

export const {
  setGenderType,
  setUserAge,
  setUserWeight,
  setUserHeigts,
  setUserBmiValue,
  setBmiFeedback,
  setBmiHealthTips,
  resetState
} = bmiSlice.actions;
export default bmiSlice.reducer;
