import React from 'react';
import { SimpleStyleFlatList, Touchable, withTheme } from '@draftbit/ui';
import * as Linking from 'expo-linking';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import isValidEmail from '../global-functions/isValidEmail';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { contacts: [{ name: '党梦鸽', phone: '12345@qq.com' }] };

const EventContactActionSheetBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: palettes.App['Custom #ffffff'],
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 86'],
            paddingBottom: 40,
            width: 328,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                theme.typography.body1,
                {
                  fontFamily: 'System',
                  fontWeight: '700',
                  marginBottom: 16,
                  marginTop: 24,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'event_detail_contact_style')}
          </Text>
        </View>
        <SimpleStyleFlatList
          data={props.contacts ?? defaultProps.contacts}
          decelerationRate={'normal'}
          horizontal={false}
          inverted={false}
          keyExtractor={(listData, index) =>
            listData?.id ??
            listData?.uuid ??
            index?.toString() ??
            JSON.stringify(listData)
          }
          keyboardShouldPersistTaps={'never'}
          listKey={'View->List'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          pagingEnabled={false}
          renderItem={({ item, index }) => {
            const listData = item;
            return (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['13 Regular'].style,
                      {
                        color: palettes.Brand.itemTextNomal,
                        fontFamily: 'System',
                        fontWeight: '700',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {listData?.name}
                </Text>

                <Touchable
                  onPress={() => {
                    try {
                      if (isValidEmail(listData?.phone)) {
                        Linking.openURL(`mailto:${listData?.phone}`);
                      } else {
                        Linking.openURL(`tel:${listData?.phone}`);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['13 Regular'].style,
                        { color: palettes.Brand.appStyle_primary }
                      ),
                      dimensions.width
                    )}
                  >
                    {listData?.phone}
                  </Text>
                </Touchable>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          snapToAlignment={'start'}
        />
      </View>
    </View>
  );
};

export default withTheme(EventContactActionSheetBlock);
