import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';


export default class ImageUpload extends Component {
  state = {image: null};

  selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: '',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log(source);
        // setImage(source);
        this.setState({image: source});
        const {uri} = source;
        const fileName = uri.substring(uri.lastIndexOf('/') + 1);

        const reference = storage().ref(fileName);
        const task = reference.putFile(uri);

        task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        task.then(() => {
        console.log('Image uploaded to the bucket!');
        });
      }
  })};

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectImage}>
          <Text
            style={[
              this.props.style,
              {
                color: '#192D4E',
                fontFamily: 'SpartanMB-Bold',
                fontSize: 16,
                marginBottom: 5,
                margin: 15,
              },
            ]}>
            {this.props.title || 'Image uploader'}
          </Text>
        </TouchableOpacity>
        {this.state.image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              marginLeft: 15,
            }}
            source={{uri: this.state.image.uri}}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    paddingVertical: 5,
  },
});
