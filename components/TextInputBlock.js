import React from 'react';
import { TextInput, withTheme } from '@draftbit/ui';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const TextInputBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={true}
      changeTextDelay={500}
      onChangeText={newNameInputValue => {
        const textInputValue = newNameInputValue;
        try {
          setValue(value);
        } catch (err) {
          console.error(err);
        }
      }}
      webShowOutline={true}
      {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
      placeholder={'Enter name...'}
      placeholderTextColor={'theme.colors["Greyscale 500"]'}
      style={StyleSheet.applyWidth(
        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
        dimensions.width
      )}
      value={textInputValue}
    />
  );
};

export default withTheme(TextInputBlock);
