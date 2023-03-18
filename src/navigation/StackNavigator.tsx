import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../constants/Routes';
import Login from '../screens/Login';
import Home from '../screens/Home';
import {Alert, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../store/actions/UserActions';
import colors from '../theme/colors';
import IconButton from '../components/button/IconButton';

const Stack = createStackNavigator();

type Props = {
  isSignedIn: boolean;
};

const StackNavigator = ({isSignedIn}: Props) => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout() as any);

  const confirmLogout = () => {
    Alert.alert('Shopping done?', 'Are you sure you want to logout', [
      {text: 'No'},
      {text: 'Yes', onPress: handleLogout},
    ]);
  };

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            options={{
              title: 'Grocery List',
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: '600',
              },
              headerRight: props => (
                <IconButton
                  size={25}
                  iconName="logout"
                  iconColor={colors.white}
                  {...props}
                  onPress={confirmLogout}
                  iconContainerStyle={styles.logoutIcon}
                />
              ),
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
            }}
            name={Routes.HOME_SCREEN}
            component={Home}
          />
        </>
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name={Routes.LOGIN_SCREEN}
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  logoutIcon: {
    marginRight: 20,
  },
});
