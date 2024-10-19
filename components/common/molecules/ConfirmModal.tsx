import React from 'react';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  titleKey?: string;
  messageKey?: string;
  confirmTextKey?: string;
  cancelTextKey?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  titleKey,
  messageKey,
  confirmTextKey = 'common.yes',
  cancelTextKey = 'common.no',
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => onCancel()}
    >
      <Card disabled={true} style={styles.card}>
        <View style={styles.textContainer}>
          {titleKey && <Text style={styles.title}>{t(titleKey)}</Text>}
          {messageKey && <Text style={styles.message}>{t(messageKey)}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => onConfirm()}>
            {t(confirmTextKey)}
          </Button>
          <Button
            style={styles.button}
            status="basic"
            onPress={() => onCancel()}
          >
            {t(cancelTextKey)}
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 20,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 10,
  },
});

export default ConfirmModal;
