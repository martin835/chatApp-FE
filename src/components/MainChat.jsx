import React from "react"
import Col from "react-bootstrap/Col"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import Picker from "emoji-picker-react"
import { BsFillEmojiSmileFill, BsPaperclip } from "react-icons/bs"

export default function MainChat(props) {
  //useEffect w props.chat
  // fetch /chats/${props.chat}

  const [recipient, setRecipient] = useState(undefined)

  const [emoji, setEmoji] = useState(false)

  const [attachment, setAttachment] = useState(false)

  const loggedUser = useSelector((state) => state.loggedUser)

  const chat = useSelector((state) => state.activeChat)

  const [allMessages, setAllMessages] = useState(undefined)

  const existingChats = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CREATE_CHAT}chats/` + chat,
        {
          credentials: "include",
        }
      )
      if (response.ok) {
        const data = await response.json()
        if (data.members[0]._id === loggedUser._id) {
          setRecipient(data.members[1])
        } else {
          setRecipient(data.members[0])
        }
      } else {
        console.log("error on fetching users")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const existingMessages = async (e) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CREATE_CHAT}chats/` + chat,
        {
          credentials: "include",
        }
      )
      if (response.ok) {
        const data = await response.json()
        setAllMessages(data.messages)
      } else {
        console.log("error on fetching users")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    existingChats()
    existingMessages()
  }, [chat])

  const uploadMedia = async (e) => {
    e.preventDefault()
    const apiUrl = process.env.REACT_APP_CREATE_CHAT

    const inpFile = document.getElementById("media-input")
    const formData = new FormData()
    formData.append("media", inpFile.files[0])
    console.log("FILE TO  UPLOAD: ", inpFile.files[0])

    if (inpFile.files[0]) {
      try {
        let response = await fetch(`${apiUrl}chats/media`, {
          method: "POST",
          body: formData,
          credentials: "include",
        })
        if (response.ok) {
          let data = await response.json()
          let mediaUrl = data.url
          console.log(mediaUrl)
          props.setMedia(mediaUrl)
        } else {
          alert("something went wrong! please try again")

          if (response.status === 400) {
            alert("some data was wrong")
          }
          if (response.status === 400) {
            alert("not found")
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Col md={8}>
      <>
        {" "}
        {recipient && (
          <div className="d-flex align-items-center border-2 mb-3 pt-3">
            <img
              src={recipient.avatar}
              alt={"User logo"}
              className={"user-picture me-2"}></img>
            <p className="normal-p">{recipient.username}</p>
          </div>
        )}
        <div onClick={() => { setEmoji(false); setAttachment(false) }} className="chatBack scrollerChat p-4">
          {allMessages &&
            allMessages.map((message, i) => (
              <>
                <div
                  key={i}
                  className={
                    message.sender === loggedUser._id
                      ? "message-sent p-2 mb-2 d-flex"
                      : "message-received  p-2 mb-2 d-flex"
                  }>
                  <p className="msg">{message.content.text}</p>
                  <p
                    style={{
                      fontSize: "10px",
                      width: "15px",
                      marginTop: "auto",
                      marginRight: "9px",
                      minWidth: "30px",
                    }}>
                    {message.createdAt.split("T")[1].split(".")[0].split(":")[0] +
                      ":" +
                      message.createdAt.split("T")[1].split(".")[0].split(":")[1]}
                  </p>
                </div>
                {message.content.media && <div
                  key={i}
                  className={
                    message.sender === loggedUser._id
                      ? "message-sent p-2 mb-2 d-flex"
                      : "message-received  p-2 mb-2 d-flex"
                  } >
                  <img className="msg" alt="backend" style={{ objectFit: "contain", position: "center", maxHeight: "150px", minHeight: "150px" }} src={message.content.media}></img>
                  <p
                    style={{
                      fontSize: "10px",
                      width: "15px",
                      marginTop: "auto",
                      marginRight: "9px",
                      minWidth: "30px",
                    }}>
                    {message.createdAt.split("T")[1].split(".")[0].split(":")[0] +
                      ":" +
                      message.createdAt.split("T")[1].split(".")[0].split(":")[1]}
                  </p>
                </div>}
              </>
            ))}

          {props.messages &&
            props.messages.map((message, i) => (
              <div key={i} className={!!message.sender && message.sender !== loggedUser._id ? "message-received   p-2 mb-2" : " message-sent p-2 mb-2"}>{message.content.text}</div>
            ))}

        </div>
        <div className="message mb-1 d-flex align-items-center mt-1">
          <div> <span style={{ color: "coral", fontSize: "30px" }} onClick={() => { setEmoji(!emoji); setAttachment(false) }}><BsFillEmojiSmileFill></BsFillEmojiSmileFill></span></div>
          <span style={{ color: "coral", fontSize: "30px" }} onClick={() => { setAttachment(!attachment); setEmoji(false) }}><BsPaperclip></BsPaperclip></span>
          <Form onClick={() => setEmoji(false)} className="w-100" onSubmit={(e) => { if (props.text) { props.handleMessage(e); setAttachment(false) } else { e.preventDefault(); setAttachment(false); alert("insert some text") } }}>
            <Form.Control
              //disabled={!loggedIn}
              type="text"
              value={props.text}
              placeholder={"Type a message..."}
              onChange={(e) => {
                props.setText(e.target.value)
              }}
            />
          </Form>
        </div>
        {emoji && (
          <span className="me-2 emoji">
            <Picker
              onEmojiClick={(e, emojiObj) => {
                props.setText(props.text + emojiObj.emoji)
              }}></Picker>
          </span>

        )}
        {attachment &&
          <input type="file" id="media-input" className="me-2 emoji" onChange={(e) => uploadMedia(e)}></input>
        }
      </>
    </Col>
  )
}
