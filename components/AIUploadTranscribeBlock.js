import React from 'react';
import { Button, Checkbox, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import NoSupportFileBlock from '../components/NoSupportFileBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as gf from '../custom-files/gf';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  callback: () => {},
  filename: 'text.txt',
  fileurl: null,
};

const AIUploadTranscribeBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [ai_assistant_language, setAi_assistant_language] =
    React.useState('auto');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [industry_ids, setIndustry_ids] = React.useState([]);
  const [industry_ids_txt, setIndustry_ids_txt] = React.useState([]);
  const [items, setItems] = React.useState([
    {
      id: 505,
      name: '宏观',
      en_name: 'Macro',
      sc_name: '宏观',
      tc_name: '宏觀',
      custom_sector_id: null,
    },
    {
      id: 1010,
      name: '能源',
      en_name: 'Energy',
      sc_name: '能源',
      tc_name: '能源',
      custom_sector_id: null,
    },
    {
      id: 1510,
      name: '原材料',
      en_name: 'Materials',
      sc_name: '原材料',
      tc_name: '原材料',
      custom_sector_id: null,
    },
    {
      id: 2010,
      name: '资本品',
      en_name: 'Capital Goods',
      sc_name: '资本品',
      tc_name: '資本物品',
      custom_sector_id: null,
    },
    {
      id: 2020,
      name: '商业和专业服务',
      en_name: 'Commercial & Professional Services',
      sc_name: '商业和专业服务',
      tc_name: '商業與專業服務',
      custom_sector_id: null,
    },
    {
      id: 2030,
      name: '运输',
      en_name: 'Transportation',
      sc_name: '运输',
      tc_name: '運輸',
      custom_sector_id: null,
    },
    {
      id: 2510,
      name: '汽车与汽车零部件',
      en_name: 'Automobiles & Components',
      sc_name: '汽车与汽车零部件',
      tc_name: '汽車與汽車零部件',
      custom_sector_id: null,
    },
    {
      id: 2520,
      name: '耐用消费品与服装',
      en_name: 'Consumer Durables & Apparel',
      sc_name: '耐用消费品与服装',
      tc_name: '耐用消費品與服裝',
      custom_sector_id: null,
    },
    {
      id: 2530,
      name: '消费者服务',
      en_name: 'Consumer Services',
      sc_name: '消费者服务',
      tc_name: '消費者服務',
      custom_sector_id: null,
    },
    {
      id: 2550,
      name: '零售业',
      en_name: 'Retailing',
      sc_name: '零售业',
      tc_name: '零售業',
      custom_sector_id: null,
    },
    {
      id: 3010,
      name: '食品与主要用品零售',
      en_name: 'Food & Staples Retailing',
      sc_name: '食品与主要用品零售',
      tc_name: '食品與主要用品零售',
      custom_sector_id: null,
    },
    {
      id: 3020,
      name: '食品、饮料与烟草',
      en_name: 'Food, Beverage & Tobacco',
      sc_name: '食品、饮料与烟草',
      tc_name: '食品、飲品與煙草',
      custom_sector_id: null,
    },
    {
      id: 3030,
      name: '家庭与个人用品',
      en_name: 'Household & Personal Products',
      sc_name: '家庭与个人用品',
      tc_name: '家庭與個人用品',
      custom_sector_id: null,
    },
    {
      id: 3510,
      name: '医疗保健设备与服务',
      en_name: 'Health Care Equipment & Services',
      sc_name: '医疗保健设备与服务',
      tc_name: '醫療保健設備與服務',
      custom_sector_id: null,
    },
    {
      id: 3520,
      name: '制药、生物科技和生命科学',
      en_name: 'Pharmaceuticals, Biotechnology & Life Sciences',
      sc_name: '制药、生物科技和生命科学',
      tc_name: '製薬、生物科技與生命科學',
      custom_sector_id: null,
    },
    {
      id: 4010,
      name: '银行',
      en_name: 'Banks',
      sc_name: '银行',
      tc_name: '銀行',
      custom_sector_id: null,
    },
    {
      id: 4020,
      name: '综合金融',
      en_name: 'Diversified Financials',
      sc_name: '综合金融',
      tc_name: '綜合金融',
      custom_sector_id: null,
    },
    {
      id: 4030,
      name: '保险',
      en_name: 'Insurance',
      sc_name: '保险',
      tc_name: '保險',
      custom_sector_id: null,
    },
    {
      id: 4510,
      name: '软件与服务',
      en_name: 'Software & Services',
      sc_name: '软件与服务',
      tc_name: '軟件與服務',
      custom_sector_id: null,
    },
    {
      id: 4520,
      name: '技术硬件与设备',
      en_name: 'Technology Hardware & Equipment',
      sc_name: '技术硬件与设备',
      tc_name: '電腦硬件與設備',
      custom_sector_id: null,
    },
    {
      id: 4530,
      name: '半导体产品与设备',
      en_name: 'Semiconductors & Semiconductor Equipment',
      sc_name: '半导体产品与设备',
      tc_name: '半導體產品與設備',
      custom_sector_id: null,
    },
    {
      id: 5010,
      name: '电信业务',
      en_name: 'Telecommunication Services',
      sc_name: '电信业务',
      tc_name: '電訊服務',
      custom_sector_id: null,
    },
    {
      id: 5020,
      name: '媒体与娱乐',
      en_name: 'Media & Entertainment',
      sc_name: '媒体与娱乐',
      tc_name: '媒體與娛樂',
      custom_sector_id: null,
    },
    {
      id: 5510,
      name: '公用事业',
      en_name: 'Utilities',
      sc_name: '公用事业',
      tc_name: '公用事業',
      custom_sector_id: null,
    },
    {
      id: 6010,
      name: '房地产',
      en_name: 'Real Estate',
      sc_name: '房地产',
      tc_name: '房地產',
      custom_sector_id: null,
    },
  ]);
  const [language, setLanguage] = React.useState('mix');
  const [open_dropdown, setOpen_dropdown] = React.useState(false);
  const [skip_aigc, setSkip_aigc] = React.useState(false);
  const [source_type, setSource_type] = React.useState('');
  React.useEffect(() => {
    const filename = props.filename ?? defaultProps.filename;
    if (!filename) {
      setSource_type('none');
      return;
    }
    if (
      filename.endsWith('.pdf') ||
      filename.endsWith('.docx') ||
      filename.endsWith('.txt')
    ) {
      setSource_type('text');
    } else if (
      filename.endsWith('.mp3') ||
      filename.endsWith('.mp4') ||
      filename.endsWith('.m4a') ||
      filename.endsWith('.aac') ||
      filename.endsWith('.wav')
    ) {
      setSource_type('video_audio');
    }
  }, []);
  const aceCampTestCreateTranscribesPOST =
    AceCampTestApi.useCreateTranscribesPOST();

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
              {props.filename ?? defaultProps.filename}
            </Text>
            {/* Text 2 */}
            <>
              {!(source_type === 'text') ? null : (
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
                  {'格式支持：.docx .pdf .txt，\n单个文件最大20MB，PDF最多10页'}
                </Text>
              )}
            </>
            {/* Text 3 */}
            <>
              {!(source_type === 'video_audio') ? null : (
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
                  {
                    '格式支持：.mp3, .wav, .m4a, .aac, .mp4，\n文件时长最长2个小时，最大500MB'
                  }
                </Text>
              )}
            </>
            <View>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
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
        )}
      </>
      {/* View 2 */}
      <>
        {!(source_type === 'none') ? null : (
          <View>
            <NoSupportFileBlock />
          </View>
        )}
      </>
      {/* 音频原语言 */}
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
          {'*'}
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
            {'音频原语言'}
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
                setLanguage('mix');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    language === 'mix'
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
                            language === 'mix'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'中英文混合'}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setLanguage('en');
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
                    language === 'en'
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
                            language === 'en'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'英文'}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setLanguage('cn_cantonese');
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
                    language === 'cn_cantonese'
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
                            language === 'cn_cantonese'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'粤语'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
      {/* 输出语言 */}
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
          {'*'}
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
            {'输出语言'}
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
                setAi_assistant_language('auto');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    ai_assistant_language === 'auto'
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
                            ai_assistant_language === 'auto'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'自动'}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setAi_assistant_language('en');
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
                    ai_assistant_language === 'en'
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
                            ai_assistant_language === 'en'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'英文'}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setAi_assistant_language('zh-CN');
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
                    ai_assistant_language === 'zh-CN'
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
                            ai_assistant_language === 'zh-CN'
                              ? palettes.App['Custom #ffffff']
                              : palettes.Brand.appStyle_primary,
                        },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'中文'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
      {/* View 5 */}
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
            {'相关行业'}
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
              placeholder="请选择相关行业"
              schema={{
                label: 'name',
                value: 'id',
              }}
              dropDownDirection="TOP"
              open={open_dropdown}
              value={industry_ids}
              items={items}
              setOpen={setOpen_dropdown}
              setValue={setIndustry_ids}
              setItems={setItems}
              listMode="MODAL"
              searchable={false}
              modalTitle="相关行业"
              showBadgeDot={false}
              theme="LIGHT"
              multiple={true}
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
      {/* View 6 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 16,
          },
          dimensions.width
        )}
      >
        <Checkbox
          onPress={newCheckboxValue => {
            try {
              setSkip_aigc(newCheckboxValue);
            } catch (err) {
              console.error(err);
            }
          }}
          color={palettes.Brand.appStyle_primary}
          status={skip_aigc}
        />
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['14 Regular'].style,
              { color: palettes.Brand.appStyle_primary, marginLeft: 10 }
            ),
            dimensions.width
          )}
        >
          {'仅转文字，不生成AI纪要'}
        </Text>
      </View>
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          const handler = async () => {
            try {
              (
                await aceCampTestCreateTranscribesPOST.mutateAsync({
                  ai_assistant_language: ai_assistant_language,
                  industry_ids: industry_ids,
                  source_type: source_type,
                  source_url: props.fileurl ?? defaultProps.fileurl,
                  title: props.filename ?? defaultProps.filename,
                })
              )?.json;
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
        title={'开始转写'}
      />
    </View>
  );
};

export default withTheme(AIUploadTranscribeBlock);
