"use client"

import React from 'react'
import classes from './page.module.css'
import { useSocket } from '../context/SocketProvider'
const page = () => {
  const { sendMessage, messages } = useSocket()
  const [message, setMessage] = React.useState('')

  return (
    <div>

      <div>
        <input onChange={(e) => setMessage(e.target.value)} className={classes["chat-input"]} placeholder='message' />
        <button onClick={() => sendMessage(message)}>send</button>
      </div>

      <div>
        <h1>All messages will appear here</h1>
        <ul>
          {messages.map((msg, index) => <li key={index}>{msg}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default page
