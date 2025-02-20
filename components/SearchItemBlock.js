import React from 'react';
import { TextInput, Touchable, withTheme } from '@draftbit/ui';
import { Image, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SearchItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: 'theme.colors["Greyscale 100"]',
          borderRadius: 16,
          flexDirection: 'row',
          height: 56,
          justifyContent: 'flex-start',
          marginBottom: 24,
          paddingLeft: 20,
          paddingRight: 20,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Search Icon View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 20,
            justifyContent: 'center',
            marginRight: 12,
            padding: 2,
            width: 20,
          },
          dimensions.width
        )}
      >
        {/* Search Touchable */}
        <Touchable>
          {/* Search Icon */}
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            resizeMode={'contain'}
            source={imageSource(Images['Search'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 16, width: 16 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
      {/* Search Input */}
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={true}
        changeTextDelay={500}
        onChangeText={newSearchInputValue => {
          const textInputValue = newSearchInputValue;
          try {
            setValue(value);
          } catch (err) {
            console.error(err);
          }
        }}
        webShowOutline={true}
        placeholder={'What event are you looking for...'}
        placeholderTextColor={'theme.colors["Greyscale 400"]'}
        style={StyleSheet.applyWidth(
          {
            color: 'theme.colors["Greyscale 900"]',
            fontFamily: 'Urbanist_400Regular',
            letterSpacing: 0.2,
            lineHeight: 19.6,
            marginRight: 12,
            width: '100%',
          },
          dimensions.width
        )}
        value={textInputValue}
      />
      {/* Filter Icon View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 20,
            justifyContent: 'center',
            width: 20,
          },
          dimensions.width
        )}
      >
        {/* Filter Touchable */}
        <Touchable>
          {/* Filter Icon */}
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            resizeMode={'contain'}
            source={imageSource(Images['Filter'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: 14, width: 14 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(SearchItemBlock);
