import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
// import ValidationComponent from 'react-native-form-validator'
import base64 from 'react-native-base64'
import { HiddenField, HtmlField, CheckboxField, SectionField, NameField, PhoneField, EmailField, TextField, AddressField, SelectField, RadioField, NumberField } from './fieldComponents';

export default class GravityForm extends Component {
    constructor(props) {
        super(props)
        this.siteURL = this.props.siteURL
        this.formID = this.props.formID
        this.credentials = this.props.credentials
        this.state = {
            formData: {},
            fieldValues: {},
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    componentDidMount() {
        this.fetchFormData()
            .then(formData => this.setState({ formData }))
            .catch(err => console.warn('There was a problem retrieving form data: ', err))
    }

    fetchFormData() {
        return new Promise((resolve, reject) => {
            const credentialString = this.credentials.userName + ':' + this.credentials.password
            const encodedCredentials = base64.encode(credentialString)
            fetch(`${this.siteURL}/wp-json/gf/v2/forms/${this.formID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + encodedCredentials,
                }
            })
                .then(response => response.json().then(formData => resolve(formData)))
                .catch(err => reject('ERROR: ', err))
        })
    }

    handleFieldChange(fieldId, value) {
        this.setState({
            fieldValues: {
                ...this.state.fieldValues,
                [fieldId]: value
            }
        });
    }

    render() {
        console.log(this.state)
        const fields = this.state.formData.fields && this.state.formData.fields.map((field, index) => {
            switch (field.type) {
                case 'hidden':
                    return <HiddenField key={field.id.toString()} data={field} />

                case 'html':
                    return <HtmlField key={field.id.toString()} data={field} />

                case 'checkbox':
                    return <CheckboxField key={field.id.toString()} data={field} />

                case 'section':
                    return <SectionField key={field.id.toString()} data={field} />

                case 'name':
                    return <NameField key={field.id.toString()} data={field} />

                case 'phone':
                    return <PhoneField key={field.id.toString()} data={field} />

                case 'email':
                    return <EmailField key={field.id.toString()} data={field} />

                case 'text':
                    return <TextField key={field.id.toString()} data={field} onChange={this.handleFieldChange} />

                case 'address':
                    return <AddressField key={field.id.toString()} data={field} />

                case 'select':
                    return <SelectField key={field.id.toString()} data={field} />

                case 'radio':
                    return <RadioField key={field.id.toString()} data={field} />

                case 'number':
                    return <NumberField key={field.id.toString()} data={field} />

                default:
                    return <Text key={index} style={{ color: 'red', fontWeight: 'bold' }}>No component made for type {field.type}</Text>
            }
        });
        return (
            <ScrollView>
                {fields}
            </ScrollView>
        )
    }
}