import React, { Component } from 'react'
import { View } from 'react-native'
import HTML from 'react-native-render-html'

export default class HtmlField extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.style = this.props.style
    }

    render() {
        return (
            <View style={[this.style.fieldWrapper, this.style.htmlFieldWrapper]}>
                <HTML html={this.data.content} />
            </View>
        )
    }
}
