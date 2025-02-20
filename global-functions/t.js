import * as Language from '../custom-files/Language.json';

// 获取翻译值
const t = (Variables, o) => {
  return Language[Variables['current_lang']][o]?.toString();
};

export default t;
