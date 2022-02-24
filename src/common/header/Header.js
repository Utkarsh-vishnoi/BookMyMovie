import { Button, Tab, Tabs, TextField, Typography } from '@material-ui/core'
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

    const loginFormHandler = () => {
        setIsLoggedIn(false)
        setLoginOpen(false)
    };

    return (
        <React.Fragment>
            <div className='header'>
                <Link to='/'>
                    <img className='logo' src={Logo} alt="Logo" />
                </Link>
                <div className="buttons">
                    {
                        bookShow ? (
                            <Link to={"/book-show/" + bookShowID} style={{ textDecoration: "none" }}>
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
                    <TextField label="Username" required style={{ margin: "5px 0px" }} />
                    <TextField
                        label="Password"
                        type="password"
                        style={{ margin: "5px 0px" }}
                        required
                    />
                    <div>
                        <Button
                            variant="contained"
                            onClick={loginFormHandler}
                            color="primary"
                            style={{ margin: "20px 20px" }}
                        >Login</Button>
                    </div>
                </TabContent>
                <TabContent activeTab={activeTab} tabIndex={1}>
                    <TextField
                        label="First Name"
                        required
                        style={{ margin: "5px 0px" }}
                    />
                    <TextField label="Last Name" required style={{ margin: "5px 0px" }} />
                    <TextField label="Email" required style={{ margin: "5px 0px" }} />
                    <TextField
                        label="Password"
                        required
                        type="password"
                        style={{ margin: "5px 0px" }}
                    />
                    <TextField
                        label="Contact No"
                        required
                        style={{ margin: "5px 0px" }}
                    />
                    {registered ? (
                        <Typography variant="subtitle1" gutterBottom>
                            Registration Successful. Please Login!
                        </Typography>
                    ) : null}
                    <Button
                        variant="contained"
                        onClick={() => setRegistered(true)}
                        color="primary"
                        style={{ margin: "20px 20px" }}
                    >Register</Button>
                </TabContent>
            </Modal>
        </React.Fragment>
    )
}

export default Header