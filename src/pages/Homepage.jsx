import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import MainChat from "../components/MainChat"
import "../styles/sidebar.css"
import io from "socket.io-client"
import { useEffect, useMemo } from "react"
import { useState } from "react"

const ADDRESS = process.env.REACT_APP_BE_ADDRESS || "http://localhost:3001"

export default function Homepage() {
  const [text, setText] = useState("")
  const [media, setMedia] = useState("")
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState("")
  const [socketMess, setSocketMess] = useState(undefined)

  const socket = useMemo(
    () =>
      io(ADDRESS, {
        transports: ["websocket"],
        auth: { withCredentials: true },
      }),
    []
  )

  useEffect(() => {
    socket.on("connect", () => {
      console.log(" 🔛 connected with socket id", socket.id)

      socket.on("incomingMessage", ({ newMessage }) => {
        console.table({ newMessage })
        setMessages((messages) => [...messages, newMessage])
        setSocketMess(newMessage)
      })
    })
  }, [socket])

  const handleMessage = (e) => {
    e.preventDefault()
    console.log("handleMessage", text)
    const data = {
      content: { text: text, media: media },
      //timestamp is added by DB
      //not sending "sender" at all - this will be retrieved at the backend from cookie
    }

    socket.emit("outgoingMessage", { data, chat })

    console.log({ data, chat })
    setMessages((m) => [...m, data])
    setSocketMess(undefined)

    setText("")
  }

  return (
    <Container>
      <Row>
        <Sidebar chat={chat} setChat={setChat} />
        {!chat && (
          <Col md={8}>
            <div className="new-conversation">
              Select chat or search for users to start a new conversation
            </div>
          </Col>
        )}
        {chat && (
          <MainChat
            text={text}
            setText={setText}
            media={media}
            setMedia={setMedia}
            handleMessage={handleMessage}
            messages={messages}
            socketMess={socketMess}
          />
        )}
      </Row>
    </Container>
  )
}
