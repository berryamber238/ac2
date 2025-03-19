import React from 'react';
import {
  Button,
  ExpoImage,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import NoSupportFileBlock from '../components/NoSupportFileBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Toast from '../custom-files/Toast';
import * as gf from '../custom-files/gf';
import ShowToast from '../global-functions/ShowToast';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import setUndefined from '../global-functions/setUndefined';
import t from '../global-functions/t';
import uploadImage from '../global-functions/uploadImage';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import selectFileUtil from '../utils/selectFile';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { callback: () => {}, type: 1 };

const AITranslateTextBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [action, setAction] = React.useState('TrinityRewriteTranslate');
  const [ai_translate_glossary_id, setAi_translate_glossary_id] =
    React.useState([]);
  const [article_err, setArticle_err] = React.useState(false);
  const [article_id, setArticle_id] = React.useState('');
  const [article_list, setArticle_list] = React.useState([]);
  const [content, setContent] = React.useState('');
  const [content_err, setContent_err] = React.useState(false);
  const [file_err, setFile_err] = React.useState(false);
  const [filename, setFilename] = React.useState('');
  const [fileurl, setFileurl] = React.useState('');
  const [industry_ids, setIndustry_ids] = React.useState([]);
  const [items, setItems] = React.useState([
    {
      id: 82,
      title: '新能源汽车术语表(示例)',
      created_at: 1740364106,
      item_count: 19,
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [open_article_dropdown, setOpen_article_dropdown] =
    React.useState(false);
  const [open_dropdown, setOpen_dropdown] = React.useState(false);
  const [skip_aigc, setSkip_aigc] = React.useState(false);
  const [source_type, setSource_type] = React.useState('');
  const [target, setTarget] = React.useState('en');
  const aceCampTestAiTranslatesPOST = AceCampTestApi.useAiTranslatesPOST();
  React.useEffect(() => {
    const handler = async () => {
      try {
        const result = (
          await AceCampTestApi.aiTranslatesGlossariesGET(Constants)
        )?.json;
        setItems(result?.data);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          borderRadius: 4,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
        },
        dimensions.width
      )}
    >
      {/* 翻译语言 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 16,
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
              { color: palettes.App['Custom Color 96'] }
            ),
            dimensions.width
          )}
        >
          {'* '}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                { color: palettes.App.appStyle_black }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'ai_translate_trans_lang')}
          </Text>
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 8,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setTarget('en');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    target === 'en'
                      ? palettes.Brand.appStyle_primary
                      : palettes.App['Custom #ffffff'],
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
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
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            target === 'en'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_c_to_e')}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setTarget('zh-CN');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    target !== 'en'
                      ? palettes.Brand.appStyle_primary
                      : palettes.App['Custom #ffffff'],
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
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
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            target !== 'en'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_e_to_c')}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
      {/* 翻译模式 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 16,
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
              { color: palettes.App['Custom Color 96'] }
            ),
            dimensions.width
          )}
        >
          {'* '}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                { color: palettes.App.appStyle_black }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'ai_translate_trans_mode')}
          </Text>
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 8,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setAction('TrinityRewriteTranslate');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    action === 'TrinityRewriteTranslate'
                      ? palettes.Brand.appStyle_primary
                      : palettes.App['Custom #ffffff'],
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
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
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            action === 'TrinityRewriteTranslate'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_type_ai_with_optimization')}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setAction('TrinityTranslate');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    action === 'TrinityTranslate'
                      ? palettes.Brand.appStyle_primary
                      : palettes.App['Custom #ffffff'],
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
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
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            action === 'TrinityTranslate'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_type_ai')}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setAction('GoogleTranslate');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    action === 'GoogleTranslate'
                      ? palettes.Brand.appStyle_primary
                      : palettes.App['Custom #ffffff'],
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  borderWidth: 1,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
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
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.appStyle_primary,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            action === 'GoogleTranslate'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_type_google')}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
      {/* 术语 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 16,
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
              { color: palettes.App['Custom Color 96'] }
            ),
            dimensions.width
          )}
        >
          {null}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['14 Regular'].style,
                { color: palettes.App.appStyle_black }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'ai_translate_use_glossary')}
          </Text>
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 8,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Utils.CustomCodeErrorBoundary>
            <gf.DropDownPicker
              placeholder={t(
                Variables,
                'ai_translate_use_glossary_placeholder'
              )}
              schema={{
                label: 'title',
                value: 'id',
              }}
              closeAfterSelecting={true}
              dropDownDirection="TOP"
              open={open_dropdown}
              value={ai_translate_glossary_id}
              items={items}
              setOpen={setOpen_dropdown}
              setValue={setAi_translate_glossary_id}
              setItems={setItems}
              listMode="MODAL"
              searchable={false}
              modalTitle="术语表"
              showBadgeDot={false}
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              placeholderStyle={{
                color: 'rgba(0, 0, 0, 0.25)',
                fontWeight: '400',
              }}
              badgeStyle={{
                padding: 5,
                borderRadius: 4,
                marginLeft: 4,
              }}
              badgeColors={['rgb(227,237,250)']}
              containerStyle={{
                borderRadius: 4,
              }}
              style={{
                borderColor: 'rgb(226, 229, 231)',
                borderRadius: 4,
              }}
              dropDownContainerStyle={{
                borderColor: 'rgb(226, 229, 231)',
                borderRadius: 4,
              }}
              selectedItemContainerStyle={{
                backgroundColor: 'rgb(240,243,255)',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                borderRadius: 4,
              }}
              listItemContainerStyle={{
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                borderRadius: 4,
              }}
              listMessageTextStyle={{
                //
                color: '#fff',
              }}
              selectedItemLabelStyle={{
                color: 'rgb(43, 51, 230)',
              }}
            />
          </Utils.CustomCodeErrorBoundary>
        </View>
      </View>
      {/* 翻译内容 */}
      <>
        {!((props.type ?? defaultProps.type) === 'text') ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginTop: 16,
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
                  { color: palettes.App['Custom Color 96'] }
                ),
                dimensions.width
              )}
            >
              {'* '}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['14 Regular'].style,
                    { color: palettes.App.appStyle_black }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_content')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['13 Regular'].style,
                    { color: 'rgb(151, 151, 151)' }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_content_tip')}
              </Text>
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 8,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                numberOfLines={4}
                onChangeText={newTextAreaValue => {
                  try {
                    setContent(newTextAreaValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Area'].props}
                placeholder={''}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Area'].style,
                    {
                      borderColor: 'rgb(226, 229, 231)',
                      borderRadius: 4,
                      height: 300,
                      width: '100%',
                    }
                  ),
                  dimensions.width
                )}
                value={content}
              />
              <>
                {!content_err ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        theme.typography.body1,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'ai_translate_need_content')}
                  </Text>
                )}
              </>
            </View>
          </View>
        )}
      </>
      {/* 文件翻译 */}
      <>
        {!((props.type ?? defaultProps.type) === 'doc') ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginTop: 16,
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const fileinfo = await selectFileUtil({
                      returnNameAndValue: true,
                      multiple: false,
                      outputBase64: true,
                    });
                    const name = fileinfo?.name?.toLowerCase();
                    let can_submit = false;
                    if (name.endsWith('.pdf')) {
                      setSource_type('pdf_file');
                      can_submit = true;
                    } else {
                    }

                    if (name.endsWith('.docx')) {
                      setSource_type('docx_file');
                      can_submit = true;
                    } else {
                    }

                    if (can_submit) {
                    } else {
                      ShowToast(
                        t(Variables, 'ai_translate_file_type_error'),
                        undefined,
                        'error'
                      );
                      if (true) {
                        return;
                      }
                    }

                    const url = await uploadImage(fileinfo, 'transcribe');
                    setFilename(fileinfo?.name);
                    setFileurl(url);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              <>
                {!(source_type !== 'none') ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: 'rgba(238, 245, 255, 0.88)',
                        borderColor: palettes.Brand.appStyle_primary,
                        borderRadius: 4,
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginTop: 16,
                        padding: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <>
                        {filename ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                borderColor: palettes.Brand.appStyle_primary,
                                borderWidth: 2,
                                padding: 4,
                              },
                              dimensions.width
                            )}
                          >
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(Images['icaddblue'])}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                    .style,
                                  { height: 15, width: 15 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>
                        )}
                      </>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            {
                              alignSelf: 'auto',
                              fontSize: 22,
                              lineHeight: null,
                              marginBottom: 10,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {null}
                      </Text>
                      {/* Text 3 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { marginBottom: 30, textAlign: 'center' }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'ai_translate_file_tip')}
                      </Text>

                      <View>
                        {/* Text 2 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['12 Regular']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['12 Regular']
                                .style,
                              { color: palettes.App['Custom Color 9'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {
                            '合规提示: 请确认您的下载内容已获得原权利人授权，且下载行为符合相关平台要求，如您未经许可的下载行为侵犯他人权益，需由您自行完全承担责任，AceCamp本营不承担任何责任。'
                          }
                        </Text>
                      </View>
                    </View>
                    <>
                      {!filename ? null : (
                        <View>
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                fontFamily: 'System',
                                fontSize: 18,
                                fontWeight: '700',
                              },
                              dimensions.width
                            )}
                          >
                            {filename}
                          </Text>
                        </View>
                      )}
                    </>
                    {/* Text 2 */}
                    <>
                      {!file_err ? null : (
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['12 Regular']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['12 Regular']
                                .style,
                              theme.typography.body1,
                              { color: palettes.App['Custom Color 59'] }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'ai_translate_need_file')}
                        </Text>
                      )}
                    </>
                  </View>
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 文章 */}
      <>
        {!((props.type ?? defaultProps.type) === 'article') ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginTop: 16,
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
                  { color: palettes.App['Custom Color 96'] }
                ),
                dimensions.width
              )}
            >
              {'*'}{' '}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['14 Regular'].style,
                    { color: palettes.App.appStyle_black }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'ai_translate_trans_article')}
              </Text>
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 8,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Utils.CustomCodeErrorBoundary>
                <gf.DropDownPicker
                  placeholder={t(
                    Variables,
                    'ai_translate_trans_article_placeholder'
                  )}
                  schema={{
                    label: 'title',
                    value: 'id',
                  }}
                  loading={loading}
                  disableLocalSearch={true}
                  closeAfterSelecting={true}
                  dropDownDirection="TOP"
                  open={open_article_dropdown}
                  value={article_id}
                  items={article_list}
                  setOpen={setOpen_article_dropdown}
                  setValue={setArticle_id}
                  setItems={setArticle_list}
                  listMode="MODAL"
                  searchable={true}
                  modalTitle="文章"
                  showBadgeDot={false}
                  theme="LIGHT"
                  multiple={false}
                  mode="BADGE"
                  searchPlaceholder={t(
                    Variables,
                    'ai_translate_trans_article_placeholder'
                  )}
                  placeholderStyle={{
                    color: 'rgba(0, 0, 0, 0.25)',
                    fontWeight: '400',
                  }}
                  badgeStyle={{
                    padding: 5,
                    borderRadius: 4,
                    marginLeft: 4,
                  }}
                  badgeColors={['rgb(227,237,250)']}
                  containerStyle={{
                    borderRadius: 4,
                  }}
                  style={{
                    borderColor: 'rgb(226, 229, 231)',
                    borderRadius: 4,
                  }}
                  dropDownContainerStyle={{
                    borderColor: 'rgb(226, 229, 231)',
                    borderRadius: 4,
                  }}
                  selectedItemContainerStyle={{
                    backgroundColor: 'rgb(240,243,255)',
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    borderRadius: 4,
                  }}
                  listItemContainerStyle={{
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    borderRadius: 4,
                  }}
                  listMessageTextStyle={{
                    //
                    color: '#fff',
                  }}
                  selectedItemLabelStyle={{
                    color: 'rgb(43, 51, 230)',
                  }}
                  onChangeSearchText={text => {
                    // Show the loading animation
                    setLoading(true);

                    // Get items from API
                    AceCampTestApi.articleListGET(Constants, {
                      mine: true,
                      page: 1,
                      per_page: 15,
                      state: 'passed',
                      title: text,
                    })
                      .then(result => {
                        console.log(result?.json?.data);
                        setArticle_list(result?.json?.data);
                      })
                      .catch(err => {
                        console.log(err);
                        //
                      })
                      .finally(() => {
                        // Hide the loading animation
                        setLoading(false);
                      });
                  }}
                />
              </Utils.CustomCodeErrorBoundary>
              <>
                {!article_err ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        theme.typography.body1,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'ai_translate_need_article')}
                  </Text>
                )}
              </>
            </View>
          </View>
        )}
      </>
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          const handler = async () => {
            try {
              let can_submit = false;
              if (
                content?.length === 0 &&
                (props.type ?? defaultProps.type) === 'text'
              ) {
                setContent_err(true);
              } else {
                setContent_err(false);
                can_submit = true;
              }

              if ((props.type ?? defaultProps.type) === 'doc' && fileurl) {
                setFile_err(false);
                can_submit = true;
              } else {
                setFile_err(true);
              }

              if (
                (props.type ?? defaultProps.type) === 'article' &&
                article_id
              ) {
                setArticle_err(false);
                can_submit = true;
              } else {
                setArticle_err(true);
              }

              if (!can_submit) {
                return;
              }
              const result = (
                await aceCampTestAiTranslatesPOST.mutateAsync({
                  action: action,
                  ai_translate_glossary_id: ai_translate_glossary_id,
                  article_id: article_id,
                  content: content,
                  source_type: source_type,
                  target: target,
                  title: fromUnixTimestamp(
                    Variables,
                    undefined,
                    'YYYY/MM/DD HH:mm:ss'
                  ),
                })
              )?.json;
              console.log(result);
              setFileurl(setUndefined());
              setContent(setUndefined());
              setArticle_id(setUndefined());
              props.callback?.();
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
            theme.typography.button,
            {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderRadius: 4,
              fontFamily: 'System',
              fontSize: 13,
              fontWeight: '400',
              marginBottom: 16,
              marginTop: 16,
            }
          ),
          dimensions.width
        )}
        title={`${t(Variables, 'ai_translate_btn')}`}
      />
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
      <AceCampTestApi.FetchArticleListGET
        handlers={{
          onData: fetchData => {
            try {
              setArticle_list(fetchData?.data);
              /* hidden 'API Request' action */
              /* hidden 'Set Variable' action */
            } catch (err) {
              console.error(err);
            }
          },
        }}
        mine={true}
        page={1}
        per_page={15}
        state={'passed'}
      >
        {({ loading, error, data, refetchArticleList }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </AceCampTestApi.FetchArticleListGET>
    </View>
  );
};

export default withTheme(AITranslateTextBlock);
