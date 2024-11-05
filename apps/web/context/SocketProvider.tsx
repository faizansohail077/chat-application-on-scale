"use client"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client'

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketInterface {
    sendMessage: (msg: string) => any,
    messages:string[]
}


const SocketContext = createContext<ISocketInterface | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) {
        throw new Error('State is undefined')
    }
    return state
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const [messages,setMessages] = useState<string[]>([])

    const sendMessage: ISocketInterface['sendMessage'] = useCallback((msg) => {
        console.log('Send message', msg)
        if (socket) {
            socket.emit('event:message', { message: msg })
        }
    }, [socket])

    const onMessageReceive = useCallback((msg: {message:string}) => {
        console.log('from server msg received', msg.message)
        setMessages((prev)=>[...prev,msg.message])
    }, [])

    useEffect(() => {
        const _socket = io('http://localhost:8000')
        _socket.on('message', onMessageReceive)
        setSocket(_socket)
        return () => {
            _socket.disconnect()
            _socket.off('message',onMessageReceive)

            setSocket(undefined)
        }
    }, [])
    return (
        <SocketContext.Provider value={{ sendMessage,messages }}>
            {children}
        </SocketContext.Provider>
    )
}