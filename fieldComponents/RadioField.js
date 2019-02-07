import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class RadioField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.style = this.props.style
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(field, value) {
        this.props.onChange(field, value)
    }

    render() {
        const choices = this.data.choices.map((choice, index) => {
            return (
                <TouchableOpacity
                    style={[{ flexDirection: 'row', marginBottom: 15 }, this.style.choiceWrapper, this.style.radioChoiceWrapper]}
                    key={index.toString()}
                    onPress={() => this.handleChange(this.data.id, choice.value)}
                >
                    <View style={[styles.buttonWrapper, this.style.radioButtonWrapper]}>
                        <View style={[
                            this.style.radioButton,
                            this.props.value == choice.value ? styles.selectedButton : null,
                            this.props.value == choice.value ? this.style.selectedRadioButton : null
                        ]} />
                    </View>
                    <Text style={[this.style.choiceText, this.style.radioChoiceText]}>{choice.text}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={[this.style.fieldWrapper, this.style.radioFieldWrapper]}>
                <Text style={[this.style.fieldLabel, this.style.radioFieldLabel]}>{this.data.label}</Text>
                <Text style={[this.style.fieldDescription, this.style.radioFieldDescription]}>{this.data.description}</Text>
                {choices}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    selectedButton: {
        backgroundColor: '#000',
        flex: 1,
        borderRadius: 999,
    },
    buttonWrapper: {
        borderColor: '#000',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 999,
        width: 16,
        height: 16,
        overflow: 'hidden',
        padding: 2,
        marginRight: 10,
    },
})