import {StyleSheet, Text} from 'react-native';
import React from 'react';

const PassionsConflict = ({style, children, testID}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const styles = StyleSheet.create({
    font: {
      fontFamily: 'PassionsConflict-Regular',
    },
  });

  return (
    <Text testID={testID} style={[styles.font, {...passedStyles}]}>
      {children}
    </Text>
  );
};

export default PassionsConflict;
