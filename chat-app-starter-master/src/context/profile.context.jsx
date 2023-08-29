import React,{ createContext, useState, useContext, useEffect } from "react";
import { auth,database } from "../misc/firebase";
import firebase from "firebase";

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};


const ProfileContext= createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{

        let userRef;

        let userStatusRef;

       const authUnsub=  auth.onAuthStateChanged( authObj =>{

        if(authObj){
            
            userStatusRef = database.ref(`/status/${authObj.uid}`);


            userRef=database.ref(`/profiles/${authObj.uid}`)
            userRef.on('value',(snap)=>{
            const {name,createdAt,avatar}= snap.val();
            const data= {
                name,
                createdAt,
                avatar, 
                uid: authObj.uid,
                email:authObj.email
            };
            database.ref('.info/connected').off();
          setProfile(data);
          setIsLoading(false);
        });

        
      
        database.ref('.info/connected').on('value', function(snapshot) {
            // If we're not currently connected, don't do anything.
            if (!!snapshot.val() === false) {
                return;
            };
        
            
            userStatusRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                
                userStatusRef.set(isOnlineForDatabase);
            });
        });

        return ()=>{
            authUnsub();
            database.ref('.info/connected').off();
            if(userRef)
            {
                userRef.off()
            }

            if(userStatusRef){
                userStatusRef.off();
            }
        setProfile();
        }
        }else{

            if(userRef)
            {
                userRef.off()
            }

            if(userStatusRef){
                userStatusRef.off()
            }

        setProfile(null);
        setIsLoading(false);
        }

        });
    }, [])
    return<ProfileContext.Provider value={{isLoading,profile}}>{children}</ProfileContext.Provider>
};

export const useProfile=()=> useContext(ProfileContext);