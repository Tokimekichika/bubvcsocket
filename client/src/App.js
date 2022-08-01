import React from 'react';
import './app.css'
import LongPulling from "./LongPulling";
import EventSourcing from "./EventSourcing";
import WebSock from "./WebSock";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Room from "./Room";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path='/room' element={Room}/>
              <Route path='/last' element={} />
          </Routes>
      </BrowserRouter>
//В КОМПОНЕНТЕ РУМ ЕСЛИ ЕСТЬ ЮЗПАРАМС - ТО НЕ РИСУЕМ КНОПКУ СОЗДАТЬ КОМНАТУ, И ССЫЛКУ, И В ЮЗЭФЕКТЕ НОВОМ, ОТПРАВЛЯЕМ ПО СОКЕТАМ НА БЭК СОБЫТИЕ JOIN_ROOM, С ID КОМНАТЫ
      //ПОСМОТРИ ЧТО МЫ ТАМ ЖДЕМ ТИПА ИВЕНТ И АЙДИ КОМНАТЫ
      //ПОКА ВСЕ)))

  )
}


export default App;
