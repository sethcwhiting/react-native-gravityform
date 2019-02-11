import React, { Component } from 'react'
import { View, Text, TextInput, Picker, TouchableOpacity, StyleSheet } from 'react-native'

export default class NameField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
        this.state = {
            selecting: false,
        }
    }

    handleChange(field, text, input) {
        this.props.onChange(field, text, input)
    }

    // TODO: Separate out into components
    render() {
        const inputs = this.data.inputs.map(input => {
            if (input.isHidden) return
            if (input.choices) {
                const items = input.choices && input.choices.map((choice, index) => {
                    return <Picker.Item key={index.toString()} label={choice.text} value={choice.value} />
                })
                return (
                    <View key={input.id}>
                        {this.state.selecting &&
                            <Picker
                                selectedValue={this.props.value[input.id]}
                                onValueChange={value => {
                                    this.handleChange(this.data.id, value, input.id)
                                    this.setState({ selecting: false })
                                }}
                            >
                                {items}
                            </Picker>
                            ||
                            <View>
                                <TouchableOpacity style={[styles.fieldSelect, this.style.fieldInput, this.style.fieldSelect]} onPress={() => this.setState({ selecting: true })}>
                                    <Text style={this.style.fieldSelectText}>{this.props.value[input.id]}</Text>
                                    <View style={[styles.arrow, this.style.fieldSelectArrow]} />
                                </TouchableOpacity>
                                <Text style={[this.style.fieldSubLabel, this.style.nameFieldSubLabel]}>{input.label}</Text>
                            </View>
                        }
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
                {this.data.label.length > 0 &&
                    <Text style={[this.style.fieldLabel, this.style.nameFieldLabel]}>{this.data.label}</Text>
                }
                {this.data.description.length > 0 &&
                    <Text style={[this.style.fieldDescription, this.style.nameFieldDescription]}>{this.data.description}</Text>
                }
                {inputs}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fieldSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrow: {
        borderStyle: 'solid',
        borderTopColor: '#000',
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderLeftWidth: 7,
        borderRightColor: 'transparent',
        borderRightWidth: 7,
        width: 0,
    }
})