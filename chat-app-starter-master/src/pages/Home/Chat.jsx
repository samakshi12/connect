import React from 'react';
import { Loader } from 'rsuite';
import ChatTop from '../../components/chatwindow/top';
import ChatBottom from '../../components/chatwindow/bottom';
import Messages from '../../components/chatwindow/messages';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useRooms } from '../../context/rooms.context';
import {CurrentRoomProvider} from '../../context/current-room.context';
const Chat  = () => {

    const {chatId} = useParams();

    const rooms = useRooms();

    if(!rooms) 
    {
        return<Loader center vertical size="md" content="Loading" speed="slow"/>
    }

    const currentRoom= rooms.find(room=>room.id===chatId);
    if(!currentRoom){
        return <h6 className='text-center mt-page'>Chat {chatId} not found</h6>
    }

    const {name, description} = currentRoom;
    const currentRoomData={
      name, description
    };
  return (<CurrentRoomProvider data={currentRoomData}>
    <div className='chat-top'>
        <ChatTop/>
    </div>
    <div>
        <Messages className='chat-middle'/>
    </div> 
    <div>
        <ChatBottom className="chat-bottom"/>

    </div></CurrentRoomProvider>
  )
}

export default  Chat;