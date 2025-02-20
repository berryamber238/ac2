import React from 'react';
import {
  IconButton,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  callbackFunc: () => {},
  canChooseMutiple: true,
  choosedValues: ['CHN'],
  filterData: {
    name: '语言',
    items: [
      { key: 'CHN', value: '仅显示中文内容' },
      { key: 'ENG', value: '仅显示英文内容' },
      { key: 'BOTH', value: '中英文内容全显示' },
    ],
  },
  showTip: true,
};

const FilterSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [v_choosedValues, setV_choosedValues] = React.useState([]);
  const chooseAOption = async (optionItem, canChooseMutiple, setCallback) => {
    const touchKey = optionItem.key;

    const newArr = [];
    if (v_choosedValues.includes(touchKey)) {
      if (canChooseMutiple) {
        const filter = v_choosedValues.filter(item => item !== touchKey);
        newArr.push(...filter);
      }
    } else {
      if (canChooseMutiple) {
        if (v_choosedValues.length > 0) {
          newArr.push(...v_choosedValues);
        }
        newArr.push(touchKey);
        //choosedValues.push(touchKey)
      } else {
        newArr.push(touchKey);
      }
    }

    v_choosedValues.splice(0);
    await setV_choosedValues(newArr);
    setCallback(newArr, setV_choosedValues);

    // const touchKey = optionItem.key;

    // if(choosedValuesss.includes(touchKey)) {
    //     if(canChooseMutiple) {
    //         const filter = choosedValuesss.filter(item=>item !== touchKey)
    //         choosedValuesss.splice(0,choosedValuesss.length);
    //         choosedValuesss.push(...filter)
    //     }
    // }else {
    //     if(canChooseMutiple) {
    //         choosedValuesss.push(touchKey)
    //     }else {
    //         choosedValuesss.splice(0,choosedValuesss.length);
    //         choosedValuesss.push(touchKey)
    //     }
    // }
    // choosedValuesss = choosedValuesss.splice(0,0)
  };

  const getNames = dataList => {
    let result = '';

    v_choosedValues.map(key => {
      dataList.map(item => {
        if (item.key === key) {
          result += item.value + '、';
        }
      });
    });
    return result.substring(0, result.length - 1);
  };

  return (
    <View
      onLayout={event => {
        try {
          if (
            (props.choosedValues ?? defaultProps.choosedValues)?.length <= 0
          ) {
            return;
          }
          setV_choosedValues(props.choosedValues ?? defaultProps.choosedValues);
        } catch (err) {
          console.error(err);
        }
      }}
      style={StyleSheet.applyWidth(
        { marginBottom: 20, marginTop: 10 },
        dimensions.width
      )}
    >
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
      >
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            allowFontScaling={false}
            numberOfLines={1}
            style={StyleSheet.applyWidth(
              GlobalStyles.TextStyles(theme)['Text Title'].style,
              dimensions.width
            )}
            textBreakStrategy={'highQuality'}
          >
            {(props.filterData ?? defaultProps.filterData)?.name}
          </Text>
        </View>
        {/* View 3 */}
        <>
          {!(props.showTip ?? defaultProps.showTip) ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingLeft: 16,
                  paddingRight: 16,
                },
                dimensions.width
              )}
            >
              {/* Text 2 */}
              <>
                {!(props.showTip ?? defaultProps.showTip) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                    allowFontScaling={false}
                    ellipsizeMode={'clip'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Title'].style,
                        {
                          alignSelf: 'flex-end',
                          color: palettes.Brand.appStyle_primary,
                          fontSize: 13,
                          marginLeft: 10,
                        }
                      ),
                      dimensions.width
                    )}
                    textBreakStrategy={'highQuality'}
                  >
                    {getNames(
                      (props.filterData ?? defaultProps.filterData)?.items
                    )}
                  </Text>
                )}
              </>
              <IconButton icon={'AntDesign/caretdown'} size={12} />
            </View>
          )}
        </>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'flex-start', flexDirection: 'row' },
          dimensions.width
        )}
      >
        <SimpleStyleFlatList
          data={(props.filterData ?? defaultProps.filterData)?.items}
          decelerationRate={'normal'}
          horizontal={false}
          inverted={false}
          keyExtractor={(listData, index) => listData?.key}
          keyboardShouldPersistTaps={'never'}
          listKey={'9nn3Iwx1'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          pagingEnabled={false}
          renderItem={({ item, index }) => {
            const listData = item;
            return (
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      await chooseAOption(
                        listData,
                        props.canChooseMutiple ?? defaultProps.canChooseMutiple,
                        props.callbackFunc ?? defaultProps.callbackFunc
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['Custom Color'],
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: v_choosedValues.includes(listData?.key)
                            ? '#e3edfa'
                            : palettes.App['Custom Color 14'],
                        },
                      ],
                      borderColor: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: v_choosedValues.includes(listData?.key)
                            ? palettes.Brand.appStyle_primary
                            : 'rgba(0,0,0,0)',
                        },
                      ],
                      borderRadius: 18,
                      borderWidth: 1,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginBottom: 6,
                      marginLeft: 8,
                      marginRight: 8,
                      marginTop: 6,
                      paddingBottom: 4,
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 4,
                    },
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
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.Brand.itemTextNomal,
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: v_choosedValues.includes(listData?.key)
                                ? palettes.Brand.appStyle_primary
                                : palettes.Brand.itemTextNomal,
                            },
                          ],
                          fontFamily: 'System',
                          fontSize: 14,
                          fontWeight: '400',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {listData?.value}
                  </Text>
                </View>
              </Touchable>
            );
          }}
          snapToAlignment={'start'}
          extraData={props.choosedValues ?? defaultProps.choosedValues}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', flexWrap: 'wrap' },
            dimensions.width
          )}
        />
      </View>
    </View>
  );
};

export default withTheme(FilterSectionBlock);
