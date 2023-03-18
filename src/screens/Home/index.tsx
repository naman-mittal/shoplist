import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CircularButton from '../../components/button/CircularButton';
import GroceryCard from '../../components/card/GroceryCard';
import GroceryModal from '../../components/modal/GroceryModal';
import {GroceryItem} from '../../database/models/GroceryItem';
import {RootState} from '../../store';
import {
  addGroceryItem,
  deleteGroceryItem,
  fetchGroceryItems,
  updateGroceryItem,
} from '../../store/actions/GroceryActions';
import {setError} from '../../store/slices/GrocerySlice';
import styles from './styles';

const Home = () => {
  const user = useSelector((state: RootState) => state.login.user);
  const error = useSelector((state: RootState) => state.grocery.error);
  const groceryItems = useSelector(
    (state: RootState) => state.grocery.groceryItems,
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);

  const dispatch = useDispatch();

  const openModal = () => setModalVisible(true);

  const handleAdd = (item: GroceryItem) => {
    dispatch(addGroceryItem(item) as any);
  };

  const handleUpdate = (item: GroceryItem) => {
    console.log('item', item);
    dispatch(updateGroceryItem(item) as any);
  };

  const handleDelete = (itemId: number) => {
    dispatch(deleteGroceryItem(itemId) as any);
  };

  const onClickEdit = (item: GroceryItem) => {
    setSelectedItem(item);
    setMode('edit');
    setModalVisible(true);
  };

  const onClickAdd = () => {
    setSelectedItem(null);
    setMode('add');
    openModal();
  };

  useEffect(() => {
    const loadGroceryItems = () => {
      dispatch(fetchGroceryItems(user?.userId || 0) as any);
    };
    loadGroceryItems();
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      dispatch(setError(null));
      Alert.alert('Error', error.error);
    }
  }, [error, dispatch]);

  return (
    <>
      <View style={styles.container}>
        {modalVisible && (
          <GroceryModal
            groceryItem={selectedItem}
            userId={user?.userId || 0}
            mode={mode}
            visible={modalVisible}
            setVisible={setModalVisible}
            onConfirmBtnClick={mode === 'add' ? handleAdd : handleUpdate}
          />
        )}
        <Text style={styles.title}>{`Welcome, ${user?.name}`}</Text>
        {groceryItems.length ? (
          <>
            <FlatList
              style={styles.itemsContainer}
              data={groceryItems}
              keyExtractor={item => item.id + ''}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <GroceryCard
                  onClickDelete={handleDelete}
                  onClickEdit={onClickEdit}
                  handleUpdate={handleUpdate}
                  item={item}
                />
              )}
              ListFooterComponent={<View style={styles.footerView} />}
            />
          </>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>Nothing to buy yet...</Text>
          </View>
        )}
      </View>

      <View style={styles.action}>
        <CircularButton onPress={onClickAdd} iconName="add" />
      </View>
    </>
  );
};

export default Home;
