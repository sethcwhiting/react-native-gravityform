import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default class EmailField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
    }

    handleChange(text) {
        this.props.onChange(this.data.id, text)
    }

    styles() {
        return StyleSheet.create(this.style)
    }

    render() {
        return (
            <View style={[this.style.fieldWrapper, this.style.textFieldWrapper]}>
                <Text style={[this.style.fieldLabel, this.style.textFieldLabel]}>{this.data.label}</Text>
                <Text style={[this.style.fieldDescription, this.style.textFieldDescription]}>{this.data.description}</Text>
                <TextInput
                    style={[this.style.fieldInput, this.style.textFieldInput]}
                    onChangeText={(text) => this.handleChange(text)}
                    placeholder={this.data.placeholder}
                    value={this.props.value}
                />
            </View>
        )
    }
}
