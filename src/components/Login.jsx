import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"

export default function Welcome() {
  const [view, setView] = useState(true)

  const changeView = () => {
    setView(!view)
  }
  return (
    <div className="welcome">
      <h1>WhatsApp Web</h1>
      {view ? (
        <Login registerView={changeView} />
      ) : (
        <Register loginView={changeView} />
      )}
      <p>Requires the latest version of WhatsApp</p>
    </div>
  )
}

// Login Component**************

function Login({ registerView }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const userLogin = async (e) => {
    e.preventDefault()
    const user = { email, password }
    try {
      let response = await fetch(`${process.env.REACT_APP_USERS_URL}session`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (response.ok) {
        //console.log(response)
        navigate("/homepage")
      } else {
        console.log("login failed")
        if (response.status === 400) {
          console.log("bad request")
        }
        if (response.status === 404) {
          console.log("page not found")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <h3>Login</h3>
      <p className="view-change">
        {`Not registered? `}
        <span className="view-link" onClick={registerView}>
          {`Sign up here`}
        </span>
      </p>
      <Form onSubmit={(e) => userLogin(e)}>
        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            size="md"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            required
            size="md"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-4" variant="success">
          Log In
        </Button>
      </Form>
    </div>
  )
}

// Register Component**************

function Register({ loginView }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const userRegister = async (e) => {
    e.preventDefault()
    const newUser = { username, password, email }
    try {
      let response = await fetch(`${process.env.REACT_APP_USERS_URL}account`, {
        method: "POST",
        body: JSON.stringify(newUser),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (response.ok) {
        console.log(response)
        navigate("/homepage")
      } else {
        alert("registration failed")
        if (response.status === 400) {
          alert("bad request")
        }
        if (response.status === 404) {
          alert("page not found")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register">
      <h3>Sign Up</h3>
      <p className="view-change view-link" onClick={loginView}>
        Log In?
      </p>
      <Form onSubmit={(e) => userRegister(e)}>
        <Form.Group className="mt-3">
          <Form.Label className="mt-3">Email Address</Form.Label>
          <Form.Control
            required
            size="md"
            type="email"
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            size="md"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label className="mt-3" type="password">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            required
            size="md"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-4" variant="success">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}
