import {Server} from 'socket.io'

class SocketService {
    private _io: Server
    
    constructor(){
        console.log('Init Socket Server...')
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:"*"
            }
        })
    }

    public initListner(){
        const io = this._io
        console.log('init socket listener')
        io.on("connect",(socket)=>{
            console.log('new socket connect',socket.id)
            socket.on('event:message',async({message})=>{
                console.log('new message received',message)
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService