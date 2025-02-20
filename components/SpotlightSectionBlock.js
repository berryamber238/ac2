import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem: {
    id: 2,
    title: '测试专题统计',
    description:
      '测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计测试专题统计',
    event_count: 1,
    article_count: 3,
    background_image_url:
      'https://image.acecamptech.com/spotlight/3/0.9055617228780151.jpg',
    last_item_updated_at: 1730103979,
  },
  gotoScreen: () => {},
};

const SpotlightSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
        },
        dimensions.width
      )}
    >
      <Touchable
        onPress={() => {
          try {
            props.gotoScreen?.(
              'Spotlight',
              (props.dataItem ?? defaultProps.dataItem)?.id
            );
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              height: 120,
              overflow: 'hidden',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <ImageBackground
            {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
              .props}
            resizeMode={'cover'}
            source={imageSource(
              `${
                (props.dataItem ?? defaultProps.dataItem)?.background_image_url
              }`
            )}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
                  .style,
                {
                  alignItems: 'flex-end',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  flexDirection: 'row',
                }
              ),
              dimensions.width
            )}
          >
            <BlurView
              {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
              intensity={100}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                  {
                    height: 55,
                    justifyContent: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }
                ),
                dimensions.width
              )}
              tint={'default'}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                numberOfLines={2}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    { color: palettes.App.White, fontSize: 16, lineHeight: 24 }
                  ),
                  dimensions.width
                )}
              >
                {(props.dataItem ?? defaultProps.dataItem)?.title}
              </Text>
            </BlurView>
          </ImageBackground>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 14'],
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            numberOfLines={2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                {
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 19,
                }
              ),
              dimensions.width
            )}
          >
            {(props.dataItem ?? defaultProps.dataItem)?.description}
          </Text>
          {/* View 3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
                marginTop: 5,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.White,
                  borderRadius: 4,
                  paddingLeft: 5,
                  paddingRight: 5,
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
                      color: 'rgb(63, 110, 246)',
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      lineHeight: 20,
                      marginRight: null,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'相关内容'}
                {(props.dataItem ?? defaultProps.dataItem)?.article_count}
              </Text>
            </View>
            {/* View 2 */}
            <View>
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: 'rgb(122, 122, 122)',
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'最近更新 '}
                {timesAgo(
                  Variables,
                  (props.dataItem ?? defaultProps.dataItem)
                    ?.last_item_updated_at
                )}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(SpotlightSectionBlock);
