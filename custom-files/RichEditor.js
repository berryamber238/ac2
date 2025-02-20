import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

import openImagePickerUtil from '../utils/openImagePicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import palettes from '../themes/palettes';
import * as StyleSheet from '../utils/StyleSheet';
import t from '../global-functions/t';
import { Touchable } from '@draftbit/ui';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  Platform,
  Text,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useWindowDimensions from '../utils/useWindowDimensions';

export const ele = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    setContentHtml: contentHtml => {
      richText.current.setContentHTML(contentHtml);
      // setHtml(contentHtml);
    },
  }));
  const richText = useRef();
  const [descHTML, setDescHTML] = useState('');
  const [showDescError, setShowDescError] = useState(false);
  const [html, setHtml] = useState();
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML('');
    }
  };

  const insertImage = async () => {
    try {
      // const result = await openImagePickerUtil({
      //   mediaTypes: 'All',
      //   allowsEditing: false,
      //   quality: 0.2,
      //   allowsMultipleSelection: false,
      //   outputBase64: false,
      // });
      const imgUrl = await props.insertImage();
      if (imgUrl) {
        richText.current?.insertImage(imgUrl);
      }
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const iconMap = {
    [actions.insertImage]: ({ tintColor }) => (
      <Icon name="image" size={24} color={tintColor} />
    ),
    [actions.setBold]: ({ tintColor }) => (
      <Icon name="format-bold" size={24} color={tintColor} />
    ),
    [actions.setUnderline]: ({ tintColor }) => (
      <Icon name="format-underline" size={24} color={tintColor} />
    ),
    [actions.insertBulletsList]: ({ tintColor }) => (
      <Icon name="format-list-bulleted" size={24} color={tintColor} />
    ),
    [actions.insertOrderedList]: ({ tintColor }) => (
      <Icon name="format-list-numbered" size={24} color={tintColor} />
    ),
    [actions.insertLink]: ({ tintColor }) => (
      <Icon name="insert-link" size={24} color={tintColor} />
    ),
  };
  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f6f7f8',
          },
          dimensions.width
        )}
      >
        <View>
          <RichToolbar
            editor={richText}
            selectedIconTint="#2b33e6"
            iconTint="#000000"
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setUnderline,
            ]}
            iconMap={iconMap}
            style={{
              backgroundColor: '#f6f7f8',
              alignItems: 'start',
              iconSize: 24,
              height: 45,
            }}
            iconSize={24}
            onPressAddImage={insertImage}
          />
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'flex-end' },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 69'],
                borderRadius: 16,
                height: 24,
                marginRight: 16,
                paddingBottom: 4,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 4,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 59'],
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 18,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'tab_create_point_sensitive')}
            </Text>
          </View>
          <Touchable
            onPress={() => {
              try {
                props.customStyle({
                  height: '80%',
                  coverHeight: '20%',
                });
                props.customView(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { marginRight: 16, paddingBottom: 4, paddingTop: 4 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.Brand.itemTextNomal,
                    fontFamily: 'System',
                    fontSize: 13,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 18,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'tab_create_point_draft')}
                {props.draftCount && props.draftCount > 0
                  ? '(' + props.draftCount + ')'
                  : null}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>

      <ScrollView style={{ height: '100%' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <RichEditor
            ref={richText}
            onChange={props.editorUpdated}
            placeholder={t(Variables, 'my_point_of_view')}
            androidHardwareAccelerationDisabled={true}
            style={(styles.richTextEditorStyle, { height: 400 })}
            useContainer={false}
            // editorInitializedCallback={() => {
            //   richText.current.setContentHTML(html);
            // }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  richTextEditorStyle: {
    backgroundColor: 'black',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaf9b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {},
});
