import React from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TextInput,
  Timer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import PositionListBlock from '../components/PositionListBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as CoverView from '../custom-files/CoverView';
import * as LabelPicker from '../custom-files/LabelPicker';
import LabelPickerCancelBtnPress from '../global-functions/LabelPickerCancelBtnPress';
import LabelPickerChangeBgStyle from '../global-functions/LabelPickerChangeBgStyle';
import LabelPickerChangeTextStyle from '../global-functions/LabelPickerChangeTextStyle';
import LabelPickerConfirmBtnPress from '../global-functions/LabelPickerConfirmBtnPress';
import LabelPickerItemClick from '../global-functions/LabelPickerItemClick';
import LabelPickerSelectAllPress from '../global-functions/LabelPickerSelectAllPress';
import arrayIdToString from '../global-functions/arrayIdToString';
import arrayToString from '../global-functions/arrayToString';
import getDicDataByName from '../global-functions/getDicDataByName';
import getNameById from '../global-functions/getNameById';
import getScalesById from '../global-functions/getScalesById';
import t from '../global-functions/t';
import uploadImage2 from '../global-functions/uploadImage2';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineIdentityInfoScreen2 = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [bottomSheetTitle, setBottomSheetTitle] = React.useState('');
  const [confirm_modal_visiable, setConfirm_modal_visiable] =
    React.useState(false);
  const [corporation_list_shown, setCorporation_list_shown] =
    React.useState(false);
  const [corporations, setCorporations] = React.useState([]);
  const [count_down, setCount_down] = React.useState(120);
  const [draft_list_modal_shown, setDraft_list_modal_shown] =
    React.useState(false);
  const [edit_folder_item_shown, setEdit_folder_item_shown] =
    React.useState(false);
  const [edit_name, setEdit_name] = React.useState('');
  const [edit_state, setEdit_state] = React.useState(false);
  const [email_code, setEmail_code] = React.useState('');
  const [focus_search_input, setFocus_search_input] = React.useState(false);
  const [hot_data_list, setHot_data_list] = React.useState([]);
  const [industry_id, setIndustry_id] = React.useState([]);
  const [industry_name, setIndustry_name] = React.useState('');
  const [is_corp_loaded, setIs_corp_loaded] = React.useState(false);
  const [is_count_start, setIs_count_start] = React.useState(false);
  const [is_loading, setIs_loading] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [modal_cancel, setModal_cancel] = React.useState(
    t(Variables, 'common_cancel')
  );
  const [organizationInfo, setOrganizationInfo] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [relation_stock, setRelation_stock] = React.useState([]);
  const [relation_stock_id, setRelation_stock_id] = React.useState([]);
  const [relation_stock_id_tmp, setRelation_stock_id_tmp] = React.useState([]);
  const [relation_stock_tmp, setRelation_stock_tmp] = React.useState([]);
  const [scroll_picker_modal_style, setScroll_picker_modal_style] =
    React.useState({});
  const [send_code_btn_text, setSend_code_btn_text] = React.useState(
    t(Variables, 'login_in_get_vc')
  );
  const [show_position_modal, setShow_position_modal] = React.useState(false);
  const [state, setState] = React.useState(
    Constants['user_info']?.organization_user?.state
  );
  const [textInputValue, setTextInputValue] = React.useState('');
  const [tip_modal_confirm, setTip_modal_confirm] = React.useState(
    t(Variables, 'common_yes')
  );
  const [tip_modal_message, setTip_modal_message] = React.useState(
    t(Variables, 'mine_remind_quit')
  );
  const [tip_modal_title, setTip_modal_title] = React.useState(
    t(Variables, 'common_resign')
  );
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [total_corporations, setTotal_corporations] = React.useState(0);
  const [tvAuth, setTvAuth] = React.useState('');
  const [v_code_send, setV_code_send] = React.useState(false);
  const arrayObjToList = data => {
    const strings = [];
    if (data && data.length > 0) {
      for (const corporation of data) {
        strings.push(corporation.name);
      }
    }
    return strings;
  };

  const initLabelPickerSetting = (
    Variables,
    setGlobalVariableValue,
    dataSourceName
  ) => {
    const pickupDic = Variables.ace_dic.data[dataSourceName];

    setGlobalVariableValue({
      key: 'label_picker_current_selected_values',
      value: organizationInfo.industry_ids,
    });
    setGlobalVariableValue({
      key: 'label_picker_current_selected_size',
      value: organizationInfo.industry_ids.length,
    });
    setGlobalVariableValue({
      key: 'label_picker_dic_name',
      value: dataSourceName,
    });

    setGlobalVariableValue({ key: 'label_picker_modal_shown', value: true });
    setGlobalVariableValue({
      key: 'label_picker_checkedall',
      value:
        organizationInfo.industry_ids.length === pickupDic.length
          ? true
          : false,
    });
    //设定滚动选择器Modal的确认回调

    LabelPicker.setConfirmCallback(Variables => {
      const selectedIds = Variables['label_picker_current_selected_values'];

      switch (dataSourceName) {
        case 'industries':
          const updateData = { ...organizationInfo };
          updateData.industry_ids = selectedIds;
          setOrganizationInfo(updateData);
          // setFd_industryIds(selectedIds);
          break;
      }
      CoverView.hide();
      LabelPicker.callCancel(setGlobalVariableValue);
    });
  };

  const mutipleCompanySelected = (id, name) => {
    id = id.toString();
    if (relation_stock_id_tmp.includes(id)) {
      let newArr = relation_stock_id_tmp.filter(item => item !== id);
      setRelation_stock_id_tmp(newArr);
      let newNameArr = relation_stock_tmp.filter(item => item !== name);
      setRelation_stock_tmp(newNameArr);
      //    relation_stock_id_tmp.splice(0,relation_stock_id_tmp.length);
      // relation_stock_id_tmp.push(...newArr);
    } else {
      setRelation_stock_id_tmp([...relation_stock_id_tmp, id]);
      setRelation_stock_tmp([...relation_stock_tmp, name]);
    }
  };

  const onAreaCodeSelected = (id, code) => {
    const updatedValue = {
      ...organizationInfo,
    };
    updatedValue.country_code_id = id;
    updatedValue.country_code = code;
    setOrganizationInfo(updatedValue);
  };

  const onPositionSelected = (id, position) => {
    const updatedValue = {
      ...organizationInfo,
    };
    updatedValue.position_id = id;
    updatedValue.position_name = position;
    setOrganizationInfo(updatedValue);
  };

  const tip_modal_callback = async () => {
    try {
      setTip_modal_visiable(true);
      (
        await aceCampTestOrganizationUsersDismissPUT.mutateAsync({
          id: Constants['user_info']?.id,
        })
      )?.json;
    } catch (err) {
      console.error(err);
    }
  };
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestOrganizationUsersDismissPUT =
    AceCampTestApi.useOrganizationUsersDismissPUT();
  const aceCampTestDeleteOpinionDELETE =
    AceCampTestApi.useDeleteOpinionDELETE();
  React.useEffect(() => {
    try {
      const result = Constants['user_info']?.organization_user;
      setOrganizationInfo(result);
    } catch (err) {
      console.error(err);
    }
  }, []);
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
  const timerRef = React.useRef();

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
              {t(Variables, 'mine_identity_auth')}
            </Text>
          </View>
        </View>
      </View>
      {/* 分隔 */}
      <View
        style={StyleSheet.applyWidth(
          { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
          dimensions.width
        )}
      />
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <View>
          {/* 身份认证状态 */}
          <View
            style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}
          >
            {/* 状态显示 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
                      state === 'passed' && organizationInfo?.dismissed_at
                        ? '#ff6e6e'
                        : palettes.App.appStyle_black,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '700',
                    letterSpacing: 0.2,
                    lineHeight: 19,
                  },
                  dimensions.width
                )}
              >
                {state === 'passed'
                  ? !organizationInfo?.dismissed_at
                    ? getNameById(
                        Variables,
                        9,
                        organizationInfo?.organization?.organization_type_id
                      )
                    : t(Variables, 'mine_resigned')
                  : t(Variables, 'mine_identity_auth')}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <>
                  {!(
                    Constants['user_info']?.organization_user?.state ===
                      'passed' &&
                    !Constants['user_info']?.organization_user?.dismissed_at &&
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id !== 4
                  ) ? null : (
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                      source={imageSource(Images['icmineauth'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          { height: 16, marginRight: 4, width: 16 }
                        ),
                        dimensions.width
                      )}
                    />
                  )}
                </>
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 79'],
                      fontFamily: 'System',
                      fontSize: 13,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {tvAuth}
                </Text>
              </View>
            </View>
            {/* 提示信息 */}
            <>
              {!(
                Constants['user_info']?.organization_user?.state === 'pending'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.Brand.itemBgChecked,
                      marginTop: 8,
                      padding: 8,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Brand.itemTextNomal,
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_auth_under_review')}
                  </Text>
                </View>
              )}
            </>
            {/* 驳回情况 */}
            <>
              {!(
                Constants['user_info']?.organization_user?.state === 'rejected'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 80'],
                      flexDirection: 'row',
                      marginTop: 8,
                      padding: 8,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_reject_reason')}
                    {Constants['user_info']?.organization_user?.review_message}
                  </Text>
                  <Link
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.LinkStyles(theme)['Link'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.LinkStyles(theme)['Link'].style,
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          letterSpacing: 0.2,
                          lineHeight: 14,
                          marginLeft: 8,
                        }
                      ),
                      dimensions.width
                    )}
                    title={`${t(Variables, 'mine_to_change')}`}
                  />
                </View>
              )}
            </>
          </View>
          {/* 分隔 */}
          <View
            style={StyleSheet.applyWidth(
              { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
              dimensions.width
            )}
          />
          {/* 公司信息 */}
          <>
            {Constants['user_info']?.organization_user?.organization
              ?.organization_type_id === 3 ||
            Constants['user_info']?.organization_user?.organization
              ?.organization_type_id === 4 ? null : (
              <View>
                {/* 标题 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 14'],
                      flexDirection: 'row',
                      height: 40,
                      justifyContent: 'space-between',
                      paddingLeft: 16,
                      paddingRight: 16,
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
                        {
                          color: palettes.Brand.itemTextNomal,
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_company_info')}
                  </Text>
                  <>
                    {!(
                      Constants['user_info']?.organization_user?.state ===
                      'passed'
                    ) ? null : (
                      <Link
                        accessible={true}
                        onPress={() => {
                          try {
                            setTip_modal_visiable(true);
                            /* hidden 'API Request' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        selectable={false}
                        {...GlobalStyles.LinkStyles(theme)['Link'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinkStyles(theme)['Link'].style,
                            {
                              color: palettes.Brand.appStyle_primary,
                              fontFamily: 'System',
                              fontSize: 14,
                              fontWeight: '400',
                              letterSpacing: 0.2,
                              lineHeight: 16,
                            }
                          ),
                          dimensions.width
                        )}
                        title={`${t(Variables, 'common_resign')}`}
                      />
                    )}
                  </>
                </View>
                {/* 公司名称 */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 4'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'register_company_name')}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['15 Regular'].style,
                        { paddingBottom: 8, paddingTop: 10 }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      Constants['user_info']?.organization_user?.organization
                        ?.name
                    }{' '}
                  </Text>
                  {/* 分隔 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom Color 14'],
                        height: 1,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* 股票代码 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 6
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_ticker')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {
                          Constants['user_info']?.organization_user
                            ?.organization?.ticker
                        }{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 所属行业 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 6
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'mine_use_company_industry')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {getNameById(
                          Variables,
                          4,
                          Constants['user_info']?.organization_user
                            ?.organization?.industry_id
                        )}{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 网页 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 6
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_website')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {
                          Constants['user_info']?.organization_user
                            ?.organization?.website
                        }{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 资产规模 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 5
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_aum')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {getScalesById(
                          Variables,
                          Constants['user_info']?.organization_user
                            ?.organization?.management_scale_id
                        )}{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 基金类型 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 5
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_fund_type')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {arrayIdToString(
                          Variables,
                          11,
                          Constants['user_info']?.organization_user
                            ?.organization?.fund_type_ids,
                          ','
                        )}{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 基金介绍 */}
                <>
                  {!(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id === 5
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_fund_introduction')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {
                          Constants['user_info']?.organization_user
                            ?.organization?.description
                        }{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 公司介绍 */}
                <>
                  {[5, 6].includes(
                    Constants['user_info']?.organization_user?.organization
                      ?.organization_type_id
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 16, paddingRight: 16, paddingTop: 14 },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['12 Regular'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'mine_company_intro')}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['15 Regular'].style,
                            { paddingBottom: 8, paddingTop: 10 }
                          ),
                          dimensions.width
                        )}
                      >
                        {
                          Constants['user_info']?.organization_user
                            ?.organization?.description
                        }{' '}
                      </Text>
                      {/* 分隔 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.App['Custom Color 14'],
                            height: 1,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
              </View>
            )}
          </>
          {/* 身份信息 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom Color 14'],
                flexDirection: 'row',
                height: 40,
                justifyContent: 'space-between',
                paddingLeft: 16,
                paddingRight: 16,
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
                  {
                    color: palettes.Brand.itemTextNomal,
                    fontFamily: 'System',
                    fontWeight: '700',
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_identity_info')}
            </Text>
            {/* 编辑按钮 */}
            <>
              {state === 'passed' &&
              Constants['user_info']?.organization_user?.dismissed_at ===
                0 ? null : (
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      if (edit_state) {
                        console.log('save');
                      } else {
                      }

                      const result = !edit_state;
                      setEdit_state(result);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectable={false}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        color: palettes.Brand.appStyle_primary,
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      }
                    ),
                    dimensions.width
                  )}
                  title={`${
                    edit_state
                      ? t(Variables, 'common_save')
                      : t(Variables, 'common_edit')
                  }`}
                />
              )}
            </>
          </View>
          {/* 名片 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 16 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_business_card')}
            </Text>
            {/* 名片 */}
            <View>
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const img_data = await openImagePickerUtil({
                        mediaTypes: 'All',
                        allowsEditing: false,
                        quality: 0.6,
                        allowsMultipleSelection: false,
                        selectionLimit: 0,
                        outputBase64: true,
                      });

                      const img_url = await uploadImage2(
                        img_data,
                        'business_card'
                      );
                      console.log(img_url);

                      const currentValueSetVariable3 = organizationInfo;
                      if (typeof currentValueSetVariable3 !== 'object') {
                        console.warn('Cannot set path on non-object value');
                        return;
                      }
                      const updatedValueSetVariable3 = {
                        ...currentValueSetVariable3,
                      };
                      updatedValueSetVariable3.business_card = img_url;
                      setOrganizationInfo(updatedValueSetVariable3);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                disabled={!edit_state}
              >
                <>
                  {organizationInfo?.business_card ? null : (
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                      source={imageSource(Images['icbusinessdefault'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          {
                            height: 200,
                            marginBottom: 8,
                            marginTop: 8,
                            width: null,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                  )}
                </>
                {/* Image 2 */}
                <>
                  {!organizationInfo?.business_card ? null : (
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                      resizeMode={'contain'}
                      source={imageSource(`${organizationInfo?.business_card}`)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          {
                            height: 200,
                            marginBottom: 8,
                            marginTop: 8,
                            width: null,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </Touchable>
              <>
                {!!edit_state ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        bottom: 8,
                        justifyContent: 'center',
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['12 Regular'].style,
                          { color: palettes.App['Custom #ffffff'] }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'setting_change_business_card')}
                    </Text>
                  </View>
                )}
              </>
            </View>
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* 姓名录入框 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 16 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_name')}
            </Text>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  const currentValueSetVariable0 = organizationInfo;
                  if (typeof currentValueSetVariable0 !== 'object') {
                    console.warn('Cannot set path on non-object value');
                    return;
                  }
                  const updatedValueSetVariable0 = {
                    ...currentValueSetVariable0,
                  };
                  updatedValueSetVariable0.real_name = newTextInputValue;
                  setOrganizationInfo(updatedValueSetVariable0);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              defaultValue={organizationInfo?.real_name}
              disabled={!edit_state}
              placeholder={t(Variables, 'common_unfilled').toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            />
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* 职位 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_title')}
            </Text>

            <Touchable
              onPress={() => {
                try {
                  setShow_position_modal(true);
                } catch (err) {
                  console.error(err);
                }
              }}
              disabled={!edit_state}
            >
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['12 Regular'].style,
                    {
                      color: palettes.App['Custom Color 68'],
                      fontSize: 15,
                      paddingBottom: 8,
                      paddingTop: 10,
                    }
                  ),
                  dimensions.width
                )}
              >
                {organizationInfo?.position_name
                  ? organizationInfo?.position_name
                  : t(Variables, 'common_unfilled')}
              </Text>
            </Touchable>
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* 工作邮箱 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'common_work_email')}
            </Text>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  const currentValueSetVariable0 = organizationInfo;
                  if (typeof currentValueSetVariable0 !== 'object') {
                    console.warn('Cannot set path on non-object value');
                    return;
                  }
                  const updatedValueSetVariable0 = {
                    ...currentValueSetVariable0,
                  };
                  updatedValueSetVariable0.email = newTextInputValue;
                  setOrganizationInfo(updatedValueSetVariable0);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              disabled={!edit_state}
              keyboardType={'email-address'}
              placeholder={t(Variables, 'common_unfilled').toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
              value={organizationInfo?.email}
            />
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* 验证码 */}
          <>
            {!(
              Constants['user_info']?.organization_user?.email !==
              organizationInfo?.email
            ) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['12 Regular'].style,
                      { color: palettes.App['Custom Color 4'] }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_verification_code')}
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', justifyContent: 'space-between' },
                    dimensions.width
                  )}
                >
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setEmail_code(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    placeholder={t(Variables, 'common_unfilled').toString()}
                    placeholderTextColor={palettes.App['Custom Color 68']}
                    style={StyleSheet.applyWidth(
                      {
                        flex: 1,
                        fontFamily: 'System',
                        fontSize: 15,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 17,
                        paddingBottom: 8,
                        paddingTop: 10,
                      },
                      dimensions.width
                    )}
                    value={email_code}
                  />
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const result = (
                            await AceCampTestApi.requestCodePOST(Constants, {
                              code_scope: 'update',
                              email: organizationInfo?.email,
                            })
                          )?.json;
                          setV_code_send(true);

                          timerRef.current?.start();

                          setIs_count_start(true);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    disabled={is_count_start}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        color: palettes.Brand.appStyle_primary,
                        fontFamily: 'System',
                        fontSize: 13,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 15,
                        paddingRight: 0,
                      },
                      dimensions.width
                    )}
                    title={`${
                      is_count_start ? count_down + 's' : send_code_btn_text
                    }`}
                  />
                </View>
                {/* Text 2 */}
                <>
                  {!v_code_send ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          letterSpacing: 0.2,
                          lineHeight: 14,
                          marginTop: 4,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'register_vc_send') +
                        organizationInfo?.email +
                        t(Variables, 'register_vc_min')}
                    </Text>
                  )}
                </>
                {/* 分隔 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color 14'],
                      height: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
            )}
          </>
          {/* 工作电话 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_work_phone')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              <Button
                accessible={true}
                onPress={() => {
                  try {
                    navigation.push('MineCountryCodeListScreen', {
                      id: organizationInfo?.country_code_id,
                      callback: (id, code) => onAreaCodeSelected(id, code),
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                disabled={!edit_state}
                icon={'EvilIcons/chevron-down'}
                iconPosition={'right'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: palettes.Brand.appStyle_primary,
                    fontFamily: 'System',
                    fontSize: 15,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 15,
                    paddingBottom: 4,
                    paddingLeft: 4,
                    paddingRight: 10,
                    paddingTop: 4,
                  },
                  dimensions.width
                )}
                title={`+${
                  organizationInfo?.country_code
                    ? organizationInfo?.country_code
                    : 86
                }`}
              />
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    const currentValueSetVariable0 = organizationInfo;
                    if (typeof currentValueSetVariable0 !== 'object') {
                      console.warn('Cannot set path on non-object value');
                      return;
                    }
                    const updatedValueSetVariable0 = {
                      ...currentValueSetVariable0,
                    };
                    updatedValueSetVariable0.tel = newTextInputValue;
                    setOrganizationInfo(updatedValueSetVariable0);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                defaultValue={organizationInfo?.tel}
                disabled={t(Variables, edit_state)}
                keyboardType={'number-pad'}
                placeholder={t(Variables, 'common_unfilled').toString()}
                placeholderTextColor={palettes.App['Custom Color 68']}
                style={StyleSheet.applyWidth(
                  {
                    flex: 1,
                    fontFamily: 'System',
                    fontSize: 15,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 17,
                    paddingBottom: 8,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              />
            </View>
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* 办公地址 */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  { color: palettes.App['Custom Color 4'] }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_work_address')}
            </Text>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  const currentValueSetVariable0 = organizationInfo;
                  if (typeof currentValueSetVariable0 !== 'object') {
                    console.warn('Cannot set path on non-object value');
                    return;
                  }
                  const updatedValueSetVariable0 = {
                    ...currentValueSetVariable0,
                  };
                  updatedValueSetVariable0.address = newTextInputValue;
                  setOrganizationInfo(updatedValueSetVariable0);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              disabled={!edit_state}
              placeholder={t(Variables, 'common_unfilled').toString()}
              placeholderTextColor={palettes.App['Custom Color 68']}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 15,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 17,
                  paddingBottom: 8,
                  paddingTop: 10,
                },
                dimensions.width
              )}
              value={organizationInfo?.address}
            />
            {/* 分隔 */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: palettes.App['Custom Color 14'], height: 1 },
                dimensions.width
              )}
            />
          </View>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                initLabelPickerSetting(
                  Variables,
                  setGlobalVariableValue,
                  'industries'
                );
              } catch (err) {
                console.error(err);
              }
            }}
            disabled={!edit_state}
          >
            {/* 我研究的行业 */}
            <>
              {[5, 6, 7].includes(
                Constants['user_info']?.organization_user?.organization
                  ?.organization_type_id
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 4'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_research_industry')}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.App['Custom Color 68'],
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value:
                                organizationInfo?.industry_ids?.length > 0
                                  ? palettes.App.appStyle_black
                                  : palettes.App['Custom Color 68'],
                            },
                          ],
                          fontSize: 15,
                          paddingBottom: 8,
                          paddingTop: 18,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {organizationInfo?.industry_ids?.length > 0
                      ? arrayIdToString(
                          Variables,
                          4,
                          organizationInfo?.industry_ids,
                          '、'
                        )
                      : t(Variables, 'common_unfilled')}
                  </Text>
                  {/* 分隔 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom Color 14'],
                        height: 1,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              )}
            </>
          </Touchable>

          <Touchable
            onPress={() => {
              try {
                setCorporation_list_shown(true);
                setRelation_stock_tmp(relation_stock);
                setRelation_stock_id_tmp(relation_stock_id);
              } catch (err) {
                console.error(err);
              }
            }}
            disabled={!edit_state}
          >
            {/* 我研究的公司 */}
            <>
              {![3, 1, 2, 8].includes(
                Constants['user_info']?.organization_user?.organization
                  ?.organization_type_id
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 4'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_research_company')}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.App['Custom Color 68'],
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value:
                                relation_stock?.length > 0
                                  ? palettes.App.appStyle_black
                                  : palettes.App['Custom Color 68'],
                            },
                          ],
                          fontSize: 15,
                          paddingBottom: 8,
                          paddingTop: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {relation_stock?.length > 0
                      ? arrayToString(relation_stock)
                      : t(Variables, 'common_unfilled')}
                  </Text>
                  {/* 分隔 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom Color 14'],
                        height: 1,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              )}
            </>
          </Touchable>
          {/* 自我介绍 */}
          <>
            {!(
              Constants['user_info']?.organization_user?.organization
                ?.organization_type_id === 3
            ) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['12 Regular'].style,
                      { color: palettes.App['Custom Color 4'] }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_work_introduce')}
                </Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newTextInputValue => {
                    try {
                      const currentValueSetVariable0 = organizationInfo;
                      if (typeof currentValueSetVariable0 !== 'object') {
                        console.warn('Cannot set path on non-object value');
                        return;
                      }
                      const updatedValueSetVariable0 = {
                        ...currentValueSetVariable0,
                      };
                      updatedValueSetVariable0.introduction = newTextInputValue;
                      setOrganizationInfo(updatedValueSetVariable0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  disabled={!edit_state}
                  placeholder={t(Variables, 'common_unfilled').toString()}
                  placeholderTextColor={palettes.App['Custom Color 68']}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: 'System',
                      fontSize: 15,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 17,
                      paddingBottom: 8,
                      paddingTop: 10,
                    },
                    dimensions.width
                  )}
                  value={organizationInfo?.introduction}
                />
                {/* 分隔 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color 14'],
                      height: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
            )}
          </>
          {/* 工作经历 */}
          <>
            {!(Constants['user_info']?.user_resumes?.length > 0) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 16, paddingRight: 16, paddingTop: 20 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['12 Regular'].style,
                      { color: palettes.App['Custom Color 4'] }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_work_experience')}
                </Text>
                <SimpleStyleFlatList
                  decelerationRate={'normal'}
                  horizontal={false}
                  inverted={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                />
                {/* 分隔 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color 14'],
                      height: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
            )}
          </>
          <>
            {!(Constants['user_info']?.user_resumes?.length > 0) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: palettes.Brand.appStyle_primary,
                    borderWidth: 1,
                    height: 40,
                    justifyContent: 'center',
                    margin: 16,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['12 Regular'].style,
                      { color: palettes.Brand.appStyle_primary }
                    ),
                    dimensions.width
                  )}
                >
                  {'+工作经历'}
                </Text>
              </View>
            )}
          </>
        </View>
      </SimpleStyleScrollView>
      {/* View 2 */}
      <>
        {!show_position_modal ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App.appStyle_black,
                height: '100%',
                opacity: 0.34,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
        )}
      </>
      {/* 职位选择 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={show_position_modal}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'flex-end',
              height: dimensions.height,
              width: dimensions.width,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setShow_position_modal(false);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ height: '35%' }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                { height: '100%', opacity: 0.4, width: '100%' },
                dimensions.width
              )}
            />
          </Touchable>

          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom #ffffff'],
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: '70%',
                marginTop: -10,
                paddingTop: 10,
              },
              dimensions.width
            )}
          >
            <PositionListBlock
              on_selected={(id, name) => {
                try {
                  onPositionSelected(id, name);
                  setShow_position_modal(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              curent_id={organizationInfo?.position_id}
            />
          </View>
        </View>
      </Modal>
      <Timer
        format={'mm:ss'}
        onTimerChange={newTimerValue => {
          try {
            setCount_down(newTimerValue / 1000);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setIs_count_start(false);
            setSend_code_btn_text(t(Variables, 'common_Resend'));

            timerRef.current?.reset(120000);
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        {...GlobalStyles.TimerStyles(theme)['Timer'].props}
        countDirection={'down'}
        initialTime={120000}
        ref={timerRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TimerStyles(theme)['Timer'].style,
            theme.typography.headline4,
            { fontSize: 0 }
          ),
          dimensions.width
        )}
        timerEndTime={115000}
      />
      {/* 目标个股选择 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={corporation_list_shown}
      >
        <Touchable
          onPress={() => {
            try {
              setCorporation_list_shown(false);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { height: scroll_picker_modal_style?.coverHeight, width: '100%' },
              dimensions.width
            )}
          />
        </Touchable>

        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={true}
          keyboardVerticalOffset={0}
          androidBehavior={'height'}
          iosBehavior={'padding'}
          style={StyleSheet.applyWidth(
            {
              height: scroll_picker_modal_style?.height,
              paddingBottom: safeAreaInsets.bottom + 20,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'auto',
                backgroundColor: palettes.App['Custom #ffffff'],
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingBottom: safeAreaInsets.bottom + 20,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: palettes.Gray[200],
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                },
                dimensions.width
              )}
            >
              {/* Cancel Btn */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setCorporation_list_shown(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Cancel Btn'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Cancel Btn'].style,
                    { color: palettes.App.appStyle_greyscale_500 }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, 'common_cancel')}`}
              />
              <View>
                {/* Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body S Medium'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_research_company')}
                </Text>
              </View>
              {/* Confirm Btn */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setCorporation_list_shown(false);
                    setRelation_stock(relation_stock_tmp);
                    setRelation_stock_id(relation_stock_id_tmp);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Confirm Btn'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.ButtonStyles(theme)['Confirm Btn'].style,
                  dimensions.width
                )}
                title={`${t(Variables, 'common_yes')}`}
              />
            </View>

            <View>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Gray[200],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: focus_search_input
                          ? palettes.Brand.appStyle_primary
                          : undefined,
                      },
                    ],
                    borderRadius: 4,
                    borderWidth: 1,
                    flexDirection: 'row',
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 10,
                    paddingBottom: 4,
                    paddingRight: 8,
                    paddingTop: 4,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={palettes.App['Custom Color 4']}
                  name={'Ionicons/search-outline'}
                  size={16}
                  style={StyleSheet.applyWidth(
                    { marginLeft: 8, marginRight: 8 },
                    dimensions.width
                  )}
                />
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus_search_input(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={newTextInputValue => {
                    try {
                      setTextInputValue(newTextInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setTextInputValue(undefined);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    try {
                      setKeyword(textInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                  placeholder={t(
                    Variables,
                    'tab_create_point_enter_name_ticker'
                  ).toString()}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                      {
                        borderColor: null,
                        fontSize: 12,
                        lineHeight: 16,
                        paddingBottom: null,
                        paddingLeft: null,
                        paddingTop: null,
                        width: null,
                      }
                    ),
                    dimensions.width
                  )}
                  value={textInputValue}
                />
              </View>

              <AceCampTestApi.FetchCorporationsListGET
                active_state={'active'}
                handlers={{
                  onData: fetchData => {
                    try {
                      setCorporations(fetchData?.data);
                      setTotal_corporations(fetchData?.meta?.total);
                      setPage(2);
                      setIs_corp_loaded(true);
                    } catch (err) {
                      console.error(err);
                    }
                  },
                }}
                keyword={keyword}
                page={1}
                per_page={50}
              >
                {({ loading, error, data, refetchCorporationsList }) => {
                  const fetchData = data?.json;
                  if (loading) {
                    return (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'flex-start',
                            paddingTop: 100,
                            width: '100%',
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
                          source={imageSource(Images['acecampgif95f7bf80'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              { height: 40, width: 40 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    );
                  }

                  if (error || data?.status < 200 || data?.status >= 300) {
                    return <ActivityIndicator />;
                  }

                  return (
                    <SimpleStyleFlatList
                      data={corporations}
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
                      listKey={
                        '目标个股选择->Keyboard Avoiding View->View 2->View->Fetch->List'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReached={() => {
                        const handler = async () => {
                          try {
                            /* hidden 'Conditional Stop' action */
                            if (!is_corp_loaded) {
                              return;
                            }
                            if (corporations?.length >= total_corporations) {
                              return;
                            }
                            if (is_loading) {
                              return;
                            }
                            setIs_loading(true);
                            const result = (
                              await AceCampTestApi.corporationsListGET(
                                Constants,
                                {
                                  active_state: 'active',
                                  keyword: keyword,
                                  page: page,
                                  per_page: 10,
                                }
                              )
                            )?.json;
                            if (result?.code === 200) {
                              setCorporations(
                                corporations.concat(result?.data)
                              );
                              setPage(page + 1);
                            } else {
                            }

                            setIs_loading(false);
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
                        return (
                          <Touchable
                            onPress={() => {
                              try {
                                mutipleCompanySelected(
                                  listData?.id,
                                  listData?.name
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  borderBottomWidth: 1,
                                  borderColor: palettes.Gray[200],
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginLeft: 16,
                                  marginRight: 16,
                                  paddingBottom: 10,
                                  paddingTop: 10,
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
                                    fontSize: 14,
                                    fontWeight: '600',
                                    letterSpacing: 0.3,
                                    lineHeight: 20,
                                  },
                                  dimensions.width
                                )}
                              >
                                {listData?.name}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.Brand.itemTextNomal,
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '400',
                                      letterSpacing: 0.3,
                                      lineHeight: 20,
                                      marginLeft: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'   '}
                                  {listData?.ticker}
                                </Text>
                              </Text>
                              <>
                                {!relation_stock_id_tmp.includes(
                                  (listData?.id).toString()
                                ) ? null : (
                                  <Icon
                                    color={palettes.Brand.appStyle_primary}
                                    name={'Ionicons/checkmark-circle'}
                                    size={16}
                                  />
                                )}
                              </>
                            </View>
                          </Touchable>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      snapToAlignment={'start'}
                      style={StyleSheet.applyWidth(
                        { marginTop: 10 },
                        dimensions.width
                      )}
                    />
                  );
                }}
              </AceCampTestApi.FetchCorporationsListGET>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* 背景图层 */}
      <>
        {!(
          Constants['label_picker_modal_shown'] ||
          Constants['scroll_picker_modal_shown'] ||
          corporation_list_shown ||
          draft_list_modal_shown
        ) ? null : (
          <Utils.CustomCodeErrorBoundary>
            <CoverView.AnimatedView
              isVisible={
                Constants['label_picker_modal_shown'] ||
                Constants['scroll_picker_modal_shown'] ||
                corporation_list_shown ||
                draft_list_modal_shown
              }
            />
          </Utils.CustomCodeErrorBoundary>
        )}
      </>
      {/* Label Picker Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        {...GlobalStyles.ModalStyles(theme)['Modal'].props}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        style={StyleSheet.applyWidth(
          GlobalStyles.ModalStyles(theme)['Modal'].style,
          dimensions.width
        )}
        transparent={true}
        visible={Constants['label_picker_modal_shown']}
      >
        <Touchable
          onPress={() => {
            try {
              LabelPickerCancelBtnPress(setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '40%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 4'],
                height: '100%',
                opacity: 0,
                width: '100%',
              },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: 'column',
              height: '60%',
              paddingBottom: safeAreaInsets.bottom + 60,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                  { alignSelf: 'auto', flex: null }
                ),
                dimensions.width
              )}
            >
              {bottomSheetTitle}
            </Text>
            {/* Count Info */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                { alignSelf: 'auto', flex: null },
                dimensions.width
              )}
            >
              {Constants['label_picker_current_selected_size']}
              {' / '}
              {
                getDicDataByName(Variables, Constants['label_picker_dic_name'])
                  ?.length
              }
            </Text>
          </View>
          {/* Select All Checkbox view */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 16,
                marginTop: 12,
              },
              dimensions.width
            )}
          >
            {/* SelectAll */}
            <Checkbox
              onPress={newSelectAllValue => {
                try {
                  const result = LabelPickerSelectAllPress(
                    Variables,
                    setGlobalVariableValue,
                    newSelectAllValue
                  );
                  setGlobalVariableValue({
                    key: 'label_picker_checkedall',
                    value: newSelectAllValue,
                  });
                  setGlobalVariableValue({
                    key: 'label_picker_current_selected_size',
                    value: result,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              size={18}
              status={Constants['label_picker_checkedall']}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text 2111'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text 2111'].style,
                  { fontSize: 12 }
                ),
                dimensions.width
              )}
            >
              {'全选'}
            </Text>
          </View>
          <SimpleStyleFlatList
            data={getDicDataByName(
              Variables,
              Constants['label_picker_dic_name']
            )}
            decelerationRate={'normal'}
            horizontal={false}
            inverted={false}
            keyExtractor={(listData, index) => listData?.id}
            keyboardShouldPersistTaps={'never'}
            listKey={'Label Picker Modal->Popup view->List'}
            nestedScrollEnabled={false}
            onEndReachedThreshold={0.5}
            pagingEnabled={false}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <Touchable
                  onPress={() => {
                    try {
                      const result = LabelPickerItemClick(
                        Variables,
                        setGlobalVariableValue,
                        listData?.id
                      );
                      setGlobalVariableValue({
                        key: 'label_picker_current_selected_size',
                        value: result,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* itemView */}
                  <View
                    {...GlobalStyles.ViewStyles(theme)['PickupItem'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ViewStyles(theme)['PickupItem'].style,
                        {
                          backgroundColor: LabelPickerChangeBgStyle(
                            Variables,
                            listData?.id
                          ),
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      {...GlobalStyles.TextStyles(theme)['Text 2111'].props}
                      adjustsFontSizeToFit={false}
                      allowFontScaling={false}
                      numberOfLines={1}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 2111'].style,
                          {
                            alignSelf: 'flex-start',
                            color: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: palettes.Brand.itemTextNomal,
                              },
                              {
                                minWidth: Breakpoints.Mobile,
                                value: LabelPickerChangeTextStyle(
                                  Variables,
                                  listData?.id
                                ),
                              },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                      textBreakStrategy={'highQuality'}
                    >
                      {listData?.sc_name}
                    </Text>
                  </View>
                </Touchable>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            snapToAlignment={'start'}
            extraData={Constants['label_picker_current_selected_size']}
            numColumns={1}
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', flexWrap: 'wrap' },
              dimensions.width
            )}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              bottom: [
                { minWidth: Breakpoints.Mobile, value: 0 },
                { minWidth: Breakpoints.Mobile, value: safeAreaInsets.bottom },
              ],
              flexWrap: 'wrap',
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Button
            accessible={true}
            onLongPress={() => {
              const handler = async () => {
                try {
                  (
                    await aceCampTestDeleteOpinionDELETE.mutateAsync({
                      id: 70548038,
                    })
                  )?.json;
                  setConfirm_modal_visiable(false);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            onPress={() => {
              try {
                LabelPickerConfirmBtnPress(Variables);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            icon={'MaterialCommunityIcons/check-circle'}
            iconPosition={'left'}
            iconSize={14}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                { width: '90%' }
              ),
              dimensions.width
            )}
            title={'保 存'}
          />
        </View>
      </Modal>
      {/* 声明内容提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={tip_modal_title}
          message={tip_modal_message}
          confirmBtn={tip_modal_confirm}
          cancelBtn={modal_cancel}
          onCancel={() => {
            setTip_modal_visiable(false);
          }}
          onConfirm={tip_modal_callback}
          visible={tip_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(MineIdentityInfoScreen2);
