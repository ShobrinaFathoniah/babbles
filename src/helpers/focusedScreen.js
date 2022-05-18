import analytics from '@react-native-firebase/analytics';

export const focusedScreen = async (isFocused, screenName = '') => {
  if (isFocused) {
    await analytics().logScreenView({
      screen_class: screenName,
      screen_name: screenName,
    });
  }
};
