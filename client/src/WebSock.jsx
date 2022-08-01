import React, {useEffect, useRef, useState} from 'react';


const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')
    const [ready, setReady] = useState(false)
    const [createdRoomId, setCreatedRoomId] = useState(null)
    const [bothConnected,setBothConnected] = useState(false)
let allReady = 0
    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (message) => {
            console.log(message.data)
            // // console.log (message.data)
            const parsedMessageFromWS = JSON.parse(message.data)
            if(parsedMessageFromWS.event === '2_PLAYERS_CONNECTED'){
                setBothConnected(true)
            }
            // console.log (tst)

            // // const eventType = tst.event
            // // console.log (eventType)
            // setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
        // socket.current.on('isReady')
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        console.log (message)
        socket.current.send(JSON.stringify(message));
        setValue('')
    }
    const createRoomHandler = () => {
        const messageWithRoom = {event:'ROOM_CREATED',roomId:'test_test', username}
        socket.current.send(JSON.stringify(messageWithRoom))
        setCreatedRoomId(messageWithRoom.roomId)
    }

    const imReady = async () => {
        setReady(true)
        const isReady = {
            username,
            ready:true,
            id: Date.now(),
            event: 'ready'
        }
        // allReady += 1
        console.log (isReady)
        socket.current.send(JSON.stringify(isReady));
    }
    const imNotReady = async () => {
        setReady(false)
        const isReady = {
            username,
            ready:false,
            id: Date.now(),
            event: 'not-ready'
        }
        allReady -= 1
        console.log (isReady)
        socket.current.send(JSON.stringify(isReady));
    }


    useEffect (() => {
     connect()
    } , []);


    if (!connected) {
        return (
            <div className="center">
                <button onClick={()=>createRoomHandler()}>SOZDAT EBU4UYU KOMNATU</button>
                {createdRoomId && <div>{createdRoomId}</div>}
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            <div>
                <button onClick={()=>createRoomHandler()}>SOZDAT EBU4UYU KOMNATU</button>
                {createdRoomId && <div>http://localhost:3000/joinRoom/{createdRoomId}</div>}
                <div className="form">
                    {bothConnected ? <div>OBA GOTOVY</div> : <div>GHDEM VTOROGO</div>}
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                    {!ready ?
                    <button onClick={imReady}>ready</button>
                        :
                        <button onClick={imNotReady}>not ready</button>}
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;
