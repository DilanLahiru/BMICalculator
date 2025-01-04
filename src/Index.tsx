import React, {useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const Index = () => {
  const boxHeight = useSharedValue(60);
  const [maxLines, setMaxLines] = useState(5);

  const truncatedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, {duration: 1000}),
    };
  }, []);

  function showText() {
    setTimeout(() => {
      maxLines === 2 ? setMaxLines(0) : setMaxLines(2);
    }, 400);
    boxHeight.value === 60 ? (boxHeight.value = 150) : (boxHeight.value = 60);
  }

  return (
    <View style={styles.parent}>
      <Text style={styles.header}>React Native Reanimated Tutorial</Text>
      <View style={styles.box}>
        <Button
          title={maxLines === 2 ? 'View more' : 'Close Dropdown'}
          onPress={showText}
        />
        <Animated.View style={[{marginTop: 20}, truncatedAnimation]}>
          <Text style={styles.textBody}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            magnam necessitatibus dolores qui sunt? Mollitia nostrum placeat
            esse commodi modi quaerat, et alias minima, eligendi ipsa
            perspiciatis, totam quod dolorum.
            {'\n'}
            {'\n'}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            magnam necessitatibus dolores qui sunt? Mollitia nostrum placeat
            esse commodi modi quaerat, et alias minima, eligendi ipsa
            perspiciatis, totam quod dolorum.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};
export default Index;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 20,
  },
  textBody: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white'
  },
});