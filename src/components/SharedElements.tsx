import {SharedTransition, withSpring} from 'react-native-reanimated';
const CONFIG = {
  mass: 1,
  stiffness: 100,
  damping: 200,
};

export const sharedElementTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.currentHeight, CONFIG),
    width: withSpring(values.currentWidth, CONFIG),
    originX: withSpring(values.currentOriginX, CONFIG),
    originY: withSpring(values.currentOriginY, CONFIG),
  };
});