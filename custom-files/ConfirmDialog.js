import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ConfirmDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmBtn,
  cancelBtn,
  negativeBtn,
  onNegative,
  type,
  id,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
      presentationStyle="overFullScreen"
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>{cancelBtn}</Text>
            </TouchableOpacity>
            {negativeBtn ? (
              <TouchableOpacity
                style={[styles.button, styles.negativeButton]}
                onPress={() => onNegative(type, id)}
              >
                <Text style={styles.buttonText}>{negativeBtn}</Text>
              </TouchableOpacity>
            ) : null}
            {confirmBtn ? (
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => onConfirm(type, id)}
              >
                <Text style={styles.buttonText}>{confirmBtn}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  confirmButton: {
    backgroundColor: '#2B33E6',
  },
  negativeButton: {
    backgroundColor: '#FF4C4C',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
