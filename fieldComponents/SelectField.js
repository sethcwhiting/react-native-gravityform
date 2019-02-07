import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native'

export default class SelectField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
    }

    handleChange(field, text) {
        this.props.onChange(field, text)
    }

    render() {
        const items = this.data.choices && this.data.choices.map((choice, index) => {
            return <Picker.Item key={index.toString()} label={choice.text} value={choice.value} />
        })
        return (
            <View style={[this.style.fieldWrapper, this.style.selectFieldWrapper]}>
                <Text style={[this.style.fieldLabel, this.style.selectFieldLabel]}>{this.data.label}</Text>
                <Text style={[this.style.fieldDescription, this.style.selectFieldDescription]}>{this.data.description}</Text>
                <Picker
                    selectedValue={this.props.value}
                    onValueChange={(value) => this.handleChange(this.data.id, value)}
                >
                    {items}
                </Picker>
            </View>
        )
    }
}
