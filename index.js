import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
// import ValidationComponent from 'react-native-form-validator'
import base64 from 'react-native-base64'
import {
    AddressField,
    CheckboxField,
    EmailField,
    HiddenField,
    HtmlField,
    NameField,
    NumberField,
    PhoneField,
    RadioField,
    SectionField,
    SelectField,
    TextField,
} from './fieldComponents'

export default class GravityForm extends Component {
    constructor(props) {
        super(props)
        this.siteURL = this.props.siteURL
        this.formID = this.props.formID
        const credentials = this.props.credentials
        const credentialString = `${credentials.userName}:${credentials.password}`
        this.encodedCredentials = base64.encode(credentialString)
        this.style = this.props.style
        this.state = {
            formData: {},
            fieldValues: {},
            isLoading: true,
            isSending: false,
            submitSuccess: false,
            submitFailure: false,
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
            fetch(`${this.siteURL}/wp-json/gf/v2/forms/${this.formID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${this.encodedCredentials}`,
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
                if (field.type == 'html' || field.type == 'section') {
                    fieldCount--
                    return
                }
                // NameField, AddressField, CheckboxField
                if (field.inputs) {
                    fieldCount = fieldCount + field.inputs.length
                    // CheckboxField
                    if (field.choices) {
                        field.inputs.forEach((input, index) => {
                            values = {
                                ...values,
                                [input.id]: field.choices[index].isSelected ? field.choices[index].value : false,
                                [field.id]: {
                                    ...values[field.id],
                                    [input.id]: field.choices[index].isSelected ? field.choices[index].value : false,
                                },
                            }
                        })
                        // NameField, AddressField
                    } else {
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
                    }
                    // RadioField
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

    submitForm() {
        this.setState({ isSending: true })
        let formData = {}
        let fieldCount = Object.keys(this.state.fieldValues).length
        Object.keys(this.state.fieldValues).forEach(key => {
            if (typeof this.state.fieldValues[key] == 'object' && this.state.fieldValues[key] !== null) {
                fieldCount--
            } else {
                formData = { ...formData, [key]: this.state.fieldValues[key] }
            }
            if (Object.keys(formData).length == fieldCount) this.postFormData(formData)
        })
    }

    postFormData(formData) {
        fetch(`${this.siteURL}/wp-json/gf/v2/forms/${this.formID}/entries`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.encodedCredentials}`,
            },
            body: JSON.stringify(formData),
        })
            .then(() => this.setState({ isSending: false }))
            .catch(err => console.error('ERROR: ', err));
    }

    fieldComponents = {
        address: AddressField,
        checkbox: CheckboxField,
        email: EmailField,
        hidden: HiddenField,
        html: HtmlField,
        name: NameField,
        number: NumberField,
        phone: PhoneField,
        radio: RadioField,
        section: SectionField,
        select: SelectField,
        text: TextField,
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Fetching Gravity Form...</Text>
                </View>
            )
        }
        if (this.state.isSending) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Submitting Form...</Text>
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
                {this.state.formData.title.length > 0 && !this.props.hideFormTitle &&
                    <View style={this.style.formHeader}>
                        <Text style={this.style.formTitle}>{this.state.formData.title}</Text>
                    </View>
                }
                {fields}
                {this.state.formData.button &&
                    <View style={this.style.formFooter}>
                        <TouchableOpacity onPress={() => this.submitForm()} style={this.style.button}>
                            <Text style={this.style.buttonText}>{this.state.formData.button.text}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        )
    }
}