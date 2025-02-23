import * as HttpClient from '../custom-files/HttpClient';
import * as ShakeAnimation from '../custom-files/ShakeAnimation';
import * as gf from '../custom-files/gf';

const uploadImage2 = async (fileInfo, scope) => {
  try {
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
  }
};

export default uploadImage2;
