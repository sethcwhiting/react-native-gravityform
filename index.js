import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
// import ValidationComponent from 'react-native-form-validator'
import base64 from 'react-native-base64'
import { HiddenField, HtmlField, CheckboxField, SectionField, NameField, PhoneField, EmailField, TextField, AddressField, SelectField, RadioField, NumberField } from './fieldComponents'

export default class GravityForm extends Component {
    constructor(props) {
        super(props)
        this.siteURL = this.props.siteURL
        this.formID = this.props.formID
        this.credentials = this.props.credentials
        this.style = this.props.style
        this.state = {
            formData: {},
            fieldValues: {},
            isLoading: true,
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    componentDidMount() {
        this.fetchFormData()
            .then(formData => {
                this.setState({ formData })
                return this.setDefaultValues(formData)
            })
            .then(values => this.setState({ fieldValues: values, isLoading: false }))
            .catch(err => console.warn('There was a problem retrieving form data: ', err))
    }

    fetchFormData() {
        return new Promise((resolve, reject) => {
            const credentialString = `${this.credentials.userName}:${this.credentials.password}`
            const encodedCredentials = base64.encode(credentialString)
            fetch(`${this.siteURL}/wp-json/gf/v2/forms/${this.formID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`,
                }
            })
                .then(response => response.json().then(formData => resolve(formData)))
                .catch(err => reject('ERROR: ', err))
        })
    }

    setDefaultValues(formData) {
        return new Promise((resolve) => {
            let values = {}
            let fieldCount = formData.fields.length
            formData.fields.forEach(field => {
                if (field.inputs) {
                    fieldCount = fieldCount + field.inputs.length - 1
                    field.inputs.forEach(input => {
                        if (input.choices) {
                            const selected = input.choices.filter(choice => choice.isSelected)
                            values = {
                                ...values,
                                [input.id]: selected.length ? selected[0].value : '',
                                [field.id]: {
                                    ...values[field.id],
                                    [input.id]: selected[0] ? selected[0].value : ''
                                },
                            }
                        } else {
                            values = {
                                ...values,
                                [input.id]: input.defaultValue ? input.defaultValue : '',
                                [field.id]: {
                                    ...values[field.id],
                                    [input.id]: input.defaultValue ? input.defaultValue : ''
                                },
                            }
                        }
                    })
                } else if (field.choices) {
                    const selected = field.choices.filter(choice => {
                        return choice.isSelected
                    })
                    values = {
                        ...values,
                        [field.id]: selected.length ? selected[0].value : '',
                    }
                } else {
                    values = { ...values, [field.id]: field.defaultValue }
                }
                if (Object.keys(values).length == fieldCount) resolve(values)
            })
        })
    }

    handleFieldChange(fieldId, value, inputId) {
        if (inputId) {
            this.setState({
                fieldValues: {
                    ...this.state.fieldValues,
                    [inputId]: value,
                    [fieldId]: {
                        ...this.state.fieldValues[fieldId],
                        [inputId]: value,
                    },
                }
            })
        } else {
            this.setState({
                fieldValues: {
                    ...this.state.fieldValues,
                    [fieldId]: value,
                }
            })
        }
    }

    fieldComponents = {
        hidden: HiddenField,
        html: HtmlField,
        checkbox: CheckboxField,
        section: SectionField,
        name: NameField,
        phone: PhoneField,
        email: EmailField,
        text: TextField,
        address: AddressField,
        select: SelectField,
        radio: RadioField,
        number: NumberField,
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Fetching Gravity Form...</Text>
                </View>
            )
        }
        const fields = this.state.formData.fields && this.state.formData.fields.map((field) => {
            if (Object.keys(this.fieldComponents).indexOf(field.type) < 0) {
                console.warn(`React Native Gravityform: No field component currently available for type "${field.type}".`)
                return
            }
            const FieldComponent = this.fieldComponents[field.type || 'text']
            return <FieldComponent
                key={field.id.toString()}
                data={field}
                onChange={this.handleFieldChange}
                style={this.style}
                value={this.state.fieldValues[field.id]}
            />
        })
        return (
            <ScrollView style={this.style.formWrapper}>
                {this.state.formData.title && this.state.formData.title.length && !this.props.hideTitle &&
                    <View style={this.style.formHeader}>
                        <Text style={this.style.formTitle}>{this.state.formData.title}</Text>
                    </View>
                }
                {fields}
                {this.state.formData.button &&
                    <View style={this.style.formFooter}>
                        <TouchableOpacity onPress={() => alert('button pressed')} style={this.style.button}>
                            <Text style={this.style.buttonText}>{this.state.formData.button.text}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        )
    }
}