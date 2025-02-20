import React from 'react';
import { LoadingIndicator, withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { isLoading: false };

const LoadiingViewBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const getOid = () => {
    return props.route?.params?.organization_id;
  };

  const refreshList = newList => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    eventData.push(...newList);
  };
  // if(props.route?.params?.organization_id) {
  //     setOid(props.route.params.organization_id)
  // }

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          height: [
            { minWidth: Breakpoints.Mobile, value: '100%' },
            { minWidth: Breakpoints.Mobile, value: dimensions.height },
          ],
          justifyContent: 'center',
          left: 0,
          opacity: 0.38,
          position: 'absolute',
          top: 0,
          width: [
            { minWidth: Breakpoints.Mobile, value: '100%' },
            { minWidth: Breakpoints.Mobile, value: dimensions.width },
          ],
          zIndex: 99,
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App['Custom Color 5'],
            borderRadius: 8,
            height: 70,
            justifyContent: 'center',
            opacity: 0.6,
            width: 70,
            zIndex: 200,
          },
          dimensions.width
        )}
      >
        <LoadingIndicator
          size={30}
          color={palettes.Brand.appStyle_primary}
          type={'wave'}
        />
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 5'],
            height: '100%',
            left: 0,
            opacity: 0.43,
            position: 'absolute',
            top: 0,
            width: '100%',
          },
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(LoadiingViewBlock);
