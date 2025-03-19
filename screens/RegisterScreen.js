import React from "react";
import {
  Button,
  ExpoImage,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  TextInput,
  Timer,
  Touchable,
  withTheme,
} from "@draftbit/ui";
import { Image, Keyboard, Text, View } from "react-native";
import * as GlobalStyles from "../GlobalStyles.js";
import * as GlobalVariables from "../config/GlobalVariableContext";
import Images from "../config/Images";
import * as HttpClient from "../custom-files/HttpClient";
import * as ShakeAnimation from "../custom-files/ShakeAnimation";
import * as Toast from "../custom-files/Toast";
import * as gf from "../custom-files/gf";
import HttpRequest from "../global-functions/HttpRequest";
import ShowToast from "../global-functions/ShowToast";
import jsonToFormData from "../global-functions/jsonToFormData";
import t from "../global-functions/t";
import palettes from "../themes/palettes";
import * as Utils from "../utils";
import Breakpoints from "../utils/Breakpoints";
import * as StyleSheet from "../utils/StyleSheet";
import imageSource from "../utils/imageSource";
import openImagePickerUtil from "../utils/openImagePicker";
import useWindowDimensions from "../utils/useWindowDimensions";

const RegisterScreen = (props) => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [agreementChecked, setAgreementChecked] = React.useState(false);
  const [areaCodeId, setAreaCodeId] = React.useState(100);
  const [areaCodeValue, setAreaCodeValue] = React.useState("86");
  const [codeError, setCodeError] = React.useState(false);
  const [companyNameError, setCompanyNameError] = React.useState(false);
  const [companyNameInputValue, setCompanyNameInputValue] = React.useState("");
  const [emailInputValue, setEmailInputValue] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState("");
  const [focus, setFocus] = React.useState(0);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [imgData, setImgData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [nameInputValue, setNameInputValue] = React.useState("");
  const [passwordInputValue, setPasswordInputValue] = React.useState("");
  const [phoneInputValue, setPhoneInputValue] = React.useState("");
  const [phoneLogin, setPhoneLogin] = React.useState(true);
  const [sentVCodeBtn, setSentVCodeBtn] = React.useState(
    t(Variables, "login_in_get_vc")
  );
  const [showVcodeTip, setShowVcodeTip] = React.useState(false);
  const [userError, setUserError] = React.useState(false);
  const [vCodeStatus, setVCodeStatus] = React.useState("waiting");
  const [vcodeInputValue, setVcodeInputValue] = React.useState("");
  const [vcodeLogin, setVcodeLogin] = React.useState(true);
  const [workingMailError, setWorkingMailError] = React.useState(false);
  const [workingMailInputValue, setWorkingMailInputValue] = React.useState("");
  const getRequestCodeData = () => {
    // {
    //   "scene": "ic_message",
    //   "code_scope": "login",
    //   "phone_number": "18611169707",
    //   "country_code_id": 100
    // }

    const data = {};
    data.scene = "ic_message";
    data.code_scope = "signup";
    if (phoneLogin) {
      data.phone_number = phoneInputValue;
      data.country_code_id = areaCodeId;
    } else {
      data.email = emailInputValue;
    }

    return data;
  };

  const openCountryList = (navigation) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    navigation.push("MineCountryCodeListScreen", {
      id: areaCodeId,
      callback: selectedAreaCodeCallback,
    });
  };

  const selectedAreaCodeCallback = (id, code) => {
    setAreaCodeValue(code);
    setAreaCodeId(id);
  };

  const signup = async () => {
    setIsLoading(true);

    if (!agreementChecked) {
      triggerShake();
      ShowToast(t(Variables, "please_check_the_privacy"));
      setIsLoading(false);
      return;
    }

    let hasError = false;
    const data = {};
    if (phoneLogin) {
      if (phoneInputValue.length <= 8) {
        hasError = true;
        setUserError(true);
      }
      data.country_code_id = areaCodeId;
      data.phone_number = phoneInputValue;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInputValue)) {
        hasError = true;
        setUserError(true);
      }
      data.email = emailInputValue;
    }

    if (vcodeInputValue.length < 6) {
      hasError = true;
      setCodeError(true);
    }
    data.code = vcodeInputValue;
    //个人信息，如果上传名片则不需要输入姓名等信息。
    if (fileUrl && fileUrl.length > 10) {
      data.business_card = fileUrl;
    } else {
      if (nameInputValue.trim().length <= 0) {
        setNameError(true);
        hasError = true;
      }
      if (workingMailInputValue.trim().length <= 0) {
        setWorkingMailError(true);
        hasError = true;
      }

      if (companyNameInputValue.trim().length <= 0) {
        setCompanyNameError(true);
        hasError = true;
      }
      data.name = nameInputValue;
      data.company_name = companyNameInputValue;
      data.work_email = workingMailInputValue;
    }

    if (hasError === true) {
      setIsLoading(false);
      return;
    }
    try {
      const url = HttpClient.apiEndpoints["signup"];
      // const response = await HttpClient.fetcher(url.url,url.method,data);
      const response = null;

      if (response.code != 200) {
        ShowToast(response?.msg);
        return;
      }
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace("BottomTabNavigator", {
        screen: "Mine",
        params: { screen: "MineIndexScreen" },
      });

      setIsLoading(false);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const testupload = async (file) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    const s = "FU38pDWVfRHvLCpKnkGU8EiexieHnVngm58v4x7ewYt8";
    const f = `PUT

image/jpeg
Wed, 30 Oct 2024 17:57:14 GMT
x-oss-security-token:CAIS/QJ1q6Ft5B2yfSjIr5DFftjev5xH/6/cb1XD12U3drdqrKDalTz2IHpLfHBgBuEas/o3mW5R6/YYlrl6QJIAS03AYI5r8p1Y8AWuO2IyUFFwt+5qsoasPETOIfGSvqaLEQyQLr70fvOqdCqz9Etayqf7cjOPRkGsNYbz57dsctUQWHvXD1dBH8wEZHFdyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNka/N4xHF3lrh0b1X9cajK5OpKsdtOJo6SMu80+1wee3LzTVR7RVR75B9hbZIvjqa5tqXCFcNukqKaK2W0KU2dVMkOPllSvYY9KanzKQhgIGJydSrkSQqFPpOTiHSSLqnxMb5A+6zPr47D+2hZCyUgo/easSr6156OC9LbhkhfME6OpD9vNDd4t2wwMaFj7OqCm/LI8DtuComCQrRMIjG124rNooiMlSIUFf5y6VGG2cCHTD484KPjIFoXYLiPZ0J6Vibo+cXTlRqzYmM26m6aWWtZi8/15UagAFeQxmdovZ9KZPHsfZTZFse2OwartmaxPDRUzIwKB8u/Vz0SGohh3xdflTzWSuTvrplwyzgiU/zVd77jeW61brLynlch3omi79n8qazcfYvdPzMlW+Zr15RVGah+aGVjAZYDlvMbyLUfBGGvcXstnTMBSR69rkHiD1kkGwbO3Zj1yAA
/ace-file-staging/business_card/e50cbcf417d3/1730311034343.jpg`;

    const signature = gf.crypto.createHmac("sha1", gf.Buffer.from(s, "utf-8"));
    const signedinifo = signature
      .update(gf.Buffer.from(f, "utf-8"))
      .digest("base64");
    console.log(signedinifo);

    console.log(gf.CryptoJS.HmacSHA1(f, s).toString(gf.CryptoJS.enc.Base64));
  };

  const upload_image = async (navigation, fileInfo) => {
    setIsLoading(true);
    setImgData(fileInfo);

    try {
      const data = fileInfo.split(",")[1];
      // 将 Base64 编码的文件转换为二进制数据
      const binaryFile = gf.Buffer.from(data, "base64");
      const endpoint = HttpClient.apiEndpoints["oss_token"];
      const url = new URL(endpoint.url);
      const params = { token_scope: "business_card" };
      Object.keys(params).forEach((key) =>
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
      const fileName = `${response.data.allow_path}/${Date.now()}.png`;
      let uploadUrl = `https://${bucketName}.${region}/${fileName}`;
      try {
        // 构建待签名字符串
        const method = "PUT";
        const contentMd5 = "";
        const contentType = "image/png";
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
          "Content-Type": contentType,
          "x-oss-security-token": SecurityToken,
          Authorization: authorization,
          Date: date,
          Host: bucketName + ".oss-accelerate.aliyuncs.com",

          "User-Agent":
            "aliyun-sdk-android/2.9.3(Linux/Android 11/sdk_gphone_x86;RSR1.201013.001)",
        };
        // 上传文件到 OSS
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: header,
          body: binaryFile,
        });
        console.log(uploadResponse);
        if (uploadResponse.status === 200) {
          console.log(uploadResponse);
          setFileUrl(`${fileDomain}/${fileName}`);
          ShowToast("上传成功！");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const shakeAnimationRef = React.useRef();

  const triggerShake = () => {
    if (shakeAnimationRef.current) {
      shakeAnimationRef.current.startShake();
    }
  };
  const vcodeInputn7G9XZKtRef = React.useRef();
  const nameInputzmIHA68ZRef = React.useRef();
  const workingMailInputS6phqLzGRef = React.useRef();
  const companyNameInputkR8CHfppRef = React.useRef();
  const timerHuGZitnfRef = React.useRef();

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { justifyContent: "space-between" },
        dimensions.width
      )}
    >
      {/* 标题 */}
      <View
        onLayout={(event) => {
          try {
            setSentVCodeBtn(t(Variables, "login_in_get_vc"));
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            width: "100%",
          },
          dimensions.width
        )}
      >
        {/* Left Section */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: "center", flexDirection: "row" },
            dimensions.width
          )}
        >
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.App.appStyle_greyscale_800}
            icon={"AntDesign/left"}
            size={28}
          />
          {/* 标题-文字 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)["Text 2113"].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)["Text 2113"].style,
                { fontSize: 28, lineHeight: 36, margin: 5 }
              ),
              dimensions.width
            )}
          >
            {t(Variables, "login_sign_up")}
          </Text>
        </View>
        {/* Right Section */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: "center",
              backgroundColor: "rgb(243, 247, 250)",
              borderRadius: 4,
              flexDirection: "row",
              height: 35,
              padding: 3,
              width: 160,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                setPhoneLogin(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App.appStyle_white,
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: phoneLogin
                        ? palettes.App.appStyle_white
                        : "#f3f7fa",
                    },
                  ],
                  borderRadius: 4,
                  height: 29,
                  justifyContent: "center",
                  marginRight: 4,
                  width: 75,
                },
                dimensions.width
              )}
            >
              <Link
                accessible={true}
                selectable={false}
                {...GlobalStyles.LinkStyles(theme)["Link"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinkStyles(theme)["Link"].style,
                    {
                      color: phoneLogin
                        ? palettes.Brand.appStyle_primary
                        : "#596a7a",
                      fontFamily: "System",
                      fontSize: 14,
                      fontWeight: "400",
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, "register_phone")}`}
              />
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setPhoneLogin(false);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App.appStyle_white,
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: !phoneLogin
                        ? palettes.App.appStyle_white
                        : "#f3f7fa",
                    },
                  ],
                  borderRadius: 4,
                  height: 29,
                  justifyContent: "center",
                  marginRight: 4,
                  width: 75,
                },
                dimensions.width
              )}
            >
              <Link
                accessible={true}
                selectable={false}
                {...GlobalStyles.LinkStyles(theme)["Link"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinkStyles(theme)["Link"].style,
                    {
                      color: !phoneLogin
                        ? palettes.Brand.appStyle_primary
                        : "#596a7a",
                      fontFamily: "System",
                      fontSize: 14,
                      fontWeight: "400",
                    }
                  ),
                  dimensions.width
                )}
                title={`${t(Variables, "common_email")}`}
              />
            </View>
          </Touchable>
        </View>
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={"never"}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: "flex-start" },
          dimensions.width
        )}
      >
        {/* Login Form */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 24, paddingLeft: 36, paddingRight: 36 },
            dimensions.width
          )}
        >
          {/* 手机号Form Item */}
          <>
            {!phoneLogin ? null : (
              <View>
                {/* 手机号Label */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, "common_phone")}
                </Text>
                {/* 手机号录入框 */}
                <View
                  {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)["Login Form Container"]
                        .style,
                      {
                        borderColor:
                          focus === 1
                            ? palettes.Brand.Primary
                            : userError
                            ? palettes.Brand.Error
                            : palettes.App["Custom Color 4"],
                        borderWidth: focus === 1 || userError ? 1.5 : 1,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        openCountryList(navigation);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Text Form Label"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Text Form Label"]
                            .style,
                          {
                            color: palettes.Brand.appStyle_primary,
                            fontFamily: "Urbanist_400Regular",
                            fontSize: 14,
                            paddingRight: 2,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {"+"}
                      {areaCodeValue}
                    </Text>
                  </Touchable>
                  <Icon
                    color={palettes.Brand.Primary}
                    name={"AntDesign/down"}
                    size={14}
                    style={StyleSheet.applyWidth(
                      { marginRight: 4 },
                      dimensions.width
                    )}
                  />
                  {/* phone input */}
                  <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onBlur={() => {
                      try {
                        setFocus(0);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onChangeText={(newPhoneInputValue) => {
                      try {
                        setPhoneInputValue(newPhoneInputValue);
                        if (newPhoneInputValue.trim()?.length > 4) {
                          setVCodeStatus("no");
                        } else {
                          setVCodeStatus("waiting");
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onFocus={() => {
                      try {
                        setFocus(1);
                        setUserError(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onSubmitEditing={() => {
                      try {
                        vcodeInputn7G9XZKtRef.current.focus();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.TextInputStyles(theme)["Login Input"]
                      .props}
                    keyboardType={"numeric"}
                    maxLength={11}
                    placeholder={
                      t(Variables, "login_enter_your_phone").toString() ??
                      "Email"
                    }
                    returnKeyType={"next"}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextInputStyles(theme)["Login Input"].style,
                      dimensions.width
                    )}
                    textContentType={"emailAddress"}
                    value={phoneInputValue}
                    webShowOutline={false}
                  />
                </View>
              </View>
            )}
          </>
          {/* 邮件Form Item */}
          <>
            {!!phoneLogin ? null : (
              <View>
                {/* 邮件地址Label */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, "common_email")}
                </Text>
                {/* 邮件地址录入框 */}
                <View
                  {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)["Login Form Container"]
                        .style,
                      {
                        borderColor:
                          focus === 2
                            ? palettes.Brand.Primary
                            : userError
                            ? palettes.Brand.Error
                            : palettes.App["Custom Color 4"],
                        borderWidth: [
                          { minWidth: Breakpoints.Mobile, value: 1.5 },
                          {
                            minWidth: Breakpoints.Mobile,
                            value: focus === 2 || userError ? 1.5 : 1,
                          },
                        ],
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* email input */}
                  <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onBlur={() => {
                      try {
                        setFocus(0);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onChangeText={(newEmailInputValue) => {
                      try {
                        setEmailInputValue(newEmailInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onFocus={() => {
                      try {
                        setFocus(2);
                        setUserError(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.TextInputStyles(theme)["Login Input"]
                      .props}
                    keyboardType={"email-address"}
                    placeholder={
                      t(Variables, "login_enter_your_email").toString() ??
                      "Email"
                    }
                    returnKeyType={"next"}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)["Login Input"]
                          .style,
                        { paddingLeft: null }
                      ),
                      dimensions.width
                    )}
                    textContentType={"emailAddress"}
                    value={emailInputValue}
                    webShowOutline={false}
                  />
                </View>
              </View>
            )}
          </>
          <View style={StyleSheet.applyWidth({ height: 20 }, dimensions.width)}>
            {/* 用户信息提醒 */}
            <>
              {!userError ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                      {
                        color: "rgb(255, 75, 75)",
                        fontFamily: "System",
                        fontSize: 14,
                        fontWeight: "400",
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {userError
                    ? phoneLogin
                      ? t(Variables, "warning_phone_required")
                      : t(Variables, "warning_email_valid")
                    : undefined}
                </Text>
              )}
            </>
          </View>
          <Spacer left={8} right={8} bottom={3} top={3} />
          {/* 验证码Form Item */}
          <>
            {!vcodeLogin ? null : (
              <View>
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: "center",
                      alignSelf: "auto",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                    dimensions.width
                  )}
                >
                  {/* 验证码Label */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, "common_verification_code")}
                  </Text>
                </View>
                {/* 验证码录入框 */}
                <View
                  {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                    .props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ViewStyles(theme)["Login Form Container"]
                        .style,
                      {
                        borderColor:
                          focus === 3
                            ? palettes.Brand.Primary
                            : codeError
                            ? palettes.Brand.Error
                            : palettes.App["Custom Color 4"],
                        borderWidth: [
                          { minWidth: Breakpoints.Mobile, value: 1.5 },
                          {
                            minWidth: Breakpoints.Mobile,
                            value: focus === 3 || codeError ? 1.5 : 1,
                          },
                        ],
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* vcode input */}
                  <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onBlur={() => {
                      try {
                        setFocus(0);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onChangeText={(newVcodeInputValue) => {
                      try {
                        setVcodeInputValue(newVcodeInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onFocus={() => {
                      try {
                        setFocus(3);
                        setCodeError(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    onSubmitEditing={() => {
                      try {
                        nameInputzmIHA68ZRef.current.focus();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.TextInputStyles(theme)["Login Input"]
                      .props}
                    keyboardType={"numeric"}
                    maxLength={6}
                    placeholder={
                      t(
                        Variables,
                        "login_enter_verification_code"
                      ).toString() ?? "Email"
                    }
                    ref={vcodeInputn7G9XZKtRef}
                    returnKeyType={"next"}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)["Login Input"]
                          .style,
                        { paddingLeft: null }
                      ),
                      dimensions.width
                    )}
                    textContentType={"emailAddress"}
                    value={vcodeInputValue}
                    webShowOutline={false}
                  />
                  <View
                    style={StyleSheet.applyWidth(
                      { overflow: "hidden", paddingRight: 14 },
                      dimensions.width
                    )}
                  >
                    {/* 获取验证码 */}
                    <Touchable
                      onPress={() => {
                        const handler = async () => {
                          try {
                            timerHuGZitnfRef.current?.reset(120000);

                            timerHuGZitnfRef.current?.start();

                            setSentVCodeBtn(120);
                            setVCodeStatus("waiting");
                            setShowVcodeTip(true);
                            const result = await HttpRequest(
                              "request_code",
                              jsonToFormData(getRequestCodeData())
                            );
                            console.log(result);
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      disabled={vCodeStatus === "waiting"}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)["Text Form Label"]
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)["Text Form Label"]
                              .style,
                            {
                              color: [
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value: palettes.Brand.itemTextNomal,
                                },
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value:
                                    vCodeStatus !== "waiting"
                                      ? palettes.Brand.appStyle_primary
                                      : "#596a7a",
                                },
                              ],
                              fontFamily: "Urbanist_400Regular",
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {sentVCodeBtn}
                        {vCodeStatus === "waiting" &&
                        parseInt(sentVCodeBtn, 10) >= 0
                          ? "s"
                          : ""}
                      </Text>
                    </Touchable>
                  </View>
                </View>
              </View>
            )}
          </>
          {/* 验证码信息提示 */}
          <View style={StyleSheet.applyWidth({ height: 20 }, dimensions.width)}>
            {/* 发送成功提醒 */}
            <>
              {!(showVcodeTip && vcodeLogin) ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                      {
                        color: palettes.Brand.appStyle_primary,
                        fontFamily: "System",
                        fontSize: 14,
                        fontWeight: "400",
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, "register_vc_send")}
                  {phoneLogin
                    ? areaCodeValue + phoneInputValue
                    : emailInputValue}
                  {t(Variables, "register_vc_min")}
                </Text>
              )}
            </>
            {/* 密码信息提醒 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                  {
                    color: "rgb(255, 75, 75)",
                    fontFamily: "System",
                    fontSize: 14,
                    fontWeight: "400",
                  }
                ),
                dimensions.width
              )}
            >
              {codeError
                ? vcodeLogin
                  ? t(Variables, "warning_verification_code_required")
                  : t(Variables, "warning_password_required")
                : undefined}
            </Text>
          </View>
          {/* 提示信息 */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 10 }, dimensions.width)}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["16_Title"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["16_Title"].style,
                  { fontFamily: "Urbanist_400Regular", fontSize: 14 }
                ),
                dimensions.width
              )}
            >
              {t(Variables, "register_select_info")}
            </Text>
          </View>
          {/* 图片上传 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: "rgb(245, 245, 245)",
                borderRadius: 8,
                marginTop: 14,
                padding: 16,
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["16_Title"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["16_Title"].style,
                    { fontFamily: "Urbanist_400Regular", fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, "register_business_card")}
                {t(Variables, "register_recommend")}
                {t(Variables, "register_more_equity")}
              </Text>
            </View>

            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    const result = await openImagePickerUtil({
                      mediaTypes: "Images",
                      allowsEditing: false,
                      quality: 1,
                      allowsMultipleSelection: false,
                      outputBase64: true,
                    });

                    await upload_image(navigation, result);
                    /* hidden 'Run a Custom Function' action */
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    backgroundColor: "rgb(229, 229, 245)",
                    borderColor: palettes.Brand.appStyle_primary,
                    borderRadius: 8,
                    borderStyle: "dashed",
                    borderWidth: 1,
                    height: 168,
                    justifyContent: "center",
                    marginTop: 14,
                    overflow: "hidden",
                  },
                  dimensions.width
                )}
              >
                <>
                  {!(imgData?.length < 1000) ? null : (
                    <Icon
                      size={24}
                      color={palettes.Brand.appStyle_primary}
                      name={"AntDesign/plus"}
                      style={StyleSheet.applyWidth(
                        { position: "relative", zIndex: 10 },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={"disk"}
                  contentPosition={"center"}
                  transitionDuration={300}
                  transitionEffect={"cross-dissolve"}
                  transitionTiming={"ease-in-out"}
                  {...GlobalStyles.ExpoImageStyles(theme)["Image 3"].props}
                  resizeMode={"stretch"}
                  source={imageSource(imgData)}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)["Image 3"].style,
                      { height: "100%", position: "absolute", width: "100%" }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </Touchable>
          </View>
          {/* 信息录入区域 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: "rgb(245, 245, 245)",
                borderRadius: 8,
                marginTop: 14,
                padding: 16,
              },
              dimensions.width
            )}
          >
            {/* 姓名Item */}
            <View>
              {/* 姓名Label */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                    {
                      color: "rgb(69, 69, 69)",
                      fontFamily: "System",
                      fontWeight: "400",
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, "common_name")}
              </Text>
              {/* 姓名录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)["Login Form Container"]
                      .style,
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderColor:
                        focus === 6
                          ? palettes.Brand.Primary
                          : nameError
                          ? palettes.Brand.Error
                          : palettes.App["Custom Color 4"],
                      borderWidth: focus === 6 || nameError ? 1.5 : 1,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* name input */}
                <TextInput
                  autoCapitalize={"none"}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={(newNameInputValue) => {
                    try {
                      setNameInputValue(newNameInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(6);
                      setUserError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    try {
                      workingMailInputS6phqLzGRef.current.focus();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)["Login Input"].props}
                  keyboardType={"default"}
                  maxLength={11}
                  placeholder={
                    t(Variables, "register_enter_your_name").toString() ??
                    "Email"
                  }
                  ref={nameInputzmIHA68ZRef}
                  returnKeyType={"next"}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)["Login Input"].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={"emailAddress"}
                  value={nameInputValue}
                  webShowOutline={false}
                />
              </View>

              <View
                style={StyleSheet.applyWidth({ height: 30 }, dimensions.width)}
              >
                {/* 录入错误提醒 */}
                <>
                  {!nameError ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Text Form Label"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Text Form Label"]
                            .style,
                          {
                            color: "rgb(255, 75, 75)",
                            fontFamily: "System",
                            fontSize: 14,
                            fontWeight: "400",
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, "warning_name_required")}
                    </Text>
                  )}
                </>
              </View>
            </View>
            {/* 工作邮箱Item */}
            <View>
              {/* 工作邮箱Label */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                    {
                      color: "rgb(69, 69, 69)",
                      fontFamily: "System",
                      fontWeight: "400",
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, "register_work_email")}
              </Text>
              {/* 工作邮箱录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)["Login Form Container"]
                      .style,
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderColor:
                        focus === 4
                          ? palettes.Brand.Primary
                          : workingMailError
                          ? palettes.Brand.Error
                          : palettes.App["Custom Color 4"],
                      borderWidth: focus === 4 || workingMailError ? 1.5 : 1,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* working mail input */}
                <TextInput
                  autoCapitalize={"none"}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={(newWorkingMailInputValue) => {
                    try {
                      setWorkingMailInputValue(newWorkingMailInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(4);
                      setUserError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    try {
                      companyNameInputkR8CHfppRef.current.focus();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)["Login Input"].props}
                  keyboardType={"email-address"}
                  maxLength={11}
                  placeholder={
                    t(Variables, "register_enter_your_work_email").toString() ??
                    "Email"
                  }
                  ref={workingMailInputS6phqLzGRef}
                  returnKeyType={"next"}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)["Login Input"].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={"emailAddress"}
                  value={workingMailInputValue}
                  webShowOutline={false}
                />
              </View>

              <View
                style={StyleSheet.applyWidth({ height: 30 }, dimensions.width)}
              >
                {/* 录入错误提醒 */}
                <>
                  {!workingMailError ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Text Form Label"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Text Form Label"]
                            .style,
                          {
                            color: "rgb(255, 75, 75)",
                            fontFamily: "System",
                            fontSize: 14,
                            fontWeight: "400",
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, "warning_work_email_required")}
                    </Text>
                  )}
                </>
              </View>
            </View>
            {/* 公司名称Item */}
            <View>
              {/* 公司名称Label */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Text Form Label"].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)["Text Form Label"].style,
                    {
                      color: "rgb(69, 69, 69)",
                      fontFamily: "System",
                      fontWeight: "400",
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, "register_company_name")}
              </Text>
              {/* 公司名称录入框 */}
              <View
                {...GlobalStyles.ViewStyles(theme)["Login Form Container"]
                  .props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ViewStyles(theme)["Login Form Container"]
                      .style,
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderColor:
                        focus === 5
                          ? palettes.Brand.Primary
                          : companyNameError
                          ? palettes.Brand.Error
                          : palettes.App["Custom Color 4"],
                      borderWidth: focus === 5 || companyNameError ? 1.5 : 1,
                    }
                  ),
                  dimensions.width
                )}
              >
                {/* company name input */}
                <TextInput
                  autoCapitalize={"none"}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onBlur={() => {
                    try {
                      setFocus(0);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onChangeText={(newCompanyNameInputValue) => {
                    try {
                      setCompanyNameInputValue(newCompanyNameInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onFocus={() => {
                    try {
                      setFocus(5);
                      setUserError(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  onSubmitEditing={() => {
                    try {
                      Keyboard.dismiss();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.TextInputStyles(theme)["Login Input"].props}
                  keyboardType={"default"}
                  maxLength={11}
                  placeholder={
                    t(
                      Variables,
                      "register_enter_your_company_name"
                    ).toString() ?? "Email"
                  }
                  ref={companyNameInputkR8CHfppRef}
                  returnKeyType={"done"}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)["Login Input"].style,
                      { paddingLeft: null }
                    ),
                    dimensions.width
                  )}
                  textContentType={"emailAddress"}
                  value={companyNameInputValue}
                  webShowOutline={false}
                />
              </View>

              <View
                style={StyleSheet.applyWidth({ height: 30 }, dimensions.width)}
              >
                {/* 录入错误提醒 */}
                <>
                  {!companyNameError ? null : (
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)["Text Form Label"]
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)["Text Form Label"]
                            .style,
                          {
                            color: "rgb(255, 75, 75)",
                            fontFamily: "System",
                            fontSize: 14,
                            fontWeight: "400",
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, "warning_company_name_required")}
                    </Text>
                  )}
                </>
              </View>
            </View>
          </View>
          {/* Sign up Button */}
          <Button
            accessible={true}
            iconPosition={"left"}
            onPress={() => {
              const handler = async () => {
                try {
                  await signup();
                  /* hidden 'Run a Custom Function' action */
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            disabled={isLoading}
            loading={isLoading}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.appStyle_primary,
                borderRadius: 4,
                fontFamily: "System",
                fontSize: 16,
                fontWeight: "700",
                height: 45,
                marginTop: 30,
                textAlign: "center",
              },
              dimensions.width
            )}
            title={`${t(Variables, "login_sign_up")}`}
          >
            {"Sign Up"}
          </Button>
          {/* 登录tip View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)["Text Form Label 2"].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)["Text Form Label 2"].style,
                  { color: "rgb(89, 106, 122)" }
                ),
                dimensions.width
              )}
            >
              {t(Variables, "login_have_account")}
            </Text>

            <Touchable
              onPress={() => {
                try {
                  if (navigation.canGoBack()) {
                    navigation.popToTop();
                  }
                  navigation.replace("Tickets");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)["Text Form Label 2"].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)["Text Form Label 2"].style,
                  dimensions.width
                )}
              >
                {t(Variables, "login_in")}
              </Text>
            </Touchable>
          </View>
          {/* Custom Code 2 */}
          <Utils.CustomCodeErrorBoundary>
            <ShakeAnimation.view ref={shakeAnimationRef}>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: "center",
                    alignSelf: "center",
                    flexDirection: "row",
                    height: 50,
                    justifyContent: "center",
                    width: "100%",
                  },
                  dimensions.width
                )}
              >
                <Touchable
                  onPress={() => {
                    try {
                      setAgreementChecked(!agreementChecked);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Image
                    resizeMode={"cover"}
                    {...GlobalStyles.ImageStyles(theme)["Image"].props}
                    source={imageSource(
                      agreementChecked
                        ? Images["icselectactive"]
                        : Images["icselectdefault"]
                    )}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)["Image"].style,
                        { height: 16, marginRight: 4, width: 16 }
                      ),
                      dimensions.width
                    )}
                  />
                </Touchable>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)["Text Tip"].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)["Text Tip"].style,
                    dimensions.width
                  )}
                >
                  {t(Variables, "login_in_agree")}
                  <Link
                    accessible={true}
                    onPress={() => {
                      try {
                        navigation.navigate("WebViewScreen", {
                          url: "https://terms.acecamptech.com/privacy/20210726/index.html",
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    selectable={false}
                    {...GlobalStyles.LinkStyles(theme)["Link"].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.LinkStyles(theme)["Link"].style,
                      dimensions.width
                    )}
                    title={`${t(Variables, "the_privacy")}`}
                  />
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)["Text Tip"].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)["Text Tip"].style,
                      dimensions.width
                    )}
                  >
                    {t(Variables, "common_and")}
                  </Text>
                  {/* Link 2 */}
                  <Link
                    accessible={true}
                    onPress={() => {
                      try {
                        navigation.navigate("WebViewScreen", {
                          url: "https://terms.acecamptech.com/agreement/index.html",
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    selectable={false}
                    {...GlobalStyles.LinkStyles(theme)["Link"].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.LinkStyles(theme)["Link"].style,
                      dimensions.width
                    )}
                    title={`${t(Variables, "login_in_service")}`}
                  />
                </Text>
              </View>
            </ShakeAnimation.view>
          </Utils.CustomCodeErrorBoundary>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
      <Timer
        onTimerChange={(newTimerValue) => {
          try {
            const valuejAlbb02C = sentVCodeBtn - 1;
            const result = valuejAlbb02C;
            setSentVCodeBtn(valuejAlbb02C);
          } catch (err) {
            console.error(err);
          }
        }}
        onTimerEnd={() => {
          try {
            setSentVCodeBtn(t(Variables, "common_Resend"));
            setVCodeStatus("sent");
          } catch (err) {
            console.error(err);
          }
        }}
        updateInterval={1000}
        {...GlobalStyles.TimerStyles(theme)["Timer"].props}
        countDirection={"down"}
        format={"ss:ms"}
        initialTime={60000}
        ref={timerHuGZitnfRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TimerStyles(theme)["Timer"].style, {
            opacity: 0,
          }),
          dimensions.width
        )}
        timerEndTime={0}
      />
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(RegisterScreen);
