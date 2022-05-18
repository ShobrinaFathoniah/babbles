import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Ole = ({style, children, testID}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const styles = StyleSheet.create({
    font: {
      fontFamily: 'Ole-Regular',
    },
  });

  return (
    <Text testID={testID} style={[styles.font, {...passedStyles}]}>
      {children}
    </Text>
  );
};

export default Ole;
