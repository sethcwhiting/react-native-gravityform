import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

export default class HiddenField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
    }

    handleChange(number) {
        this.props.onChange(this.data.id, number)
    }

    render() {
        return (
            <View style={[this.style.fieldWrapper, { display: 'none' }, this.style.hiddenFieldWrapper]}>
                {this.data.label.length > 0 &&
                    <Text style={[this.style.fieldLabel, this.style.hiddenFieldLabel]}>{this.data.label}</Text>
                }
                {this.data.description.length > 0 &&
                    <Text style={[this.style.fieldDescription, this.style.hiddenFieldDescription]}>{this.data.description}</Text>
                }
                <TextInput
                    style={[this.style.fieldInput, this.style.hiddenFieldInput]}
                    onChangeText={(number) => this.handleChange(number)}
                    placeholder={this.data.placeholder}
                    value={this.props.value}
                />
            </View>
        )
    }
}
