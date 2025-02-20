import React from 'react';
import { withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as ScrollPicker from '../custom-files/ScrollPicker';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import useWindowDimensions from '../utils/useWindowDimensions';

const PickerModalBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View>
      <Utils.CustomCodeErrorBoundary>
        <ScrollPicker.picker />
      </Utils.CustomCodeErrorBoundary>
    </View>
  );
};

export default withTheme(PickerModalBlock);
