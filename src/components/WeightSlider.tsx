import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

// Helper function to convert height between meters and feet
const convertHeight = (value: number, toUnit: 'Meters' | 'Feet'): number => {
  return toUnit === 'Feet' ? value * 3.28084 : value / 3.28084;
};

// Component for the height slider
const WeightSlider: React.FC = () => {
  const [height, setHeight] = useState<number>(1.7); // Initial height in meters
  const [unit, setUnit] = useState<'Meters' | 'Feet'>('Meters'); // Unit can be "Meters" or "Feet"

  // Toggle between meters and feet
  const toggleUnit = () => {
    const newUnit = unit === 'Meters' ? 'Feet' : 'Meters';
    const convertedHeight = convertHeight(height, newUnit);
    setUnit(newUnit);
    setHeight(parseFloat(convertedHeight.toFixed(2))); // Set height with 2 decimal places
  };

  // Define the tick values based on the selected unit
  const values = unit === 'Meters' ? [1.0, 1.5, 2.0] : [3.28, 4.92, 6.56];

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Height</Text>
        <TouchableOpacity onPress={toggleUnit}>
          <Text style={styles.unit}>{unit}</Text>
        </TouchableOpacity>
      </View>

      {/* Slider Component */}
      <Slider
        style={styles.slider}
        minimumValue={unit === 'Meters' ? 1.0 : 3.28} // Min height based on unit
        maximumValue={unit === 'Meters' ? 2.0 : 6.56} // Max height based on unit
        step={0.01}
        value={height}
        onValueChange={(value) => setHeight(parseFloat(value.toFixed(2)))}
        minimumTrackTintColor="#0f0"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#0f0"
      />

      {/* Tick Marks */}
      <View style={styles.tickContainer}>
        {values.map((value, index) => (
          <Text key={index} style={styles.tickLabel}>
            {value.toFixed(2)}
          </Text>
        ))}
      </View>

      {/* Current Value Display */}
      <Text style={styles.heightValue}>
        {height} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Black background
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#fff',
  },
  unit: {
    fontSize: 18,
    color: '#0f0',
  },
  slider: {
    width: 300,
    height: 40,
  },
  tickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: -10,
  },
  tickLabel: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  heightValue: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
});

export default WeightSlider;
