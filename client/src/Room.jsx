import React , { useEffect , useRef } from 'react';
import {useParams} from 'react-router-dom'
function Room () {
   const { roomID } = useParams()
    const socket = useRef()
    socket.current = new WebSocket('ws://localhost:5000')
    useEffect (() => {
            const message = {
                roomId:roomID,
                event: 'JOIN_ROOM'
            }
            // console.log (message)
            socket.current.send(JSON.stringify(message));

    } , []);

    return (
        <div>
            {roomID ?
                <div className="form">
                    {bothConnected ? <div>OBA GOTOVY</div> : <div>GHDEM VTOROGO</div>}
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                    {!ready ?
                        <button onClick={imReady}>ready</button>
                        :
                        <button onClick={imNotReady}>not ready</button>}
                </div> :
                <div></div>
            }
        </div>
    );
}

export default Room;
