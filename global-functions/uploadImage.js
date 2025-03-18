import * as HttpClient from '../custom-files/HttpClient';
import * as ShakeAnimation from '../custom-files/ShakeAnimation';
import * as gf from '../custom-files/gf';

const uploadImage = async (fileInfo, scope) => {
  try {
    let name = '';
    let data;
    let contentType = 'image/jpeg';
    if (fileInfo.name) {
      name = fileInfo.name;
      data = fileInfo.value.split(',')[1];
      contentType = getContentType(name);
    } else {
      data = fileInfo.split(',')[1];
      contentType = fileInfo.split(',')[0].split(';')[0].split(':')[1]; //data:image/jpeg;base6
    }
    console.log('contentType = ' + contentType);
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
    console.log('token response   ' + response);
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
      // const contentType = 'image/jpeg';
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
        Host: 'ace-file-staging.oss-accelerate.aliyuncs.com',
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

  function getContentType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
      txt: 'text/plain',
      html: 'text/html',
      htm: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
      xml: 'application/xml',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      bmp: 'image/bmp',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
      pdf: 'application/pdf',
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      // 添加更多需要的 MIME 类型
    };

    return mimeTypes[extension] || 'application/octet-stream';
  }
};

export default uploadImage;
