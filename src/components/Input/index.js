import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers';
import Entypo from 'react-native-vector-icons/Entypo';

const Input = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  style,
  placeholderTextColor = COLORS.brown_700,
  onSubmitEditing,
  testID,
  iconName,
  iconSize = 20,
  keyboardType,
  onIconPress,
  alignSelfInput = 'center',
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={[styles.containerInput, {alignSelf: alignSelfInput}]}>
      <View style={styles.containerIcon}>
        {iconName ? (
          <Entypo
            onPress={onIconPress}
            name={iconName}
            size={iconSize}
            color={COLORS.brown_100}
          />
        ) : null}
      </View>

      <TextInput
        testID={testID}
        style={[styles.input, {...passedStyles}]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
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
    color: COLORS.brown_700,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerIcon: {
    marginEnd: moderateScale(5),
  },
});
