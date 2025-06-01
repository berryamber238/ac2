import { LiveInfo } from "../LiveInfo";
import * as GlobalVariables from "../../config/GlobalVariableContext";
import { LiveFlag } from "../utils/LiveFlag";
import eventBus from "../eventBus";
export class UrlUtil {
  /**
   * 静态变量SP_LIVE_NAME_SPACE
   */
  static SP_LIVE_NAME_SPACE = "sp_live_name_space";

  /**
   * 获取 URL 中指定 name 的 value
   * @param url URL 字符串
   * @param name 参数名
   * @returns 参数值
   */
  static getValueByName(url: string, name: string): string {
    let result = "";
    const index = url.indexOf("?");
    if (index !== -1) {
      const temp = url.substring(index + 1);
      const keyValue = temp.split("&");
      for (const str of keyValue) {
        if (str.includes(name)) {
          result = str.replace(`${name}=`, "");
          break;
        }
      }
    }
    return result;
  }

  /**
   * 获取 URL 中的 meetingId
   * @param url URL 字符串
   * @returns meetingId
   */
  static getMeetingId(url: string): string {
    const index = url.indexOf("?");
    const temp = index !== -1 ? url.substring(0, index) : url;
    const keyValue = temp.split("/");
    return keyValue.length > 1 ? keyValue[keyValue.length - 2] : "";
  }

  /**
   * 获取 URL 中的 live_id
   * @param url URL 字符串
   * @returns live_id
   */
  static getLiveId(url: string): string {
    const index = url.indexOf("?");
    const temp = index !== -1 ? url.substring(0, index) : url;
    const keyValue = temp.split("/");
    return keyValue.length > 1 ? keyValue[keyValue.length - 1] : "";
  }

  /**
   * 获取分享 URL
   * @param url URL 字符串
   * @param liveInfo LiveInfo 对象
   * @returns 分享 URL
   */
  static getShareUrl(url: string, liveInfo: LiveInfo): string {
    const index = url.indexOf("?");
    if (liveInfo.meeting?.event_id) {
      return index !== -1
        ? `${url.substring(0, index)}?event_id=${liveInfo.meeting.event_id}`
        : `${url}?event_id=${liveInfo.meeting.event_id}`;
    }
    return index !== -1 ? url.substring(0, index) : url;
  }

  static saveLiveId(liveId: string) {
    const Variables = GlobalVariables.useValues();
    const setGlobalVariableValue = GlobalVariables.useSetValue();
    const live_flag = Variables["live_flag"];
    let liveFlags = live_flag as Array<LiveFlag>;
    if (live_flag && live_flag.length > 0) {
      //遍历live_flag数组中的每个对象，如果该对象的liveId属性等于传入的liveId，则直接返回

      for (let i = 0; i < liveFlags.length; i++) {
        if (liveFlags[i].getLiveId() === liveId) {
          return;
        }
      }
      // for (LiveFlag liveFlag : liveFlags) {
      //     if (liveFlag.getLiveId().equals(liveId)) return;
      // }
    } else {
      // 如果live_flag数组为空，则创建一个新的ArrayList
      // liveFlags = new ArrayList<>();
      liveFlags = new Array<LiveFlag>();
    }
    // 创建一个新的LiveFlag对象，并将其添加到liveFlags数组中
    const liveFlag = new LiveFlag(liveId, new Date().getTime());
    liveFlags.push(liveFlag);
    // 将liveFlags数组保存到SharedPreferences中
    setGlobalVariableValue({ key: "live_flag", value: liveFlags });
  }
}
import { LivePager } from "./LivePager";

export function getLivePagers(
  uidList: number[],
  homeUid: string,
  isLocalScreen: boolean,
  localUid: number,
  liveId: string
): LivePager[] {
  const livePagers: LivePager[] = [];
  const homeUids: number[] = [];
  let newUid: number[] = [];

  if (homeUid.length > 0) {
    homeUids.push(parseInt(homeUid));
    if (uidList.includes(parseInt(homeUid))) {
      for (const uid of uidList) {
        if (homeUid !== uid.toString()) {
          newUid.push(uid);
        }
      }
    } else {
      newUid = uidList;
    }
  } else {
    newUid = uidList;
  }

  const homeLivePager = new LivePager(
    true,
    isLocalScreen,
    localUid,
    homeUids,
    liveId
  );
  livePagers.push(homeLivePager);

  console.log("newUid", newUid);
  console.log("homeUid", homeUid);

  const livingId: number[] = [...uidList];
  if (isLocalScreen) {
    livingId.push(localUid);
  }

  // 模拟 SPUtils 的存储操作
  // SPUtils.getInstance(SP_LIVE_NAME_SPACE + liveId).put("living_id", livingId);
  const Variables = GlobalVariables.useValues();
  let sp_live_data = Variables[UrlUtil.SP_LIVE_NAME_SPACE + liveId];
  if (!sp_live_data) {
    sp_live_data = {};
  }
  sp_live_data.living_id = livingId;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  setGlobalVariableValue({
    key: UrlUtil.SP_LIVE_NAME_SPACE + liveId,
    value: sp_live_data,
  });

  // 模拟 LiveEventBus 的事件发布
  // LiveEventBus.get("LIVE_SCREEN_REFRESH").post(1);
  eventBus.emit("LIVE_SCREEN_REFRESH", { data: 1 });

  for (let i = 0; i < newUid.length; i += 4) {
    const uid: number[] = [];
    if (newUid[i] !== undefined) {
      uid.push(newUid[i]);
    }
    if (i + 1 < newUid.length) {
      uid.push(newUid[i + 1]);
    }
    if (i + 2 < newUid.length) {
      uid.push(newUid[i + 2]);
    }
    if (i + 3 < newUid.length) {
      uid.push(newUid[i + 3]);
    }
    const livePager = new LivePager(
      false,
      isLocalScreen,
      localUid,
      uid,
      liveId
    );
    livePagers.push(livePager);
  }

  return livePagers;
}
