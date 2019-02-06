import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

export default class TextField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        this.props.onChange(this.data.id, text);
    }


    render() {
        return (
            <View>
                <Text>{this.data.label}</Text>
                <TextInput
                    onChangeText={(text) => this.handleChange(text)}
                />
            </View>
        )
    }
}