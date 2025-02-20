// This import is required if you are defining react components in this module.
import React, { useState, useEffect } from 'react';
import { fetcher } from './HttpClient';
import * as GlobalVariableContext from '../config/GlobalVariableContext';
// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
function fetch(url, method, data) {
  const [result, setResult] = useState('');
  const setGlobalVariable = GlobalVariableContext.useSetValue();
  useEffect(() => {
    let isMounted = true; // 防止内存泄漏

    fetcher(url, method, data).then(response => {
      if (isMounted) {
        // 自定义保存cookie的方法
        if (response.responseCookies) {
          setGlobalVariable({ key: 'cookie', value: response.responseCookies });
        }
        setResult(response.result);
      }
    });
    return () => {
      isMounted = false; // 清理函数
    };
  }, []);

  return result;
}

export { fetch };
