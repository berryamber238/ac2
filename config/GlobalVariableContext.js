import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeviceVariables = {
  cookie:
    'aceid=1728914880.f2086a4ea71e; Hm_lvt_8b0b90b98a9a419fb90141d00647118e=1739973940,1740344530,1740923914,1741336604; HMACCOUNT=82C625BCCCAAED83; user_token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDAwMDQxMiwicmVmcmVzaF9hdCI6MTc0MTk1NzU3NS4zMjY0MTY3LCJleHBpcmVzX2luIjozMTU1Njk1Mn0.vjgUQj70fmCNaRR4kJf2EEKMhtKS-5Hoscw1DEnHxs8; Hm_lpvt_8b0b90b98a9a419fb90141d00647118e=1742033593; _ace_camp_tech_testing_session=TD%2Bnk6hISf9Vul%2Fof4Gz2vfmVsESuae05lmCvwkz77YbQqHDHRoT8vVuVGnV5CZ%2BoAFY102Ldyhbof4RbU0QKcqvgbnr06DPHzEOvKMZ9WiLP%2F5m3kIHRa9Pjw6qNPV6h%2B1UDbYuOCa1EkI2eGG26IB%2FNSAblmVd1w1sznIYBfFf7SHGsqDMZ4JM9%2F3n78OZY7jxQYrhGxY8efC4uZAz6u4YU5m972DdIDsxxk%2B%2BiCaYj2dk2sorULtZIMg6TV6kamvI9xeMurwDKA%3D%3D--lQbrCqYkow5pSm5%2F--s4FJAIzqb6kE4EXVY1MMWw%3D%3D',
  country: [
    'United States',
    'Canada',
    'Brazil',
    'Germany',
    'Dominican Republic',
  ],
  country_code: ['🇺🇸', '🇨🇦', '🇧🇷', '🇩🇪', '🇩🇴'],
  current_lang: 'CN',
  customer_info: [
    {
      name: 'Lu Yu',
      email: 'luyu@acecamptech.com',
      avatar:
        'https://wework.qpic.cn/wwpic3az/654320_Q8xGVqwjTXqivOC_1727064850/0',
      phone_number: '+8613261690696',
      customer_service_url:
        'https://work.weixin.qq.com/kfid/kfc4932588fb2a00cf5',
    },
    {
      name: 'Lu Yu1',
      email: 'luyu@acecamptech.com',
      avatar:
        'https://wework.qpic.cn/wwpic3az/654320_Q8xGVqwjTXqivOC_1727064850/0',
      phone_number: '+8613261690696',
      customer_service_url:
        'https://work.weixin.qq.com/kfid/kfc4932588fb2a00cf5',
    },
  ],
  gender_picker: ['Male', 'Female', 'Neutral'],
  is_login: true,
  is_vip: true,
  language: ['CN', 'EN'],
  search_history: [],
  user_info: {
    id: 50522118,
    vip: true,
    name: '用户5052211811',
    email: null,
    score: 5,
    avatar: null,
    slogan: null,
    has_vip: true,
    identity: 'unreal',
    vip_info: null,
    vip_infos: [
      {
        card: {
          id: 58,
          gift: 0,
          live: true,
          delay: 0,
          event: true,
          quota: 1,
          title: 'VIP试用卡',
          article: true,
          card_type: 'vip',
          plan_info: [
            {
              icon: 'https://static.acecamptech.com/system/vip/card/icon_research_on.png',
              limit: null,
              price: 'free',
              title: '行业调研活动',
              category: 'survey',
            },
            {
              icon: 'https://static.acecamptech.com/system/vip/card/icon_roadshow_on.png',
              limit: null,
              price: 'free',
              title: '分析师大组路演',
              category: 'road_show',
            },
            {
              icon: 'https://static.acecamptech.com/system/vip/card/icon_playback_on.png',
              limit: null,
              price: 'free',
              title: '调研回放',
              category: 'live',
            },
            {
              icon: 'https://static.acecamptech.com/system/vip/card/icon_notes_on.png',
              limit: null,
              price: 'free',
              title: '研究与调研文章',
              category: 'summary',
            },
            {
              icon: 'https://static.acecamptech.com/system/vip/card/icon_one-to-one_off.png',
              limit: null,
              price: 'need_to_pay',
              title: '分析师1v1交流',
              category: 'one_to_one',
            },
          ],
          valid_days: 1,
          camp_owners: [],
          description: null,
        },
        gift: 0,
        unit: 'D',
        state: 'available',
        title: 'VIP试用卡',
        expire: 4070880000,
        sncode: '2459206207',
        balance: 0,
        expired: false,
        en_title: 'VIP Trial',
        sc_title: 'VIP试用卡',
        available: true,
        card_type: 'vip',
        created_at: 1687240846,
        owner_type: 'Organization',
        start_time: 1687190400,
      },
    ],
    user_phones: [
      {
        region_id: 100,
        main_phone: true,
        country_code: '86',
        phone_number: '18611169707',
        country_code_id: 100,
      },
    ],
    country_code: '86',
    has_password: true,
    industry_ids: [506, 507],
    phone_number: '18611169707',
    user_resumes: [],
    default_locale: 'zh-CN',
    country_code_id: 100,
    invitation_code: 'sInL9i',
    invited_by_user: null,
    sns_career_name: 'Administrator',
    organization_user: {
      id: 10521927,
      tel: '18611169707',
      email: 'okweiwei@hotmail.com',
      owner: {
        id: 10502669,
        email: 'luyu@acecamptech.com',
        real_name: '五道口高圆圆',
      },
      state: 'passed',
      address: '桂城南海万科广场五楼万科商用物业管理有限公司',
      user_id: 50522118,
      is_owner: false,
      real_name: '刘伟巍',
      region_id: 471,
      liaison_id: null,
      region_ids: [100, 467, 471],
      shared_vip: true,
      dms_manager: false,
      irm_manager: false,
      position_id: 15,
      ai_assistant: true,
      corporations: [],
      country_code: '86',
      dismissed_at: null,
      industry_ids: [],
      introduction: null,
      organization: {
        id: 10501592,
        irm: false,
        tel: null,
        logo: 'https://image.acecamptech.com/avatar/50502613/0.659189042446954android-chrome-256x256.png?x-oss-process=style/avatar_w256',
        name: 'AceCamp本营',
        score: 1,
        state: 'passed',
        ticker: null,
        en_name: 'AceCamp',
        sc_name: 'AceCamp本营',
        tc_name: '本營國際',
        website: null,
        contacts: [],
        celebrity: false,
        deleted_at: null,
        dms_vendor: false,
        description:
          'AceCamp本营是一家专业的资本市场内容提供者。我们核心的客户是全球的上市公司及机构投资人。我们内容团队的背景都是内外资各大卖方买方的资深分析师。我们提供的内容包括专业的市场评论、行业专家访谈、上市公司投资者关系对接。同时也做定制化的调研服务。欢迎您的联系',
        industry_id: null,
        is_producer: true,
        state_events: [],
        fund_type_ids: [],
        self_employed: true,
        en_description:
          'AceCamp is a professional capital market content provider. Our focused customers are global listed companies and institutional investors. The background of our content team is senior analysts from major domestic and foreign institutions. The services we provide include professional market commentary, expert interviews, and non-deal roadshows for listed companies. At the same time, we also do customized research services. Looking forward to your contact.',
        public_contact: false,
        sc_description:
          'AceCamp本营是一家专业的资本市场内容提供者。我们核心的客户是全球的上市公司及机构投资人。我们内容团队的背景都是内外资各大卖方买方的资深分析师。我们提供的内容包括专业的市场评论、行业专家访谈、上市公司投资者关系对接。同时也做定制化的调研服务。欢迎您的联系',
        tc_description: null,
        need_allocation: false,
        dms_vendor_contact: null,
        share_display_name: 'AceCamp本营',
        management_scale_id: 0,
        allow_public_contact: true,
        organization_type_id: 5,
        sator_organization_id: 964,
        belongs_organization_id: null,
        belongs_organization_name: null,
        belongs_organization_contact: null,
      },
      state_events: [],
      business_card:
        'https://file.acecamptech.com/business_card/15459/0.12303647129428286.jpg?Expires=1736686158&OSSAccessKeyId=LTAI4G26FVKRGbcgxyxDvC89&Signature=eKgxDFwekhg0ibBQRAOrsFWd6Dw%3D',
      position_name: 'Administrator',
      shared_prepay: false,
      review_message: '后台创建',
      corporation_ids: [],
      country_code_id: 100,
      auto_ai_scheduler: false,
      region_with_parents: {
        id: 100,
        name: '中国',
        child: {
          id: 467,
          name: '广东',
          child: {
            id: 471,
            name: '珠海',
            child: null,
            level: 3,
            alpha2: '4',
            alpha3: null,
            en_name: 'Zhuhai',
            sc_name: '珠海',
            emoji_flag: null,
            country_code: null,
          },
          level: 2,
          alpha2: '44',
          alpha3: null,
          en_name: 'Guangdong',
          sc_name: '广东',
          emoji_flag: null,
          country_code: null,
        },
        level: 1,
        alpha2: 'CN',
        alpha3: 'CHN',
        en_name: 'China',
        sc_name: '中国',
        emoji_flag: '🇨🇳',
        country_code: '86',
      },
      can_change_organization: false,
    },
    ticker_region_ids: [2, 5],
    hide_employee_expert: false,
    organization_identity: 'hide',
    organization_user_lead: null,
    ai_announcement_version: null,
    has_transaction_password: false,
    sns_authorization_config: {
      authorized_organization_type_ids: [3, 5],
      authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
      en_authorized_organization_type_description:
        'In order to create a professional stock investor community, AceCamp community is only open to Institutional Investor.',
      sc_authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
    },
    sns_identity_already_set: true,
    content_language_preference: 'zh-CN',
    is_organization_type_sns_accessible: true,
    is_organization_type_minute_accessible: true,
  },
  user_info_refresh: {
    id: 50522118,
    vip: false,
    name: '用户5052211811',
    email: null,
    score: 0,
    avatar: null,
    slogan: null,
    has_vip: false,
    identity: 'unreal',
    vip_info: {},
    vip_infos: [],
    user_phones: [
      {
        region_id: 100,
        main_phone: true,
        country_code: '86',
        phone_number: '18611169707',
        country_code_id: 100,
      },
    ],
    country_code: '86',
    has_password: true,
    industry_ids: [506, 507],
    phone_number: '18611169707',
    user_resumes: [],
    default_locale: 'zh-CN',
    country_code_id: 100,
    invitation_code: 'sInL9i',
    invited_by_user: null,
    sns_career_name: '长线基金 投资人',
    organization_user: {
      id: 10521927,
      tel: '18611169707',
      email: 'okweiwei@hotmail.com',
      state: 'passed',
      address: null,
      user_id: 50522118,
      is_owner: false,
      real_name: '刘伟伟',
      region_id: null,
      liaison_id: null,
      region_ids: [1, 2, 3],
      shared_vip: false,
      dms_manager: false,
      irm_manager: false,
      position_id: 16,
      ai_assistant: false,
      corporations: [],
      country_code: '86',
      dismissed_at: null,
      industry_ids: [505, 1010, 1510],
      introduction: null,
      organization: {
        id: 20502156,
        irm: false,
        tel: null,
        logo: null,
        name: 'AceCamp Fund',
        score: 1,
        state: 'passed',
        ticker: null,
        en_name: 'AceCamp Fund',
        sc_name: 'AceCamp Fund',
        tc_name: '本營的朋友們',
        website: null,
        contacts: [],
        celebrity: false,
        deleted_at: null,
        dms_vendor: false,
        description: null,
        industry_id: null,
        is_producer: true,
        state_events: [],
        fund_type_ids: [1],
        self_employed: false,
        en_description: null,
        public_contact: false,
        sc_description: null,
        tc_description: null,
        need_allocation: false,
        dms_vendor_contact: null,
        management_scale_id: 0,
        allow_public_contact: false,
        organization_type_id: 5,
        sator_organization_id: 1134,
        belongs_organization_id: null,
        belongs_organization_name: null,
        belongs_organization_contact: null,
      },
      state_events: [],
      business_card:
        'https://file.acecamptech.com/business_card/15459/0.12303647129428286.jpg?Expires=1728918290&OSSAccessKeyId=LTAI4G26FVKRGbcgxyxDvC89&Signature=gT1s%2Fb8G4qpsygHLuRI%2F7Crqs2M%3D',
      position_name: null,
      shared_prepay: false,
      review_message: '后台创建',
      corporation_ids: [],
      country_code_id: 100,
      auto_ai_scheduler: false,
      region_with_parents: {},
      can_change_organization: false,
    },
    ticker_region_ids: [2, 5],
    organization_identity: 'display',
    organization_user_lead: null,
    ai_announcement_version: null,
    has_transaction_password: false,
    sns_authorization_config: {
      authorized_organization_type_ids: [3, 5],
      authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
      en_authorized_organization_type_description:
        'In order to create a professional stock investor community, AceCamp community is only open to Institutional Investor.',
      sc_authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
    },
    sns_identity_already_set: true,
    content_language_preference: 'zh-CN',
    is_organization_type_sns_accessible: true,
    is_organization_type_minute_accessible: true,
  },
  __env__: 'Development',
};
export const AppVariables = {
  ace_dic: {
    data: {
      posters: {
        live: {
          link: 'https://www.acecamptech.com/organizer/20507233',
          en_image:
            'https://static.acecamptech.com/system/posters/en_live_poster.png',
          sc_image:
            'https://static.acecamptech.com/system/posters/sc_live_poster.png',
        },
        event: {
          link: 'https://www.acecamptech.com/organizer/20507233',
          en_image:
            'https://static.acecamptech.com/system/posters/en_event_poster.png',
          sc_image:
            'https://static.acecamptech.com/system/posters/sc_event_poster.png',
        },
        article: {
          link: 'https://www.acecamptech.com/organizer/20505781',
          en_image:
            'https://static.acecamptech.com/system/posters/en_article_poster.png',
          sc_image:
            'https://static.acecamptech.com/system/posters/sc_article_poster.png',
        },
      },
      languages: [
        {
          id: 1,
          name: '简体中文',
          en_name: 'CN',
          sc_name: '简体中文',
          tc_name: '簡體中文',
        },
        {
          id: 2,
          name: '英语',
          en_name: 'EN',
          sc_name: '英语',
          tc_name: '英語',
        },
        {
          id: 3,
          name: '日语',
          en_name: 'JP',
          sc_name: '日语',
          tc_name: '日語',
        },
        {
          id: 4,
          name: '韩语',
          en_name: 'KR',
          sc_name: '韩语',
          tc_name: '韓語',
        },
      ],
      timezones: [
        {
          id: 1,
          code: 'Asia/Hong_Kong',
          name: 'UTC+08（Asia/Hong_Kong）北京/香港',
          en_name: 'UTC+08（Asia/Hong_Kong）Beijing/HK...',
          sc_name: 'UTC+08（Asia/Hong_Kong）北京/香港',
          tc_name: 'UTC+08（Asia/Hong_Kong）北京/香港',
        },
        {
          id: 2,
          code: 'America/New_York',
          name: 'UTC-05（America/New_York）华盛顿/纽约',
          en_name: 'UTC-05（America/New_York）Washington/New York...',
          sc_name: 'UTC-05（America/New_York）华盛顿/纽约',
          tc_name: 'UTC-05（America/New_York）华盛顿/纽约',
        },
        {
          id: 3,
          code: 'America/Los_Angeles',
          name: 'UTC-08（America/Los_Angeles）洛杉矶/旧金山',
          en_name: 'UTC-08（America/Los_Angeles）Los Angeles/San Francisco...',
          sc_name: 'UTC-08（America/Los_Angeles）洛杉矶/旧金山',
          tc_name: 'UTC-08（America/Los_Angeles）洛杉矶/旧金山',
        },
        {
          id: 4,
          code: 'Europe/Paris',
          name: 'UTC+01（Europe/Paris）巴黎/柏林',
          en_name: 'UTC+01（Europe/Paris）Paris/Berlin...',
          sc_name: 'UTC+01（Europe/Paris）巴黎/柏林',
          tc_name: 'UTC+01（Europe/Paris）巴黎/柏林',
        },
        {
          id: 5,
          code: 'America/Guatemala',
          name: 'UTC-06（America/Guatemala）芝加哥/休斯顿',
          en_name: 'UTC-06（America/Guatemala）Chicago/Houston...',
          sc_name: 'UTC-06（America/Guatemala）芝加哥/休斯顿',
          tc_name: 'UTC-06（America/Guatemala）芝加哥/休斯顿',
        },
        {
          id: 6,
          code: 'Europe/Athens',
          name: 'UTC+03（Europe/Athens）伊斯坦布尔/安卡拉',
          en_name: 'UTC+03（Europe/Athens）Istanbul/Ankara...',
          sc_name: 'UTC+03（Europe/Athens）伊斯坦布尔/安卡拉',
          tc_name: 'UTC+03（Europe/Athens）伊斯坦布尔/安卡拉',
        },
        {
          id: 7,
          code: 'Europe/London',
          name: 'UTC+00（Europe/London）伦敦/都柏林',
          en_name: 'UTC+00（Europe/London）London/Dublin...',
          sc_name: 'UTC+00（Europe/London）伦敦/都柏林',
          tc_name: 'UTC+00（Europe/London）伦敦/都柏林',
        },
      ],
      fund_types: [
        {
          id: 1,
          name: '长线基金',
          en_name: 'Long Only Fund',
          sc_name: '长线基金',
          tc_name: '長線基金',
        },
        {
          id: 2,
          name: '保险公司',
          en_name: 'Insurance Company',
          sc_name: '保险公司',
          tc_name: '保險公司',
        },
        {
          id: 3,
          name: '养老基金',
          en_name: 'Pension Fund',
          sc_name: '养老基金',
          tc_name: '養老基金',
        },
        {
          id: 4,
          name: '主权财富基金',
          en_name: 'Sovereign Wealth Fund',
          sc_name: '主权财富基金',
          tc_name: '主權財富基金',
        },
        {
          id: 5,
          name: '对冲基金/阳光私募',
          en_name: 'Hedge Fund',
          sc_name: '对冲基金/阳光私募',
          tc_name: '對沖基金/陽光私募',
        },
        {
          id: 6,
          name: '量化基金',
          en_name: 'Quant Fund',
          sc_name: '量化基金',
          tc_name: '量化基金',
        },
        {
          id: 7,
          name: '私募股权投资/风险投资',
          en_name: 'PE/VC',
          sc_name: '私募股权投资/风险投资',
          tc_name: '私募股權投資/風險投資',
        },
        {
          id: 8,
          name: '风险投资',
          en_name: 'VC',
          sc_name: '风险投资',
          tc_name: '風險投資',
        },
        {
          id: 9,
          name: '家族办公室',
          en_name: 'Family Office',
          sc_name: '家族办公室',
          tc_name: '家族辦公室',
        },
        {
          id: 11,
          name: '产业战略投资',
          en_name: 'Strategic Investment',
          sc_name: '产业战略投资',
          tc_name: '產業戰略投資',
        },
        {
          id: 12,
          name: '券商资管',
          en_name: 'Broker‘s Management',
          sc_name: '券商资管',
          tc_name: '券商資管',
        },
        {
          id: 10,
          name: '其他',
          en_name: 'Others',
          sc_name: '其他',
          tc_name: '其他',
        },
      ],
      industries: [
        {
          id: 505,
          name: '宏观',
          en_name: 'Macro',
          sc_name: '宏观',
          tc_name: '宏觀',
          custom_sector_id: null,
        },
        {
          id: 1010,
          name: '能源',
          en_name: 'Energy',
          sc_name: '能源',
          tc_name: '能源',
          custom_sector_id: null,
        },
        {
          id: 1510,
          name: '原材料',
          en_name: 'Materials',
          sc_name: '原材料',
          tc_name: '原材料',
          custom_sector_id: null,
        },
        {
          id: 2010,
          name: '资本品',
          en_name: 'Capital Goods',
          sc_name: '资本品',
          tc_name: '資本物品',
          custom_sector_id: null,
        },
        {
          id: 2020,
          name: '商业和专业服务',
          en_name: 'Commercial & Professional Services',
          sc_name: '商业和专业服务',
          tc_name: '商業與專業服務',
          custom_sector_id: null,
        },
        {
          id: 2030,
          name: '运输',
          en_name: 'Transportation',
          sc_name: '运输',
          tc_name: '運輸',
          custom_sector_id: null,
        },
        {
          id: 2510,
          name: '汽车与汽车零部件',
          en_name: 'Automobiles & Components',
          sc_name: '汽车与汽车零部件',
          tc_name: '汽車與汽車零部件',
          custom_sector_id: null,
        },
        {
          id: 2520,
          name: '耐用消费品与服装',
          en_name: 'Consumer Durables & Apparel',
          sc_name: '耐用消费品与服装',
          tc_name: '耐用消費品與服裝',
          custom_sector_id: null,
        },
        {
          id: 2530,
          name: '消费者服务',
          en_name: 'Consumer Services',
          sc_name: '消费者服务',
          tc_name: '消費者服務',
          custom_sector_id: null,
        },
        {
          id: 2550,
          name: '零售业',
          en_name: 'Retailing',
          sc_name: '零售业',
          tc_name: '零售業',
          custom_sector_id: null,
        },
        {
          id: 3010,
          name: '食品与主要用品零售',
          en_name: 'Food & Staples Retailing',
          sc_name: '食品与主要用品零售',
          tc_name: '食品與主要用品零售',
          custom_sector_id: null,
        },
        {
          id: 3020,
          name: '食品、饮料与烟草',
          en_name: 'Food, Beverage & Tobacco',
          sc_name: '食品、饮料与烟草',
          tc_name: '食品、飲品與煙草',
          custom_sector_id: null,
        },
        {
          id: 3030,
          name: '家庭与个人用品',
          en_name: 'Household & Personal Products',
          sc_name: '家庭与个人用品',
          tc_name: '家庭與個人用品',
          custom_sector_id: null,
        },
        {
          id: 3510,
          name: '医疗保健设备与服务',
          en_name: 'Health Care Equipment & Services',
          sc_name: '医疗保健设备与服务',
          tc_name: '醫療保健設備與服務',
          custom_sector_id: null,
        },
        {
          id: 3520,
          name: '制药、生物科技和生命科学',
          en_name: 'Pharmaceuticals, Biotechnology & Life Sciences',
          sc_name: '制药、生物科技和生命科学',
          tc_name: '製薬、生物科技與生命科學',
          custom_sector_id: null,
        },
        {
          id: 4010,
          name: '银行',
          en_name: 'Banks',
          sc_name: '银行',
          tc_name: '銀行',
          custom_sector_id: null,
        },
        {
          id: 4020,
          name: '综合金融',
          en_name: 'Diversified Financials',
          sc_name: '综合金融',
          tc_name: '綜合金融',
          custom_sector_id: null,
        },
        {
          id: 4030,
          name: '保险',
          en_name: 'Insurance',
          sc_name: '保险',
          tc_name: '保險',
          custom_sector_id: null,
        },
        {
          id: 4510,
          name: '软件与服务',
          en_name: 'Software & Services',
          sc_name: '软件与服务',
          tc_name: '軟件與服務',
          custom_sector_id: null,
        },
        {
          id: 4520,
          name: '技术硬件与设备',
          en_name: 'Technology Hardware & Equipment',
          sc_name: '技术硬件与设备',
          tc_name: '電腦硬件與設備',
          custom_sector_id: null,
        },
        {
          id: 4530,
          name: '半导体产品与设备',
          en_name: 'Semiconductors & Semiconductor Equipment',
          sc_name: '半导体产品与设备',
          tc_name: '半導體產品與設備',
          custom_sector_id: null,
        },
        {
          id: 5010,
          name: '电信业务',
          en_name: 'Telecommunication Services',
          sc_name: '电信业务',
          tc_name: '電訊服務',
          custom_sector_id: null,
        },
        {
          id: 5020,
          name: '媒体与娱乐',
          en_name: 'Media & Entertainment',
          sc_name: '媒体与娱乐',
          tc_name: '媒體與娛樂',
          custom_sector_id: null,
        },
        {
          id: 5510,
          name: '公用事业',
          en_name: 'Utilities',
          sc_name: '公用事业',
          tc_name: '公用事業',
          custom_sector_id: null,
        },
        {
          id: 6010,
          name: '房地产',
          en_name: 'Real Estate',
          sc_name: '房地产',
          tc_name: '房地產',
          custom_sector_id: null,
        },
      ],
      event_types: [
        {
          id: 3,
          name: '专家路演',
          en_name: 'Expert Roadshow',
          sc_name: '专家路演',
          tc_name: '专家路演',
          event_type_group: {
            id: 1,
            name: '市场洞察',
            en_name: 'Market Insights',
            sc_name: '市场洞察',
            tc_name: '市场洞察',
          },
        },
        {
          id: 8,
          name: '专家路演-1v1',
          en_name: 'Expert Roadshow(1v1)',
          sc_name: '专家路演-1v1',
          tc_name: '专家路演-1v1',
          event_type_group: {
            id: 1,
            name: '市场洞察',
            en_name: 'Market Insights',
            sc_name: '市场洞察',
            tc_name: '市场洞察',
          },
        },
        {
          id: 5,
          name: '实地调研-专家路演',
          en_name: 'Field Trip - Expert',
          sc_name: '实地调研-专家路演',
          tc_name: '实地调研-专家路演',
          event_type_group: {
            id: 1,
            name: '市场洞察',
            en_name: 'Market Insights',
            sc_name: '市场洞察',
            tc_name: '市场洞察',
          },
        },
        {
          id: 1,
          name: '自创内容路演',
          en_name: 'Roadshow for Your Own Ideas',
          sc_name: '自创内容路演',
          tc_name: '自創內容路演',
          event_type_group: {
            id: 1,
            name: '市场洞察',
            en_name: 'Market Insights',
            sc_name: '市场洞察',
            tc_name: '市场洞察',
          },
        },
        {
          id: 9,
          name: '自创内容路演-1v1',
          en_name: 'Roadshow for Your Own Ideas(1v1)',
          sc_name: '自创内容路演-1v1',
          tc_name: '自创内容路演-1v1',
          event_type_group: {
            id: 1,
            name: '市场洞察',
            en_name: 'Market Insights',
            sc_name: '市场洞察',
            tc_name: '市场洞察',
          },
        },
        {
          id: 2,
          name: '上市公司路演',
          en_name: 'Company Roadshow',
          sc_name: '上市公司路演',
          tc_name: '上市公司路演',
          event_type_group: {
            id: 2,
            name: '企业活动',
            en_name: 'Corporate Events',
            sc_name: '企业活动',
            tc_name: '企业活动',
          },
        },
        {
          id: 4,
          name: '实地调研-上市公司路演',
          en_name: 'Field Trip – Companies',
          sc_name: '实地调研-上市公司路演',
          tc_name: '实地调研-上市公司路演',
          event_type_group: {
            id: 2,
            name: '企业活动',
            en_name: 'Corporate Events',
            sc_name: '企业活动',
            tc_name: '企业活动',
          },
        },
        {
          id: 6,
          name: '企业业绩报告',
          en_name: 'Corporate Earnings',
          sc_name: '企业业绩报告',
          tc_name: '企业业绩报告',
          event_type_group: {
            id: 3,
            name: '企业业绩报告',
            en_name: 'Corporate Earnings',
            sc_name: '企业业绩报告',
            tc_name: '企业业绩报告',
          },
        },
      ],
      event_months: [
        { name: '2024年06月', value: '1717171200,1719763199' },
        { name: '2024年07月', value: '1719763200,1722441599' },
        { name: '2024年08月', value: '1722441600,1725119999' },
        { name: '2024年09月', value: '1725120000,1727711999' },
        { name: '2024年10月', value: '1727712000,1730390399' },
        { name: '2024年11月', value: '1730390400,1732982399' },
        { name: '2024年12月', value: '1732982400,1735660799' },
      ],
      custom_sectors: [
        {
          id: 1,
          name: '宏观、政策',
          en_name: 'Macro & Policy',
          sc_name: '宏观、政策',
          tc_name: '宏观、政策',
        },
        {
          id: 2,
          name: '汽车',
          en_name: 'Automobile',
          sc_name: '汽车',
          tc_name: '汽车',
        },
        {
          id: 3,
          name: '医疗健康',
          en_name: 'Health Care',
          sc_name: '医疗健康',
          tc_name: '医疗健康',
        },
        {
          id: 4,
          name: '消费',
          en_name: 'Consumer',
          sc_name: '消费',
          tc_name: '消费',
        },
        { id: 5, name: 'TMT', en_name: 'TMT', sc_name: 'TMT', tc_name: 'TMT' },
        {
          id: 6,
          name: '半导体',
          en_name: 'Semiconductor',
          sc_name: '半导体',
          tc_name: '半导体',
        },
        {
          id: 7,
          name: '地产',
          en_name: 'Real Estate',
          sc_name: '地产',
          tc_name: '地产',
        },
        {
          id: 8,
          name: '电力、新能源',
          en_name: 'Power & Renewable Energy',
          sc_name: '电力、新能源',
          tc_name: '电力、新能源',
        },
        {
          id: 9,
          name: '金融',
          en_name: 'Finance',
          sc_name: '金融',
          tc_name: '金融',
        },
        {
          id: 10,
          name: '周期、大宗、有色',
          en_name: 'Cycle & Commodity & Non-ferrous Metals',
          sc_name: '周期、大宗、有色',
          tc_name: '周期、大宗、有色',
        },
        {
          id: 11,
          name: '制造业',
          en_name: '​Manufacturing',
          sc_name: '制造业',
          tc_name: '制造业',
        },
        {
          id: 12,
          name: '未上市巨头',
          en_name: 'Unicorn',
          sc_name: '未上市巨头',
          tc_name: '未上市巨头',
        },
      ],
      ticker_regions: [
        {
          id: 1,
          name: 'China A',
          en_name: 'China A',
          sc_name: 'China A',
          tc_name: 'China A',
        },
        { id: 2, name: 'HK', en_name: 'HK', sc_name: 'HK', tc_name: 'HK' },
        { id: 3, name: 'TW', en_name: 'TW', sc_name: 'TW', tc_name: 'TW' },
        {
          id: 4,
          name: 'China ADR',
          en_name: 'China ADR',
          sc_name: 'China ADR',
          tc_name: 'China ADR',
        },
        { id: 5, name: 'US', en_name: 'US', sc_name: 'US', tc_name: 'US' },
        { id: 6, name: 'EU', en_name: 'EU', sc_name: 'EU', tc_name: 'EU' },
        {
          id: 7,
          name: 'Japan',
          en_name: 'Japan',
          sc_name: 'Japan',
          tc_name: 'Japan',
        },
        {
          id: 8,
          name: 'Korea',
          en_name: 'Korea',
          sc_name: 'Korea',
          tc_name: 'Korea',
        },
        {
          id: 9,
          name: 'Others',
          en_name: 'Others',
          sc_name: 'Others',
          tc_name: 'Others',
        },
      ],
      guest_positions: [
        {
          id: 1,
          name: '卖方分析师',
          en_name: 'Sell-side Analyst',
          sc_name: '卖方分析师',
        },
        {
          id: 2,
          name: '买方分析师',
          en_name: 'Buy-side Analyst',
          sc_name: '买方分析师',
        },
        {
          id: 3,
          name: '机构投资者',
          en_name: 'Institution Investor',
          sc_name: '机构投资者',
        },
        {
          id: 4,
          name: '个人投资者',
          en_name: 'Individual Investor',
          sc_name: '个人投资者',
        },
        { id: 5, name: '记者', en_name: 'Journalist', sc_name: '记者' },
        { id: 6, name: '员工', en_name: 'Employee', sc_name: '员工' },
        { id: 7, name: '其他', en_name: 'Other', sc_name: '其他' },
      ],
      capital_positions: [
        {
          id: 1,
          name: 'Chairman',
          type: 'CapitalPosition',
          en_name: 'Chairman',
          sc_name: 'Chairman',
          tc_name: 'Chairman',
        },
        {
          id: 2,
          name: 'CEO',
          type: 'CapitalPosition',
          en_name: 'CEO',
          sc_name: 'CEO',
          tc_name: 'CEO',
        },
        {
          id: 3,
          name: 'CIO',
          type: 'CapitalPosition',
          en_name: 'CIO',
          sc_name: 'CIO',
          tc_name: 'CIO',
        },
        {
          id: 4,
          name: 'Founder',
          type: 'CapitalPosition',
          en_name: 'Founder',
          sc_name: 'Founder',
          tc_name: 'Founder',
        },
        {
          id: 5,
          name: 'Partner',
          type: 'CapitalPosition',
          en_name: 'Partner',
          sc_name: 'Partner',
          tc_name: 'Partner',
        },
        {
          id: 6,
          name: 'Managing Director',
          type: 'CapitalPosition',
          en_name: 'Managing Director',
          sc_name: 'Managing Director',
          tc_name: 'Managing Director',
        },
        {
          id: 7,
          name: 'Executive Director',
          type: 'CapitalPosition',
          en_name: 'Executive Director',
          sc_name: 'Executive Director',
          tc_name: 'Executive Director',
        },
        {
          id: 8,
          name: 'Investment Director',
          type: 'CapitalPosition',
          en_name: 'Investment Director',
          sc_name: 'Investment Director',
          tc_name: 'Investment Director',
        },
        {
          id: 9,
          name: 'Senior Investment Manager',
          type: 'CapitalPosition',
          en_name: 'Senior Investment Manager',
          sc_name: 'Senior Investment Manager',
          tc_name: 'Senior Investment Manager',
        },
        {
          id: 10,
          name: 'Investment Manager',
          type: 'CapitalPosition',
          en_name: 'Investment Manager',
          sc_name: 'Investment Manager',
          tc_name: 'Investment Manager',
        },
        {
          id: 11,
          name: 'Senior Analyst',
          type: 'CapitalPosition',
          en_name: 'Senior Analyst',
          sc_name: 'Senior Analyst',
          tc_name: 'Senior Analyst',
        },
        {
          id: 12,
          name: 'Analyst',
          type: 'CapitalPosition',
          en_name: 'Analyst',
          sc_name: 'Analyst',
          tc_name: 'Analyst',
        },
        {
          id: 13,
          name: 'Trader',
          type: 'CapitalPosition',
          en_name: 'Trader',
          sc_name: 'Trader',
          tc_name: 'Trader',
        },
        {
          id: 14,
          name: 'Corporate Access',
          type: 'CapitalPosition',
          en_name: 'Corporate Access',
          sc_name: 'Corporate Access',
          tc_name: 'Corporate Access',
        },
        {
          id: 15,
          name: 'Administrator',
          type: 'CapitalPosition',
          en_name: 'Administrator',
          sc_name: 'Administrator',
          tc_name: 'Administrator',
        },
        {
          id: 16,
          name: 'Others',
          type: 'CapitalPosition',
          en_name: 'Others',
          sc_name: 'Others',
          tc_name: 'Others',
        },
        {
          id: 32,
          name: 'VP',
          type: 'CapitalPosition',
          en_name: 'VP',
          sc_name: 'VP',
          tc_name: 'VP',
        },
        {
          id: 33,
          name: 'SVP',
          type: 'CapitalPosition',
          en_name: 'SVP',
          sc_name: 'SVP',
          tc_name: 'SVP',
        },
      ],
      event_type_groups: [
        {
          id: 1,
          name: '市场洞察',
          en_name: 'Market Insights',
          sc_name: '市场洞察',
          tc_name: '市场洞察',
        },
        {
          id: 2,
          name: '企业活动',
          en_name: 'Corporate Events',
          sc_name: '企业活动',
          tc_name: '企业活动',
        },
        {
          id: 3,
          name: '企业业绩报告',
          en_name: 'Corporate Earnings',
          sc_name: '企业业绩报告',
          tc_name: '企业业绩报告',
        },
      ],
      management_scales: [
        {
          id: 1,
          unit: 'Million',
          lower: '0',
          upper: '100',
          currency: 'USD',
          description: '[0,100) Million',
        },
        {
          id: 2,
          unit: 'Million',
          lower: '100',
          upper: '500',
          currency: 'USD',
          description: '[100,500) Million',
        },
        {
          id: 3,
          unit: 'Million',
          lower: '500',
          upper: '1000',
          currency: 'USD',
          description: '[500,1000) Million',
        },
        {
          id: 4,
          unit: 'Billion',
          lower: '1',
          upper: '5',
          currency: 'USD',
          description: '[1,5) Billion',
        },
        {
          id: 5,
          unit: 'Billion',
          lower: '5',
          upper: '10',
          currency: 'USD',
          description: '[5,10) Billion',
        },
        {
          id: 6,
          unit: 'Billion',
          lower: '10',
          upper: '50',
          currency: 'USD',
          description: '[10,50) Billion',
        },
        {
          id: 7,
          unit: 'Billion',
          lower: '50',
          upper: '100',
          currency: 'USD',
          description: '[50,100) Billion',
        },
        {
          id: 8,
          unit: 'Billion',
          lower: '100',
          upper: '500',
          currency: 'USD',
          description: '[100,500) Billion',
        },
      ],
      organization_types: [
        {
          id: 5,
          name: '机构投资人',
          type: 'Capital',
          en_name: 'Institutional Investor',
          sc_name: '机构投资人',
          tc_name: '機構投資人',
          priority: 10,
          type_name: '投资者',
          description: null,
          en_type_name: 'Investor',
          sc_type_name: '投资者',
          tc_type_name: '投資者',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
        {
          id: 4,
          name: '个人投资人',
          type: 'Capital',
          en_name: 'Individual Investor',
          sc_name: '个人投资人',
          tc_name: '個人投資人',
          priority: 20,
          type_name: '投资者',
          description: null,
          en_type_name: 'Investor',
          sc_type_name: '投资者',
          tc_type_name: '投資者',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
        {
          id: 7,
          name: '上市公司投资部',
          type: 'Capital',
          en_name: 'Investment Department of Corporate',
          sc_name: '上市公司投资部',
          tc_name: '上市公司投資部',
          priority: 30,
          type_name: '投资者',
          description: null,
          en_type_name: 'Investor',
          sc_type_name: '投资者',
          tc_type_name: '投資者',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
        {
          id: 6,
          name: '上市公司IR',
          type: 'Corporation',
          en_name: 'IR of Corporate',
          sc_name: '上市公司IR',
          tc_name: '上市公司IR',
          priority: 40,
          type_name: '上市公司',
          description: null,
          en_type_name: 'Corporate',
          sc_type_name: '上市公司',
          tc_type_name: '上市公司',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
        {
          id: 1,
          name: '券商',
          type: 'Agency',
          en_name: 'Brokerage',
          sc_name: '券商',
          tc_name: '券商',
          priority: 50,
          type_name: '卖方',
          description: null,
          en_type_name: 'Seller',
          sc_type_name: '卖方',
          tc_type_name: '賣方',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
        {
          id: 2,
          name: '第三方独立机构',
          type: 'Agency',
          en_name: 'Independent Institution',
          sc_name: '第三方独立机构',
          tc_name: '第三方獨立研究機構',
          priority: 60,
          type_name: '卖方',
          description:
            '专注于公共关系、投资者关系或者其他投资相关内容研究的公司',
          en_type_name: 'Seller',
          sc_type_name: '卖方',
          tc_type_name: '賣方',
          en_description:
            'Corporates that focused on public relations, investor relations, or other investment-related content research.',
          sc_description:
            '专注于公共关系、投资者关系或者其他投资相关内容研究的公司',
          tc_description:
            '專注於公共關係、投資者關係或者其他投資相關內容研究的公司',
        },
        {
          id: 3,
          name: '第三方独立个人',
          type: 'Agency',
          en_name: 'Independent Individual',
          sc_name: '第三方独立个人',
          tc_name: '第三方獨立個人',
          priority: 70,
          type_name: '卖方',
          description: '独立分析师等',
          en_type_name: 'Seller',
          sc_type_name: '卖方',
          tc_type_name: '賣方',
          en_description: 'Independent analyst. etc',
          sc_description: '独立分析师等',
          tc_description: '獨立分析師等',
        },
        {
          id: 8,
          name: '卖方分析师',
          type: 'Agency',
          en_name: 'Sell-side Analyst',
          sc_name: '卖方分析师',
          tc_name: '卖方分析师',
          priority: 80,
          type_name: '卖方',
          description: null,
          en_type_name: 'Seller',
          sc_type_name: '卖方',
          tc_type_name: '賣方',
          en_description: null,
          sc_description: null,
          tc_description: null,
        },
      ],
      corporation_positions: [
        {
          id: 17,
          name: 'Chairman',
          type: 'CorporationPosition',
          en_name: 'Chairman',
          sc_name: 'Chairman',
          tc_name: 'Chairman',
        },
        {
          id: 18,
          name: 'CFO',
          type: 'CorporationPosition',
          en_name: 'CFO',
          sc_name: 'CFO',
          tc_name: 'CFO',
        },
        {
          id: 19,
          name: 'CSO',
          type: 'CorporationPosition',
          en_name: 'CSO',
          sc_name: 'CSO',
          tc_name: 'CSO',
        },
        {
          id: 20,
          name: 'COO',
          type: 'CorporationPosition',
          en_name: 'COO',
          sc_name: 'COO',
          tc_name: 'COO',
        },
        {
          id: 21,
          name: 'Board/Company Secretary',
          type: 'CorporationPosition',
          en_name: 'Board/Company Secretary',
          sc_name: 'Board/Company Secretary',
          tc_name: 'Board/Company Secretary',
        },
        {
          id: 22,
          name: 'Senior VP',
          type: 'CorporationPosition',
          en_name: 'Senior VP',
          sc_name: 'Senior VP',
          tc_name: 'Senior VP',
        },
        {
          id: 23,
          name: 'VP',
          type: 'CorporationPosition',
          en_name: 'VP',
          sc_name: 'VP',
          tc_name: 'VP',
        },
        {
          id: 24,
          name: 'Head of IR',
          type: 'CorporationPosition',
          en_name: 'Head of IR',
          sc_name: 'Head of IR',
          tc_name: 'Head of IR',
        },
        {
          id: 25,
          name: 'IR Manager',
          type: 'CorporationPosition',
          en_name: 'IR Manager',
          sc_name: 'IR Manager',
          tc_name: 'IR Manager',
        },
        {
          id: 26,
          name: 'IR Director',
          type: 'CorporationPosition',
          en_name: 'IR Director',
          sc_name: 'IR Director',
          tc_name: 'IR Director',
        },
        {
          id: 27,
          name: 'Finance Controller',
          type: 'CorporationPosition',
          en_name: 'Finance Controller',
          sc_name: 'Finance Controller',
          tc_name: 'Finance Controller',
        },
        {
          id: 28,
          name: 'Securities Representative',
          type: 'CorporationPosition',
          en_name: 'Securities Representative',
          sc_name: 'Securities Representative',
          tc_name: 'Securities Representative',
        },
        {
          id: 29,
          name: 'IR',
          type: 'CorporationPosition',
          en_name: 'IR',
          sc_name: 'IR',
          tc_name: 'IR',
        },
        {
          id: 30,
          name: 'Assistant',
          type: 'CorporationPosition',
          en_name: 'Assistant',
          sc_name: 'Assistant',
          tc_name: 'Assistant',
        },
        {
          id: 31,
          name: 'Others',
          type: 'CorporationPosition',
          en_name: 'Others',
          sc_name: 'Others',
          tc_name: 'Others',
        },
      ],
    },
  },
  base_url: 'https://m.ca3test.com',
  customer_list: '',
  document_selected: true,
  empty_svg: 'https://static.acecamptech.com/system/empty.svg',
  favorite_medium_selected: false,
  favorite_selected: false,
  favorite_small_selected: false,
  industries: [
    {
      id: 505,
      name: '宏观',
      en_name: 'Macro',
      sc_name: '宏观',
      tc_name: '宏觀',
      custom_sector_id: null,
    },
  ],
  label_picker_checkedall: false,
  label_picker_current_selected_size: 0,
  label_picker_current_selected_values: [],
  label_picker_dic_name: '',
  label_picker_modal_shown: false,
  modal_cover_shown: false,
  notification_account: false,
  notification_booking: true,
  notification_card: false,
  notification_ticket: false,
  scroll_picker_current_selected_index: 1,
  scroll_picker_modal_data: {
    data: [
      { name: 'yyyy', label: 'xxx' },
      { name: 'xxxx', label: 'zzz' },
    ],
  },
  scroll_picker_modal_shown: false,
  scroll_picker_modal_title: '',
  scroll_picker_setting: '{"callbackMethod":"idSelected","valueVar":"real"}',
  seats_number: 1,
  tag_all_selected: true,
  tag_art_selected: false,
  tag_fashion_selected: false,
  tag_food_selected: false,
  tag_music_selected: false,
  tag_workshop_selected: false,
  ticker_regions: [
    {
      id: 1,
      name: 'China A',
      checked: false,
      en_name: 'China A',
      sc_name: 'China A',
      tc_name: 'China A',
    },
  ],
  'user-agent':
    'AceCamp/1.5.2(51) (iPhone15,4;18.1.1;Scale/3.00) NetType/WIFI Channel/AppStore',
  user_avatar:
    'https://images.unsplash.com/photo-1530659100910-af50b8ce9ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80',
  user_id: 1,
  user_info_edit_status: false,
  user_info_edit_text: '编辑',
  user_info_fresh111: {
    id: 50522118,
    vip: false,
    name: '用户5052211811',
    email: null,
    score: 0,
    avatar: null,
    slogan: null,
    has_vip: false,
    identity: 'unreal',
    vip_info: {},
    vip_infos: [],
    user_phones: [
      {
        region_id: 100,
        main_phone: true,
        country_code: '86',
        phone_number: '18611169707',
        country_code_id: 100,
      },
    ],
    country_code: '86',
    has_password: true,
    industry_ids: [506, 507],
    phone_number: '18611169707',
    user_resumes: [],
    default_locale: 'zh-CN',
    country_code_id: 100,
    invitation_code: 'sInL9i',
    invited_by_user: null,
    sns_career_name: '长线基金 投资人',
    organization_user: {
      id: 10521927,
      tel: '18611169707',
      email: 'okweiwei@hotmail.com',
      state: 'passed',
      address: null,
      user_id: 50522118,
      is_owner: false,
      real_name: '刘伟伟',
      region_id: null,
      liaison_id: null,
      region_ids: [1, 2, 3],
      shared_vip: false,
      dms_manager: false,
      irm_manager: false,
      position_id: 16,
      ai_assistant: false,
      corporations: [],
      country_code: '86',
      dismissed_at: null,
      industry_ids: [505, 1010, 1510],
      introduction: null,
      organization: {
        id: 20502156,
        irm: false,
        tel: null,
        logo: null,
        name: 'AceCamp Fund',
        score: 1,
        state: 'passed',
        ticker: null,
        en_name: 'AceCamp Fund',
        sc_name: 'AceCamp Fund',
        tc_name: '本營的朋友們',
        website: null,
        contacts: [],
        celebrity: false,
        deleted_at: null,
        dms_vendor: false,
        description: null,
        industry_id: null,
        is_producer: true,
        state_events: [],
        fund_type_ids: [1],
        self_employed: false,
        en_description: null,
        public_contact: false,
        sc_description: null,
        tc_description: null,
        need_allocation: false,
        dms_vendor_contact: null,
        management_scale_id: 0,
        allow_public_contact: false,
        organization_type_id: 5,
        sator_organization_id: 1134,
        belongs_organization_id: null,
        belongs_organization_name: null,
        belongs_organization_contact: null,
      },
      state_events: [],
      business_card:
        'https://file.acecamptech.com/business_card/15459/0.12303647129428286.jpg?Expires=1728918290&OSSAccessKeyId=LTAI4G26FVKRGbcgxyxDvC89&Signature=gT1s%2Fb8G4qpsygHLuRI%2F7Crqs2M%3D',
      position_name: null,
      shared_prepay: false,
      review_message: '后台创建',
      corporation_ids: [],
      country_code_id: 100,
      auto_ai_scheduler: false,
      region_with_parents: {},
      can_change_organization: false,
    },
    ticker_region_ids: [2, 5],
    organization_identity: 'display',
    organization_user_lead: null,
    ai_announcement_version: null,
    has_transaction_password: false,
    sns_authorization_config: {
      authorized_organization_type_ids: [3, 5],
      authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
      en_authorized_organization_type_description:
        'In order to create a professional stock investor community, AceCamp community is only open to Institutional Investor.',
      sc_authorized_organization_type_description:
        '为打造专业股票投资人社区，社区仅开放给通过认证的机构投资人。',
    },
    sns_identity_already_set: true,
    content_language_preference: 'zh-CN',
    is_organization_type_sns_accessible: true,
    is_organization_type_minute_accessible: true,
  },
  user_name: 'Andrew Ainsley',
  vip_seats_number: 1,
  wechat_app_code: 'ww739781476623d91d',
  wechat_app_id: 'wx6e85184451cb50b6',
};
const GlobalVariableContext = React.createContext();
const GlobalVariableUpdater = React.createContext();
const keySuffix = '';

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key + keySuffix, JSON.stringify(value)]);

    if (update.length > 0) {
      await AsyncStorage.multiSet(update);
    }

    return update;
  }

  static async loadLocalStorage() {
    const keys = Object.keys(DeviceVariables);
    const entries = await AsyncStorage.multiGet(
      keySuffix ? keys.map(k => k + keySuffix) : keys
    );

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key_, value]) => {
      // Keys only have the suffix appended in storage; strip the key
      // after they are retrieved
      const key = keySuffix ? key_.replace(keySuffix, '') : key_;
      return [key, value ? tryParseJson(value) : DeviceVariables[key]];
    });

    return Object.fromEntries(withDefaults);
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  };

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true };
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true };
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state;
      default:
        return state;
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  };
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState);

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage();
        if (
          payload?.__env__ &&
          DeviceVariables.__env__ &&
          payload.__env__ !== DeviceVariables.__env__
        ) {
          console.log(
            `Publication Environment changed from ${payload.__env__} to ${DeviceVariables.__env__}. Refreshing variables`
          );
          dispatch({
            type: 'LOAD_FROM_ASYNC_STORAGE',
            payload: DeviceVariables,
          });
        } else {
          dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload });
        }
      } catch (err) {
        console.error(err);
      }
    }
    initialStorageLoader();
  }, []);

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values);
      } catch (err) {
        console.error(err);
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage();
    }
  }, [state]);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.__loaded) {
      await SplashScreen.hideAsync();
    }
  }, [state.__loaded]);

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null;
  }

  return (
    <GlobalVariableUpdater.Provider
      value={dispatch}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableContext.Provider value={state.values}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater);
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

export function useValues() {
  return React.useContext(GlobalVariableContext);
}
