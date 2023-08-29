import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdate } from '../../misc/helper';

const Dashboard = ({onSignOut}) => {

    const {profile} = useProfile();

    const onSave= async (newData)=> {
        
        try{

            const updates = getUserUpdate(profile.uid, 'name', newData, database);

            await database.ref().update(updates);
            Alert.success('Nickname has been updated', 4000);
        }
        catch(err){
            Alert.error(err.message, 4000);
        }
    }
  return (<AvatarUploadBtn>
        <Drawer.Header>
            <Drawer.Title>

            </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
         <h3>Hey,{profile.name}</h3>
         <ProviderBlock/>
         <Divider/>
         <EditableInput
         name="nickname"
         initialValue={profile.name}
         onSave={onSave}
         label={<h6 className='mb-2'>Nickname</h6>}/>
       
        <AvatarUploadBtn/>
        </Drawer.Body>
        <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
        </Drawer.Footer>
        </AvatarUploadBtn>
    
  )
}

export default Dashboard;