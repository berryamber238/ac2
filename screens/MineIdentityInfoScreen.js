import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  Icon,
  ScreenContainer,
  SimpleStyleFlatList,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Modal, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CoverView from '../custom-files/CoverView';
import * as LabelPicker from '../custom-files/LabelPicker';
import * as ScrollPicker from '../custom-files/ScrollPicker';
import * as gf from '../custom-files/gf';
import LabelPickerCancelBtnPress from '../global-functions/LabelPickerCancelBtnPress';
import LabelPickerChangeBgStyle from '../global-functions/LabelPickerChangeBgStyle';
import LabelPickerChangeTextStyle from '../global-functions/LabelPickerChangeTextStyle';
import LabelPickerConfirmBtnPress from '../global-functions/LabelPickerConfirmBtnPress';
import LabelPickerItemClick from '../global-functions/LabelPickerItemClick';
import LabelPickerSelectAllPress from '../global-functions/LabelPickerSelectAllPress';
import ScrollPickerCancelBtnPress from '../global-functions/ScrollPickerCancelBtnPress';
import ScrollPickerConfirmBtnPress from '../global-functions/ScrollPickerConfirmBtnPress';
import arrayIdToString from '../global-functions/arrayIdToString';
import getDicDataByName from '../global-functions/getDicDataByName';
import getNameById from '../global-functions/getNameById';
import isCanShowCommunity from '../global-functions/isCanShowCommunity';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { data: null };

const MineIdentityInfoScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [bottomSheetTitle, setBottomSheetTitle] =
    React.useState('我关注的行业');
  const [industry_name, setIndustry_name] = React.useState('');
  const [industry_status, setIndustry_status] = React.useState('');
  const [industry_status_style, setIndustry_status_style] = React.useState('');
  const [scroll_picker_modal_style, setScroll_picker_modal_style] =
    React.useState({ height: '30%', coverHeight: '70%' });
  const [test, setTest] = React.useState({});
  const initIdentityInfo = (navigation, Variables, setGlobalVariableValue) => {
    const data = Variables.user_info;
    if (
      data.organization_user != null &&
      data.organization_user.organization != null
    ) {
      if (data.organization_user.state === 'rejected') {
        // 被拒绝/显示原因/重新认证
        setIndustry_status(gf.t(Variables, 'mine_audit_rejection'));
        setIndustry_status_style('#ff6e6e');
        setIndustry_name(
          '（' +
            gf.getNameById(
              Variables,
              9,
              data.organization_user.organization.organization_type_id
            ) +
            '）'
        );
      } else if (data.organization_user.State === 'pending') {
        setIndustry_status(gf.t(Variables, 'mine_under_review'));
        setIndustry_status_style('#ec932a');
        setIndustry_name(
          '（' +
            gf.getNameById(
              Variables,
              9,
              data.organization_user.organization.organization_type_id
            ) +
            '）'
        );
      } else if (data.organization_user.state === 'passed') {
        if (
          data.organization_user.dismissed_at == null ||
          data.organization_user.dismissed_at === 0
        ) {
          setIndustry_status('');
          setIndustry_name(
            gf.getNameById(
              Variables,
              9,
              data.organization_user.organization.organization_type_id
            )
          );
        } else {
          setIndustry_name('');
          setIndustry_status(gf.t(Variables, 'mine_go_auth'));
          setIndustry_status_style('#51CFF7');
        }
      } else {
        setIndustry_name('');
        setIndustry_status(gf.t(Variables, 'mine_go_auth'));
        setIndustry_status_style('#51CFF7');
      }
    } else {
      setIndustry_name('');
      setIndustry_status(gf.t(Variables, 'mine_go_auth'));
      setIndustry_status_style('#51CFF7');
    }
  };

  const initLabelPickerSetting = (
    Variables,
    setGlobalVariableValue,
    dataSourceName
  ) => {
    const pickupDic = Variables.ace_dic.data[dataSourceName];
    let selectedIds = [];

    switch (dataSourceName) {
      case 'industries':
        selectedIds.push(...Variables.user_info.organization_user.industry_ids);
        break;
      case 'ticker_regions':
        selectedIds.push(...Variables.user_info.organization_user.region_ids);
        break;
    }

    setGlobalVariableValue({
      key: 'label_picker_current_selected_values',
      value: selectedIds,
    });
    setGlobalVariableValue({
      key: 'label_picker_current_selected_size',
      value: selectedIds.length,
    });
    setGlobalVariableValue({
      key: 'label_picker_dic_name',
      value: dataSourceName,
    });

    setGlobalVariableValue({ key: 'label_picker_modal_shown', value: true });
    setGlobalVariableValue({
      key: 'label_picker_checkedall',
      value: selectedIds.length === pickupDic.length ? true : false,
    });
    //设定滚动选择器Modal的确认回调

    LabelPicker.setConfirmCallback(Variables => {
      const selectedIds = Variables['label_picker_current_selected_values'];

      switch (dataSourceName) {
        case 'industries':
          Variables.user_info.organization_user.industry_ids = selectedIds;
          // setFd_industryIds(selectedIds);
          break;
        case 'ticker_regions':
          Variables.user_info.organization_user.region_ids = selectedIds;
          break;
      }
      CoverView.hide();
      LabelPicker.callCancel(setGlobalVariableValue);
    });
  };

  const initScrollPickerSetting = (Variables, setGlobalVariableValue) => {
    const data = {
      data: [
        { id: 1, name: gf.t(Variables, 'tab_point_nick_name') },
        { id: 2, name: gf.t(Variables, 'tab_point_real_name') },
      ],
    };
    setGlobalVariableValue({
      key: 'scroll_picker_current_selected_index',
      value: Variables.user_info.identity === 'unreal' ? 0 : 1,
    });
    setGlobalVariableValue({
      key: 'scroll_picker_modal_title',
      value: gf.t(Variables, 'tab_point_set_first'),
    });
    setGlobalVariableValue({ key: 'scroll_picker_modal_data', value: data });
    setGlobalVariableValue({ key: 'scroll_picker_modal_shown', value: true });

    //设定滚动选择器Modal的确认回调
    ScrollPicker.setConfirmCallback(v => {
      const selectIndex = v['scroll_picker_current_selected_index'];
      console.log(selectIndex);
      if (selectIndex !== -1) {
        switch (selectIndex) {
          case 0:
            Variables.user_info.identity = 'unreal';
            break;
          case 1:
            Variables.user_info.identity = 'real';
            break;
        }
      }
      ScrollPicker.callCancel(setGlobalVariableValue);
      // setGlobalVariableValue({key:"scroll_picker_current_selected_index",value:-1})
      // setGlobalVariableValue({key:"scroll_picker_modal_title",value:""})
      // setGlobalVariableValue({key:"scroll_picker_modal_data",value:{}})
      // setGlobalVariableValue({key:"scroll_picker_modal_shown",value:false})
    });
  };

  const initShowCompanySetting = (Variables, setGlobalVariableValue) => {
    const data = {
      data: [
        { id: 1, name: gf.t(Variables, 'tab_point_is_display') },
        { id: 2, name: gf.t(Variables, 'tab_point_is_no_display') },
      ],
    };
    setGlobalVariableValue({
      key: 'scroll_picker_current_selected_index',
      value: Variables.user_info.organization_identity === 'hide' ? 1 : 0,
    });
    setGlobalVariableValue({
      key: 'scroll_picker_modal_title',
      value: gf.t(Variables, 'tab_point_show_company'),
    });
    setGlobalVariableValue({ key: 'scroll_picker_modal_data', value: data });
    setGlobalVariableValue({ key: 'scroll_picker_modal_shown', value: true });

    //设定滚动选择器Modal的确认回调
    ScrollPicker.setConfirmCallback(Variables => {
      const selectIndex = Variables['scroll_picker_current_selected_index'];
      if (selectIndex !== -1) {
        switch (selectIndex) {
          case 0:
            Variables.user_info.organization_identity = 'display';
            break;
          case 1:
            Variables.user_info.organization_identity = 'hide';
            break;
        }
      }
      ScrollPicker.callCancel(setGlobalVariableValue);
      // setGlobalVariableValue({key:"scroll_picker_current_selected_index",value:-1})
      // setGlobalVariableValue({key:"scroll_picker_modal_title",value:""})
      // setGlobalVariableValue({key:"scroll_picker_modal_data",value:{}})
      // setGlobalVariableValue({key:"scroll_picker_modal_shown",value:false})
    });
  };
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
    >
      {/* Main Content */}
      <View
        onLayout={event => {
          try {
            initIdentityInfo(navigation, Variables, setGlobalVariableValue);
            setGlobalVariableValue({
              key: 'user_info',
              value: Constants['user_info_refresh'],
            });
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          { flex: 1, paddingTop: safeAreaInsets.top },
          dimensions.width
        )}
      >
        {/* Page Top */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Page Top 8'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['Page Top 8'].style,
              { marginBottom: 24, paddingLeft: 24, paddingRight: 24 }
            ),
            dimensions.width
          )}
        >
          {/* Back Icon View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 28,
                justifyContent: 'center',
                marginRight: 16,
                width: 28,
              },
              dimensions.width
            )}
          >
            {/* Back Button Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Back Icon */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['ArrowLeft'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>
          </View>
          {/* Screen Title */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H4'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H4'].style, {
                flex: 1,
                marginRight: 16,
              }),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_user_info')}
          </Text>
          {/* More Icon View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', height: 22, justifyContent: 'center' },
              dimensions.width
            )}
          >
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  if (Constants['user_info_edit_status']) {
                    setGlobalVariableValue({
                      key: 'user_info_edit_status',
                      value: false,
                    });
                    setGlobalVariableValue({
                      key: 'user_info_edit_text',
                      value: t(Variables, 'common_edit'),
                    });
                  } else {
                    setGlobalVariableValue({
                      key: 'user_info_edit_status',
                      value: true,
                    });
                    setGlobalVariableValue({
                      key: 'user_info_edit_text',
                      value: t(Variables, 'common_save'),
                    });
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              icon={
                Constants['user_info_edit_status']
                  ? 'AntDesign/save'
                  : 'Feather/edit'
              }
              iconSize={14}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    borderRadius: 6,
                    fontSize: 14,
                    height: 20,
                    paddingBottom: 0,
                    paddingTop: 0,
                    width: 80,
                  }
                ),
                dimensions.width
              )}
              title={`${Constants['user_info_edit_text']}`}
            />
          </View>
        </View>
        </* Fetch component: no endpoint configured */>
          {(fetchData => (
            <>
              {/* Info View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    height: '100%',
                    paddingLeft: 16,
                    paddingRight: 16,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* 头像区域 */}
                <View>
                  {/* Avater Title */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Form Label'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_head_portrait')}
                  </Text>
                  {/* Profile Picture View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingBottom: 8, paddingTop: 10 },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await openImagePickerUtil({
                              mediaTypes: 'Images',
                              allowsEditing: false,
                              quality: 0.2,
                              allowsMultipleSelection: false,
                              selectionLimit: 0,
                              outputBase64: true,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(Images['icheadercompany'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 38, width: 38 }
                          ),
                          dimensions.width
                        )}
                      />
                    </Touchable>
                  </View>
                  {/* Div-1 */}
                  <Divider
                    color={theme.colors.border.base}
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                </View>
                {/* 昵称区域 */}
                <View>
                  {/* Nickname Title */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Form Label'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_nick_name')}
                  </Text>
                  <TextInput
                    autoCapitalize={'none'}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setBottomSheetTitle(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    allowFontScaling={false}
                    autoCorrect={false}
                    disabled={!Constants['user_info_edit_status']}
                    editable={Constants['user_info_edit_status']}
                    placeholder={t(Variables, 'common_unfilled').toString()}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        { flex: null, paddingBottom: null }
                      ),
                      dimensions.width
                    )}
                    value={bottomSheetTitle}
                    webShowOutline={false}
                  />
                  {/* Div-2 */}
                  <Divider
                    color={theme.colors.border.base}
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                </View>
                {/* 关注行业区域 */}
                <View>
                  {/* Industry of Focus Title */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Form Label'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_follow_industry')}
                  </Text>
                  {/* Touchable For Industry */}
                  <Touchable
                    onPress={() => {
                      try {
                        if (!Constants['user_info_edit_status']) {
                          return;
                        }
                        initLabelPickerSetting(
                          Variables,
                          setGlobalVariableValue,
                          'industries'
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabledOpacity={0}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 4,
                          marginTop: 14,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Industry Of Focus2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['16_Title'].props}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['16_Title'].style,
                            {
                              color:
                                Constants['user_info']?.organization_user
                                  .industry_ids?.length > 0
                                  ? '#000000'
                                  : '#BDBDBD',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {Constants['user_info']?.organization_user.industry_ids
                          ?.length > 0
                          ? arrayIdToString(
                              Variables,
                              4,
                              Constants['user_info']?.organization_user
                                .industry_ids,
                              '、'
                            )
                          : t(Variables, 'common_unfilled')}
                      </Text>
                      <Icon
                        color={palettes.Brand.appStyle_greyscale_400}
                        name={'AntDesign/right'}
                        size={18}
                      />
                    </View>
                    {/* Div-3 */}
                    <Divider
                      color={theme.colors.border.base}
                      {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        dimensions.width
                      )}
                    />
                  </Touchable>
                </View>
                {/* 关注地区区域 */}
                <View>
                  {/* Regions of Focus Title */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Form Label'].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_follow_areas')}
                    {'\n'}
                  </Text>
                  {/* Touchable For Regions */}
                  <Touchable
                    onPress={() => {
                      try {
                        if (!Constants['user_info_edit_status']) {
                          return;
                        }
                        initLabelPickerSetting(
                          Variables,
                          setGlobalVariableValue,
                          'ticker_regions'
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabledOpacity={0}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 4,
                          marginTop: -4,
                        },
                        dimensions.width
                      )}
                    >
                      {/* 关注地区-内容 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['16_Title'].props}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['16_Title'].style,
                            {
                              color:
                                Constants['user_info']?.organization_user
                                  .region_ids?.length >= 0
                                  ? '#000000'
                                  : '#bdbdbd',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {Constants['user_info']?.organization_user.region_ids
                          ?.length > 0
                          ? arrayIdToString(
                              Variables,
                              10,
                              Constants['user_info']?.organization_user
                                .region_ids,
                              '、'
                            )
                          : t(Variables, 'common_unfilled')}
                      </Text>
                      <Icon
                        color={palettes.Brand.appStyle_greyscale_400}
                        name={'AntDesign/right'}
                        size={18}
                      />
                    </View>
                  </Touchable>
                  {/* Div-3 2 */}
                  <Divider
                    color={theme.colors.border.base}
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.DividerStyles(theme)['Divider'].style,
                      dimensions.width
                    )}
                  />
                </View>
                {/* 社区身份区域 */}
                <>
                  {!(
                    isCanShowCommunity(Variables) &&
                    [1, 2, 5, 6, 7].includes(
                      Constants['user_info']?.organization_user.organization
                        .organization_type_id
                    )
                  ) ? null : (
                    <View>
                      {/* Point Show Name Title */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Form Label'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'tab_point_show_name')}
                        {'\n'}
                      </Text>
                      {/* Touchable For Identity */}
                      <Touchable
                        onPress={() => {
                          try {
                            if (!Constants['user_info_edit_status']) {
                              return;
                            }
                            initScrollPickerSetting(
                              Variables,
                              setGlobalVariableValue
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Picker Section']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ViewStyles(theme)['Picker Section']
                              .style,
                            dimensions.width
                          )}
                        >
                          {/* 社区身份-标题 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['16_Title']
                              .props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['16_Title'].style,
                              dimensions.width
                            )}
                          >
                            {Constants['user_info']?.identity === 'unreal'
                              ? t(Variables, 'tab_point_nick_name')
                              : t(Variables, 'tab_point_real_name')}
                          </Text>
                          {/* 社区身份-内容 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['16_Title 2']
                              .props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['16_Title 2']
                                .style,
                              dimensions.width
                            )}
                          >
                            {'('}
                            {Constants['user_info']?.identity === 'unreal'
                              ? Constants['user_info']?.name
                              : Constants['user_info']?.organization_user
                                  .real_name}
                            {')'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Div-3 2 2 */}
                      <Divider
                        color={theme.colors.border.base}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.DividerStyles(theme)['Divider'].style,
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                {/* 是否显示公司信息区域 */}
                <>
                  {!isCanShowCommunity(Variables) ? null : (
                    <View>
                      {/* Show Company Title */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Form Label'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Form Label'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'tab_point_show_company')}
                        {'\n'}
                      </Text>
                      {/* Touchable For Show Company */}
                      <Touchable
                        onPress={() => {
                          try {
                            if (!Constants['user_info_edit_status']) {
                              return;
                            }
                            initShowCompanySetting(
                              Variables,
                              setGlobalVariableValue
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          {...GlobalStyles.ViewStyles(theme)['Picker Section']
                            .props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ViewStyles(theme)['Picker Section']
                              .style,
                            dimensions.width
                          )}
                        >
                          {/* 公司信息-标题 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['16_Title']
                              .props}
                            adjustsFontSizeToFit={false}
                            allowFontScaling={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['16_Title'].style,
                              dimensions.width
                            )}
                          >
                            {Constants['user_info']?.organization_identity ===
                            'hide'
                              ? t(Variables, 'tab_point_is_no_display')
                              : t(Variables, 'tab_point_is_display')}
                          </Text>
                          {/* 公司信息-内容 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['16_Title 2']
                              .props}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['16_Title 2']
                                .style,
                              dimensions.width
                            )}
                          >
                            {'('}
                            {Constants['user_info']?.organization_identity ===
                            'hide'
                              ? ''
                              : Constants['user_info']?.organization_user
                                  .organization.name}
                            {Constants['user_info']?.organization_identity ===
                            'hide'
                              ? arrayIdToString(
                                  Variables,
                                  11,
                                  Constants['user_info']?.organization_user
                                    .organization.fund_type_ids,
                                  '、'
                                )
                              : getNameById(
                                  Variables,
                                  3,
                                  Constants['user_info']?.organization_user
                                    .organization.management_scale_id
                                )}
                            {')'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Div-3 2 3 */}
                      <Divider
                        color={theme.colors.border.base}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.DividerStyles(theme)['Divider'].style,
                          dimensions.width
                        )}
                      />
                    </View>
                  )}
                </>
                <Touchable
                  onPress={() => {
                    try {
                      if (
                        Constants['user_info']?.organization_user !== null &&
                        Constants['user_info']?.organization_user
                          .organization !== null &&
                        (Constants['user_info']?.organization_user.state ===
                          'rejected' ||
                          Constants['user_info']?.organization_user.state ===
                            'pending' ||
                          (Constants['user_info']?.organization_user.state ===
                            'passed' &&
                            (Constants['user_info']?.organization_user
                              .dismissed_at === null ||
                              Constants['user_info']?.organization_user
                                .dismissed_at === 0)))
                      ) {
                        console.log('IdentityInfoActivity');
                      } else {
                        console.log('AuthActivity');
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* 身份认证 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignSelf: 'center',
                        backgroundColor: 'rgb(246, 247, 248)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 18,
                        padding: 18,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['18_Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['18_Title'].style,
                          {
                            color: palettes.App.appStyle_black,
                            letterSpacing: null,
                            lineHeight: null,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'mine_identity_auth')}
                    </Text>

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
                      {/* status */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text 2113'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text 2113'].style,
                            { color: industry_status_style }
                          ),
                          dimensions.width
                        )}
                      >
                        {industry_status}
                      </Text>
                      {/* name */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text 2113'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text 2113'].style,
                            { color: 'rgb(89, 106, 122)' }
                          ),
                          dimensions.width
                        )}
                      >
                        {industry_name}
                      </Text>
                      <Icon
                        color={palettes.Brand.appStyle_greyscale_400}
                        name={'AntDesign/right'}
                        size={18}
                      />
                    </View>
                  </View>
                </Touchable>
              </View>
            </>
          ))()}
        </>
      </View>
      {/* 背景图层 */}
      <>
        {!(
          Constants['label_picker_modal_shown'] ||
          Constants['scroll_picker_modal_shown']
        ) ? null : (
          <CoverView.AnimatedView
            isVisible={
              Constants['label_picker_modal_shown'] ||
              Constants['scroll_picker_modal_shown']
            }
          />
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
        visible={
          Constants['user_info_edit_status'] &&
          Constants['label_picker_modal_shown']
        }
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
      {/* Scroll Picker Modal */}
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
        visible={
          Constants['user_info_edit_status'] &&
          Constants['scroll_picker_modal_shown']
        }
      >
        <Touchable
          onPress={() => {
            try {
              ScrollPickerCancelBtnPress(setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            {
              height: [
                { minWidth: Breakpoints.Mobile, value: '40%' },
                {
                  minWidth: Breakpoints.Mobile,
                  value: scroll_picker_modal_style?.coverHeight,
                },
              ],
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, opacity: 0, width: '100%' },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_white,
              flexDirection: 'column',
              height: [
                { minWidth: Breakpoints.Mobile, value: '60%' },
                {
                  minWidth: Breakpoints.Mobile,
                  value: scroll_picker_modal_style?.height,
                },
              ],
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
                  ScrollPickerCancelBtnPress(setGlobalVariableValue);
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
                {Constants['scroll_picker_modal_title']}
              </Text>
            </View>
            {/* Confirm Btn */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  setGlobalVariableValue({
                    key: 'scroll_picker_modal_shown',
                    value: false,
                  });
                  ScrollPickerConfirmBtnPress(Variables);
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
          <Divider
            color={theme.colors.border.base}
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              dimensions.width
            )}
          />
          <Utils.CustomCodeErrorBoundary>
            <ScrollPicker.picker />
          </Utils.CustomCodeErrorBoundary>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(MineIdentityInfoScreen);
