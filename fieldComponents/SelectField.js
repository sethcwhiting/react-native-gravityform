import React, { Component } from 'react'
import { View, Text, Picker, TouchableOpacity, StyleSheet } from 'react-native'

export default class SelectField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleChange = this.handleChange.bind(this)
        this.style = this.props.style
        this.state = {
            selecting: false,
        }
    }

    handleChange(field, text) {
        this.props.onChange(field, text)
        this.setState({ selecting: false })
    }

    render() {
        const items = this.data.choices && this.data.choices.map((choice, index) => {
            return <Picker.Item key={index.toString()} label={choice.text} value={choice.value} />
        })
        return (
            <View style={[this.style.fieldWrapper, this.style.selectFieldWrapper]}>
                {this.data.label.length > 0 &&
                    <Text style={[this.style.fieldLabel, this.style.selectFieldLabel]}>{this.data.label}</Text>
                }
                {this.data.description.length > 0 &&
                    <Text style={[this.style.fieldDescription, this.style.selectFieldDescription]}>{this.data.description}</Text>
                }
                {this.state.selecting &&
                    <Picker
                        selectedValue={this.props.value}
                        onValueChange={value => this.handleChange(this.data.id, value)}
                    >
                        {items}
                    </Picker>
                    ||
                    <TouchableOpacity style={[styles.fieldSelect, this.style.fieldInput, this.style.fieldSelect]} onPress={() => this.setState({ selecting: true })}>
                        <Text style={this.style.fieldSelectText}>{this.props.value}</Text>
                        <View style={[styles.arrow, this.style.fieldSelectArrow]} />
                    </TouchableOpacity>
                }
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