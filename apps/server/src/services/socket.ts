import { Server } from 'socket.io'
import Redis from "ioredis"

const pub = new Redis("");
const sub = new Redis("");



class SocketService {
    private _io: Server

    constructor() {
        console.log('Init Socket Server...')
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: "*"
            }
        })
        sub.subscribe('MESSAGES')

    }

    public initListner() {
        const io = this._io
        console.log('init socket listener')
        io.on("connect", (socket) => {
            console.log('new socket connect', socket.id)
            socket.on('event:message', async ({ message }) => {
                // publish message to reddies
                // await client.set('foo', 'bar');
                await pub.publish('MESSAGES', JSON.stringify({ message }))

                console.log('new message received', message)
            })
        })

        sub.on('message',async(channel,message)=>{
            if(channel === 'MESSAGES'){
                console.log('new message received from redis',message)
                io.emit('message',JSON.parse(message))
            }
        })
    }

    get io() {
        return this._io
    }
}

export default SocketService