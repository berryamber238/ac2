import React from 'react';
import {
  LoadingIndicator,
  Shadow,
  SimpleStyleFlashList,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getTimestamp from '../global-functions/getTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const OrganizerEventBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [cursor, setCursor] = props.setCursor
    ? [props.cursor !== undefined ? props.cursor : '', props.setCursor]
    : React.useState('');
  const [eventData, setEventData] = props.setEventData
    ? [props.eventData !== undefined ? props.eventData : [], props.setEventData]
    : React.useState([]);
  const [isLoading, setIsLoading] = props.setIsLoading
    ? [
        props.isLoading !== undefined ? props.isLoading : false,
        props.setIsLoading,
      ]
    : React.useState(false);
  const [oid, setOid] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const getOid = () => {
    return props.headers[0].params.organization_id;
  };

  const refreshList = newList => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    eventData.push(...newList);
  };
  // if(props.route?.params?.organization_id) {
  //     setOid(props.route.params.organization_id)
  // }

  return (
    <View>
      {/* event get */}
      <AceCampTestApi.FetchOrganizerMinute$article$eventGET
        handlers={{
          onData: eventGetData => {
            const handler = async () => {
              try {
                setIsLoading(true);
                setEventData(eventData.concat(eventGetData?.data?.feeds));
                setCursor(
                  (() => {
                    const e = eventGetData?.data?.feeds;
                    return e[e.length - 1];
                  })()?.cursor
                );
                setTotalPages(eventGetData?.meta?.total_pages);
                /* hidden 'Log to Console' action */
                await waitUtil({ milliseconds: 1000 });
                setIsLoading(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          },
        }}
        organization_id={getOid()}
        page_size={20}
        source_type={'Event'}
      >
        {({ loading, error, data, refetchOrganizerMinute$article$event }) => {
          const eventGetData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 19'],
                  paddingBottom: 10,
                  paddingTop: 8,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <Shadow
                offsetY={0}
                paintInside={true}
                showShadowCornerBottomEnd={true}
                showShadowCornerBottomStart={true}
                showShadowCornerTopEnd={true}
                showShadowCornerTopStart={true}
                showShadowSideBottom={true}
                showShadowSideEnd={true}
                showShadowSideStart={true}
                showShadowSideTop={true}
                offsetX={14}
                startColor={palettes.App['Custom Color 105']}
              >
                {/* 系列活动-列表 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderRadius: 4,
                      height: '100%',
                      marginLeft: 14,
                      marginRight: 14,
                      overflow: 'hidden',
                      width: [
                        { minWidth: Breakpoints.Mobile, value: '100%' },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: dimensions.width - 28,
                        },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <SimpleStyleFlashList
                    data={eventData}
                    estimatedItemSize={50}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(flashListData, index) =>
                      flashListData?.source_id
                    }
                    listKey={
                      'event get->View->Shadow->系列活动-列表->FlashList'
                    }
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (isLoading) {
                            return;
                          }
                          if (cursor > totalPages) {
                            return;
                          }
                          setIsLoading(true);
                          const result = (
                            await AceCampTestApi.organizerMinute$article$eventGET(
                              Constants,
                              {
                                ack: getTimestamp(),
                                cursor: cursor,
                                organization_id: getOid(),
                                page_size: 20,
                                source_type: 'Event',
                              }
                            )
                          )?.json;
                          /* hidden 'Log to Console' action */
                          setEventData(eventData.concat(result?.data?.feeds));
                          setCursor(
                            (() => {
                              const e = result?.data?.feeds;
                              return e[e.length - 1];
                            })()?.cursor
                          );
                          /* hidden 'Log to Console' action */
                          setIsLoading(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const flashListData = item;
                      return (
                        <RecommandSectionBlock
                          dataItem={flashListData}
                          hideMenu={true}
                        />
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    initialNumToRender={eventGetData?.meta?.total}
                    style={StyleSheet.applyWidth(
                      {
                        paddingBottom: 10,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 10,
                      },
                      dimensions.width
                    )}
                  />
                  {/* 无内容提示 */}
                  <>
                    {!(eventData?.length === 0) ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: palettes.App.White,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingBottom: 5,
                            paddingTop: 5,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              {
                                color: palettes.App['Custom Color 4'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                marginRight: null,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'common_no_content')}
                        </Text>
                      </View>
                    )}
                  </>
                </View>
              </Shadow>
            </View>
          );
        }}
      </AceCampTestApi.FetchOrganizerMinute$article$eventGET>
      {/* 读取窗口 */}
      <>
        {!isLoading ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Mobile, value: dimensions.height },
                ],
                justifyContent: 'center',
                left: 0,
                opacity: 1,
                position: 'absolute',
                top: 0,
                width: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Mobile, value: dimensions.width },
                ],
                zIndex: 99,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.App['Custom Color 5'],
                  borderRadius: 8,
                  height: 70,
                  justifyContent: 'center',
                  opacity: 0.6,
                  width: 70,
                  zIndex: 200,
                },
                dimensions.width
              )}
            >
              <LoadingIndicator
                size={30}
                color={palettes.Brand.appStyle_primary}
                type={'wave'}
              />
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 5'],
                  height: '100%',
                  left: 0,
                  opacity: 0.43,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
    </View>
  );
};

export default withTheme(OrganizerEventBlock);
