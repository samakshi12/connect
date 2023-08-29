import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';


const Messages = () => {
    const{ chatId} = useParams();
    const [messages, setMessages] = useState(null);

    const isChatEmpty = messages && messages.length === 0;

    const chatShowMessages= messages && messages.len

    useEffect(()=>{
      const messagesRef = database.ref('/messages');
      messagesRef. orderByChild('roomId').equalTo(chatId).on('value', (snap)=>{const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

      return ()=>{
        messagesRef.off('value');
      }
    },[chatId]);
  return (<ul className='msg-list custom-scroll'>
        {isChatEmpty && <li>No Messages yet</li>}
        {chatShowMessages && messages.map(msg => <MessageItem key={msg.id} messages={msg}/>)}
    </ul>
  )
}

export default Messages;