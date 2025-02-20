import React from 'react';
import { Modal, View, Image, StyleSheet } from 'react-native';

export const LoadingModal = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://static.ca3test.com/www/static/media/acecamp-gif.95f7bf80.gif',
            }} // 替换为你的 GIF 图片 URL
            style={styles.loadingImage}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 半透明背景
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  loadingImage: {
    width: 30, // 根据需要调整宽度
    height: 30, // 根据需要调整高度
  },
});
