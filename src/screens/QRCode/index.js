import {View} from 'react-native';
import React from 'react';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import {navigate} from '../../helpers';

const QRCode = () => {
  const onReadCode = data => {
    navigate('AddByUsername', {idUser: data.nativeEvent.codeStringValue});
  };
  return (
    <View>
      <CameraScreen
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={event => onReadCode(event)} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
    </View>
  );
};

export default QRCode;
