import { Button, Tab, Tabs, Typography } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import React, { useState } from 'react'
import Modal from "react-modal"
import { Link } from 'react-router-dom'

import Logo from "../../assets/logo.svg"
import TabContent from "../tabContent/TabContent"
import './Header.css'

const Header = ({ bookShowID, bookShow }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [registered, setRegistered] = useState(false)

    const [firstName, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contactNo, setContactNo] = useState("")

    const [userName, setUserName] = useState("")

    const loginFormHandler = () => {
        console.log("Log In!")
        setIsLoggedIn(false)
        setLoginOpen(false)
    }

    const signupFormHandler = () => {
        console.log("Sign UP!")
        setRegistered(true)
    }

    return (
        <React.Fragment>
            <div className='header'>
                <Link to='/'>
                    <img className='logo' src={Logo} alt="Logo" />
                </Link>
                <div className="buttons">
                    {
                        bookShow ? (
                            <Link to={"/bookshow/" + bookShowID} style={{ textDecoration: "none" }}>
                                <Button variant='contained' color='primary' name='Book Show'>Book Show</Button>
                            </Link>
                        ) : null
                    }
                    {
                        isLoggedIn ? (
                            <Button variant="contained" name="Login">Logout</Button>
                        ) : (
                            <Button variant="contained" name="Login" onClick={() => setLoginOpen(true)}>Login</Button>
                        )
                    }
                </div>
            </div>

            <Modal
                isOpen={loginOpen}
                onRequestClose={() => setLoginOpen(false)}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0)",
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: 'translate(-50%, -50%)',
                        // position: "absolute",
                        width: "300px",
                        border: "3px solid #ccc",
                        // overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "4px",
                        display: 'block',
                        outline: "none",
                        padding: "20px"
                    }
                }}>
                <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <TabContent activeTab={activeTab} tabIndex={0}>
                    <ValidatorForm onSubmit={loginFormHandler}>
                        <TextValidator
                            label="Username"
                            style={{ margin: "5px 0px" }}
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            validators={['required']}
                            errorMessages={['required']}
                        />
                        <TextValidator
                            label="Password"
                            type="password"
                            style={{ margin: "5px 0px" }}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            validators={['required']}
                            errorMessages={['required']}
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ margin: "20px 20px" }}
                            >Login</Button>
                        </div>
                    </ValidatorForm>
                </TabContent>
                <TabContent activeTab={activeTab} tabIndex={1}>
                    <ValidatorForm
                        onSubmit={signupFormHandler}>
                        <TextValidator
                            label="First Name"
                            style={{ margin: "5px 0px" }}
                            value={firstName}
                            onChange={(event) => setFirstname(event.target.value)}
                            validators={['required']}
                            errorMessages={['required']}
                        />
                        <TextValidator
                            label="Last Name"
                            style={{ margin: "5px 0px" }}
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            validators={['required']}
                            errorMessages={['required']}
                        />
                        <TextValidator
                            label="Email"
                            style={{ margin: "5px 0px" }}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            validators={['required', 'isEmail']}
                            errorMessages={['required', 'Invalid Email']}
                        />
                        <TextValidator
                            label="Password"
                            style={{ margin: "5px 0px" }}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            validators={['required']}
                            errorMessages={['required']}
                        />
                        <TextValidator
                            label="Contact No"
                            style={{ margin: "5px 0px" }}
                            value={contactNo}
                            onChange={(event) => setContactNo(event.target.value)}
                            validators={['required', 'isNumber']}
                            errorMessages={['required', 'Only Number Allowed']}
                        />
                        {registered ? (
                            <Typography variant="subtitle1" gutterBottom>
                                Registration Successful. Please Login!
                            </Typography>
                        ) : null}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ margin: "20px 20px" }}
                        >Register</Button>
                    </ValidatorForm>
                </TabContent>
            </Modal>
        </React.Fragment>
    )
}

export default Header