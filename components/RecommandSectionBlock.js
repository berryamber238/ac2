import React from 'react';
import { Divider, Icon, IconButton, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Image, Platform, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as HighlightText from '../custom-files/HighlightText';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import replace from '../global-functions/replace';
import t from '../global-functions/t';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem:
    '{\n  "id": 70502081,\n  "free": false,\n  "type": "minute",\n  "user": {\n    "id": 10000130,\n    "name": "测试账号",\n    "avatar": "https://image.ca3test.com/avatar/10000130/0.00024054243143667442.JPG",\n    "deleted": false,\n    "is_self": false,\n    "identity": "unreal",\n    "nickname": "测试账号",\n    "position": "Executive Director",\n    "fund_type_ids": [\n      1,\n      7\n    ],\n    "sns_career_name": "长线基金 Executive Director",\n    "organization_name": "",\n    "tournament_winner": null,\n    "management_scale_id": null,\n    "organization_type_id": 5,\n    "organization_identity": "hide"\n  },\n  "likes": 1,\n  "state": "passed",\n  "title": "自动驾驶2025年行业展望及头部车企研发进展对比【Michael调研纪要】",\n  "views": 518,\n  "content": "<p>相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style=\\"color: rgb(0, 112, 192);\\"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style=\\"color: rgb(0, 112, 192);\\"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style=\\"color: rgb(0, 112, 192);\\"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;</p>",\n  "summary": "主要看点：\\n1.\\t自动驾驶行业在未来1至2年的技术路线的关键趋势，高速和城市NOA的发展现状及难点\\n2.\\t当前国内主机厂智能驾驶方面的竞争格局，传统主机厂的布局策略与特点\\n3.\\t无图方案的应用前景，智能驾驶行业的格局演变\\n4.\\t智驾普及的趋势下，智驾系统软硬件的成本变化趋势\\n5.\\tDeepSeek对智驾系统的影响",\n  "hashtags": [],\n  "favorites": 0,\n  "is_deleted": false,\n  "corporations": [\n    {\n      "id": 2,\n      "tel": "86-755-2560-6666",\n      "logo": "https://image.acecamptech.com/logos/2/ae2f8d00-12fa-4d86-bf1b-409c416e3d52.png",\n      "name": "万科A",\n      "delist": null,\n      "ticker": "SZ.000002",\n      "en_name": "China Vanke Co.,Ltd.",\n      "sc_name": "万科A",\n      "tc_name": null,\n      "website": "www.vanke.com",\n      "currency": "CNY",\n      "exchange": "Shenzhen",\n      "following": null,\n      "is_active": true,\n      "deleted_at": null,\n      "can_destroy": false,\n      "description": "万科企业股份有限公司于1984年在深圳经济特区成立,1988年经深圳市人民政府“深府办(1988)1509号”文批准,公司实施股份制改革;1991年1月29日,公司发行的A股在深交所上市;1993年5月28日,公司发行的B股在深交所上市;2014年6月25日,公司B股以介绍方式转换上市地在联交所主板(H股)上市。公司的主要业务为开发用于出售及出租的房地产产品。企业荣誉:公司连续第十年蝉联\\"中国物业服务百强企业综合实力TOP1\\",连续第六年蝉联\\"中国房地产开发企业500强首选物业品牌\\"榜首,连续三年获得\\"中国特色物业服务领先企业——企业总部基地\\"荣誉称号,并蝉联中国物业服务品牌价值榜首。报告期内,本集团新增加开发项目147个,按万科权益计算的规划建筑面积约2,478.4万平方米,总建筑面积约3,716.5万平方米。",\n      "industry_id": 6010,\n      "en_description": "China Vanke Co., Ltd. operates real estate development businesses.  The Company provides housing renovation, housing loans, real estate brokerage, and other businesses. China Vanke also operates logistics, material supply, and other businesses.",\n      "sc_description": "万科企业股份有限公司于1984年在深圳经济特区成立,1988年经深圳市人民政府“深府办(1988)1509号”文批准,公司实施股份制改革;1991年1月29日,公司发行的A股在深交所上市;1993年5月28日,公司发行的B股在深交所上市;2014年6月25日,公司B股以介绍方式转换上市地在联交所主板(H股)上市。公司的主要业务为开发用于出售及出租的房地产产品。企业荣誉:公司连续第十年蝉联\\"中国物业服务百强企业综合实力TOP1\\",连续第六年蝉联\\"中国房地产开发企业500强首选物业品牌\\"榜首,连续三年获得\\"中国特色物业服务领先企业——企业总部基地\\"荣誉称号,并蝉联中国物业服务品牌价值榜首。报告期内,本集团新增加开发项目147个,按万科权益计算的规划建筑面积约2,478.4万平方米,总建筑面积约3,716.5万平方米。",\n      "tc_description": null,\n      "registration_location": null\n    }\n  ],\n  "industry_ids": [\n    6010\n  ],\n  "organization": {\n    "id": 10000014,\n    "irm": false,\n    "tel": null,\n    "logo": null,\n    "name": "华兴泛亚1",\n    "score": 0,\n    "state": "passed",\n    "ticker": null,\n    "en_name": "China Renaissance FanYa1",\n    "sc_name": "华兴泛亚1",\n    "tc_name": "華興泛亞1",\n    "website": null,\n    "celebrity": false,\n    "deleted_at": null,\n    "dms_vendor": false,\n    "description": "基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文",\n    "industry_id": null,\n    "is_producer": true,\n    "state_events": [],\n    "fund_type_ids": [\n      1,\n      7\n    ],\n    "self_employed": true,\n    "en_description": "ENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENEN",\n    "public_contact": false,\n    "sc_description": "基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文",\n    "tc_description": null,\n    "need_allocation": false,\n    "dms_vendor_contact": null,\n    "share_display_name": "华兴泛亚1",\n    "management_scale_id": 6,\n    "allow_public_contact": true,\n    "blocked_expert_roles": [],\n    "organization_type_id": 5,\n    "sator_organization_id": 112,\n    "belongs_organization_id": null,\n    "belongs_organization_name": null,\n    "belongs_organization_contact": null\n  },\n  "release_time": 1739430450,\n  "corporation_ids": [\n    2\n  ],\n  "custom_sector_ids": [\n    2\n  ],\n  visible:true\n}',
  gotoScreen: () => {},
  hideMenu: false,
  highlight: null,
  isLatest: false,
  showActionSheet: () => {},
};

const RecommandSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [numberOfLines, setNumberOfLines] = React.useState(1);
  const [pickerValue, setPickerValue] = React.useState('');
  const [showAction, setShowAction] = React.useState(false);
  const [type, setType] = React.useState('报名中');
  const goto = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    debugger;
    props.nav.navigate('BottomTabNavigator', {
      screen: 'Tickets',
      params: { screen: 'LoginScreen' },
    });
  };

  const setLines = a => {
    if (a.nativeEvent.layout) {
      const numberOfLines = Math.ceil((a.nativeEvent.layout.height * 1.2) / 24);
      setNumberOfLines(numberOfLines);
    } else {
      a.nativeEvent.target.measure((x, y, width, height, pageX, pageY) => {
        // 计算行数
        const numberOfLines = Math.ceil(height / 24);
        setNumberOfLines(numberOfLines);
      });
    }
  };

  const test = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    props.showActionSheet('sfasfd');
  };
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.White, paddingTop: 5 },
        dimensions.width
      )}
    >
      {/* 活动✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Event'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Event',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    alignSelf: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, justifyContent: 'space-between' },
                    dimensions.width
                  )}
                >
                  {/* 状态文本-报名中 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'planned'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgb(209, 243, 232)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: 'rgb(63, 202, 185)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'mine_events_register')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-结束 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'finished' &&
                      !(props.dataItem ?? defaultProps.dataItem)?.source
                        ?.playback
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgb(236, 236, 236)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: 'rgb(140, 140, 140)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'mine_events_pass')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-回放 */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.playback ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgba(43, 51, 230, 0.1)',
                            borderRadius: 2,
                            height: 18,
                            justifyContent: 'center',
                            marginBottom: 4,
                            marginTop: 4,
                            paddingLeft: 4,
                            paddingRight: 4,
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.Brand.appStyle_primary,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'event_play_back')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 状态文本-living */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.state === 'ongoing'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            borderRadius: 2,
                            justifyContent: 'center',
                            position: 'absolute',
                          },
                          dimensions.width
                        )}
                      >
                        <Image
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          resizeMode={'center'}
                          source={imageSource(
                            'https://static.acecamptech.com/www/static/media/live.b5c525932c12445797a8.gif'
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              { height: 22, width: 45 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    )}
                  </>
                  {/* 活动主题 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        fontSize: 18,
                        fontFamily: 'System',
                        fontWeight: '700',
                        lineHeight: 24,
                        letterSpacing: 0.2,
                      }}
                      text={`${
                        Platform.OS === 'ios'
                          ? '               '
                          : '            '
                      }${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source?.name,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={2}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  {/* 日期 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: 'rgb(151, 151, 151)',
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          marginTop: 4,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fromUnixTimestamp(
                      Variables,
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.shown_time,
                      undefined
                    )}
                  </Text>
                </View>
                {/* 图片 */}
                <>
                  {!(type?.length < 10) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 4, marginLeft: 4, marginTop: 3 },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          `${
                            (props.dataItem ?? defaultProps.dataItem)?.source
                              ?.cover_image
                          }`
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { borderRadius: 4, height: 67, width: 100 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 6,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 14,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_events')}
                    </Text>
                  </View>
                  {/* VIP 2 */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.exists_need_pay_meeting ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 2,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '600',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>
                <>
                  {props.hideMenu ?? defaultProps.hideMenu ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { justifyContent: 'flex-end', paddingTop: 5 },
                        dimensions.width
                      )}
                    >
                      <IconButton
                        onPress={() => {
                          try {
                            props.showActionSheet?.(
                              (props.dataItem ?? defaultProps.dataItem)
                                ?.source_id
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        color={palettes.App['Custom Color 11']}
                        icon={'Feather/more-horizontal'}
                        size={18}
                        style={StyleSheet.applyWidth(
                          { marginLeft: 30 },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 专题 */}
      <>
        {!(
          (!(props.dataItem ?? defaultProps.dataItem)?.source_type ||
            (props.dataItem ?? defaultProps.dataItem)?.source_type ===
              'Spotlight') &&
          (props.dataItem ?? defaultProps.dataItem)?.title
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.('Spotlight', undefined);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* 主题 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Text Title'].style,
                        dimensions.width
                      )}
                    >
                      {(props.dataItem ?? defaultProps.dataItem)?.title}
                    </Text>
                  </View>
                  <Utils.CustomCodeErrorBoundary>
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            color: 'rgb(151, 151, 151)',
                            fontFamily: 'System',
                            fontWeight: '700',
                            marginTop: 8,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {(props.dataItem ?? defaultProps.dataItem)?.description}
                    </Text>
                  </Utils.CustomCodeErrorBoundary>
                </View>
                {/* 图片 */}
                <>
                  {!(type?.length < 10) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          height: 90,
                          marginLeft: 4,
                          width: 120,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          `${
                            (props.dataItem ?? defaultProps.dataItem)
                              ?.background_image_url
                          }`
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { borderRadius: 6, height: 90, width: 120 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 4,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginLeft: 8,
                        marginRight: 8,
                        paddingBottom: 2,
                        paddingLeft: 6,
                        paddingRight: 6,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'home_special')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {!(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.exists_need_pay_meeting ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 4,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 6,
                            paddingRight: 6,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 18,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          alignSelf: 'flex-end',
                          color: palettes.App['Custom Color 11'],
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {timesAgo(
                      Variables,
                      (props.dataItem ?? defaultProps.dataItem)
                        ?.last_item_updated_at
                    )}
                  </Text>
                  <>
                    {props.hideMenu ?? defaultProps.hideMenu ? null : (
                      <IconButton
                        color={palettes.App['Custom Color 11']}
                        icon={'Feather/more-horizontal'}
                        size={18}
                        style={StyleSheet.applyWidth(
                          { marginLeft: 10, marginRight: 10 },
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* Divider 2 */}
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 4']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 纪要✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Minute'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  /* hidden 'Navigate' action */
                  props.gotoScreen?.(
                    (props.dataItem ?? defaultProps.dataItem)?.source_type,
                    (props.dataItem ?? defaultProps.dataItem)?.source_id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    <>
                      {!(props.dataItem ?? defaultProps.dataItem)?.source
                        ?.has_article_speech ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: palettes.App['Custom Color 13'],
                              borderRadius: 20,
                              height: 20,
                              justifyContent: 'center',
                              position: 'absolute',
                              top: 1,
                              width: 20,
                            },
                            dimensions.width
                          )}
                        >
                          <Icon
                            color={palettes.Brand.appStyle_primary}
                            name={'Ionicons/volume-high-outline'}
                            size={16}
                          />
                        </View>
                      )}
                    </>
                    {/* 纪要主题 */}
                    <Utils.CustomCodeErrorBoundary>
                      <HighlightText.Component
                        style={{
                          fontSize: 18,
                          fontFamily: 'System',
                          fontWeight: '700',
                          lineHeight: 24,
                          letterSpacing: 0.2,
                          flex: 1,
                        }}
                        text={`${
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.has_article_speech
                            ? '      '
                            : ''
                        }${replace(
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.title,
                          '</?span[^>]*>'
                        )}`}
                        highlight={props.highlight}
                        numberOfLines={2}
                      />
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                  {/* 纪要简介 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        color: 'rgb(151, 151, 151)',
                        fontFamily: 'System',
                        fontWeight: '400',
                        fontSize: 12,
                        marginTop: 4,
                        flex: 1,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.summary,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={15}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 6,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 14,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'mine_note_collection')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.free ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 2,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 10,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      /* hidden 'Navigate' action */
                      props.showActionSheet?.(
                        (props.dataItem ?? defaultProps.dataItem)?.source_id
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setShowAction(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 观点/文章✅ */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Article'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Minute',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: 1,
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  <View
                    onLayout={event => {
                      try {
                        setLines(event);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* 观点主题 */}
                    <Utils.CustomCodeErrorBoundary>
                      <HighlightText.Component
                        style={{
                          fontSize: 16,
                          fontFamily: 'System',
                          fontWeight: '700',
                          lineHeight: 24,
                          letterSpacing: 0.2,
                        }}
                        text={`${
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.badges?.[0] === 'hot'
                            ? '      '
                            : ''
                        }${replace(
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.title,
                          '</?span[^>]*>'
                        )}`}
                        highlight={props.highlight}
                        numberOfLines={2}
                      />
                    </Utils.CustomCodeErrorBoundary>
                  </View>
                  {/* 观点简介 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        color: 'rgb(151, 151, 151)',
                        fontFamily: 'System',
                        fontWeight: '400',
                        marginTop: 4,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.summary,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={numberOfLines === 1 ? 2 : 1}
                    />
                  </Utils.CustomCodeErrorBoundary>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={15}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 4,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            lineHeight: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_vote_point')}
                    </Text>
                  </View>
                  {/* VIP */}
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)?.source
                      ?.free ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(254, 249, 239)',
                            borderColor: 'rgb(184, 148, 108)',
                            borderRadius: 4,
                            borderWidth: 1,
                            justifyContent: 'center',
                            marginRight: 8,
                            paddingLeft: 3,
                            paddingRight: 3,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(184, 148, 106)',
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'VIP'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.organization?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      goto();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 13,
                            fontWeight: '700',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              /* hidden 'Set Variable' action */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10, marginRight: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
              <>
                {props.isLatest ?? defaultProps.isLatest ? null : (
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.App['Custom Color 10']}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                )}
              </>
            </Touchable>
          </View>
        )}
      </>
      {/* 本营观点 */}
      <>
        {!(
          (props.dataItem ?? defaultProps.dataItem)?.source_type === 'Opinion'
        ) ? null : (
          <View
            style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
          >
            <Touchable
              onPress={() => {
                try {
                  props.gotoScreen?.(
                    'Opinion',
                    (props.dataItem ?? defaultProps.dataItem)?.source?.id
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* 标题和图片 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingBottom: 2,
                    paddingTop: 2,
                  },
                  dimensions.width
                )}
              >
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  {/* 观点文本-谨慎 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'bearish'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 21'],
                            borderRadius: 3,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/trending-down'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '600',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_3')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 观点文本-正面 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'bullish'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 12'],
                            borderRadius: 2,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/trending-up'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_1')}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* 观点文本-中性 */}
                  <>
                    {!(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.expected_trend === 'none'
                    ) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App['Custom Color 22'],
                            borderRadius: 2,
                            flexDirection: 'row',
                            marginRight: 4,
                            paddingBottom: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingTop: 2,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.App.White}
                          name={'Feather/activity'}
                          size={10}
                          style={StyleSheet.applyWidth(
                            { marginRight: 3 },
                            dimensions.width
                          )}
                        />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)[
                            'Text Form Label 2'
                          ].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].style,
                              {
                                color: palettes.App.White,
                                fontFamily: 'System',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 14,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'tab_create_point_personal_2')}
                        </Text>
                      </View>
                    )}
                  </>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={15}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>

                <View
                  onLayout={event => {
                    try {
                      setLines(event);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      paddingTop: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
                    },
                    dimensions.width
                  )}
                >
                  {/* 本营观点主题 */}
                  <Utils.CustomCodeErrorBoundary>
                    <HighlightText.Component
                      style={{
                        fontSize: 18,
                        fontFamily: 'System',
                        fontWeight: '700',
                        lineHeight: 24,
                        letterSpacing: 0.2,
                      }}
                      text={`${replace(
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.title,
                        '</?span[^>]*>'
                      )}`}
                      highlight={props.highlight}
                      numberOfLines={2}
                    />
                  </Utils.CustomCodeErrorBoundary>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      padding: (props.dataItem ?? defaultProps.dataItem)
                        ?.visible
                        ? undefined
                        : 5,
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
                              value: palettes.App['Custom Color 22'],
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value:
                                (props.dataItem ?? defaultProps.dataItem)
                                  ?.source?.expected_trend === 'bearish'
                                  ? palettes.App['Custom Color 21']
                                  : (props.dataItem ?? defaultProps.dataItem)
                                      ?.source?.expected_trend === 'bullish'
                                  ? palettes.App['Custom Color 12']
                                  : palettes.App['Custom Color 22'],
                            },
                          ],
                          fontFamily: 'System',
                          fontWeight: '400',
                          lineHeight: 24,
                          marginRight: null,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.stock_tracing?.expected_change
                    }
                    {'%'}
                  </Text>
                  <>
                    {(props.dataItem ?? defaultProps.dataItem)
                      ?.visible ? null : (
                      <BlurView
                        {...GlobalStyles.BlurViewStyles(theme)['Blur View']
                          .props}
                        experimentalBlurMethod={'dimezisBlurView'}
                        intensity={15}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.BlurViewStyles(theme)['Blur View']
                              .style,
                            {
                              bottom: 0,
                              left: 0,
                              position: 'absolute',
                              right: 0,
                              top: 0,
                            }
                          ),
                          dimensions.width
                        )}
                        tint={'light'}
                      />
                    )}
                  </>
                </View>
              </View>
              {/* 简介 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    padding: (props.dataItem ?? defaultProps.dataItem)?.visible
                      ? undefined
                      : 5,
                    paddingBottom: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {/* 本营观点简介 */}
                <Utils.CustomCodeErrorBoundary>
                  <HighlightText.Component
                    style={{
                      color: 'rgb(116, 133, 147)',
                      fontFamily: 'System',
                      fontWeight: '400',
                      fontSize: 12,
                    }}
                    text={`${replace(
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.content,
                      '</?span[^>]*>'
                    )}`}
                    highlight={props.highlight}
                    numberOfLines={2}
                  />
                </Utils.CustomCodeErrorBoundary>
                <>
                  {(props.dataItem ?? defaultProps.dataItem)?.visible ? null : (
                    <BlurView
                      {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
                      experimentalBlurMethod={'dimezisBlurView'}
                      intensity={15}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                          {
                            bottom: 0,
                            left: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                          }
                        ),
                        dimensions.width
                      )}
                      tint={'light'}
                    />
                  )}
                </>
              </View>
              {/* 类别与作者 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                  dimensions.width
                )}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  {/* 类别 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderColor: 'rgb(150, 150, 150)',
                        borderRadius: 2,
                        borderWidth: 1,
                        justifyContent: 'center',
                        marginRight: 8,
                        paddingLeft: 3,
                        paddingRight: 3,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(150, 150, 150)',
                            fontFamily: 'System',
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 14,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_vote_point')}
                    </Text>
                  </View>
                  {/* 第一作者 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    allowFontScaling={false}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App['Custom Color 5'],
                          fontFamily: 'System',
                          fontSize: 13,
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.dataItem ?? defaultProps.dataItem)?.source?.user
                        ?.name
                    }
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      goto();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Form Label 2']
                            .style,
                          {
                            alignSelf: 'flex-end',
                            color: palettes.App['Custom Color 11'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            lineHeight: 14,
                            textAlign: 'left',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {timesAgo(
                        Variables,
                        (props.dataItem ?? defaultProps.dataItem)?.source
                          ?.release_time
                      )}
                    </Text>
                    <>
                      {props.hideMenu ?? defaultProps.hideMenu ? null : (
                        <IconButton
                          onPress={() => {
                            try {
                              setShowAction(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color 11']}
                          icon={'Feather/more-horizontal'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 10 },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
            </Touchable>
            <>
              {props.isLatest ?? defaultProps.isLatest ? null : (
                <Divider
                  {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                  color={palettes.App['Custom Color 10']}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.DividerStyles(theme)['Divider'].style,
                    dimensions.width
                  )}
                />
              )}
            </>
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(RecommandSectionBlock);
