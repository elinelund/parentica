import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                email: false,
                message: false
            },
            success: false,
            showError: false
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
    }

    toggleSuccess() {
        this.setState({
            success: !this.state.success
        });
    }

    toggleShowError() {
        this.setState({
            showError: !this.state.showError
        });
    }

    validate(firstname, lastname, email, message) {

        const errors = {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        };

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = <FormattedMessage id={`contact.error.firstName.tooShort.${this.props.locale}`}>
                                {(txt) => txt}
                              </FormattedMessage>;
        else if (this.state.touched.firstname && firstname.length > 20)
            errors.firstname = <FormattedMessage id={`contact.error.firstName.tooLong.${this.props.locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = <FormattedMessage id={`contact.error.lastName.tooShort.${this.props.locale}`}>
                                        {(txt) => txt}
                                </FormattedMessage>;
        else if (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = <FormattedMessage id={`contact.error.lastName.tooLong.${this.props.locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;
            
        if (this.state.touched.message && message.length < 1)
            errors.message = <FormattedMessage id={`contact.error.message.empty.${this.props.locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;

        // const re = /^\d+$/;
        const re = /\S+@\S+\.\S+/;        ;
        // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // const re = /^(([^<>()[].,;:\s@"]+([^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[].,;:\s@"]+.)+[^<>()[].,;:\s@"]{2,})$/i;
        if (this.state.touched.email && !re.test(email)) 
            errors.email = <FormattedMessage id={`contact.error.email.invalid.${this.props.locale}`}>
                                    {(txt) => txt}
                                </FormattedMessage>;
        
        return errors; 
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendContactUsData(this.state);
    }

    sendContactUsData(data) {
        // delete data.touched;
        console.log(data);
        return fetch('https://us-central1-app23980.cloudfunctions.net/sendContactUsEmail', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            if (response.status===0 || (response.status >= 200 && response.status < 300)) {
                console.log("Messsage successfully sent: status " + response.status);
                this.toggleSuccess();
                // window.location.reload();
                return response;
            } else {
                console.log('Somthing went wrong: ' + response.status + ' error.');
                this.toggleShowError();
            }
        }).catch(err => {
            console.log("Error sending the contact form data.");
            this.toggleShowError();
        });
    }

    render() {
        let isValid=false;
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.email, this.state.message, );
        if (this.state.touched.firstname && errors.firstname==="" && errors.lastname==="" && errors.email==="" && errors.message==="") { 
            isValid = true
        }

        return(
                <Container className="main-content">
                    <Grid container className="contact-form">
                        <Grid item xs={12} sm={12} md={6}>
                            <h2>
                                <FormattedMessage 
                                    id={`contact.contact.${this.props.locale}`}
                                    defaultMessage=""
                                />
                            </h2>
                            <p>
                                <FormattedMessage 
                                    id={`contact.p1.${this.props.locale}`}
                                    defaultMessage=""
                                />
                            </p>
                            <p>
                                <FormattedMessage 
                                    id={`contact.p2.${this.props.locale}`}
                                    defaultMessage=""
                                />
                            </p>
                            <form className={"contact-form " + (this.state.success ? "hide" : "show")} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                                <FormattedMessage id={`contact.firstName.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(<TextField
                                                required
                                                fullWidth
                                                id="firstName"
                                                name="firstName"
                                                placeholder={txt}
                                                label={txt}
                                                className="contact-form"
                                                value={this.state.firstName}
                                                onChange={this.handleInputChange}
                                                error={errors.firstname!==""}
                                                helperText={errors.firstname === "" ? '' : errors.firstname}
                                                onBlur={this.handleBlur('firstname')}
                                                margin="normal"
                                                variant="outlined"
                                            />);
                                        }
                                    }
                                </FormattedMessage>
                                <FormattedMessage id={`contact.lastName.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(<TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    placeholder={txt}
                                    label={txt}
                                    error={errors.lastname!==""}
                                    helperText={errors.lastname === "" ? '' : errors.lastname}
                                    value={this.state.lastName}
                                    onBlur={this.handleBlur('lastname')}
                                    onChange={this.handleInputChange}
                                    className="contact-form"
                                    margin="normal"
                                    variant="outlined"
                                />);}}
                                </FormattedMessage>
                                <FormattedMessage id={`contact.email.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(<TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    placeholder={txt}
                                    label={txt}
                                    className="contact-form"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    error={errors.email!==""}
                                    helperText={errors.email === "" ? '' : errors.email}
                                    onBlur={this.handleBlur('email')}
                                    margin="normal"
                                    variant="outlined"
                                />);}}
                                </FormattedMessage>
                                <FormattedMessage id={`contact.company.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(<TextField
                                    fullWidth
                                    id="company"
                                    label={txt}
                                    name="company"
                                    placeholder={txt}
                                    className="contact-form"
                                    margin="normal"
                                    value={this.state.company}
                                    variant="outlined"
                                    onChange={this.handleInputChange}
                                />);}}
                                </FormattedMessage>
                                <FormattedMessage id={`contact.message.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(<TextField
                                    required
                                    fullWidth
                                    id="message"
                                    label={txt}
                                    name="message"
                                    error={errors.message!==""}
                                    helperText={errors.message === "" ? "" : errors.message}
                                    placeholder={txt}
                                    multiline
                                    rows="4"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('message')}
                                    className="contact-form"
                                    margin="normal"
                                    variant="outlined"
                                />);}}
                                </FormattedMessage>
                                <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                                    <FormattedMessage id={`contact.send.${this.props.locale}`}>
                                    {
                                        (txt) => {
                                            return(
                                            <Button disabled={!isValid} variant="contained" className="contact-form" type="submit" >
                                        {txt}
                                    </Button>);}}
                                    </FormattedMessage>
                                </div>
                            </form>
                            <div className={"error-message " + (this.state.showError ? "show" : "hide")} >
                                Sorry, there was an error sending the form. Please try again.
                            </div>
                            <div className={"success-message " + (this.state.success ? "show" : "hide")} >
                                <Icon className="success-icon">
                                    done
                                </Icon>
                                <p>Your message was successfully sent. We will get back to you as soon as we can.</p>
                                <p><Link to="/home">back to home</Link></p>
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                </Container>
        );
    }
}

export default Contact; 