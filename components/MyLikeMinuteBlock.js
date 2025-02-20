import React from 'react';
import { Divider, IconButton, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as HighlightText from '../custom-files/HighlightText';
import replace from '../global-functions/replace';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem: {
    id: 70502081,
    free: false,
    type: 'minute',
    user: {
      id: 10000130,
      name: '测试账号',
      avatar:
        'https://image.ca3test.com/avatar/10000130/0.00024054243143667442.JPG',
      deleted: false,
      is_self: false,
      identity: 'unreal',
      nickname: '测试账号',
      position: 'Executive Director',
      fund_type_ids: [1, 7],
      sns_career_name: '长线基金 Executive Director',
      organization_name: '',
      tournament_winner: null,
      management_scale_id: null,
      organization_type_id: 5,
      organization_identity: 'hide',
    },
    likes: 1,
    state: 'passed',
    title: '自动驾驶2025年行业展望及头部车企研发进展对比【Michael调研纪要】',
    views: 518,
    content:
      '<p>相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style="color: rgb(0, 112, 192);"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style="color: rgb(0, 112, 192);"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;相关公司：特斯拉（TSLA.US），理想汽车（2015.HK），小鹏汽车（9868.HK），蔚来（9866.HK），赛力斯（601127.SH），地平线机器人（9660.HK），英伟达（NVDA.US），高通（QCOM.US），极氪（ZK.US），零跑汽车（9863.HK），小米集团（01810.HK），比亚迪（002594.SZ），上汽集团（600104.SH），长城汽车（601633.SH），长安汽车（000625.SZ），吉利汽车（00175.HK），广汽集团（601238.SH）</p><p>&nbsp;</p><p>以下为访谈专家根据市场公开信息的个人观点及推断</p><p>&nbsp;</p><p><strong style="color: rgb(0, 112, 192);"><em>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自动驾驶行业在未来1至2年的技术路线的关键趋势</em></strong></p><p>自动驾驶行业在未来1至2年的技术路线主要集中于以下几个方面：</p><p>i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端到端技术：目前全球范围内，端到端的技术路线已基本明确，其核心优势是泛化能力强。国内如小鹏、理想、蔚来和华为等企业已开始推广分段式的“感知端到端+规控端到端”方案，而真正实现一体化端到端的仅有特斯拉。特别是在复杂城市场景中，传统规则驱动的规控方式逐渐被淘汰，规控模块的“全场景泛化”成为研发重点。</p><p>ii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Occupancy占用网络：Occupancy占用网格已成为感知模块中的主流算法，是实现中高阶算力功能的重要组成部分，各家车企均将其作为标配。</p><p>iii.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOA功能发展：NOA（Navigate on Autopilot）分为高速场景和城市场景两类。从2025年起，高速NOA预计将在中国市场快速普及，目前搭载率约为7%，预计两年内渗透率可达30%以上。同时，城市NOA也逐步成为头部车企竞争焦点，但由于城市场景复杂性更高，其普及面临较大挑战。</p><p>&nbsp;</p>',
    summary:
      '主要看点：\n1.\t自动驾驶行业在未来1至2年的技术路线的关键趋势，高速和城市NOA的发展现状及难点\n2.\t当前国内主机厂智能驾驶方面的竞争格局，传统主机厂的布局策略与特点\n3.\t无图方案的应用前景，智能驾驶行业的格局演变\n4.\t智驾普及的趋势下，智驾系统软硬件的成本变化趋势\n5.\tDeepSeek对智驾系统的影响',
    hashtags: [],
    favorites: 0,
    is_deleted: false,
    corporations: [
      {
        id: 2,
        tel: '86-755-2560-6666',
        logo: 'https://image.acecamptech.com/logos/2/ae2f8d00-12fa-4d86-bf1b-409c416e3d52.png',
        name: '万科A',
        delist: null,
        ticker: 'SZ.000002',
        en_name: 'China Vanke Co.,Ltd.',
        sc_name: '万科A',
        tc_name: null,
        website: 'www.vanke.com',
        currency: 'CNY',
        exchange: 'Shenzhen',
        following: null,
        is_active: true,
        deleted_at: null,
        can_destroy: false,
        description:
          '万科企业股份有限公司于1984年在深圳经济特区成立,1988年经深圳市人民政府“深府办(1988)1509号”文批准,公司实施股份制改革;1991年1月29日,公司发行的A股在深交所上市;1993年5月28日,公司发行的B股在深交所上市;2014年6月25日,公司B股以介绍方式转换上市地在联交所主板(H股)上市。公司的主要业务为开发用于出售及出租的房地产产品。企业荣誉:公司连续第十年蝉联"中国物业服务百强企业综合实力TOP1",连续第六年蝉联"中国房地产开发企业500强首选物业品牌"榜首,连续三年获得"中国特色物业服务领先企业——企业总部基地"荣誉称号,并蝉联中国物业服务品牌价值榜首。报告期内,本集团新增加开发项目147个,按万科权益计算的规划建筑面积约2,478.4万平方米,总建筑面积约3,716.5万平方米。',
        industry_id: 6010,
        en_description:
          'China Vanke Co., Ltd. operates real estate development businesses.  The Company provides housing renovation, housing loans, real estate brokerage, and other businesses. China Vanke also operates logistics, material supply, and other businesses.',
        sc_description:
          '万科企业股份有限公司于1984年在深圳经济特区成立,1988年经深圳市人民政府“深府办(1988)1509号”文批准,公司实施股份制改革;1991年1月29日,公司发行的A股在深交所上市;1993年5月28日,公司发行的B股在深交所上市;2014年6月25日,公司B股以介绍方式转换上市地在联交所主板(H股)上市。公司的主要业务为开发用于出售及出租的房地产产品。企业荣誉:公司连续第十年蝉联"中国物业服务百强企业综合实力TOP1",连续第六年蝉联"中国房地产开发企业500强首选物业品牌"榜首,连续三年获得"中国特色物业服务领先企业——企业总部基地"荣誉称号,并蝉联中国物业服务品牌价值榜首。报告期内,本集团新增加开发项目147个,按万科权益计算的规划建筑面积约2,478.4万平方米,总建筑面积约3,716.5万平方米。',
        tc_description: null,
        registration_location: null,
      },
    ],
    industry_ids: [6010],
    organization: {
      id: 10000014,
      irm: false,
      tel: null,
      logo: null,
      name: '华兴泛亚1',
      score: 0,
      state: 'passed',
      ticker: null,
      en_name: 'China Renaissance FanYa1',
      sc_name: '华兴泛亚1',
      tc_name: '華興泛亞1',
      website: null,
      celebrity: false,
      deleted_at: null,
      dms_vendor: false,
      description:
        '基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文',
      industry_id: null,
      is_producer: true,
      state_events: [],
      fund_type_ids: [1, 7],
      self_employed: true,
      en_description:
        'ENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENENENENENEN ENENENENEN ENEN ENENENEN',
      public_contact: false,
      sc_description:
        '基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文基金介绍（中文',
      tc_description: null,
      need_allocation: false,
      dms_vendor_contact: null,
      share_display_name: '华兴泛亚1',
      management_scale_id: 6,
      allow_public_contact: true,
      blocked_expert_roles: [],
      organization_type_id: 5,
      sator_organization_id: 112,
      belongs_organization_id: null,
      belongs_organization_name: null,
      belongs_organization_contact: null,
    },
    release_time: 1739430450,
    corporation_ids: [2],
    custom_sector_ids: [2],
  },
  gotoScreen: () => {},
};

const MyLikeMinuteBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [numberOfLines, setNumberOfLines] = React.useState(0);
  const [showAction, setShowAction] = React.useState(false);

  return (
    <View>
      {/* 纪要✅ */}
      <View
        style={StyleSheet.applyWidth({ marginBottom: 5 }, dimensions.width)}
      >
        <Touchable
          onPress={() => {
            try {
              /* hidden 'Navigate' action */
              props.gotoScreen?.(undefined);
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
            <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* 纪要主题 */}
                <Utils.CustomCodeErrorBoundary>
                  <HighlightText.Component
                    style={{
                      fontSize: 16,
                      fontFamily: 'System',
                      fontWeight: '600',
                      lineHeight: 22,
                    }}
                    text={`${
                      (props.dataItem ?? defaultProps.dataItem)?.source
                        ?.has_article_speech
                        ? '      '
                        : ''
                    }${replace(
                      (props.dataItem ?? defaultProps.dataItem)?.title,
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
                    marginTop: 8,
                  }}
                  text={`${replace(
                    (props.dataItem ?? defaultProps.dataItem)?.summary,
                    '</?span[^>]*>'
                  )}`}
                  highlight={props.highlight}
                  numberOfLines={numberOfLines === 1 ? 2 : 1}
                />
              </Utils.CustomCodeErrorBoundary>
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
                  {...GlobalStyles.TextStyles(theme)['Text Form Label 2'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
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
                  {t(Variables, 'mine_note_collection')}
                </Text>
              </View>
              {/* VIP */}
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
                  {...GlobalStyles.TextStyles(theme)['Text Form Label 2'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
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
              {/* 第一作者 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label 2'].props}
                allowFontScaling={false}
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
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
                {(props.dataItem ?? defaultProps.dataItem)?.user?.name}
              </Text>
            </View>
          </View>
          <Divider
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            color={palettes.App['Custom Color 4']}
            style={StyleSheet.applyWidth(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              dimensions.width
            )}
          />
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(MyLikeMinuteBlock);
