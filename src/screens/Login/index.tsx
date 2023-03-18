import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SimpleButton from '../../components/button/SimpleButton';
import TextInput from '../../components/input/TextInput';
import Loading from '../../components/loading/Loading';
import {RootState} from '../../store';
import {login} from '../../store/actions/UserActions';
import {validateEmail} from '../../utils/Validations';

import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errors, setErrors] = useState<{
    emailError: string;
    passwordError: string;
  }>({emailError: '', passwordError: ''});

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const error = useSelector((state: RootState) => state.login.error);

  useEffect(() => {
    if (error) {
      setLoading(false);
      Alert.alert('Error', error.error);
    }
  }, [error]);

  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError =
      password.length > 0 ? '' : 'Please enter the password';

    setErrors({emailError, passwordError});

    if (!emailError && !passwordError) {
      setLoading(true);
      dispatch(login(email, password) as any);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Shoplist!</Text>
          <Text style={styles.title}>Login To Continue</Text>
          <View style={styles.input}>
            <TextInput
              label="Email"
              value={email}
              setValue={setEmail}
              inputMode="text"
              error={errors.emailError}
              placeholder="enter your email"
            />
          </View>

          <View style={styles.input}>
            <TextInput
              label="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry
              error={errors.passwordError}
              placeholder="enter your password"
            />
          </View>

          <View style={styles.action}>
            <SimpleButton
              name="Login"
              onPress={handleLogin}
              buttonStyle={styles.loginButton}
              buttonTextStyle={styles.loginButtonText}
            />
          </View>

          {loading && <Loading message="Logging In" />}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
