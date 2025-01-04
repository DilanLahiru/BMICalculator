import { View, Text } from 'react-native'
import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenderSlice {
    genderType: string;
}

const initialState: GenderSlice = {
    genderType: '',
};

const genderSlice = createSlice({
  name: 'gender',
  initialState,
  reducers : {
    setGenderType : (state, action: PayloadAction<{genderType: string}>) => {
        state.genderType = action.payload.genderType;
        console.log(state.genderType);
        
    }
  }
});

export const {setGenderType} = genderSlice.actions;
export default genderSlice.reducer;