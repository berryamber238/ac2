import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  ExpoImage,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import * as CoverView from '../custom-files/CoverView';
import * as HttpClient from '../custom-files/HttpClient';
import * as LabelPicker from '../custom-files/LabelPicker';
import * as RichEditor from '../custom-files/RichEditor';
import * as ScrollPicker from '../custom-files/ScrollPicker';
import * as ShakeAnimation from '../custom-files/ShakeAnimation';
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
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getDicDataByName from '../global-functions/getDicDataByName';
import isHttpLink from '../global-functions/isHttpLink';
import removeArrItemByIndex from '../global-functions/removeArrItemByIndex';
import replaceArrItemByIndex from '../global-functions/replaceArrItemByIndex';
import setUndefined from '../global-functions/setUndefined';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { id: 11 };

const CreateTopicScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [add_link_error, setAdd_link_error] = React.useState(
    'create_topic_link_required'
  );
  const [add_link_error_show, setAdd_link_error_show] = React.useState(false);
  const [add_link_modal_shown, setAdd_link_modal_shown] = React.useState(false);
  const [add_vote_error_show, setAdd_vote_error_show] = React.useState(false);
  const [add_vote_item_shown, setAdd_vote_item_shown] = React.useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = React.useState('');
  const [can_submit, setCan_submit] = React.useState(false);
  const [confirm_modal_visiable, setConfirm_modal_visiable] =
    React.useState(false);
  const [corp_type, setCorp_type] = React.useState(1);
  const [corporation_list_shown, setCorporation_list_shown] =
    React.useState(false);
  const [corporations, setCorporations] = React.useState([]);
  const [count_letter, setCount_letter] = React.useState(0);
  const [cover_img, setCover_img] = React.useState('');
  const [data_dic, setData_dic] = React.useState([]);
  const [draft_count, setDraft_count] = React.useState(1);
  const [draft_data, setDraft_data] = React.useState([
    {
      id: 68,
      type: 'industry',
      user: {
        id: 10000412,
        name: 'Test LL',
        avatar: null,
        deleted: false,
        is_self: true,
        identity: 'real',
        nickname: '用户10000412',
        position: 'Chairman',
        fund_type_ids: [7, 5],
        sns_career_name: '私募股权投资/风险投资 Chairman',
        organization_name: '',
        management_scale_id: null,
        organization_type_id: 5,
        organization_identity: 'hide',
      },
      state: 'draft',
      title:
        '(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)',
      parent: null,
      content:
        '哈哈哈哈(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)',
      user_id: 10000412,
      viewers: [],
      visible: true,
      outdated: false,
      is_author: true,
      parent_id: null,
      created_at: 1738219478,
      disclaimer: false,
      expired_at: null,
      industries: [{ id: 1010, name: '能源' }],
      like_count: 0,
      start_time: null,
      tournament: null,
      updated_at: 1738427252,
      view_count: 0,
      attachments: [],
      contributed: false,
      cover_image: '',
      share_count: 0,
      corporations: [
        { id: 5, name: '深振业A', ticker: 'SZ.000006', currency: 'CNY' },
      ],
      industry_ids: [1010],
      release_time: null,
      comment_count: 0,
      dislike_count: 0,
      stock_tracing: {
        duration: null,
        start_time: null,
        actual_change: 0,
        current_price: '0.0',
        initial_price: '0.0',
        expected_change: null,
        tracing_corporation: null,
      },
      tournament_id: null,
      expected_trend: 'bullish',
      favorite_count: 0,
      related_topics: [],
      corporation_ids: [5],
      rejected_reason: null,
      recent_view_time: null,
      custom_sector_ids: [],
      tournament_winner: null,
      initial_price_time: null,
      latest_cover_image: '',
      merged_attachments: [],
      core_points_updated: false,
      expected_start_time: null,
      family_tournament_id: null,
      in_closed_tournament: false,
      is_tournament_winner: false,
      recommended_opinions: [],
      tracing_opinion_count: 0,
      current_price_updated_at: null,
      last_tracing_release_time: null,
      has_pending_tracing_opinion: false,
      merged_recommended_opinions: [],
    },
    {
      id: 67,
      type: 'stock',
      user: {
        id: 10000412,
        name: 'Test LL',
        avatar: null,
        deleted: false,
        is_self: true,
        identity: 'real',
        nickname: '用户10000412',
        position: 'Chairman',
        fund_type_ids: [7, 5],
        sns_career_name: '私募股权投资/风险投资 Chairman',
        organization_name: '',
        management_scale_id: null,
        organization_type_id: 5,
        organization_identity: 'hide',
      },
      state: 'draft',
      title: '',
      parent: null,
      content:
        'sfdfsdfasdfasdfasdfsadfasdfasdfsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfasdfasdfasdfasdfasdfasdfasdfsadf',
      user_id: 10000412,
      viewers: [],
      visible: true,
      outdated: false,
      is_author: true,
      parent_id: null,
      created_at: 1738217747,
      disclaimer: true,
      expired_at: 1746073474,
      industries: [{ id: 4010, name: '银行' }],
      like_count: 0,
      start_time: 1738383874,
      tournament: null,
      updated_at: 1738383874,
      view_count: 0,
      attachments: [
        {
          id: 244,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.7251774422066213.doc',
          name: '1.doc',
          staff_id: null,
          created_at: 1738342515,
          staff_name: null,
        },
        {
          id: 245,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.8957834084074556.doc',
          name: '2.doc',
          staff_id: null,
          created_at: 1738342515,
          staff_name: null,
        },
      ],
      contributed: false,
      cover_image:
        'https://image.ca3test.com/sns_opinion/10000412/0.543739331714068.jpg',
      share_count: 0,
      corporations: [],
      industry_ids: [4010],
      release_time: null,
      comment_count: 0,
      dislike_count: 0,
      stock_tracing: {
        duration: 3,
        start_time: 1738383874,
        actual_change: 0,
        current_price: '0.0',
        initial_price: '0.0',
        expected_change: 30,
        tracing_corporation: {
          id: 1,
          name: '平安银行',
          ticker: 'SZ.000001',
          currency: 'CNY',
          industry_id: 4010,
          follower_count: 1,
          sns_action_flag: { following: true },
        },
      },
      tournament_id: null,
      expected_trend: 'bullish',
      favorite_count: 0,
      related_topics: [],
      corporation_ids: [],
      rejected_reason: null,
      recent_view_time: null,
      custom_sector_ids: [],
      tournament_winner: null,
      initial_price_time: 1738383874,
      latest_cover_image:
        'https://image.ca3test.com/sns_opinion/10000412/0.543739331714068.jpg',
      merged_attachments: [
        {
          id: 245,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.8957834084074556.doc',
          name: '2.doc',
          staff_id: null,
          created_at: 1738342515,
          staff_name: null,
        },
        {
          id: 244,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.7251774422066213.doc',
          name: '1.doc',
          staff_id: null,
          created_at: 1738342515,
          staff_name: null,
        },
      ],
      core_points_updated: true,
      expected_start_time: 1738383874,
      family_tournament_id: null,
      in_closed_tournament: false,
      is_tournament_winner: false,
      recommended_opinions: [],
      tracing_opinion_count: 0,
      current_price_updated_at: null,
      last_tracing_release_time: null,
      has_pending_tracing_opinion: false,
      merged_recommended_opinions: [],
    },
    {
      id: 66,
      type: 'stock',
      user: {
        id: 10000412,
        name: 'Test LL',
        avatar: null,
        deleted: false,
        is_self: true,
        identity: 'real',
        nickname: '用户10000412',
        position: 'Chairman',
        fund_type_ids: [7, 5],
        sns_career_name: '私募股权投资/风险投资 Chairman',
        organization_name: '',
        management_scale_id: null,
        organization_type_id: 5,
        organization_identity: 'hide',
      },
      state: 'draft',
      title: '',
      parent: {
        id: 59,
        expected_trend: 'bullish',
        tracing_corporation: {
          id: 1,
          name: '平安银行',
          ticker: 'SZ.000001',
          currency: 'CNY',
        },
      },
      content:
        '(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)(平台建议：中英文均可，观点逻辑清晰，尽量图文并茂。)',
      user_id: 10000412,
      viewers: [],
      visible: true,
      outdated: false,
      is_author: true,
      parent_id: 59,
      created_at: 1737737547,
      disclaimer: true,
      expired_at: 1752560218,
      industries: [{ id: 4010, name: '银行' }],
      like_count: 0,
      start_time: 1736921818,
      tournament: null,
      updated_at: 1737737547,
      view_count: 249,
      attachments: [],
      contributed: false,
      cover_image: null,
      share_count: 0,
      corporations: [],
      industry_ids: [4010],
      release_time: null,
      comment_count: 0,
      dislike_count: 0,
      stock_tracing: {
        duration: 6,
        start_time: 1736921818,
        actual_change: 0,
        current_price: '0.0',
        initial_price: '0.0',
        expected_change: 50,
        tracing_corporation: {
          id: 1,
          name: '平安银行',
          ticker: 'SZ.000001',
          currency: 'CNY',
          industry_id: 4010,
          follower_count: 1,
          sns_action_flag: { following: true },
        },
      },
      tournament_id: null,
      expected_trend: 'bullish',
      favorite_count: 0,
      related_topics: [],
      corporation_ids: [],
      rejected_reason: null,
      recent_view_time: 1738466131,
      custom_sector_ids: [],
      tournament_winner: null,
      initial_price_time: 1736921818,
      latest_cover_image: null,
      core_points_updated: false,
      expected_start_time: 1736921818,
      family_tournament_id: null,
      in_closed_tournament: false,
      is_tournament_winner: false,
      recommended_opinions: [],
      tracing_opinion_count: 0,
      current_price_updated_at: null,
      last_tracing_release_time: null,
      has_pending_tracing_opinion: false,
    },
    {
      id: 60,
      type: 'industry',
      user: {
        id: 10000412,
        name: 'Test LL',
        avatar: null,
        deleted: false,
        is_self: true,
        identity: 'real',
        nickname: '用户10000412',
        position: 'Chairman',
        fund_type_ids: [7, 5],
        sns_career_name: '私募股权投资/风险投资 Chairman',
        organization_name: '',
        management_scale_id: null,
        organization_type_id: 5,
        organization_identity: 'hide',
      },
      state: 'draft',
      title: 'APP-行业/市场/宏观等观点',
      parent: null,
      content:
        '正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)正文(平台建议：请不少于100字，中英文均可，观点逻辑清晰，尽量图文并茂。)',
      user_id: 10000412,
      viewers: [],
      visible: true,
      outdated: true,
      is_author: true,
      parent_id: null,
      created_at: 1736942788,
      disclaimer: true,
      expired_at: null,
      industries: [
        { id: 1010, name: '能源' },
        { id: 2020, name: '商业和专业服务' },
      ],
      like_count: 0,
      start_time: null,
      tournament: null,
      updated_at: 1737232825,
      view_count: 0,
      attachments: [
        {
          id: 243,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.8609015245117968.pdf',
          name: 'test.pdf',
          staff_id: null,
          created_at: 1736943246,
          staff_name: null,
        },
      ],
      contributed: false,
      cover_image:
        'https://image.ca3test.com/sns_opinion/10000412/0.9524585400831058.jpg',
      share_count: 0,
      corporations: [
        { id: 4, name: 'ST星源', ticker: 'SZ.000005', currency: 'CNY' },
      ],
      industry_ids: [1010, 2020],
      release_time: 1737179945,
      comment_count: 0,
      dislike_count: 0,
      stock_tracing: {
        duration: null,
        start_time: null,
        actual_change: 0,
        current_price: '0.0',
        initial_price: '0.0',
        expected_change: null,
        tracing_corporation: null,
      },
      tournament_id: null,
      expected_trend: 'bearish',
      favorite_count: 0,
      related_topics: [],
      corporation_ids: [4],
      rejected_reason: null,
      recent_view_time: 1737179945,
      custom_sector_ids: [],
      tournament_winner: null,
      initial_price_time: null,
      latest_cover_image:
        'https://image.ca3test.com/sns_opinion/10000412/0.9524585400831058.jpg',
      merged_attachments: [
        {
          id: 243,
          tag: null,
          url: 'https://file.ca3test.com/opinion_attachment/10000412/0.8609015245117968.pdf',
          name: 'test.pdf',
          staff_id: null,
          created_at: 1736943246,
          staff_name: null,
        },
      ],
      core_points_updated: false,
      expected_start_time: null,
      family_tournament_id: null,
      in_closed_tournament: false,
      is_tournament_winner: false,
      recommended_opinions: [],
      tracing_opinion_count: 0,
      current_price_updated_at: null,
      last_tracing_release_time: 1737179945,
      has_pending_tracing_opinion: false,
      merged_recommended_opinions: [],
    },
  ]);
  const [draft_list_modal_shown, setDraft_list_modal_shown] =
    React.useState(false);
  const [edit_link_index, setEdit_link_index] = React.useState(0);
  const [edit_link_value, setEdit_link_value] = React.useState('');
  const [edit_vote_index, setEdit_vote_index] = React.useState(-1);
  const [focus_search_input, setFocus_search_input] = React.useState(false);
  const [information_links, setInformation_links] = React.useState([
    'htttp://sdkljflksdf.com',
    'https://lskdjflk.dom',
  ]);
  const [init_data, setInit_data] = React.useState({
    type: 'stock',
    state: 'draft',
    title: '',
    content:
      '<p><strong style="background-color: rgb(246, 247, 248); color: rgb(89, 106, 122);">以上内容仅代表个人观点，与本网站、任何公司或机构立场无关，本文不作为实际操作建议，交易风险自担。以上内容仅代表个人观点，与本网站、任何公司或机构立场无关，本文不作为实际操作建议，交易风险自担。以上内容仅代表个人观点，与本网站、任何公司或机构立场无关，本文不作为实际操作建议，交易风险自担。以上内容仅代表个人观点，与本网站、任何公司或机构立场无关，本文不作为实际操作建议，交易风险自担。</strong></p>',
    disclaimer: true,
    industry_ids: [],
    stock_tracing: {
      duration: '6',
      start_time: 1737369768.66,
      corporation_id: '2',
      expected_change: '200',
    },
    expected_trend: 'bullish',
    corporation_ids: [],
  });
  const [intro, setIntro] = React.useState('');
  const [is_corp_loaded, setIs_corp_loaded] = React.useState(false);
  const [is_loading, setIs_loading] = React.useState(false);
  const [keyword, setKeyword] = React.useState(setUndefined());
  const [link_input_text, setLink_input_text] = React.useState('');
  const [loaded_id, setLoaded_id] = React.useState(0);
  const [modal_cancel, setModal_cancel] = React.useState('');
  const [modal_confirm, setModal_confirm] = React.useState('保存');
  const [modal_id, setModal_id] = React.useState(0);
  const [modal_message, setModal_message] = React.useState('');
  const [modal_negative, setModal_negative] = React.useState('');
  const [modal_title, setModal_title] = React.useState('');
  const [modal_type, setModal_type] = React.useState('');
  const [page, setPage] = React.useState(2);
  const [point_industry, setPoint_industry] = React.useState('');
  const [point_industry_id, setPoint_industry_id] = React.useState([]);
  const [point_stock, setPoint_stock] = React.useState('');
  const [point_stock_id, setPoint_stock_id] = React.useState('');
  const [point_stock_id_tmp, setPoint_stock_id_tmp] = React.useState(0);
  const [point_stock_tmp, setPoint_stock_tmp] = React.useState('');
  const [relation_stock, setRelation_stock] = React.useState([]);
  const [relation_stock_id, setRelation_stock_id] = React.useState([]);
  const [relation_stock_id_tmp, setRelation_stock_id_tmp] = React.useState([]);
  const [relation_stock_tmp, setRelation_stock_tmp] = React.useState([]);
  const [scroll_picker_data, setScroll_picker_data] = React.useState({});
  const [scroll_picker_modal_style, setScroll_picker_modal_style] =
    React.useState({ height: '30%', coverHeight: '70%' });
  const [scroll_picker_type, setScroll_picker_type] = React.useState(0);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [tip_modal_confirm, setTip_modal_confirm] = React.useState('');
  const [tip_modal_message, setTip_modal_message] = React.useState('');
  const [tip_modal_title, setTip_modal_title] = React.useState('');
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [topic_title, setTopic_title] = React.useState('');
  const [total_corporations, setTotal_corporations] = React.useState(0);
  const [vote, setVote] = React.useState(t(Variables, 'common_no'));
  const [vote_id, setVote_id] = React.useState(false);
  const [vote_input_text, setVote_input_text] = React.useState('');
  const [vote_options, setVote_options] = React.useState(['', '']);
  const [vote_type, setVote_type] = React.useState(
    t(Variables, 'create_topic_vote_single')
  );
  const [vote_type_id, setVote_type_id] = React.useState('single');
  const arrayJoin = (data, splitStr) => {
    return data.join(splitStr);
  };

  const editorUpdated = content => {
    // 去掉所有HTML标签
    const textOnly = content.replace(/<[^>]*>/g, '');

    setCount_letter(textOnly.length);
    setPoint_content(content);
  };

  const getStockTracingData = () => {
    const data = {};

    data.corporation_id = point_stock_id.toString();

    data.duration = parseInt(preview_date_id);
    data.expected_change = parseInt(preview_rate_id);
    data.start_time = new Date().getTime() / 1000;
    console.log(data);

    return data;
    // duration
    // :
    // 6
    // expected_change
    // :
    // 200
    // start_time
    // :
    // 1738419632.512
  };

  const initFormData = data => {
    const data_dic_data = initTypeData();

    setTopic_title(data.title);
    setIntro(data.intro);
    setInformation_links(data.information_links.map(link => link.url));
    setVote_id(data.vote == null ? false : true);
    setVote(
      data_dic_data[10].data.filter(item => {
        return item.id == (data.vote == null ? 'false' : 'true');
      })[0]?.name
    );
    console.log(data.vote == null ? false : true);
    if (data.vote != null) {
      setVote_type_id(data.vote.type);
      setVote_type(
        data_dic_data[11].data.filter(item => {
          return item.id == data.vote.type;
        })[0]?.name
      );
      setVote_options(data.vote.vote_options.map(vote_item => vote_item.name));
    }

    setPoint_industry(arrayIdToString(Variables, 4, data.industry_ids, '、'));
    setPoint_industry_id(data.industry_ids);
    setRelation_stock(data.corporations.map(corp => corp.name));
    setRelation_stock_id(data.corporations.map(corp => corp.id.toString()));
  };

  const initLabelPickerSetting = (
    Variables,
    setGlobalVariableValue,
    dataSourceName
  ) => {
    const pickupDic = Variables.ace_dic.data[dataSourceName];

    setGlobalVariableValue({
      key: 'label_picker_current_selected_values',
      value: point_industry_id,
    });
    setGlobalVariableValue({
      key: 'label_picker_current_selected_size',
      value: point_industry_id.length,
    });
    setGlobalVariableValue({
      key: 'label_picker_dic_name',
      value: dataSourceName,
    });

    setGlobalVariableValue({ key: 'label_picker_modal_shown', value: true });
    setGlobalVariableValue({
      key: 'label_picker_checkedall',
      value: point_industry_id.length === pickupDic.length ? true : false,
    });
    //设定滚动选择器Modal的确认回调

    LabelPicker.setConfirmCallback(Variables => {
      const selectedIds = Variables['label_picker_current_selected_values'];

      switch (dataSourceName) {
        case 'industries':
          setPoint_industry_id(selectedIds);
          setPoint_industry(arrayIdToString(Variables, 4, selectedIds, '、'));
          // setFd_industryIds(selectedIds);
          break;
      }
      CoverView.hide();
      LabelPicker.callCancel(setGlobalVariableValue);
    });
  };

  const initScrollPickerSetting = (
    Variables,
    setGlobalVariableValue,
    type,
    initId
  ) => {
    //设定滚动选择器Modal的确认回调
    ScrollPicker.setConfirmCallback((v, data) => {
      const selectIndex = v['scroll_picker_current_selected_index'];

      if (selectIndex !== -1) {
        // setInit_data((prevInitData) => ({
        // ...prevInitData,
        // type: data[selectIndex].id,
        // }));
        switch (data.type) {
          case 10:
            setVote(data.data[selectIndex].name);
            setVote_id(data.data[selectIndex].id === 'true');
            break;
          case 11:
            setVote_type(data.data[selectIndex].name);
            setVote_type_id(data.data[selectIndex].id);
            break;
        }
      }
      ScrollPicker.callCancel(setGlobalVariableValue);
      // setGlobalVariableValue({key:"scroll_picker_current_selected_index",value:-1})
      // setGlobalVariableValue({key:"scroll_picker_modal_title",value:""})
      // setGlobalVariableValue({key:"scroll_picker_modal_data",value:{}})
      // setGlobalVariableValue({key:"scroll_picker_modal_shown",value:false})
    });
    setGlobalVariableValue({
      key: 'scroll_picker_modal_style',
      value: { coverHeight: '70%', height: '30%' },
    });
    let title = data_dic[type].title;
    let selectTo = 0;
    const data = data_dic[type];
    setScroll_picker_data(data);

    switch (type) {
      case 10:
        selectTo = data_dic[type].data.findIndex(
          item => item.id === vote_id.toString()
        );
        break;
      case 11:
        selectTo = data_dic[type].data.findIndex(item => item.id === vote_type);
        break;
    }

    // setGlobalVariableValue({key:"scroll_picker_modal_data",value:data.data})
    setGlobalVariableValue({
      key: 'scroll_picker_current_selected_index',
      value: selectTo,
    });
    setGlobalVariableValue({ key: 'scroll_picker_modal_title', value: title });
    setGlobalVariableValue({ key: 'scroll_picker_modal_shown', value: true });
  };

  const initTypeData = () => {
    const data = [];

    //观点类型
    data.push({
      type: 0,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_type'),
      data: [
        { id: 'stock', name: gf.t(Variables, 'tab_create_point_type_1') },
        { id: 'industry', name: gf.t(Variables, 'tab_create_point_type_2') },
      ],
    });

    //个人观点
    data.push({
      type: 1,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_personal'),
      data: [
        { id: 'bullish', name: gf.t(Variables, 'tab_create_point_personal_1') },
        { id: 'none', name: gf.t(Variables, 'tab_create_point_personal_2') },
        { id: 'bearish', name: gf.t(Variables, 'tab_create_point_personal_3') },
      ],
    });

    ////预期涨幅正面
    data.push({
      type: 2,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '30', name: '+30%' },
        { id: '50', name: '+50%' },
        { id: '100', name: '+100%' },
        { id: '200', name: '+200%' },
        { id: '300', name: '+300%' },
        { id: '500', name: '+500%' },
      ],
    });
    //预期涨幅中性
    data.push({
      type: 3,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '-15', name: '-15%' },
        {
          id: '0',
          name: gf.t(Variables, 'tab_create_point_preview_rate_balance'),
        },
        { id: '15', name: '+15%' },
      ],
    });

    //预期涨幅谨慎
    data.push({
      type: 4,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_rate'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '-30', name: '-30%' },
        { id: '-50', name: '-50%' },
        { id: '-70', name: '-70%' },
        { id: '-80', name: '-80%' },
      ],
    });

    //预期时间
    data.push({
      type: 5,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_create_point_preview_time'),
      data: [
        { id: '', name: gf.t(Variables, 'common_none') },
        { id: '3', name: gf.t(Variables, 'tab_create_point_preview_time_1') },
        { id: '6', name: gf.t(Variables, 'tab_create_point_preview_time_2') },
        { id: '12', name: gf.t(Variables, 'tab_create_point_preview_time_3') },
        { id: '24', name: gf.t(Variables, 'tab_create_point_preview_time_4') },
        { id: '36', name: gf.t(Variables, 'tab_create_point_preview_time_5') },
      ],
    });
    //是否展示真实身份
    data.push({
      type: 6,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_point_show_name'),
      data: [
        { id: 'real', name: gf.t(Variables, 'tab_point_real_name') },
        { id: 'unreal', name: gf.t(Variables, 'tab_point_nick_name') },
      ],
    });

    //是否展示公司信息
    data.push({
      type: 7,
      title:
        gf.t(Variables, 'common_select') +
        gf.t(Variables, 'tab_point_show_company'),
      data: [
        { id: 'display', name: gf.t(Variables, 'tab_point_is_display') },
        { id: 'hide', name: gf.t(Variables, 'tab_point_is_no_display') },
      ],
    });

    //是否调整核心观点
    data.push({
      type: 8,
      title: gf.t(Variables, 'append_change_point'),
      data: [
        { id: 'true', name: gf.t(Variables, 'common_yes_shi') },
        { id: 'false', name: gf.t(Variables, 'common_no') },
      ],
    });

    //是否投稿给本营
    data.push({
      type: 9,
      title: gf.t(Variables, 'point_to_acecamp'),
      data: [
        { id: 'false', name: gf.t(Variables, 'common_no') },
        {
          id: 'true',
          name:
            gf.t(Variables, 'common_yes_shi') +
            gf.t(Variables, 'point_to_acecamp_delete'),
        },
      ],
    });

    //是否调整核心观点
    data.push({
      type: 10,
      title: gf.t(Variables, 'create_topic_add_vote'),
      data: [
        { id: 'true', name: gf.t(Variables, 'common_yes_shi') },
        { id: 'false', name: gf.t(Variables, 'common_no') },
      ],
    });

    //选择单选or多选
    data.push({
      type: 11,
      title: gf.t(Variables, 'create_topic_vote_setting'),
      data: [
        { id: 'single', name: gf.t(Variables, 'create_topic_vote_single') },
        { id: 'multiple', name: gf.t(Variables, 'create_topic_vote_multiple') },
      ],
    });

    //新建观点or追加观点
    data.push({
      type: 12,
      title: gf.t(Variables, 'tour_point_is_append'),
      data: [
        { id: 'false', name: gf.t(Variables, 'tab_circle_new_point') },
        { id: 'true', name: gf.t(Variables, 'tab_circle_append_point') },
      ],
    });

    //选择联系方式
    data.push({
      type: 13,
      title: gf.t(Variables, 'event_order_contact_type'),
      data: [
        { id: 'email', name: gf.t(Variables, 'common_email') },
        { id: 'phone', name: gf.t(Variables, 'common_phone') },
        { id: 'wechat', name: gf.t(Variables, 'event_order_contact_wechat') },
      ],
    });

    //从哪儿了解我们
    data.push({
      type: 14,
      title: gf.t(Variables, 'common_select'),
      data: [
        {
          id: 'friend_introduction',
          name: gf.t(Variables, 'live_try_vip_from_friend'),
        },
        {
          id: 'wechat_group',
          name: gf.t(Variables, 'live_try_vip_from_wechat_group'),
        },
        {
          id: 'wechat_public_account',
          name: gf.t(Variables, 'live_try_vip_from_wechat_public'),
        },
        { id: 'linkedin', name: gf.t(Variables, 'live_try_vip_from_linkedin') },
        { id: 'internet', name: gf.t(Variables, 'live_try_vip_from_internet') },
        { id: 'other', name: gf.t(Variables, 'live_try_vip_from_other') },
      ],
    });

    setData_dic(data);
    return data;
  };

  const insertImage = async () => {
    const result = await openImagePickerUtil({
      mediaTypes: 'Images',
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: false,
      outputBase64: true,
    });

    const img = await uploadImage(result, 'sns_opinion');
    console.log(img);
    return img;
  };

  const modal_callback = async (type, id) => {
    try {
      /* 'Run a Custom Function' action requires configuration: choose a custom function */
      const postData = {
        corporation_ids: relation_stock_id,
        id:
          loaded_id && loaded_id > 0
            ? loaded_id
            : props.route?.params?.id
            ? props.route?.params?.id
            : undefined,
        industry_ids: point_industry_id,
        state: 'draft',
        information_links: information_links,
        title: topic_title,
        intro: intro,
        vote: vote_id
          ? {
              options: vote_options,
              total_voted_users: 0,
              total_votes: 0,
              type: vote_type_id,
            }
          : null,
      };
      const result = (await aceCampTestEditTopicPOST.mutateAsync(postData))
        ?.json;
      setConfirm_modal_visiable(false);
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }

    // {
    // 	"corporation_ids": {{corporation_ids}},
    // 	"id": {{id}},
    // 	"industry_ids": {{industry_ids}},
    // 	"information_links": {{information_links}},
    // 	"intro": {{intro}},
    // 	"state": {{state}},
    // 	"title": {{title}},
    // 	"vote": {{vote}}
    // }
  };

  const modal_negative_callback = async (type, id) => {
    if (type === 'delete') {
      try {
        (
          await aceCampTestTopicDeleteDELETE.mutateAsync({
            id: id,
          })
        )?.json;
        setConfirm_modal_visiable(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigation.goBack();
    }
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

  const setEditorHeight = eve => {
    console.log(eve.nativeEvent.layout);
    const h = dimensions.height - eve.nativeEvent.layout.height - 45;

    setHeight(h);
    console.log(safeAreaInsets.bottom);
  };

  const submitForm = () => {
    //test
  };

  const submitForm2 = () => {
    //test
  };

  const tip_modal_callback = async () => {
    try {
      /* 'Run a Custom Function' action requires configuration: choose a custom function */
      const postData = {
        corporation_ids: relation_stock_id,
        id:
          loaded_id && loaded_id > 0
            ? loaded_id
            : props.route?.params?.id
            ? props.route?.params?.id
            : undefined,
        industry_ids: point_industry_id,
        state: 'pending',
        information_links: information_links,
        title: topic_title,
        intro: intro,
        vote: vote_id
          ? {
              options: vote_options,
              total_voted_users: 0,
              total_votes: 0,
              type: vote_type_id,
            }
          : null,
      };
      const result = (await aceCampTestEditTopicPOST.mutateAsync(postData))
        ?.json;
      setConfirm_modal_visiable(false);
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async (fileInfo, scope) => {
    try {
      setIs_image_uploading(true);
      const data = fileInfo.split(',')[1];
      // 将 Base64 编码的文件转换为二进制数据
      const binaryFile = gf.Buffer.from(data, 'base64');
      const endpoint = HttpClient.apiEndpoints['oss_token'];
      const url = new URL(endpoint.url);
      const params = { token_scope: scope };
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
      const responseData = await HttpClient.fetcher(url, endpoint.method, null);
      const response = await responseData.json();
      const AccessKeyId = response.data.id;
      const AccessKeySecret = response.data.secret;
      const SecurityToken = response.data.token;
      const fileDomain = response.data.domain;
      const bucketName = response.data.bucket;
      const region = response.data.accelerate_endpoint;
      const fileName = `${response.data.allow_path}/${Date.now()}.jpg`;
      let uploadUrl = `https://${bucketName}.${region}/${fileName}`;
      try {
        // 构建待签名字符串
        const method = 'PUT';
        const contentMd5 = '';
        const contentType = 'image/jpeg';
        const date = new Date().toUTCString();
        const canonicalizedOSSHeaders = `x-oss-security-token:${SecurityToken}`;
        const canonicalizedResource = `/${bucketName}/${fileName}`;

        const stringToSign = `${method}
${contentMd5}
${contentType}
${date}
${canonicalizedOSSHeaders}
${canonicalizedResource}`;
        // 计算签名
        const signature = gf.CryptoJS.HmacSHA1(
          stringToSign,
          AccessKeySecret
        ).toString(gf.CryptoJS.enc.Base64);
        //     const hmacFunc = gf.crypto.createHmac('sha1', gf.Buffer.from(AccessKeySecret,'utf-8'));
        // const signature =  hmacFunc.update(gf.Buffer.from(stringToSign,'utf-8')).digest('base64');

        // 构建 Authorization 字段
        const authorization = `OSS ${AccessKeyId}:${signature}`;
        const header = {
          'Content-Type': contentType,
          'x-oss-security-token': SecurityToken,
          Authorization: authorization,
          Date: date,
          Host: bucketName + '.oss-accelerate.aliyuncs.com',
          'User-Agent':
            'aliyun-sdk-android/2.9.3(Linux/Android 11/sdk_gphone_x86;RSR1.201013.001)',
        };
        // 上传文件到 OSS
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          headers: header,
          body: binaryFile,
        });
        console.log(uploadResponse);
        if (uploadResponse.status === 200) {
          // setFileUrl(`${fileDomain}/${fileName}`);
          const url = `${fileDomain}/${fileName}`;
          console.log(url);

          return url;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIs_image_uploading(false);
    }
  };
  const rich_editor = React.useRef();

  React.useEffect(() => {
    if (
      !topic_title ||
      !intro ||
      point_industry_id.length === 0 ||
      (vote_id && vote_options.some(item => item === ''))
    ) {
      setCan_submit(false);
    } else {
      setCan_submit(true);
    }
  }, [topic_title, intro, point_industry_id, vote_id, vote_options]);

  React.useEffect(() => {
    setModal_title(t(Variables, 'common_tips'));
    setModal_message(t(Variables, 'draft_save'));
    setModal_confirm(t(Variables, 'common_save'));
    setModal_negative(t(Variables, 'draft_no_save'));
    setModal_cancel(t(Variables, 'common_cancel'));
    setTip_modal_title(t(Variables, 'setting_read_and_agree'));
    setTip_modal_message(t(Variables, 'tab_create_point_disclaimer'));
    setTip_modal_confirm(t(Variables, 'common_agree'));
  }, []);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestTopicDeleteDELETE = AceCampTestApi.useTopicDeleteDELETE();
  const aceCampTestEditTopicPOST = AceCampTestApi.useEditTopicPOST();
  const aceCampTestDeleteOpinionDELETE =
    AceCampTestApi.useDeleteOpinionDELETE();
  React.useEffect(() => {
    try {
      if ((props.route?.params?.id ?? defaultProps.id) || loaded_id) {
      } else {
        initTypeData();
      }

      /* hidden 'Run a Custom Function' action */
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          flex: 1,
          width: dimensions.width,
        },
        dimensions.width
      )}
    >
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
                setModal_title(t(Variables, 'common_tips'));
                setModal_message(t(Variables, 'draft_save'));
                setModal_confirm(t(Variables, 'common_save'));
                setModal_negative(t(Variables, 'draft_no_save'));
                setConfirm_modal_visiable(true);
                setModal_cancel(t(Variables, 'common_cancel'));
                setModal_type('');
                /* hidden 'API Request' action */
                /* hidden 'API Request' action */
                /* hidden 'Navigate Back' action */
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.App.appStyle_black}
            icon={'AntDesign/left'}
            size={22}
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
                  lineHeight: 28,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'tab_circle_new_dis')}
            </Text>
          </View>

          <Touchable
            onPress={() => {
              try {
                setTip_modal_visiable(true);
              } catch (err) {
                console.error(err);
              }
            }}
            disabled={!can_submit}
          >
            {/* 右侧BTN */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 71'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: can_submit
                        ? palettes.Brand.appStyle_primary
                        : palettes.App['Custom Color 71'],
                    },
                  ],
                  borderRadius: 3,
                  paddingBottom: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 4,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 70'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: can_submit
                          ? palettes.App['Custom #ffffff']
                          : palettes.App['Custom Color 70'],
                      },
                    ],
                    fontFamily: 'System',
                    fontSize: 13,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 18,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'common_release')}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          { height: '100%', marginBottom: 40, width: '100%' },
          dimensions.width
        )}
      >
        {/* 表单 */}
        <View
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
        >
          {/* 讨论标题 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: palettes.App['Custom Color 7'],
                flexDirection: 'row',
                height: 52,
                justifyContent: 'space-between',
                marginLeft: 16,
                marginRight: 16,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Create Opinion Label'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Create Opinion Label'].style,
                  { fontFamily: 'System', fontWeight: '700' }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'create_topic_title')}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .style,
                    { color: 'rgb(255, 75, 75)' }
                  ),
                  dimensions.width
                )}
              >
                {'*'}
              </Text>
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
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
                    setTopic_title(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                maxLength={50}
                placeholder={t(
                  Variables,
                  'create_topic_enter_title'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 68']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                    {
                      color: palettes.App.appStyle_black,
                      fontSize: 15,
                      textAlign: 'right',
                      width: null,
                    }
                  ),
                  dimensions.width
                )}
                value={topic_title}
              />
            </View>
          </View>
          {/* 导语 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: palettes.App['Custom Color 7'],
                flexDirection: 'row',
                height: 52,
                justifyContent: 'space-between',
                marginLeft: 16,
                marginRight: 16,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Create Opinion Label'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Create Opinion Label'].style,
                  { fontFamily: 'System', fontWeight: '700' }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'create_topic_intro')}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .style,
                    { color: 'rgb(255, 75, 75)' }
                  ),
                  dimensions.width
                )}
              >
                {'*'}
              </Text>
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
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
                    setIntro(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
                maxLength={50}
                placeholder={t(
                  Variables,
                  'create_topic_enter_intro'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 68']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                    {
                      color: palettes.App.appStyle_black,
                      fontSize: 15,
                      textAlign: 'right',
                      width: null,
                    }
                  ),
                  dimensions.width
                )}
                value={intro}
              />
            </View>
          </View>

          <View>
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
            >
              {/* 行业 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color 7'],
                    flexDirection: 'row',
                    height: 52,
                    justifyContent: 'space-between',
                    paddingLeft: 16,
                    paddingRight: 16,
                    width: dimensions.width,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                    .props}
                  ellipsizeMode={'head'}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .style,
                      {
                        fontFamily: 'System',
                        fontWeight: '700',
                        marginRight: 10,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'common_sector')}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Create Opinion Label']
                          .style,
                        { color: 'rgb(255, 75, 75)' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'*'}
                  </Text>
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        overflow: 'hidden',
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .props}
                      dataDetectorType={'none'}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Create Opinion Label']
                            .style,
                          {
                            alignSelf: 'auto',
                            color: palettes.Brand.itemTextNomal,
                            textAlign: 'right',
                          }
                        ),
                        dimensions.width
                      )}
                      textBreakStrategy={'highQuality'}
                    >
                      {point_industry}
                    </Text>
                  </View>
                  {/* View 2 */}
                  <View>
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      resizeMode={'contain'}
                      source={imageSource(Images['icminenext'])}
                      style={StyleSheet.applyWidth(
                        { height: 20, width: 20 },
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              </View>
            </Touchable>
          </View>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setCorp_type(2);
                setCorporation_list_shown(true);
                setScroll_picker_modal_style({
                  height: '80%',
                  coverHeight: '20%',
                });
                setRelation_stock_tmp(relation_stock);
                setRelation_stock_id_tmp(relation_stock_id);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* 关联股票 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: palettes.App['Custom Color 7'],
                  flexDirection: 'row',
                  height: 52,
                  justifyContent: 'space-between',
                  marginLeft: 16,
                  marginRight: 16,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .style,
                    { fontFamily: 'System', fontWeight: '700' }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'tab_create_point_relation_stock')}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .style,
                      { color: palettes.Brand.itemTextNomal }
                    ),
                    dimensions.width
                  )}
                >
                  {arrayJoin(relation_stock, '、')}
                </Text>
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  resizeMode={'contain'}
                  source={imageSource(Images['icminenext'])}
                  style={StyleSheet.applyWidth(
                    { height: 20, width: 20 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>
          {/* 相关资料链接 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                height: 52,
                justifyContent: 'space-between',
                marginLeft: 16,
                marginRight: 16,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Create Opinion Label'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Create Opinion Label'].style,
                  { fontFamily: 'System', fontWeight: '700' }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'create_topic_about_link')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setAdd_link_modal_shown(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: palettes.Brand.appStyle_primary,
                      borderWidth: 1,
                      paddingBottom: 2,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 2,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Create Opinion Label']
                          .style,
                        { color: palettes.Brand.appStyle_primary, fontSize: 12 }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'create_topic_add')}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          {/* 资料列表 */}
          <SimpleStyleFlatList
            data={information_links}
            decelerationRate={'normal'}
            horizontal={false}
            inverted={false}
            keyExtractor={(data, index) =>
              data?.id ??
              data?.uuid ??
              index?.toString() ??
              JSON.stringify(data)
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'Scroll View->表单->资料列表'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            pagingEnabled={false}
            renderItem={({ item, index }) => {
              const data = item;
              return (
                <>
                  <Touchable
                    onPress={() => {
                      try {
                        setEdit_link_index(index);
                        setLink_input_text(
                          information_links && information_links[index]
                        );
                        setAdd_link_modal_shown(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          backgroundColor: palettes.App['Custom Color 14'],
                          borderRadius: 5,
                          flexDirection: 'row',
                          marginBottom: 8,
                          marginLeft: 16,
                          marginRight: 16,
                          marginTop: 8,
                          padding: 8,
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
                        {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                        source={imageSource(Images['iclink'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            { height: 20, width: 20 }
                          ),
                          dimensions.width
                        )}
                      />
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                            marginLeft: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {data}
                      </Text>
                    </View>
                  </Touchable>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { position: 'absolute', right: 10, top: 4 },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          setInformation_links(
                            information_links.filter(e => e !== data)
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <ExpoImage
                        allowDownscaling={true}
                        cachePolicy={'disk'}
                        contentPosition={'center'}
                        resizeMode={'cover'}
                        transitionDuration={300}
                        transitionEffect={'cross-dissolve'}
                        transitionTiming={'ease-in-out'}
                        {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                        source={imageSource(Images['icdeleteexpert'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            { height: 15, width: 15 }
                          ),
                          dimensions.width
                        )}
                      />
                    </Touchable>
                  </View>
                </>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            snapToAlignment={'start'}
          />
          <Touchable
            onPress={() => {
              try {
                initScrollPickerSetting(
                  Variables,
                  setGlobalVariableValue,
                  10,
                  undefined
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* 是否添加投票 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: palettes.App['Custom Color 7'],
                  borderTopWidth: 1,
                  flexDirection: 'row',
                  height: 52,
                  justifyContent: 'space-between',
                  marginLeft: 16,
                  marginRight: 16,
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .style,
                    { fontFamily: 'System', fontWeight: '700' }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'create_topic_add_vote')}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .style,
                      { color: 'rgb(255, 75, 75)' }
                    ),
                    dimensions.width
                  )}
                >
                  {'*'}
                </Text>
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .style,
                      { color: palettes.Brand.itemTextNomal }
                    ),
                    dimensions.width
                  )}
                >
                  {vote}
                </Text>
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  resizeMode={'contain'}
                  source={imageSource(Images['icminenext'])}
                  style={StyleSheet.applyWidth(
                    { height: 20, width: 20 },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <>
            {!vote_id ? null : (
              <Touchable
                onPress={() => {
                  try {
                    initScrollPickerSetting(
                      Variables,
                      setGlobalVariableValue,
                      11,
                      undefined
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* 单选多选 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: palettes.App['Custom Color 7'],
                      flexDirection: 'row',
                      height: 52,
                      justifyContent: 'space-between',
                      marginLeft: 16,
                      marginRight: 16,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Create Opinion Label']
                          .style,
                        { fontFamily: 'System', fontWeight: '700' }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'create_topic_vote_setting')}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Create Opinion Label']
                            .style,
                          { color: 'rgb(255, 75, 75)' }
                        ),
                        dimensions.width
                      )}
                    >
                      {'*'}
                    </Text>
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Create Opinion Label']
                            .style,
                          { color: palettes.Brand.itemTextNomal }
                        ),
                        dimensions.width
                      )}
                    >
                      {vote_type}
                    </Text>
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      resizeMode={'contain'}
                      source={imageSource(Images['icminenext'])}
                      style={StyleSheet.applyWidth(
                        { height: 20, width: 20 },
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              </Touchable>
            )}
          </>
          {/* 投票设置 */}
          <>
            {!vote_id ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color 7'],
                    flexDirection: 'row',
                    height: 52,
                    justifyContent: 'space-between',
                    marginLeft: 16,
                    marginRight: 16,
                  },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Create Opinion Label']
                        .style,
                      { fontFamily: 'System', fontWeight: '700' }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'create_topic_vote_option')}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Create Opinion Label']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Create Opinion Label']
                          .style,
                        { color: 'rgb(255, 75, 75)' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'*'}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Title'].style,
                        theme.typography.body1,
                        {
                          color: palettes.App['Custom Color 4'],
                          fontSize: 14,
                          lineHeight: 20,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'create_topic_can_add_num')}
                  </Text>
                </Text>

                <Touchable
                  onPress={() => {
                    try {
                      setVote_options(vote_options.concat(['']));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderColor: palettes.Brand.appStyle_primary,
                          borderWidth: 1,
                          paddingBottom: 2,
                          paddingLeft: 8,
                          paddingRight: 8,
                          paddingTop: 2,
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)[
                          'Create Opinion Label'
                        ].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)[
                              'Create Opinion Label'
                            ].style,
                            {
                              color: palettes.Brand.appStyle_primary,
                              fontSize: 12,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'create_topic_add')}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
            )}
          </>
          {/* vote list */}
          <>
            {!vote_id ? null : (
              <SimpleStyleFlatList
                data={vote_options}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(voteListData, index) =>
                  voteListData?.id ??
                  voteListData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(voteListData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'Scroll View->表单->vote list'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const voteListData = item;
                  return (
                    <>
                      <Touchable
                        onPress={() => {
                          try {
                            setEdit_vote_index(index);
                            setVote_input_text(
                              vote_options && vote_options[index]
                            );
                            setAdd_vote_item_shown(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              backgroundColor: palettes.App['Custom Color 14'],
                              borderRadius: 5,
                              flexDirection: 'row',
                              marginBottom: 8,
                              marginLeft: 16,
                              marginRight: 16,
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
                                color:
                                  voteListData?.length === 0
                                    ? '#C6D0D9'
                                    : '#000000',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 20,
                                marginLeft: 8,
                              },
                              dimensions.width
                            )}
                          >
                            {voteListData?.length === 0
                              ? t(Variables, 'create_topic_enter_vote_option')
                              : voteListData}
                          </Text>
                        </View>
                      </Touchable>
                      {/* View 2 */}
                      <>
                        {!(vote_options?.length > 2) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { position: 'absolute', right: 10, top: 4 },
                              dimensions.width
                            )}
                          >
                            <Touchable
                              onPress={() => {
                                try {
                                  setVote_options(
                                    removeArrItemByIndex(vote_options, index)
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
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
                                source={imageSource(Images['icdeleteexpert'])}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                      .style,
                                    { height: 15, width: 15 }
                                  ),
                                  dimensions.width
                                )}
                              />
                            </Touchable>
                          </View>
                        )}
                      </>
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            )}
          </>
        </View>
        {/* Fetch 2 */}
        <AceCampTestApi.FetchTopicListStateGET
          handlers={{
            onData: fetch2Data => {
              try {
                setDraft_count(fetch2Data?.data?.draft);
              } catch (err) {
                console.error(err);
              }
            },
          }}
        >
          {({ loading, error, data, refetchTopicListState }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return null;
          }}
        </AceCampTestApi.FetchTopicListStateGET>
      </SimpleStyleScrollView>
      {/* 草稿 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-end',
            backgroundColor: palettes.App['Custom Color 14'],
            bottom: safeAreaInsets.bottom,
            height: 40,
            justifyContent: 'center',
            position: 'absolute',
            width: [
              { minWidth: Breakpoints.Mobile, value: 1 },
              { minWidth: Breakpoints.Mobile, value: dimensions.width },
            ],
          },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              setDraft_list_modal_shown(true);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.itemTextNomal,
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 20,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'tab_create_point_draft')}{' '}
            {draft_count > 0 ? '(' + draft_count + ')' : undefined}
          </Text>
        </Touchable>
      </View>
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
        visible={Constants['scroll_picker_modal_shown']}
      >
        <Touchable
          onPress={() => {
            try {
              ScrollPickerCancelBtnPress(setGlobalVariableValue);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '70%' }, dimensions.width)}
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
              height: '30%',
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
            <ScrollPicker.picker pickerData={scroll_picker_data} />
          </Utils.CustomCodeErrorBoundary>
        </View>
      </Modal>
      <>
        {!(props.route?.params?.id ?? defaultProps.id) ? null : (
          <AceCampTestApi.FetchTopicInfoGET
            handlers={{
              onData: fetchData => {
                try {
                  console.log(fetchData);
                  if (fetchData?.code === 200) {
                    setInit_data(fetchData?.data);
                    initFormData(fetchData?.data);
                  } else {
                    initTypeData();
                  }
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            id={
              loaded_id ? loaded_id : props.route?.params?.id ?? defaultProps.id
            }
          >
            {({ loading, error, data, refetchTopicInfo }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return null;
            }}
          </AceCampTestApi.FetchTopicInfoGET>
        )}
      </>
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
                  {t(Variables, 'tab_create_point_target')}
                </Text>
              </View>
              {/* Confirm Btn */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setCorporation_list_shown(false);
                    if (corp_type === 1) {
                      setPoint_stock(point_stock_tmp);
                      setPoint_stock_id(point_stock_id_tmp);
                    } else {
                      setRelation_stock(relation_stock_tmp);
                      setRelation_stock_id(relation_stock_id_tmp);
                    }
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
                      console.log(textInputValue);
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
                                if (corp_type === 1) {
                                  setPoint_stock_id_tmp(listData?.id);
                                  setPoint_stock_tmp(listData?.name);
                                } else {
                                  mutipleCompanySelected(
                                    listData?.id,
                                    listData?.name
                                  );
                                  /* hidden 'Set Variable' action */
                                  /* hidden 'Set Variable' action */
                                }
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
                                {!(corp_type === 1
                                  ? listData?.id === point_stock_id_tmp
                                  : relation_stock_id_tmp.includes(
                                      (listData?.id).toString()
                                    )) ? null : (
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
      {/* 草稿 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={draft_list_modal_shown}
      >
        <Touchable
          onPress={() => {
            try {
              setDraft_list_modal_shown(false);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View
            style={StyleSheet.applyWidth(
              { height: '30%', width: '100%' },
              dimensions.width
            )}
          />
        </Touchable>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'auto',
              backgroundColor: palettes.App['Custom #ffffff'],
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              height: '70%',
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
                borderColor: palettes.Gray[200],
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
                marginTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            <View>
              {/* Title */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body S Medium'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body S Medium'].style,
                    {
                      color: palettes.App.appStyle_black,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '700',
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'tab_create_point_draft')}
              </Text>
            </View>
          </View>

          <View>
            <AceCampTestApi.FetchTopicListGET
              handlers={{
                onData: fetchData => {
                  try {
                    /* hidden 'Set Variable' action */
                    setDraft_data(fetchData?.data);
                    setDraft_count(fetchData?.meta?.total);
                    /* hidden 'Set Variable' action */
                    /* hidden 'Set Variable' action */
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
              per_page={50}
              state={'draft'}
            >
              {({ loading, error, data, refetchTopicList }) => {
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
                        {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                        source={imageSource(Images['acecampgif95f7bf80'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            { height: 40, width: 40 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  );
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return (
                    <>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                          },
                          dimensions.width
                        )}
                      >
                        {/* SVG */}
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
                          source={imageSource(Constants['empty_svg'])}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            dimensions.width
                          )}
                        />
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
                              lineHeight: 20,
                              marginRight: null,
                              marginTop: 10,
                            },
                            dimensions.width
                          )}
                        >
                          {t(Variables, 'common_no_content')}
                        </Text>
                      </View>
                    </>
                  );
                }

                return (
                  <SimpleStyleFlatList
                    data={draft_data}
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
                    listKey={'草稿->View 2->View->Fetch->List'}
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
                            setCorporations(corporations.concat(result?.data));
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
                              setLoaded_id(listData?.id);
                              setDraft_list_modal_shown(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'flex-start',
                                borderBottomWidth: 1,
                                borderColor: palettes.Gray[200],
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                marginLeft: 16,
                                marginRight: 16,
                                paddingBottom: 10,
                                paddingTop: 10,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                { alignItems: 'center', flexDirection: 'row' },
                                dimensions.width
                              )}
                            >
                              {/* 标题 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { maxWidth: '40%', overflow: 'hidden' },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={1}
                                  style={StyleSheet.applyWidth(
                                    {
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '700',
                                      letterSpacing: 0.2,
                                      lineHeight: 20,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {listData?.title}
                                </Text>
                              </View>
                            </View>
                            {/* 内容 */}
                            <View>
                              <Text
                                accessible={true}
                                selectable={false}
                                ellipsizeMode={'tail'}
                                numberOfLines={2}
                                style={StyleSheet.applyWidth(
                                  {
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {listData?.intro}
                              </Text>
                            </View>
                            {/* View 3 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginTop: 1,
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* 日期时间 */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: palettes.Gray[500],
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {fromUnixTimestamp(
                                  Variables,
                                  listData?.created_at,
                                  'YYYY/MM/DD HH:mm'
                                )}
                              </Text>

                              <Touchable
                                onPress={() => {
                                  try {
                                    setModal_title(t(Variables, 'common_tips'));
                                    setModal_message(
                                      t(
                                        Variables,
                                        'tab_create_point_delete_draft'
                                      )
                                    );
                                    setModal_negative(
                                      t(Variables, 'common_yes')
                                    );
                                    setModal_cancel(
                                      t(Variables, 'common_no_more')
                                    );
                                    setConfirm_modal_visiable(true);
                                    setModal_confirm(setUndefined());
                                    setModal_id(listData?.id);
                                    setModal_type('delete');
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                {/* 删除 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'flex-end',
                                      borderColor: palettes.Gray[200],
                                      borderRadius: 16,
                                      borderWidth: 1,
                                      paddingBottom: 4,
                                      paddingLeft: 8,
                                      paddingRight: 8,
                                      paddingTop: 4,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        theme.typography.body1,
                                        {
                                          color: palettes.Gray[500],
                                          fontFamily: 'System',
                                          fontSize: 12,
                                          fontWeight: '400',
                                          lineHeight: 16,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {t(Variables, 'common_delete')}
                                  </Text>
                                </View>
                              </Touchable>
                            </View>
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
            </AceCampTestApi.FetchTopicListGET>
          </View>
        </View>
      </Modal>
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
      {/* 存草稿提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={modal_title}
          message={modal_message}
          confirmBtn={modal_confirm}
          negativeBtn={modal_negative}
          cancelBtn={modal_cancel}
          onCancel={() => {
            setConfirm_modal_visiable(false);
          }}
          onConfirm={modal_callback}
          onNegative={modal_negative_callback}
          visible={confirm_modal_visiable}
          type={modal_type}
          id={modal_id}
        />
      </Utils.CustomCodeErrorBoundary>
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
      {/* 资料链接添加 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={add_link_modal_shown}
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
              {t(Variables, 'create_topic_about_link')}
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
                    setLink_input_text(newTextInputValue);
                    setAdd_link_error_show(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={t(Variables, 'common_please_enter').toString()}
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
                value={link_input_text}
              />
            </View>
            <>
              {!add_link_error_show ? null : (
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
                  {t(Variables, 'create_topic_link_required')}
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
                    setAdd_link_modal_shown(false);
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
                  try {
                    if (link_input_text?.length === 0) {
                      setAdd_link_error_show(true);
                    } else {
                      if (isHttpLink(link_input_text)) {
                        if (edit_link_index >= 0) {
                          setInformation_links(
                            replaceArrItemByIndex(
                              information_links,
                              edit_link_index,
                              link_input_text
                            )
                          );
                        } else {
                          setInformation_links(
                            information_links.concat([link_input_text])
                          );
                        }

                        setAdd_link_modal_shown(false);
                        setLink_input_text('');
                        setEdit_link_index(-1);
                      } else {
                        setAdd_link_error_show(true);
                      }
                    }
                  } catch (err) {
                    console.error(err);
                  }
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
      {/* 投票选项添加 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'fade'}
        presentationStyle={'overFullScreen'}
        transparent={true}
        visible={add_vote_item_shown}
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
              {t(Variables, 'create_topic_vote_option')}
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
                    setVote_input_text(newTextInputValue);
                    setAdd_vote_error_show(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={t(Variables, 'common_please_enter').toString()}
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
                value={vote_input_text}
              />
            </View>
            <>
              {!add_vote_error_show ? null : (
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
                  {t(Variables, 'create_topic_option_required')}
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
                    setAdd_vote_item_shown(false);
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
                  try {
                    if (vote_input_text?.length === 0) {
                      setAdd_vote_error_show(true);
                    } else {
                      setVote_options(
                        replaceArrItemByIndex(
                          vote_options,
                          edit_vote_index,
                          vote_input_text
                        )
                      );
                      setAdd_vote_item_shown(false);
                      setVote_input_text('');
                      setEdit_vote_index(-1);
                    }
                  } catch (err) {
                    console.error(err);
                  }
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

export default withTheme(CreateTopicScreen);
