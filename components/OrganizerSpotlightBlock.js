import React from 'react';
import {
  LoadingIndicator,
  Shadow,
  SimpleStyleFlatList,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
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
                console.log(spotlightGetData?.data, 'spotlight');
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
                  <SimpleStyleFlatList
                    data={eventData}
                    decelerationRate={'normal'}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(listData, index) =>
                      listData?.id ??
                      listData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(listData)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'spotlight get->View->Shadow->系列活动-列表->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReached={() => {
                      const handler = async () => {
                        try {
                          if (isLoading) {
                            return;
                          }
                          if (page > spotlightGetData?.meta?.total_pages) {
                            return;
                          }
                          setIsLoading(true);
                          const result = (
                            await AceCampTestApi.organizerSpotlightsGET(
                              Constants,
                              {
                                organization_id: getOid(),
                                page: page,
                                per_page: 20,
                              }
                            )
                          )?.json;
                          setEventData(eventData.concat(result?.data));
                          setPage(page + 1);
                          setIsLoading(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return <RecommandSectionBlock hideMenu={true} />;
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth(
                      { padding: 16 },
                      dimensions.width
                    )}
                  />
                </View>
              </Shadow>
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
