import React, { useEffect, useState } from "react"
import "../styles/sidebar.css"

import { BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { setLoggedUserAction } from "../redux/actions"
import { Dropdown, Modal, Button } from "react-bootstrap"
import axios from "axios"

export default function SidebarHeader({ logout }) {
  const [user, setUser] = useState(undefined)
  const [show, setShow] = useState(false)

  useEffect(() => {
    userData()
  }, [])

  const dispatch = useDispatch()

  const formData = new FormData()

  const userData = async (event) => {
    try {
      console.log("search")
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}me`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUser(data)
        dispatch(setLoggedUserAction(data))
      } else {
        console.log("error on fetching users")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
    userData()
  }

  const uploadImg = (e) => {
    formData.append("avatar", e.target.files[0])
  }

  const submitFile = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      axios({
        method: "post",
        url: `${process.env.REACT_APP_USERS_URL}me/avatar`,
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        withCredentials: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user && (
        <div className="d-flex align-items-center sidebar-header pt-3">
          <img
            src={user.avatar}
            alt={"User logo"}
            className={"user-picture me-2"}></img>

          <p className="normal-p">{user.username}</p>
          <div className="d-flex align-items-center ms-auto sidebar-header-icons">
            <BiUser className="header-icon" />
            <AiOutlinePlus className="header-icon" />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <BsThreeDots className="header-icon" />{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => {
                    handleShow()
                  }}>
                  Change Avatar
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => {
                    logout()
                  }}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Yo Avatar!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" name="profile-img" onChange={uploadImg} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              submitFile(e)
            }}>
            Sumbit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
