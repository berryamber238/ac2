import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import assetToBase64 from './assetToBase64';

const selectFile = async ({
  returnNameAndValue = false,
  multiple = false,
  outputBase64 = true,
}) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      multiple,
    });

    if (result.canceled) {
      console.error('Select file canceled');
      return;
    }

    const assets = result.assets;

    if (!assets || assets.length === 0) {
      console.error('No assets were returned with the select file action');
      return;
    }

    const processAsset = async asset => {
      const value = outputBase64 ? await assetToBase64(asset) : asset;
      return returnNameAndValue ? { name: asset.name, value } : value;
    };

    if (multiple) {
      return Promise.all(assets.map(processAsset));
    } else {
      return processAsset(assets[0]);
    }
  } catch (error) {
    console.error('Error in selectFile:', error);
  }
};

export default selectFile;
