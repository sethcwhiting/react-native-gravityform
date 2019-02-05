import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native'
import ValidationComponent from 'react-native-form-validator'
import base64 from 'react-native-base64'

export default class GravityForm extends Component {
    constructor(props) {
        super(props)
        this.siteURL = this.props.siteURL
        this.formID = this.props.formID
        this.credentials = this.props.credentials
        this.state = {
            formData: {}
        }
    }

    componentDidMount() {
        this.fetchFormData()
            .then(formData => this.setState({ formData }))
            .catch(err => console.warn('There was a problem retrieving form data: ', err))
    }

    fetchFormData() {
        return new Promise((resolve, reject) => {
            const credentialString = this.credentials.userName + ':' + this.credentials.password
            const encodedCredentials = base64.encode(credentialString)
            fetch(`${this.siteURL}/wp-json/gf/v2/forms/${this.formID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + encodedCredentials,
                }
            })
                .then(response => response.json().then(formData => resolve(formData)))
                .catch(err => reject('ERROR: ', err))
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.formData.fields}
                ListEmptyComponent={<Text>Loading...</Text>}
                renderItem={
                    ({ item }) =>
                        <Text>{item.label}</Text>
                }
                keyExtractor={(item) => item.id.toString()}
            />
        )
    }
}