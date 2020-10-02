import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


export default class Login extends Component {
    state={
        number:'',
        confirm: null
    }


 signInWithPhoneNumber = async() =>  {
        // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(this.state.number);
        this.setState({confirm: confirmation});
        console.log(confirmation)
      }

    confirmCode = async() => {
        try {
          var isConfirmed = await this.state.confirm.confirm("889088");
          console.log(isConfirmed,"is confirmed")
        } catch (error) {
          console.log('Invalid code.');
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <Text> Login component </Text>
                <TextInput placeholder={"Please enter your number"} onChangeText={(number) => this.setState({number})} style={styles.textInput}></TextInput>
                <TouchableOpacity onPress={this.signInWithPhoneNumber} ><Text>Get OTP</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.confirmCode} ><Text>Confirm Code</Text></TouchableOpacity>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput:{
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "60%"
    }
})
