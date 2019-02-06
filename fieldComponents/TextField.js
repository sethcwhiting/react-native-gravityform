import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class TextField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data;
        this.handleChange = this.handleChange.bind(this);
        this.style = this.props.style;
    }

    handleChange(text) {
        this.props.onChange(this.data.id, text);
    }

    styles() {
        return StyleSheet.create(this.style);
    }

    render() {
        return (
            <View style={this.style.fieldWrapper}>
                <Text>{this.data.label}</Text>
                <TextInput
                    onChangeText={(text) => this.handleChange(text)}
                />
            </View>
        )
    }
}

