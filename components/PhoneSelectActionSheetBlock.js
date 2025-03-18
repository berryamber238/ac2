import React from 'react';
import { Button, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as gf from '../custom-files/gf';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { mainPhone: true, selectMenu: () => {} };

const PhoneSelectActionSheetBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const close = () => {
    ref.current?.hide('close by para');
  };
  const ref = gf.useSheetRef('phone-select');

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom #ffffff'] },
        dimensions.width
      )}
    >
      {/* View 3 */}
      <>
        {!(props.mainPhone ?? defaultProps.mainPhone) ? null : (
          <View>
            <>
              {!(props.mainPhone ?? defaultProps.mainPhone) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 52,
                      justifyContent: 'center',
                      padding: 16,
                    },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        props.selectMenu?.(1);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { width: '100%' },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          theme.typography.body1,
                          {
                            alignSelf: 'center',
                            fontFamily: 'System',
                            fontSize: 15,
                            fontWeight: '400',
                            lineHeight: 17,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'setting_to_change')}
                    </Text>
                  </Touchable>
                </View>
              )}
            </>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 7'], height: 1 },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
      {/* View 4 */}
      <>
        {props.mainPhone ?? defaultProps.mainPhone ? null : (
          <View>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: 52,
                  justifyContent: 'center',
                  padding: 16,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    props.selectMenu?.(2);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Title'].style,
                      theme.typography.body1,
                      {
                        alignSelf: 'center',
                        fontFamily: 'System',
                        fontSize: 15,
                        fontWeight: '400',
                        lineHeight: 17,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'setting_to_primary_number')}
                </Text>
              </Touchable>
            </View>
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 7'], height: 1 },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
      {/* View 5 */}
      <>
        {props.mainPhone ?? defaultProps.mainPhone ? null : (
          <View>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: 52,
                  justifyContent: 'center',
                  padding: 16,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    props.selectMenu?.(3);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Title'].style,
                      theme.typography.body1,
                      {
                        alignSelf: 'center',
                        color: palettes.App['Custom Color 59'],
                        fontFamily: 'System',
                        fontSize: 15,
                        fontWeight: '400',
                        lineHeight: 17,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_delete')}
                </Text>
              </Touchable>
            </View>
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 7'], height: 1 },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: 52,
            justifyContent: 'center',
            padding: 16,
          },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              props.selectMenu?.(0);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                theme.typography.body1,
                {
                  alignSelf: 'center',
                  color: palettes.App['Custom Color 78'],
                  fontFamily: 'System',
                  fontSize: 16,
                  fontWeight: '400',
                  lineHeight: 17,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'common_cancel')}
          </Text>
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(PhoneSelectActionSheetBlock);
