import React, { useCallback, useRef, useState } from 'react'
import { useModalState } from '../../misc/custom-hooks'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal } from 'rsuite'
import Schema from 'rsuite'
import firebase from 'firebase/app'
import { database } from '../../misc/firebase'

const {StringType} = Schema.Types;
const model= Schema.Model({
   name: StringType().isRequired('Chat name is required'),
   description: StringType().isRequired('Description is required'),
})
const INITIAL_FORM={
    name:'',
    description:'',
}
const CreateRoomBtnModal = () => {
    const {isOpen, open, close} = useModalState();

    const [formValue, setFormValue] =useState(INITIAL_FORM);
    const [isLoading, setIsLoading]= useState(false);
    const formRef= useRef();
    const onFormChange= useCallback(value=>{
         setFormValue(value);
    },[]);

    const onSubmit = async () =>{
        if(!formRef.current.check()){
            return;
        }

        setIsLoading(true);

        const newRoomdata= {
          ...formValue,
          createdat:firebase.database.ServerValue.TIMESTAMP
        }

        try{
           await database.ref('rooms')
        }catch(err){
            setIsLoading(false);
            Alert.err(err.message, 4000)
        }
    }
  return (
    <div className='mt-1'>
        <Button block color="green" onClick={open}>
            <Icon icon="creative"/> Create new chat room
        </Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>New Chat Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                    <FormGroup>
                        <ControlLabel>
                          Room Name 
                        </ControlLabel>
                        <FormControl name="name" placeholder="Enter chat room name..."/> 
                        
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl componenClass="textarea" rows={5} name="description" placeholder="Enter chat room..."/>
                    </FormGroup>

                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button block appearance='primary'>
                    Create newChat room
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CreateRoomBtnModal