import { Shadow } from 'react-native-shadow-2';
export const ShadowComponent = ({
  children,
  startColor,
  distance,
  radius,
  offset,
  endColor,
}) => {
  return (
    <Shadow
      distance={distance ? distance : 10}
      radius={radius ? radius : 20}
      offset={offset ? offset : [0, 0]}
      endColor={endColor ? endColor : '#0000'}
      startColor={startColor ? startColor : '#0002'}
    >
      {children}
    </Shadow>
  );
};
