import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import SimpleButton from '../button/SimpleButton';
import TextInput from '../input/TextInput';
import {GroceryItem} from '../../database/models/GroceryItem';
import {
  validateGroceryName,
  validateGroceryQuantity,
} from '../../utils/Validations';

interface GroceryModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onConfirmBtnClick: (item: GroceryItem) => void;
  mode: 'add' | 'edit';
  userId: number;
  groceryItem: GroceryItem | null;
}

const GroceryModal = ({
  visible,
  setVisible,
  onConfirmBtnClick,
  mode,
  userId,
  groceryItem,
}: GroceryModalProps) => {
  const [name, setName] = useState<string>(groceryItem?.name || '');
  const [quantity, setQuantity] = useState<string>(groceryItem?.quantity || '');

  const [errors, setError] = useState<{
    nameError: string;
    quantityError: string;
  }>({nameError: '', quantityError: ''});

  const handleActionButton = () => {
    const nameError = validateGroceryName(name);
    const quantityError = validateGroceryQuantity(quantity);

    setError({nameError, quantityError});

    if (!nameError && !quantityError) {
      const _groceryItem = {
        id: groceryItem?.id || 0,
        name,
        quantity,
        hasBought: false,
        userId,
      };
      setVisible(false);
      onConfirmBtnClick(_groceryItem);
    }
  };

  const closeModal = () => setVisible(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={() => setVisible(false)}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.title}>
                {mode === 'add' ? 'Add' : 'Update'} Grocery Item
              </Text>
              <View style={styles.input}>
                <TextInput
                  placeholder="enter the name"
                  label="Name"
                  value={name}
                  setValue={setName}
                  error={errors.nameError}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  placeholder="enter quantity like 500 gm"
                  label="Quantity"
                  value={quantity}
                  setValue={setQuantity}
                  error={errors.quantityError}
                />
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.action}>
                  <SimpleButton
                    backgroundColor={colors.gray}
                    name="Cancel"
                    onPress={closeModal}
                    buttonStyle={styles.actionButton}
                  />
                </View>
                <View style={styles.action}>
                  <SimpleButton
                    name={mode === 'add' ? 'Add' : 'Update'}
                    onPress={handleActionButton}
                    buttonStyle={styles.actionButton}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GroceryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    marginTop: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  action: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  flex: {
    flex: 1,
  },
});
