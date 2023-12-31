import React, { useCallback, useState } from 'react'
import { Input, InputGroup, Icon, Alert } from 'rsuite'
import firebase from 'firebase/app'; 
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
function assembleMessage(profile,chatId){
    return{roomId:chatId,
        author:{
            name: profile.name,
            uid:profile.uid,
            createdat:profile.createdat,
            ...(profile.avatar?{avatar:profile.avatar}:{})
        },

        createdat:firebase.database.ServerValue.TIMESTAMP,
    }
}
const Bottom  = () => {const [input, setInput]= useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { chatId} = useParams();
    const {profile} = useProfile();
    const onInputChange= useCallback((value)=>{
      setInput(value);
    },[])

    const onSendClick= async ()=>{
      if(input.trim()===''){
        return;
      }

      const msgData = assembleMessage(profile, chatId);
      msgData.text= input;

      const updates= {};

      const messageId= database.ref('messages').push().key;

      updates[`/messages/${messageId}`] = msgData;
      updates[`/rooms/${chatId}/lastMessage`]={
        ...msgData,
        msgId: messageId,
      };

      setIsLoading(true);

      try{

        await database.ref().update(updates);

        setInput('');
        setIsLoading(false);

      }catch(err){
         Alert.error(err.message);
         setIsLoading(false);
      }
    }

    const onKeyDown= (ev)=>{
        if(ev.keyCode ===13){
            ev.preventDefault();
            onSendClick();
        }
    }
  return (<div> 
    <InputGroup>
        <Input placeholder="Write a new message here..." value={input} onChange={onInputChange} onKeyDown={onKeyDown}/>
        <InputGroup.Button  color="blue" appearance='primary' onClick={onSendClick} disabled={isLoading}>
            <Icon icon="send"/>
        </InputGroup.Button>
    </InputGroup>
    </div>
  )
}

export default Bottom ;