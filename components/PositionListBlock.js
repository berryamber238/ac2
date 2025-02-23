import React from 'react';
import {
  ExpoImage,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { curent_id: null, on_selected: () => {} };

const PositionListBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        { paddingLeft: 16, paddingRight: 16, paddingTop: 16 },
        dimensions.width
      )}
    >
      <Text
        accessible={true}
        selectable={false}
        style={StyleSheet.applyWidth(
          {
            fontFamily: 'System',
            fontSize: 22,
            fontWeight: '400',
            letterSpacing: 0.2,
            lineHeight: 24,
          },
          dimensions.width
        )}
      >
        {t(Variables, 'common_title')}
      </Text>
      <SimpleStyleFlatList
        data={Constants['ace_dic']?.data?.capital_positions}
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
        listKey={'List'}
        nestedScrollEnabled={false}
        numColumns={1}
        onEndReachedThreshold={0.5}
        pagingEnabled={false}
        renderItem={({ item, index }) => {
          const listData = item;
          return (
            <Touchable
              onPress={() => {
                try {
                  props.on_selected?.(listData?.id, listData?.name);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color 14'],
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['14 Regular'].style,
                      { flex: 1 }
                    ),
                    dimensions.width
                  )}
                >
                  {listData?.name}
                </Text>
                <>
                  {!(
                    (props.curent_id ?? defaultProps.curent_id) === listData?.id
                  ) ? null : (
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                      source={imageSource(Images['iconselectdrop'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          { height: 16, marginLeft: 8, width: 16 }
                        ),
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </View>
            </Touchable>
          );
        }}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        snapToAlignment={'start'}
        style={StyleSheet.applyWidth(
          { paddingLeft: 16, paddingRight: 16 },
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(PositionListBlock);
