import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GroceryItem} from '../../database/models/GroceryItem';
import colors from '../../theme/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import IconButton from '../button/IconButton';
import {capitalizeFirstWord} from '../../utils/CommonFunctions';

interface GroceryCardProps {
  item: GroceryItem;
  onClickDelete: (itemId: number) => void;
  onClickEdit: (item: GroceryItem) => void;
  handleUpdate: (item: GroceryItem) => void;
}

const GroceryCard = ({
  item,
  onClickDelete,
  onClickEdit,
  handleUpdate,
}: GroceryCardProps) => {
  const [hasBought, setBought] = useState<boolean>(item.hasBought);

  const onClickDeleteIcon = () => onClickDelete(item.id || 0);
  const onClickEditIcon = () => onClickEdit(item);
  const onClickCheckBox = (isChecked: boolean) => {
    setBought(isChecked);
    handleUpdate({...item, hasBought: isChecked});
  };

  return (
    <View
      style={[
        styles.container,
        hasBought && {backgroundColor: colors.lightGray},
      ]}>
      <BouncyCheckbox
        style={styles.flex}
        fillColor={colors.success}
        isChecked={item.hasBought}
        onPress={onClickCheckBox}
      />
      <View style={styles.info}>
        <Text style={[styles.text, styles.name]}>
          {capitalizeFirstWord(item.name)}
        </Text>
        <Text style={styles.text}>{item.quantity}</Text>
      </View>
      <View style={styles.actions}>
        {!hasBought && (
          <IconButton
            iconName="edit"
            onPress={onClickEditIcon}
            iconColor={colors.secondary}
            size={25}
            iconContainerStyle={styles.actionIcons}
          />
        )}
        <IconButton
          iconName="delete"
          onPress={onClickDeleteIcon}
          iconColor={colors.error}
          size={25}
          iconContainerStyle={styles.actionIcons}
        />
      </View>
    </View>
  );
};

export default GroceryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    minHeight: 80,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  flex: {
    flex: 1,
  },
  info: {
    flex: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray,
  },
  name: {
    marginBottom: 0,
    fontSize: 20,
    color: colors.black,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionIcons: {
    marginLeft: 10,
  },
});
