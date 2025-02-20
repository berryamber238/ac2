import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalVariables from '../config/GlobalVariableContext';
import StringFormat from '../global-functions/StringFormat';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  item: {
    type: 'Order',
    price: 300,
    state: 'paid',
    remark: '',
    sncode: '12502161402630635',
    paid_at: 1739717944,
    card_type: 'acoin',
    created_at: 1739717943,
    goods_info: {
      id: 70502081,
      free: false,
      state: 'passed',
      title: '自动驾驶2025年行业展望及头部车企研发进展对比【Michael调研纪要】',
      release_time: 1739430450,
      current_price: 300,
      original_price: 300,
    },
    goods_type: 'Article',
    actual_paid: 100,
    payment_info: null,
    payment_type: 'UserCard',
    state_events: ['refund', 'full_refund'],
    operator_info: {
      id: 1,
      name: '系统',
      avatar: null,
      is_expert: true,
      is_analyst: false,
    },
    operator_type: 'Staff',
  },
};

const MyBuyArticleBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [following, setFollowing] = React.useState(
    (props.item ?? defaultProps.item)?.sns_action_flag?.following
  );

  return (
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom #ffffff'] },
        dimensions.width
      )}
    >
      <Touchable
        onPress={() => {
          try {
            navigation.push('ArticleDetailScreen', {
              article_info_id: (props.item ?? defaultProps.item)?.goods_info
                ?.id,
            });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row', padding: 16 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, flexDirection: 'column', marginRight: 10 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                numberOfLines={2}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {(props.item ?? defaultProps.item)?.goods_info?.title}
              </Text>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                },
                dimensions.width
              )}
            >
              {/* Text 3 */}
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
                    lineHeight: 16,
                  },
                  dimensions.width
                )}
              >
                {StringFormat(
                  t(Variables, 'mine_buy_time'),
                  [].concat(
                    fromUnixTimestamp(
                      Variables,
                      (props.item ?? defaultProps.item)?.paid_at,
                      'YYYY-MM-DD HH:mm'
                    )
                  )
                )}
              </Text>
              {/* 享VIP免费 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.card_type === 'vip' ||
                  (props.item ?? defaultProps.item)?.card_type === 'camp_vip'
                ) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color 61'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_vip_free')}
                  </Text>
                )}
              </>
              {/* 次卡 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.card_type === 'ppv'
                ) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color 61'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_has_order_ppv')}
                  </Text>
                )}
              </>
              {/* A币 */}
              <>
                {(props.item ?? defaultProps.item)?.card_type === 'ppv' ||
                (props.item ?? defaultProps.item)?.card_type === 'vip' ||
                (props.item ?? defaultProps.item)?.card_type ===
                  'camp_vip' ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color 59'],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {StringFormat(
                      t(Variables, 'article_detail_has_paid'),
                      [].concat((props.item ?? defaultProps.item)?.actual_paid)
                    )}
                  </Text>
                )}
              </>
            </View>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(MyBuyArticleBlock);
