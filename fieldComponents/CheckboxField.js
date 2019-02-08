import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import HTML from 'react-native-render-html'

export default class CheckboxField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.style = this.props.style
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(field, value, input) {
        this.props.onChange(field, value, input)
    }

    render() {
        const inputs = this.data.inputs.map((input, index) => {
            return (
                <TouchableOpacity
                    style={[{ flexDirection: 'row', marginBottom: 15 }, this.style.choiceWrapper, this.style.checkboxChoiceWrapper]}
                    key={index.toString()}
                    onPress={() => this.handleChange(this.data.id, this.props.value[input.id] == this.data.choices[index].value ? false : this.data.choices[index].value, input.id)}
                >
                    <View style={[styles.buttonWrapper, this.style.checkboxButtonWrapper]}>
                        <View style={[
                            this.style.checkboxButton,
                            this.props.value[input.id] == this.data.choices[index].value ? styles.selectedButton : null,
                            this.props.value[input.id] == this.data.choices[index].value ? this.style.selectedCheckboxButton : null
                        ]} />
                    </View>
                    <View style={[{ paddingHorizontal: 10 }, this.style.choiceTextWrapper, this.style.checkboxChoiceTextWrapper]}>
                        <HTML html={input.label} />
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <View style={[this.style.fieldWrapper, this.style.checkboxFieldWrapper]}>
                {this.data.label.length > 0 &&
                    <Text style={[this.style.fieldLabel, this.style.checkboxFieldLabel]}>{this.data.label}</Text>
                }
                {this.data.description.length > 0 &&
                    <Text style={[this.style.fieldDescription, this.style.checkboxFieldDescription]}>{this.data.description}</Text>
                }
                {inputs}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    selectedButton: {
        backgroundColor: '#000',
        flex: 1,
        borderRadius: 1,
    },
    buttonWrapper: {
        borderColor: '#000',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 4,
        width: 16,
        height: 16,
        overflow: 'hidden',
        padding: 2,
    },
})