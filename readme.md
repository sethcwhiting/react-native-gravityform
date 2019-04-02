# ✨ React Native Gravityform ✨

[![Version](https://img.shields.io/npm/v/react-native-gravityform.svg)](https://www.npmjs.com/package/react-native-gravityform)

This module includes a react native component for dropping Gravity Forms from your headless Wordpress into your native applications.

The package is both **Android** and **iOS** compatible.

This project is compatible with Expo/CRNA without ejecting.

## Installation

```
$ npm install --save react-native-gravityform
```

The solution is implemented in JavaScript so no native module linking is required.

## Usage

### Authentication

Gravity Forms requires that API requests be authenticated. In order to get this working, install Wordpress's [JSON Basic Authentication](https://github.com/WP-API/Basic-Auth) plugin.

Once you've done this, make a file named something to the effect of `Credentials.js` and add it anywhere in your project. The entire contents of this file should look something like this:

```javascript
export default {
    userName: 'your-wp-username',
    password: 'your-wp-password',
};
```

It may be a good idea to make a new Wordpress user with read/write permissions for the sole purpose of posting to your Gravity Forms and include that new user's information to the file above. Also, MAKE SURE TO INCLUDE THIS FILE IN YOUR `.gitignore` SO NO ONE EVER SEES THIS INFORMATION.

Once your `Credentials.js` file is all set, you can import it into any file:

```javascript
import credentials from '...path_to/Credentials';
```

### The GravityForm Component

Import the GravityForm component:

```javascript
import GravityForm from 'react-native-gravityform';
```

Include the component anywhere inside your own components:

```javascript
<GravityForm
    siteURL="https://www.your-wordpress-site.com"
    formID="1"
    credentials={credentials}
    style={gformStyles} // optional
    hideFormTitle={true} // optional
/>
```

## Props

### siteURL

The base URL for your headless Wordpress site where your Gravity Forms are hosted.

### formID

The ID of the specific Gravity Form you want to display/post to.

### credentials

The credentials you imported from the file you created in the [Authentication](#authentication) step above.

### style

Out of the box, the GravityForm component is almost entirely unstyled, so you'll probably want to write your own styles for your fields.

This can be done by including a new StyleSheet and referencing the built-in element names, like so:

```javascript
const gformStyles = StyleSheet.create({
    fieldInput: {
        color: '#333',
        backgroundColor: '#eee',
        padding: 15,
        marginBottom: 15,
        fontSize: 18,
    },
});
```

Here is a list of all of the built in element names that you can reference in your stylesheet:

-   Global:
    -   formWrapper
    -   formHeader
    -   formTitle
    -   formFooter
    -   button
    -   buttonText
-   AddressField:
    -   fieldSubLabel
    -   addressFieldSubLabel
    -   fieldInput
    -   addressFieldInput
    -   fieldSubLabel
    -   addressFieldSubLabel
    -   fieldWrapper
    -   addressFieldWrapper
    -   fieldLabel
    -   addressFieldLabel
    -   fieldDescription
    -   addressFieldDescription
-   CheckboxField:
    -   choiceWrapper
    -   checkboxChoiceWrapper
    -   checkboxButtonWrapper
    -   checkboxButton
    -   selectedCheckboxButton
    -   choiceTextWrapper
    -   checkboxChoiceTextWrapper
    -   fieldWrapper
    -   checkboxFieldWrapper
    -   fieldLabel
    -   checkboxFieldLabel
    -   fieldDescription
    -   checkboxFieldDescription
-   EmailField:
    -   fieldWrapper
    -   textFieldWrapper
    -   fieldLabel
    -   emailFieldLabel
    -   fieldDescription
    -   emailFieldDescription
    -   fieldInput
    -   textFieldInput
-   HiddenField (Just in case you want to un-hide them for any reason):
    -   fieldWrapper
    -   hiddenFieldWrapper
    -   fieldLabel
    -   hiddenFieldLabel
    -   fieldDescription
    -   hiddenFieldDescription
    -   fieldInput
    -   hiddenFieldInput
-   HiddenField:
    -   fieldWrapper
    -   htmlFieldWrapper
-   NameField:
    -   fieldInput
    -   fieldSelect
    -   fieldSelectText
    -   fieldSelectArrow
    -   fieldSubLabel
    -   nameFieldSubLabel
    -   fieldInput
    -   nameFieldInput
    -   fieldSubLabel
    -   nameFieldSubLabel
    -   fieldWrapper
    -   nameFieldWrapper
    -   fieldLabel
    -   nameFieldLabel
    -   fieldDescription
    -   nameFieldDescription
-   NumberField:
    -   fieldWrapper
    -   numberFieldWrapper
    -   fieldLabel
    -   numberFieldLabel
    -   fieldDescription
    -   numberFieldDescription
    -   fieldInput
    -   numberFieldInput
-   PhoneField:
    -   fieldWrapper
    -   phoneFieldWrapper
    -   fieldLabel
    -   phoneFieldLabel
    -   fieldDescription
    -   phoneFieldDescription
    -   fieldInput
    -   phoneFieldInput
-   RadioField:
    -   choiceWrapper
    -   radioChoiceWrapper
    -   radioButtonWrapper
    -   radioButton
    -   selectedRadioButton
    -   choiceText
    -   radioChoiceText
    -   fieldWrapper
    -   radioFieldWrapper
    -   fieldLabel
    -   radioFieldLabel
    -   fieldDescription
    -   radioFieldDescription
-   SectionField:
    -   fieldWrapper
    -   sectionFieldWrapper
    -   fieldLabel
    -   sectionFieldLabel
    -   fieldDescription
    -   sectionFieldDescription
    -   headerRow
    -   sectionHeaderRow
-   SelectField:
    -   fieldWrapper
    -   selectFieldWrapper
    -   fieldLabel
    -   selectFieldLabel
    -   fieldDescription
    -   selectFieldDescription
    -   fieldInput
    -   fieldSelect
    -   fieldSelectText
    -   fieldSelectArrow
-   TextField:
    -   fieldWrapper
    -   textFieldWrapper
    -   fieldLabel
    -   textFieldLabel
    -   fieldDescription
    -   textFieldDescription
    -   fieldInput
    -   textFieldInput

### hideFormTitle

Choose wether you want your form title to be hidden or not.

## All Together Now

Here is a basic example of how you would use the GravityForm component within one of your components:

```javascript
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GravityForm from 'react-native-gravityform';
import credentials from '../Credentials';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const gformStyles = StyleSheet.create({
    headerRow: {
        borderBottomColor: '#224',
    },
    fieldLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#224',
    },
    fieldSubLabel: {
        fontSize: 16,
        color: '#224',
        textAlign: 'right',
        marginBottom: 15,
        marginTop: -10,
    },
    fieldDescription: {
        fontSize: 14,
        color: '#224',
        marginBottom: 10,
    },
    fieldWrapper: {
        padding: 10,
    },
    fieldInput: {
        color: '#224',
        backgroundColor: '#eee',
        padding: 15,
        marginBottom: 15,
        borderRadius: 15,
        fontSize: 18,
        minHeight: 52,
    },
    fieldSelectText: {
        color: '#224',
        fontSize: 18,
    },
    fieldSelectArrow: {
        borderTopColor: '#224',
    },
    radioButtonWrapper: {
        borderColor: '#1c9',
    },
    selectedRadioButton: {
        backgroundColor: '#1c9',
    },
    checkboxButtonWrapper: {
        borderColor: '#1c9',
    },
    selectedCheckboxButton: {
        backgroundColor: '#1c9',
    },
    formFooter: {
        padding: 10,
    },
    button: {
        backgroundColor: '#1c9',
        padding: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default class ContactScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <GravityForm siteURL="https://www.your-wordpress-site.com" formID="3" credentials={credentials} style={gformStyles} hideFormTitle={true} />
            </View>
        );
    }
}
```

## Supported Fields

The goal for this component is to support all [Standard](https://docs.gravityforms.com/form-fields/#standard-fields) and [Advanced](https://docs.gravityforms.com/form-fields/#advanced-fields) fields offered by Gravity Forms.

The list of the fields currently supported by the GravityForm component are marked with a check mark below:

Standard:

-   [x] Single Line Text
-   [ ] Paragraph Text
-   [x] Drop Down
-   [ ] Multi Select
-   [x] Number
-   [x] Checkboxes
-   [x] Radio Buttons
-   [x] Hidden
-   [x] HTML
-   [x] Section Break
-   [ ] Page Break
        Advanced:
-   [x] Name
-   [ ] Date
-   [ ] Time
-   [x] Phone
-   [x] Address
-   [ ] Website
-   [x] Email
-   [ ] File Upload
-   [ ] CAPTCHA
-   [ ] Password
-   [ ] List

## Conditional Logic

Conditional Logic is included and should work right out of the box!

## Validation

There is currently no form validation included with the GravityForm component. This is a major priority for the team and will be coming as soon as we can possibly get to it.

## Authors

-   [Seth C Whiting](https://github.com/sethcwhiting/) - Initial code - [@sethcwhiting](https://twitter.com/sethcwhiting)

## Contributing

Pull requests are very welcome.
