import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class SectionField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data;
        this.style = this.props.style
    }

    render() {
        return (
            <View style={[this.style.fieldWrapper, this.style.sectionFieldWrapper]}>
                {this.data.label.length > 0 &&
                    <Text style={[this.style.fieldLabel, this.style.sectionFieldLabel]}>{this.data.label}</Text>
                }
                {this.data.description.length > 0 &&
                    <Text style={[this.style.fieldDescription, this.style.sectionFieldDescription]}>{this.data.description}</Text>
                }
                <View style={[styles.headerRow, this.style.headerRow, this.style.sectionHeaderRow]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerRow: {
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
})