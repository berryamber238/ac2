// fetcher.js
import React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splitString = str => {
  const regex = /,(?![^=]*;)/;
  return str.split(regex);
};

const saveCookies = async cookies => {
  const newCookie = mergeCookies(
    await AsyncStorage.getItem('cookies'),
    splitString(cookies)
  );
  await AsyncStorage.setItem('cookies', newCookie);
};

const getCookies = async () => {
  // 自定义读取cookie的方法
  return await AsyncStorage.getItem('cookies');
};

export const fetcher = async (url, method, data, userCookie) => {
  const cookies = await getCookies();
  const headers = {
    // 'User-Agent': 'AceCamp/1.6.0(100)',
    'User-Agent':
      'AceCamp/1.5.1(42) Dalvik/2.1.0 (Linux; U; Android 11; sdk_gphone_x86 Build/RSR1.201013.001) NetType/4G Resolution/2712_1344',
    'Content-Type':
      typeof data === 'string'
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    Cookie: userCookie ? userCookie : cookies || '',
  };

  const options = {
    method,
    headers,
    credentials: 'include',
  };

  if (method.toUpperCase() === 'GET' && data) {
    // 将参数转换为查询字符串
    const queryString = new URLSearchParams(data).toString();
    url += `?${queryString}`;
  } else {
    // 将参数转换为 JSON body
    // options.body = JSON.stringify(data);
    if (data) {
      options.body = typeof data === 'string' ? data : JSON.stringify(data);
    }
  }

  const response = await fetch(url, options);

  const responseCookies = response.headers.get('Set-Cookie');
  if (responseCookies) {
    // console.log('cookie for save:' + responseCookies);
    await saveCookies(responseCookies);
  }

  return response;
  // const result = await response.json();

  // return new Promise(resolve => {
  //   debugger;
  //   resolve({ result, responseCookies });
  // });
};

const mergeCookies = (existingCookies, setCookieHeaders) => {
  const cookieMap = new Map();
  // 解析现有的 cookies
  existingCookies?.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    cookieMap.set(name.trim(), rest.join('='));
  });
  // 解析新的 Set-Cookie 头
  setCookieHeaders?.forEach(header => {
    header.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      cookieMap.set(name.trim(), rest.join('='));
    });
  });

  // 生成合并后的 cookie 字符串
  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
};

const uri = 'https://api.ca3test.com/api/v1';
// const uri = "https://api.acecamptech.com/api/v1"
export const apiEndpoints = {
  //获取短信验证码
  request_code: {
    method: 'POST',
    url: uri + '/users/request_code',
  },
  login: {
    method: 'POST',
    url: uri + '/users/login',
  },
  signup: {
    method: 'POST',
    url: uri + '/users/signup',
  },
  oss_token: {
    method: 'GET',
    url: uri + '/oss/oss_token',
  },
  version_info: {
    method: 'GET',
    url: uri + '/app/version_info',
  },
  banners_list: {
    method: 'GET',
    url: uri + '/banners/list',
  },
  createUser: {
    method: 'POST',
    url: '/user',
  },
  liveToken: {
    method: 'POST',
    url: uri + '/agoras/lives/{{live_id}}/token',
  },
  meeting_list: {
    method: 'GET',
    url: uri + '/events/meeting_month_list',
  },

  me_info: {
    method: 'GET',
    url: uri + '/users/me?get_follows=true&with_owner=true&with_resume=true',
  },
  // 其他的endpoint
};
