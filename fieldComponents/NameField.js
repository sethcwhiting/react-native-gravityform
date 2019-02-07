import React, { Component } from 'react'
import { View, Text, TextInput, Picker } from 'react-native'

export default class NameField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
    }

    handleChange(field, text, input) {
        this.props.onChange(field, text, input)
    }

    render() {
        const inputs = this.data.inputs.map(input => {
            const items = input.choices && input.choices.map((choice, index) => {
                return <Picker.Item key={index.toString()} label={choice.text} value={choice.value} />
            })
            if (input.isHidden) return
            if (input.choices) {
                return (
                    <View key={input.id}>
                        <Picker
                            selectedValue={this.props.value[input.id]}
                            onValueChange={(value) => this.handleChange(this.data.id, value, input.id)}
                        >
                            {items}
                        </Picker>
                        <Text style={[this.style.fieldSubLabel, this.style.nameFieldSubLabel]}>{input.label}</Text>
                    </View>
                )
            }
            return (
                <View key={input.id}>
                    <TextInput
                        style={[this.style.fieldInput, this.style.nameFieldInput]}
                        onChangeText={(text) => this.handleChange(this.data.id, text, input.id)}
                        placeholder={input.placeholder}
                        value={this.props.value[input.id]}
                    />
                    <Text style={[this.style.fieldSubLabel, this.style.nameFieldSubLabel]}>{input.label}</Text>
                </View>
            )
        })
        return (
            <View style={[this.style.fieldWrapper, this.style.nameFieldWrapper]}>
                <Text style={[this.style.fieldLabel, this.style.nameFieldLabel]}>{this.data.label}</Text>
                <Text style={[this.style.fieldDescription, this.style.nameFieldDescription]}>{this.data.description}</Text>
                {inputs}
            </View>
        )
    }
}
