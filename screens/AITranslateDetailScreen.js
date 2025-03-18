import React from 'react';
import {
  AccordionGroup,
  Button,
  IconButton,
  ScreenContainer,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as gf from '../custom-files/gf';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { id: 10000608999 };

const AITranslateDetailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [current_tab, setCurrent_tab] = React.useState(1);
  const [keypoint, setKeypoint] = React.useState('');
  const [number_data, setNumber_data] = React.useState([]);
  const [selected_tag, setSelected_tag] = React.useState('');
  const [t_data, setT_data] = React.useState({
    id: 1183637849,
    qa: '<h2><strong style="font-size: 16px;">AI应用投资升温：深度求索引发新一轮市场机遇</strong></h2><p><strong style="color: rgb(43, 51, 230); font-size: 16px;">摘要</strong></p><ul><li>2024年，AI应用项目数量显著增加，金沙江创投等机构关注度倍增，反映出市场对AI应用前景的乐观态度，为股票交易策略提供了积极信号。</li><li>深度求索（DeepSeek）R1版本的发布，以开源、推理能力强和低成本的特性，引发了新一轮AI投资热潮，朱啸虎等投资人态度转变，预示着AI领域潜在的市场变化。</li><li>AI硬件创业者面临积极变化，知名品牌主动寻求定制产品，表明市场需求增长，为相关企业带来发展机遇，可能影响股票估值。</li><li>AI投资人的主要任务是在DeepSeek引发的生态变局中挖掘下一个潜在颠覆性项目，这需要对市场趋势和技术发展有敏锐的洞察力。</li><li>郑灿在2024年投资了11个AI应用项目，表明AI应用领域具有较高的投资价值和增长潜力，值得投资者关注。</li><li>国内外大模型能力的提升推动了AI应用的发展，为创业者提供了更多机会，也为投资者带来了更多选择。</li></ul><p><strong style="color: rgb(43, 51, 230); font-size: 16px;">Q&amp;A</strong></p><p><strong style="color: rgb(43, 51, 230);">2025年AI行业的投资机会如何？</strong></p><p>2025年AI行业的投资机会被普遍认为是乐观的。线性资本投资人郑灿指出，尽管2024年下半年整体投资氛围有所放缓，但今年（2025年）市场再次活跃起来。与去年10月、11月相比，团队最近看的项目数量已成倍增加。郑灿自2023年初开始关注AI应用，当时ChatGPT刚刚崛起；到2024年，他共投了11个AI应用项目。这期间，创始人的思考逐渐成熟，从想法变成产品，同时国内外大模型能力的提升也推动了AI应用的发展。</p><p><br></p><p><strong style="color: rgb(43, 51, 230);">深度求索（DeepSeek）的发布对市场产生了什么影响？</strong></p><p>今年1月，深度求索（DeepSeek）发布其R1版本，以开源、推理能力强和低成本的特性迅速普及全国性的AI市场教育。这一远超预期的变量引发了新一轮的AI狂潮，并持续至今。金沙江创投主管合伙人朱啸虎在使用DeepSeek后，对大模型项目态度发生逆转，他表示“快让我相信AGI了”，并表态“如果DeepSeek开放融资，多少都愿意参与”。</p><p><br></p><p><strong style="color: rgb(43, 51, 230);">AI行业创业者目前面临怎样的新变化？</strong></p><p>AI硬件创业者表示，与前几年需要不断说服客户不同，现在甚至有知名品牌主动寻求定制产品，这带来了很大的鼓励。郑灿认为，创业者是投资人的机会，他们能做更多事，这种积极变化让他对未来充满信心。</p><p><br></p><p><strong style="color: rgb(43, 51, 230);">当前AI投资人的主要任务是什么？</strong></p><p>尽管未能参与DeepSeek的融资，当前AI投资人仍有更重要的任务，即在DeepSeek所引发的生态变局中继续挖掘下一个可能改变世界的新项目。</p>',
    asr: [],
    state: 'finished',
    title: '风口.txt',
    remark: null,
    aigc_qa: {
      state: 'finished',
      action: 'qa',
      results: {
        qa: [
          {
            start: '',
            answer:
              '2025年AI行业的投资机会被普遍认为是乐观的。线性资本投资人郑灿指出，尽管2024年下半年整体投资氛围有所放缓，但今年（2025年）市场再次活跃起来。与去年10月、11月相比，团队最近看的项目数量已成倍增加。郑灿自2023年初开始关注AI应用，当时ChatGPT刚刚崛起；到2024年，他共投了11个AI应用项目。这期间，创始人的思考逐渐成熟，从想法变成产品，同时国内外大模型能力的提升也推动了AI应用的发展。',
            question: '2025年AI行业的投资机会如何？',
          },
          {
            start: '',
            answer:
              '今年1月，深度求索（DeepSeek）发布其R1版本，以开源、推理能力强和低成本的特性迅速普及全国性的AI市场教育。这一远超预期的变量引发了新一轮的AI狂潮，并持续至今。金沙江创投主管合伙人朱啸虎在使用DeepSeek后，对大模型项目态度发生逆转，他表示“快让我相信AGI了”，并表态“如果DeepSeek开放融资，多少都愿意参与”。',
            question: '深度求索（DeepSeek）的发布对市场产生了什么影响？',
          },
          {
            start: '',
            answer:
              'AI硬件创业者表示，与前几年需要不断说服客户不同，现在甚至有知名品牌主动寻求定制产品，这带来了很大的鼓励。郑灿认为，创业者是投资人的机会，他们能做更多事，这种积极变化让他对未来充满信心。',
            question: 'AI行业创业者目前面临怎样的新变化？',
          },
          {
            start: '',
            answer:
              '尽管未能参与DeepSeek的融资，当前AI投资人仍有更重要的任务，即在DeepSeek所引发的生态变局中继续挖掘下一个可能改变世界的新项目。',
            question: '当前AI投资人的主要任务是什么？',
          },
        ],
        title: 'AI应用投资升温：深度求索引发新一轮市场机遇',
        summary: [
          {
            keypoint:
              '2024年，AI应用项目数量显著增加，金沙江创投等机构关注度倍增，反映出市场对AI应用前景的乐观态度，为股票交易策略提供了积极信号。',
          },
          {
            keypoint:
              '深度求索（DeepSeek）R1版本的发布，以开源、推理能力强和低成本的特性，引发了新一轮AI投资热潮，朱啸虎等投资人态度转变，预示着AI领域潜在的市场变化。',
          },
          {
            keypoint:
              'AI硬件创业者面临积极变化，知名品牌主动寻求定制产品，表明市场需求增长，为相关企业带来发展机遇，可能影响股票估值。',
          },
          {
            keypoint:
              'AI投资人的主要任务是在DeepSeek引发的生态变局中挖掘下一个潜在颠覆性项目，这需要对市场趋势和技术发展有敏锐的洞察力。',
          },
          {
            keypoint:
              '郑灿在2024年投资了11个AI应用项目，表明AI应用领域具有较高的投资价值和增长潜力，值得投资者关注。',
          },
          {
            keypoint:
              '国内外大模型能力的提升推动了AI应用的发展，为创业者提供了更多机会，也为投资者带来了更多选择。',
          },
        ],
        keywords: [
          'AI应用',
          '深度求索（DeepSeek）',
          'R1版本',
          '金沙江创投',
          '朱啸虎',
          'AI硬件',
          '大模型',
          '投资热潮',
          '市场需求',
        ],
      },
    },
    asr_url: null,
    content:
      '对于2025年AI行业的投资机会，许多风险投资人普遍的感受是：乐观。\n\n“AI行业整体投资氛围在去年下半年明显放缓，今年感觉大家又重新活跃起来了。客观地说，和去年10月、11月相比，团队最近看的项目已经成倍增加。”线性资本投资人郑灿告诉《中国新闻周刊》。\n\n郑灿从2023年初开始关注AI应用，彼时ChatGPT刚刚崛起；2024年出手，一共投了11个AI应用项目。其间的变量，一是要等待创始人的思考逐渐成熟，从想法变成产品；二是取决于国内外大模型能力的提升，帮助AI应用进步。\n\n今年1月，一个远超所有人预期的变量出现了：深度求索（DeepSeek）发布其R1版本，以开源、推理能力强、低成本的特性，极速普及了全国性的AI市场教育。新一轮AI狂潮，不可控地席卷至今。\n\n投资人也被集体说服。其中最“出圈”的是金沙江创投主管合伙人朱啸虎的观点逆转，他在去年的采访中表示不看好大模型项目，但在使用DeepSeek后，他反复表达了震撼，“快让我相信AGI了”，并表态“如果DeepSeek开放融资，多少都愿意参与”。\n\n创业者也惊讶于新的变化。有AI硬件创业者告诉《中国新闻周刊》：“前几年没有需求，只能不断说服客户，现在甚至有知名品牌来找我们定制产品，带来了很大鼓励。”\n\n“创业者是投资人的机会。他们能做更多的事，我们就可以做更多，一定是积极的变化。”想到未来的各种可能性，郑灿有些兴奋，语气笃定。\n\n尽管未能参与DeepSeek的融资，AI投资人当下仍有更重要的任务：在DeepSeek所引发的生态变局里，继续挖掘下一个改变世界的可能。',
    premium: false,
    speaker: true,
    task_id: null,
    user_id: 10000412,
    duration: null,
    keywords: [
      'AI应用',
      '深度求索（DeepSeek）',
      'R1版本',
      '金沙江创投',
      '朱啸虎',
      'AI硬件',
      '大模型',
      '投资热潮',
      '市场需求',
    ],
    language: 'mix',
    mimetype: null,
    aigc_type: 'standard',
    keypoints:
      '<h3>2025年人工智能行业投资前景展望</h3><ul><li><strong>投资氛围回暖</strong>: 线性资本投资人郑灿观察到，尽管2024年下半年投资氛围有所放缓，但2025年市场活跃度显著提升，项目数量较去年10月、11月成倍增加。</li><li><strong>投资人关注领域</strong>: 郑灿自2023年初ChatGPT兴起时开始关注AI应用，并在2024年投资了11个AI应用项目。</li><li><strong>投资人主要任务</strong>: 在深度求索（DeepSeek）引发的生态变局中，投资人的主要任务是挖掘下一个可能改变世界的新项目。</li></ul><h3>深度求索（DeepSeek）R1版本的影响</h3><ul><li><strong>市场影响</strong>: 2025年1月，深度求索（DeepSeek）发布R1版本，以开源、推理能力强和低成本的特性迅速普及，引发新一轮AI热潮。</li><li><strong>投资人态度转变</strong>: 金沙江创投主管合伙人朱啸虎在使用DeepSeek后，对大模型项目态度发生逆转，并表示愿意参与DeepSeek的融资。</li></ul><h3>人工智能行业创业者面临的新机遇</h3><ul><li><strong>市场需求变化</strong>: AI硬件创业者表示，与前几年需要不断说服客户不同，现在有知名品牌主动寻求定制产品。</li><li><strong>创业者角色</strong>: 郑灿认为，创业者是投资人的机会，他们能做更多事，这种积极变化让他对未来充满信心。</li></ul>',
    skip_aigc: false,
    sub_title: 'AI应用投资升温：深度求索引发新一轮市场机遇',
    aigc_state: 'finished',
    created_at: 1742147562,
    industries: [
      {
        id: 505,
        name: '宏观',
        en_name: 'Macro',
        sc_name: '宏观',
        tc_name: '宏觀',
        custom_sector_id: null,
      },
    ],
    keynumbers: null,
    source_url:
      'https://file.ca3test.com/transcribe/10000412/0.868922817994995.txt?Expires=1742245242&OSSAccessKeyId=LTAI4G1WTPMth9cJT2e1etaN&Signature=NYNZJtGBsZmEp6ffYD5afSShzO4%3D',
    updated_at: 1742241350,
    webvtt_url: null,
    premium_asr: [],
    result_type: 'pts',
    source_type: 'text',
    ai_rewritten: false,
    industry_ids: [505],
    proper_nouns: [],
    gpt_summarize: null,
    organization_user: {
      id: 20001159,
      name: '用户10000412',
      user_id: 10000412,
      position_id: 3,
      user_avatar: null,
      dismissed_at: null,
      position_name: 'CIO',
    },
    premium_asrs_state: 'pending',
    ai_assistant_language: 'auto',
    risks_and_opportunities:
      '<p><strong style="font-size: 16px; color: rgb(43, 51, 230);">风险因子</strong></p><ul><li class="ql-indent-1">市场波动性：尽管2025年AI市场再次活跃，但2024年下半年整体投资氛围有所放缓，表明市场存在波动性。这种波动性可能导致投资者在短期内面临较大的不确定性和风险。</li><li class="ql-indent-1">技术风险：AI技术的发展速度快，但也存在技术不确定性。尽管DeepSeek的发布引发了新一轮的AI狂潮，但技术的快速迭代和潜在的技术瓶颈可能会影响投资项目的长期可持续性。</li><li class="ql-indent-1">竞争压力：随着AI市场的普及和大模型能力的提升，市场竞争加剧。知名品牌主动寻求定制产品，表明市场需求旺盛，但也意味着创业者和投资者面临更大的竞争压力。</li><li class="ql-indent-1">监管风险：AI技术的快速发展可能引发监管机构的关注和干预。政策和法规的不确定性可能对AI行业的发展产生负面影响，从而影响投资回报。</li><li class="ql-indent-1">资本流动性：尽管DeepSeek引发了市场狂潮，但未能参与其融资的投资人仍需在生态变局中挖掘新项目。这表明资本流动性和项目选择的难度增加，可能影响投资者的资金使用效率。</li></ul><p><strong style="font-size: 16px; color: rgb(43, 51, 230);">增值潜力</strong></p><ul><li class="ql-indent-1">市场活跃：2025年AI市场再次活跃，投资项目数量成倍增加，表明市场需求旺盛，投资机会增多，为投资者提供了更多的选择和潜在收益。</li><li class="ql-indent-1">技术进步：DeepSeek的发布以其开源、推理能力强和低成本的特性迅速普及，推动了AI应用的发展。这种技术进步为投资者带来了新的投资机会和潜在的高回报。</li><li class="ql-indent-1">创业者积极性：AI硬件创业者表示，知名品牌主动寻求定制产品，表明市场对AI技术的认可度提高，创业者的积极性增强。这种积极变化为投资者提供了更多的优质项目选择。</li><li class="ql-indent-1">投资人信心：尽管未能参与DeepSeek的融资，投资人仍对未来充满信心，继续挖掘下一个可能改变世界的新项目。这种信心和积极的投资态度有助于推动AI行业的持续发展。</li><li class="ql-indent-1">市场教育：DeepSeek的普及对全国性的AI市场教育产生了积极影响，提高了市场对AI技术的认知度和接受度，为投资者创造了更有利的市场环境。</li></ul>',
    ai_rewrite_display_option: 'original',
  });
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* 主题栏 */}
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 5,
              width: '100%',
              zIndex: 1000,
            },
            dimensions.width
          )}
        >
          {/* 返回Btn */}
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.App.appStyle_black}
            icon={'AntDesign/left'}
            size={24}
            style={StyleSheet.applyWidth(
              { left: 16, position: 'absolute', top: 11 },
              dimensions.width
            )}
          />
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              adjustsFontSizeToFit={true}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App.appStyle_black,
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 22,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {'翻译详情'}
            </Text>
          </View>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {/* 内容类别选项 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: palettes.App['Custom Color 30'],
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 5,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 5,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setCurrent_tab(1);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 30'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value:
                        current_tab === 1
                          ? palettes.App['Custom #ffffff']
                          : palettes.App['Custom Color 30'],
                    },
                  ],
                  borderRadius: 3,
                  marginRight: 6,
                  padding: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color:
                      current_tab === 1
                        ? palettes.Brand.appStyle_primary
                        : palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {'原文'}
              </Text>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                setCurrent_tab(2);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 30'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value:
                        current_tab === 2
                          ? palettes.App['Custom #ffffff']
                          : palettes.App['Custom Color 30'],
                    },
                  ],
                  borderRadius: 3,
                  marginRight: 6,
                  padding: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color:
                      current_tab === 2
                        ? palettes.Brand.appStyle_primary
                        : palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {'译文'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* View 2 */}
        <View style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}>
          {/* View 2 */}
          <>
            {!(current_tab === 1) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 8, paddingRight: 8 },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <>
                  {!(
                    t_data?.source_type === 'pdf_file' ||
                    t_data?.source_type === 'docx_file'
                  ) ? null : (
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            theme.typography.body1,
                            {
                              fontSize: 15,
                              marginBottom: 30,
                              marginRight: null,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'暂时不支持文件预览，请下载后查看'}
                      </Text>
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              await WebBrowser.openBrowserAsync(
                                `${t_data?.source_url}`
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            theme.typography.button,
                            {
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderRadius: 4,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'下载文件'}
                      />
                    </View>
                  )}
                </>
                <>
                  {!(t_data?.source_type === 'text') ? null : (
                    <View>
                      <Utils.CustomCodeErrorBoundary>
                        <gf.RenderHtml source={{ html: `${t_data.content}` }} />
                      </Utils.CustomCodeErrorBoundary>
                    </View>
                  )}
                </>
              </View>
            )}
          </>
          {/* View 3 */}
          <>
            {!(current_tab === 2) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 8, paddingRight: 8 },
                  dimensions.width
                )}
              >
                {/* View 2 */}
                <>
                  {!(
                    t_data?.source_type === 'pdf_file' ||
                    t_data?.source_type === 'docx_file'
                  ) ? null : (
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            theme.typography.body1,
                            {
                              fontSize: 15,
                              marginBottom: 30,
                              marginRight: null,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'暂时不支持文件预览，请下载后查看'}
                      </Text>
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              await WebBrowser.openBrowserAsync(
                                `${t_data?.result_url}`
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            theme.typography.button,
                            {
                              backgroundColor: palettes.Brand.appStyle_primary,
                              borderRadius: 4,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'下载文件'}
                      />
                    </View>
                  )}
                </>
                <>
                  {!(t_data?.source_type === 'text') ? null : (
                    <View>
                      <Utils.CustomCodeErrorBoundary>
                        <gf.RenderHtml
                          source={{ html: `${t_data.translated_content}` }}
                        />
                      </Utils.CustomCodeErrorBoundary>
                    </View>
                  )}
                </>
              </View>
            )}
          </>
        </View>
      </SimpleStyleScrollView>

      <AceCampTestApi.FetchAiTranslatesDetailGET
        handlers={{
          onData: fetchData => {
            try {
              setT_data(fetchData?.data);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.id ?? defaultProps.id}
      >
        {({ loading, error, data, refetchAiTranslatesDetail }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <NoDataBlock />;
          }

          return null;
        }}
      </AceCampTestApi.FetchAiTranslatesDetailGET>
    </ScreenContainer>
  );
};

export default withTheme(AITranslateDetailScreen);
