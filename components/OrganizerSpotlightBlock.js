import React from 'react';
import {
  LoadingIndicator,
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
import * as Shadow from '../custom-files/Shadow';
import getTimestamp from '../global-functions/getTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const OrganizerSpotlightBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
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
  const [page, setPage] = props.setPage
    ? [props.page !== undefined ? props.page : 1, props.setPage]
    : React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const getOid = () => {
    if (props.headers) return props.headers[0].params?.organization_id;
    else return '20505781';
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
    <View
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom #ffffff'] },
        dimensions.width
      )}
    >
      {/* spotlight get */}
      <AceCampTestApi.FetchOrganizerSpotlightsGET
        handlers={{
          onData: spotlightGetData => {
            const handler = async () => {
              try {
                setIsLoading(true);
                console.log(spotlightGetData?.data);
                setEventData(eventData.concat(spotlightGetData?.data));
                setPage(page + 1);
                setTotalPages(spotlightGetData?.meta?.total_pages);
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
        page={1}
        per_page={20}
      >
        {({ loading, error, data, refetchOrganizerSpotlights }) => {
          const spotlightGetData = data?.json;
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
                  height: '100%',
                  paddingBottom: 10,
                  paddingTop: 8,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Custom Code 2 */}
              <Utils.CustomCodeErrorBoundary>
                <Shadow.ShadowComponent
                  startColor={'#0002'}
                  endColor={'#0000'}
                  offset={[14, 0]}
                  distance={5}
                >
                  {/* 系列活动-列表 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        marginLeft: 14,
                        marginRight: 14,
                        overflow: 'hidden',
                        width: dimensions.width - 28,
                      },
                      dimensions.width
                    )}
                  >
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
                    <SimpleStyleFlashList
                      data={eventData}
                      estimatedItemSize={50}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(flashListData, index) => flashListData?.id}
                      listKey={
                        'spotlight get->View->Custom Code 2->系列活动-列表->FlashList'
                      }
                      numColumns={1}
                      onEndReached={() => {
                        const handler = async () => {
                          console.log('FlashList ON_END_REACHED Start');
                          let error = null;
                          try {
                            console.log(
                              'Start ON_END_REACHED:0 CONDITIONAL_STOP'
                            );
                            if (isLoading) {
                              return console.log(
                                'Complete ON_END_REACHED:0 CONDITIONAL_STOP'
                              );
                            } else {
                              console.log(
                                'Skipped ON_END_REACHED:0 CONDITIONAL_STOP: condition not met'
                              );
                            }
                            console.log(
                              'Start ON_END_REACHED:1 CONDITIONAL_STOP'
                            );
                            if (page > totalPages) {
                              return console.log(
                                'Complete ON_END_REACHED:1 CONDITIONAL_STOP'
                              );
                            } else {
                              console.log(
                                'Skipped ON_END_REACHED:1 CONDITIONAL_STOP: condition not met'
                              );
                            }
                            console.log('Start ON_END_REACHED:2 SET_VARIABLE');
                            setIsLoading(true);
                            console.log(
                              'Complete ON_END_REACHED:2 SET_VARIABLE'
                            );
                            console.log('Start ON_END_REACHED:3 FETCH_REQUEST');
                            const result = (
                              await AceCampTestApi.organizerSpotlightsGET(
                                Constants,
                                {
                                  organization_id: getOid(),
                                  page: null,
                                  per_page: 20,
                                }
                              )
                            )?.json;
                            console.log(
                              'Complete ON_END_REACHED:3 FETCH_REQUEST',
                              { result }
                            );
                            console.log('Start ON_END_REACHED:4 SET_VARIABLE');
                            setEventData(eventData.concat(result?.data));
                            console.log(
                              'Complete ON_END_REACHED:4 SET_VARIABLE'
                            );
                            console.log('Start ON_END_REACHED:5 SET_VARIABLE');
                            setPage(page + 1);
                            console.log(
                              'Complete ON_END_REACHED:5 SET_VARIABLE'
                            );
                            console.log('Start ON_END_REACHED:6 SET_VARIABLE');
                            setIsLoading(false);
                            console.log(
                              'Complete ON_END_REACHED:6 SET_VARIABLE'
                            );
                          } catch (err) {
                            console.error(err);
                            error = err.message ?? err;
                          }
                          console.log(
                            'FlashList ON_END_REACHED Complete',
                            error ? { error } : 'no error'
                          );
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
                      initialNumToRender={spotlightGetData?.meta?.total}
                    />
                  </View>
                </Shadow.ShadowComponent>
              </Utils.CustomCodeErrorBoundary>
            </View>
          );
        }}
      </AceCampTestApi.FetchOrganizerSpotlightsGET>
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

export default withTheme(OrganizerSpotlightBlock);
