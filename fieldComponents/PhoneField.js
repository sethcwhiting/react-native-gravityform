import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class PhoneField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data;
    }

    render() {
        return (
            <View>
                <Text>{this.data.label}</Text>
            </View>
        )
    }
}