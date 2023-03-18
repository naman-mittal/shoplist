import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput as RNTextInput} from 'react-native';
import colors from '../../theme/colors';

type Props = {
  label: string;
  value: any;
  setValue: (value: any) => void;
  error?: string;
  inputMode?: 'email' | 'text';
  secureTextEntry?: boolean;
  placeholder: string;
};

const TextInput = ({
  label,
  value,
  setValue,
  error = '',
  inputMode = 'text',
  secureTextEntry,
  placeholder,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  const select = () => setSelected(true);
  const unselect = () => setSelected(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        secureTextEntry={secureTextEntry}
        style={[
          styles.textInput,
          selected && styles.selectedTextInput,
          error.length > 0 && styles.errorInput,
        ]}
        inputMode={inputMode}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={select}
        onBlur={unselect}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
      />
      {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: colors.lightGray,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: colors.black,
    fontWeight: '400',
    fontSize: 14,
  },
  selectedTextInput: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  errorInput: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default TextInput;
