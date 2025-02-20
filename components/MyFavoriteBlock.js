import React from 'react';
import { ExpoImage, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import StringFormat from '../global-functions/StringFormat';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  deleteFolder: () => {},
  editFolder: () => {},
  item: {
    id: 220,
    name: '默认收藏夹',
    user_id: 10000412,
    favorited: false,
    created_at: 1729525863,
    item_count: 0,
    updated_at: 1729525863,
    default_favorite: true,
  },
};

const MyFavoriteBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [add_folder_error_show, setAdd_folder_error_show] =
    React.useState(false);
  const [add_folder_item_shown, setAdd_folder_item_shown] =
    React.useState(false);
  const [edit_folder_index, setEdit_folder_index] = React.useState(0);
  const [folder_input_text, setFolder_input_text] = React.useState('');
  const [vote_options, setVote_options] = React.useState([]);

  return (
    <View>
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 16,
            marginRight: 16,
            paddingBottom: 8,
            paddingTop: 16,
          },
          dimensions.width
        )}
      >
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 74'],
                fontFamily: 'System',
                fontSize: 16,
                fontWeight: '700',
                letterSpacing: 0.2,
                lineHeight: 18,
              },
              dimensions.width
            )}
          >
            {(props.item ?? defaultProps.item)?.name}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 4'],
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 14,
                marginTop: 8,
              },
              dimensions.width
            )}
          >
            {StringFormat(
              t(Variables, 'mine_collection_num'),
              [].concat((props.item ?? defaultProps.item)?.item_count)
            )}
          </Text>
        </View>

        <Touchable
          onPress={() => {
            try {
              props.editFolder?.(
                (props.item ?? defaultProps.item)?.id,
                (props.item ?? defaultProps.item)?.name
              );
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
              /* hidden 'Set Variable' action */
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
            source={imageSource(Images['iceditfolder'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                { height: 20, width: 20 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
        {/* Touchable 2 */}
        <Touchable
          onPress={() => {
            try {
              props.deleteFolder?.((props.item ?? defaultProps.item)?.id);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Image 2 */}
          <>
            {(props.item ?? defaultProps.item)?.default_favorite ? null : (
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(Images['icdeletefolder'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, marginLeft: 16, width: 20 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(MyFavoriteBlock);
