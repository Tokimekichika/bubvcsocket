import React, {useEffect, useState} from 'react';
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [ready, setReady] = useState(false)


    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`)
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    // const isReady = async () => {
    //     const eventSource = new EventSource('http://localhost:5000/ready')
    //     eventSource.onmessage = function (ev) {
    //         const ready = JSON.parse(ev.data)
    //         setReady(!ready)
    //     }
    // }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }
    const imReady = async () => {
        await axios.post('http://localhost:5000/ready', {
            ready: true,
            id: Date.now()
        })
    }
    const imNotReady = async () => {
        await axios.post('http://localhost:5000/ready', {
            ready: false,
            id: Date.now()
        })
    }


    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    {/*<button onClick={sendMessage}>Отправить</button>*/}
                    <button onClick={sendMessage}>Отправить</button>
                    {!ready ?
                        <button onClick={imReady}>ready</button>
                        :
                        <button onClick={imNotReady}>not ready</button>}
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventSourcing;
