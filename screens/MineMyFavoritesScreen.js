import React from 'react';
import {
  Icon,
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import MyFavoriteBlock from '../components/MyFavoriteBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyFavoritesScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [add_folder_error_show, setAdd_folder_error_show] =
    React.useState(false);
  const [add_folder_item_shown, setAdd_folder_item_shown] =
    React.useState(false);
  const [delete_folder_index, setDelete_folder_index] = React.useState(0);
  const [delete_folder_shown, setDelete_folder_shown] = React.useState(false);
  const [edit_folder_error_show, setEdit_folder_error_show] =
    React.useState('');
  const [edit_folder_index, setEdit_folder_index] = React.useState(0);
  const [edit_folder_item_shown, setEdit_folder_item_shown] =
    React.useState(false);
  const [folder_input_text, setFolder_input_text] = React.useState('');
  const [follow_user, setFollow_user] = React.useState([]);
  const [follow_user_page, setFollow_user_page] = React.useState(0);
  const [is_loading, setIs_loading] = React.useState(false);
  const [new_folder_name, setNew_folder_name] = React.useState('');
  const [vote_options, setVote_options] = React.useState([]);
  const [refreshingFetchList, setRefreshingFetchList] = React.useState(false);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestFavoritesEditPUT = AceCampTestApi.useFavoritesEditPUT();
  const aceCampTestFavoritesAddPOST = AceCampTestApi.useFavoritesAddPOST();
  const aceCampTestFavoritesDeleteDELETE =
    AceCampTestApi.useFavoritesDeleteDELETE();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
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
              {t(Variables, 'mine_my_collection')}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { position: 'absolute', right: 16, top: 11 },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  setEdit_folder_item_shown(true);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icon
                color={palettes.Brand.appStyle_primary}
                name={'Feather/folder-plus'}
                size={22}
              />
            </Touchable>
          </View>
        </View>
      </View>
      {/* 列表 */}
      <View>
        <AceCampTestApi.FetchFavoritesListGET
          handlers={{
            on401: fetchData => {
              try {
                console.log(fetchData?.statusText);
              } catch (err) {
                console.error(err);
              }
            },
            on4xx: fetchData => {
              try {
                console.log('error');
              } catch (err) {
                console.error(err);
              }
            },
            onData: fetchData => {
              try {
                console.log(fetchData);
                setFollow_user(fetchData?.data);
                setFollow_user_page(2);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          retry={1}
        >
          {({ loading, error, data, refetchFavoritesList }) => {
            const fetchData = data?.json;
            if (loading) {
              return <FetchLoadingBlock />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return (
                <>
                  {/* No-Data 2 */}
                  <NoDataBlock />
                </>
              );
            }

            return (
              <>
                <SimpleStyleFlatList
                  data={follow_user}
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
                  listKey={'列表->Fetch->List'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingFetchList}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingFetchList(true);
                            await refetchSnsLikeOpinions();
                            setRefreshingFetchList(false);
                          } catch (err) {
                            console.error(err);
                            setRefreshingFetchList(false);
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <>
                        <Touchable
                          onPress={() => {
                            try {
                              navigation.push('BottomTabNavigator', {
                                screen: 'Mine',
                                params: {
                                  screen: 'MineMyFavoritesDetail2Screen',
                                  params: {
                                    id: listData?.id,
                                    folder_name: listData?.name,
                                    is_default: listData?.default_favorite,
                                  },
                                },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <MyFavoriteBlock
                            deleteFolder={id => {
                              try {
                                setDelete_folder_index(id);
                                setDelete_folder_shown(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            editFolder={(id, folderName) => {
                              try {
                                setFolder_input_text(folderName);
                                setEdit_folder_index(id);
                                setAdd_folder_item_shown(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            item={listData}
                          />
                        </Touchable>
                      </>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                />
                <>
                  {!(
                    fetchData?.code !== 200 || fetchData?.data?.length === 0
                  ) ? null : (
                    <NoDataBlock />
                  )}
                </>
              </>
            );
          }}
        </AceCampTestApi.FetchFavoritesListGET>
      </View>
      {/* 修改收藏 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={add_folder_item_shown}
      >
        {/* 背景层 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          {/* 提示框 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom #ffffff'],
                borderRadius: 5,
                justifyContent: 'center',
                padding: 20,
                width: 300,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '700',
                  letterSpacing: null,
                  lineHeight: 20,
                  marginRight: null,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_collection_edit_folder')}
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App['Custom Color 59'],
                  fontFamily: 'System',
                  fontSize: 12,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 14,
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              {'*'}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 14,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_collection_folder_name')}
              </Text>
            </Text>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  marginTop: 16,
                  padding: 8,
                  width: 268,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setFolder_input_text(newTextInputValue);
                    setAdd_folder_error_show(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={20}
                placeholder={t(
                  Variables,
                  'mine_collection_more_input'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 6']}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
                value={folder_input_text}
              />
            </View>
            <>
              {!add_folder_error_show ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'flex-start',
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 10,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_collection_folder_name_required')}
                </Text>
              )}
            </>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setAdd_folder_item_shown(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor: palettes.App['Custom Color 6'],
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      marginRight: 8,
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      { fontFamily: 'System', fontSize: 14, fontWeight: '400' },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_cancel')}
                  </Text>
                </View>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      if (folder_input_text?.length === 0) {
                        setAdd_folder_error_show(true);
                      } else {
                        (
                          await aceCampTestFavoritesEditPUT.mutateAsync({
                            id: edit_folder_index,
                            name: folder_input_text,
                          })
                        )?.json;
                        setAdd_folder_item_shown(false);
                        setFolder_input_text('');
                        setEdit_folder_index(-1);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_yes')}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Modal>
      {/* 添加收藏 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={edit_folder_item_shown}
      >
        {/* 背景层 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          {/* 提示框 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom #ffffff'],
                borderRadius: 5,
                justifyContent: 'center',
                padding: 20,
                width: 300,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '700',
                  letterSpacing: null,
                  lineHeight: 20,
                  marginRight: null,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_collection_create_folder')}
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App['Custom Color 59'],
                  fontFamily: 'System',
                  fontSize: 12,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 14,
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              {'*'}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 14,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_collection_folder_name')}
              </Text>
            </Text>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  marginTop: 16,
                  padding: 8,
                  width: 268,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setNew_folder_name(newTextInputValue);
                    setAdd_folder_error_show(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={20}
                placeholder={t(
                  Variables,
                  'mine_collection_more_input'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 6']}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
                value={new_folder_name}
              />
            </View>
            <>
              {!add_folder_error_show ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'flex-start',
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 10,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_collection_folder_name_required')}
                </Text>
              )}
            </>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setEdit_folder_item_shown(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor: palettes.App['Custom Color 6'],
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      marginRight: 8,
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      { fontFamily: 'System', fontSize: 14, fontWeight: '400' },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_cancel')}
                  </Text>
                </View>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      if (new_folder_name?.length === 0) {
                        setAdd_folder_error_show(true);
                      } else {
                        (
                          await aceCampTestFavoritesAddPOST.mutateAsync({
                            name: new_folder_name,
                          })
                        )?.json;
                        setEdit_folder_item_shown(false);
                        setNew_folder_name('');
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_yes')}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Modal>
      {/* 删除 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={delete_folder_shown}
      >
        {/* 背景层 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          {/* 提示框 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom #ffffff'],
                borderRadius: 5,
                justifyContent: 'center',
                padding: 20,
                width: 300,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '700',
                  letterSpacing: null,
                  lineHeight: 20,
                  marginRight: null,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_collection_folder_delete_sure')}
            </Text>
            {/* Text 2 */}
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
                  lineHeight: 15,
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_collection_folder_delete_content')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 16,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setDelete_folder_shown(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderColor: palettes.App['Custom Color 6'],
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      marginRight: 8,
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      { fontFamily: 'System', fontSize: 14, fontWeight: '400' },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_cancel')}
                  </Text>
                </View>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      (
                        await aceCampTestFavoritesDeleteDELETE.mutateAsync({
                          id: delete_folder_index,
                        })
                      )?.json;
                      setDelete_folder_shown(false);
                      setDelete_folder_index(-1);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.Brand.appStyle_primary,
                      borderColor: palettes.Brand.appStyle_primary,
                      borderRadius: 4,
                      borderWidth: 1,
                      justifyContent: 'center',
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_yes')}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(MineMyFavoritesScreen);
