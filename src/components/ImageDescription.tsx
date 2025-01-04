import React from 'react';
import Animated from 'react-native-reanimated';
import {sharedElementTransition} from './SharedElements';
import {View, Button, StyleSheet, Image, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function ImageDescription() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <Button title='Go back' disabled={false} onPress={handleLogin}/>
      <Animated.Image
        source={{ uri: 'https://picsum.photos/id/39/200' }}
        style={{ width: 100, height: 100 }}
        sharedTransitionTag="tag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});