import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const Input = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  style,
  placeholderTextColor = COLORS.purple_500,
  onSubmitEditing,
  testID,
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={styles.containerInput}>
      <TextInput
        testID={testID}
        style={[styles.input, {...passedStyles}]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: moderateScale(270),
    height: moderateScale(46),
    marginBottom: moderateScale(12),
    borderBottomWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: COLORS.brown_100,
    borderRadius: moderateScale(5),
    color: COLORS.purple_500,
  },
  containerInput: {
    alignSelf: 'center',
  },
});
