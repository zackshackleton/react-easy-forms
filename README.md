## react-easy-forms

React-easy-forms allows quick and easy creation of forms in react.

### Features
  - Works with any data management solution.
  - Each input does self validation before the form is submitted.
  - Automatically adds the correct tab index between each input field and the submit buttons.
  - Hidden field to help combat bots.
  - Able to add class names to each component for custom styling.
  - Able to add custom regexes for your own validation requirements.
  - Only 1 extra dependency (Prop-Types).

### Install
```js
$ npm install --save react-easy-forms
```

### Quick definition of components
  - Form: Main form component that wraps all other components
  - CheckGroup: Check box input
  - EmailInput: Text input for emails
  - FormContent: Wrapper to insert other content inside of form
  - PasswordInput: Text input for passwords
  - PhoneInput: Text input for phone numbers
  - RadioGroup: Radio input group
  - TextArea: Text area input
  - TextInput: Plain text input

### How to use
##### Code
```js
  import React, { Component } from 'react';
  input Form, { TextInput, PhoneInput, EmailInput } from 'react-easy-forms';

  class ExampleForm extends Component {
    onFormSubmit = (payload) => {
      console.log(payload);
    }

    render () {
      const checkData = [
        { label: 'Chicago', value: false },
        { label: 'New York', value: false },
        { label: 'San Francisco', value: false }
      ];

      const radioData = [
        { label: 'Dogs', code: 'dog' },
        { label: 'Cats', code: 'cat' },
        { label: 'Birds', code: 'bird' }
      ];

      return (
        <Form onSubmit={this.onFormSubmit} title="Example Form">
          <TextInput title="First Name" />
          <TextInput title="Last Name" />
          <PhoneInput title="Phone"  />
          <EmailInput title="Email" />
          <PasswordInput title="Password" />
          <TextArea title="Your life story" />
          <CheckGroup data={checkData} title="Favorite city" />
          <RadioGroup data={radioData} title="Favorite pet" />
        </Form>
      )
    }
  }

  export default ExampleForm;
```
##### Output
This is the output from the code above. This form has been filled out.
![Alt text](/ExampleFormScreenshot.png?raw=true "Example Form Output")

#### Form Submission
When the form is submitted, the data object below is what is sent to the `onSubmit` function that is passed to the Form component. The object contains a data array with the answers from the form (in order), and an error function that can be called in the callback function. If the error message is passed a string, it will show an error message on the bottom of the form. This function is helpful to return server verification errors.

```js
{
  data: [
    {value: "Zack", name: "first name"},
    {value: "Shackleton", name: "last name"},
    {value: "5555555555", name: "phone"},
    {value: "zackshackleton@gmail.com", name: "email"},
    {value: "password", name: "password"},
    {value: "Yadda yadda yadda.", name: "your life story"},
    {value: ["Chicago", "New York"], name: "favorite city"}
    {value: "dog", name: "favorite pet"}
  ],
  error: ƒ error(errorMessage)
}
```

### Components

##### Form
|    Prop Name    | Type |          Description          | Mandatory |
| -------------  | ---- |          -----------          | ------- |
| className | String | Adds passed value as class to container div of component. Helps with custom styling. | No |
| onSubmit | Function | Function called when the form has been completed successfully and submitted. | Yes |
| secondButtonSubmit | Function | Function called if second button is added to the form. | No |
| secondButtonText | String | Text inside the second button. This is required to generate the second button. | No |
| submitButtonText | String | Text to be shown on the form's submit button. The default value is 'Submit' | No |
| subTitle | String | Sub title displayed at the top of the form | No |
| thirdButtonSubmit | Function | Function called if third button is added to the form. | No |
| thirdButtonText | String | Text inside the third button. This is required to generate the third button. | No |
| title | String | Title of entire form | No |

##### EmailInput, PasswordInput, PhoneInput, TextInput, TextArea
|    Prop Name    | Type |          Description          | Mandatory |
| -------------  | ---- |          -----------          | ------- |
| className | String | Adds passed value as class to container div of component. Helps with custom styling. | No |
| disabled | Boolean | Disables the input box. | No |
| error | Boolean | If true, the input will show an error. | No |
| placeholder | String | This will be the placeholder value for the input. | No |
| regex | Regex | This is the regex the input will be tested against if the validate prop is true. Get more information in the Validation section below. | No |
| subTitle | String | Sub title displayed above the input. | No |
| title | String | Title displayed above the input. | No |
| validate | Boolean | If true, the input will be tested against the regex before the form is submitted. | No |
| value | String | Current value of input field. If passed as a prop, it will set the initial value of the input field. | No |
| rows | Number | ** Only available on TextArea component. Number of rows for the text area box. ** | No |

##### CheckGroup
|    Prop Name    | Type |          Description          | Mandatory |
| -------------  | ---- |          -----------          | ------- |
| className | String | Adds passed value as class to container div of component. Helps with custom styling. | No |
| data | Array | See below for detailed breakdown | Yes |
| error | Boolean | If true, the input will show an error. | No |
| inline | Boolean | If true, the checkboxes will be inline | No |
| onChange | Function | Function that is called anytime the input is changed | No |
| subTitle | String | Sub title displayed above the input. | No |
| title | String | Title displayed above the input. | No |
| validate | Boolean | If true, at least 1 check must be selected. | No |

The data object must be in the following format, where the `label` is checkbox label and `value` is whether it is checked by default.
```
[
  { label: 'First label', value: false },
  { label: 'Second label', value: false },
  { label: 'Third Label', value: false },
  ...
];
```

##### RadioGroup
|    Prop Name    | Type |          Description          | Mandatory |
| -------------  | ---- |          -----------          | ------- |
| className | String | Adds passed value as class to container div of component. Helps with custom styling. | No |
| data | Array | See below for detailed breakdown | Yes |
| error | Boolean | If true, the input will show an error. | No |
| inline | Boolean | If true, the checkboxes will be inline | No |
| onChange | Function | Function that is called anytime the input is changed | No |
| subTitle | String | Sub title displayed above the input. | No |
| title | String | Title displayed above the input. | No |
| validate | Boolean | If true, a radio button must be selected. | No |
| value | String | If passed, this will check the data array and preselect the radio with a matching code. | No |

The data object must be in the following format, where the `label` is checkbox label and `code` is the differentiator.
```
[
  { label: 'Oranges', code: '1' },
  { label: 'Apples', code: '2' },
  { label: 'Lemons', code: '3' },
  ...
]
```

##### FormContent
|    Prop Name    | Type |          Description          | Mandatory |
| -------------  | ---- |          -----------          | ------- |
| className | String | Adds passed value as class to container div of component. Helps with custom styling. | No |

```js
  <FormContent>
    {/* Any components or html elements can be placed here */}
  </FormContent>
```

## Form Validation

The prop of `validate={true}` must be passed to each input in order for it to be tested before submitting the form. The form will not be submitted until every component with the `validate={true}`, passes its own regex. Each input has a default regex which it will be tested against or you can pass a new regex as a prop to each input field. If the input value does not pass the regex, the form will not be submitted, and the failed input field will be highlighted in red. When `validate={true}` is passed to **CheckGroup** or **RadioGroup**, they will check to make sure at least 1 option has been selected.

##### Default RegEx values
  - EmailInput: ```/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i```
  - PasswordInput: ```/^((?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,})$/i```
  - PhoneInput: ```/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/```
  - TextArea: ```/([^\s])/```
  - TextInput: ```/([^\s])/```

## Upcoming
  - Adding a dropdown component
  - Add better data management for CheckGroup and RadioGroup
  - Refine readme
