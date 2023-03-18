import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';
import {getUserData} from './services/asyncStorage/UserServices';
import {loginSuccess} from './store/slices/LoginSlice';
import colors from './theme/colors';
import {createTables, getDBConnection, initializeDB} from './database/database';

const App = () => {
  const isSignedIn = useSelector((state: RootState) => state.login.isSignedIn);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTables(db);
      await initializeDB(db);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = await getUserData();
        if (user) {
          dispatch(loginSuccess(user));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkLoggedIn();
    loadData();
  }, [dispatch, loadData]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <StatusBar backgroundColor={colors.primary} />
        <NavigationContainer>
          <StackNavigator isSignedIn={isSignedIn} />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // padding: 20,
    backgroundColor: colors.background,
  },
});
