import React, {useState} from 'react';
import { useChatContext } from 'stream-chat-react';
import {UserList} from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({channelName="", setChannelName})=> {
  

    const handleChange=(event) => {
        event.preventDefault();

        setChannelName(event.target.value)
    }
    return (
        <div className='="channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder ="Channel-name (no spaces)"/>
            <p>Add members</p>

        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel= async(e) =>{
        e.preventDefault();

        try{
            const newChannel = await client.channel(createType, channelName, {name: channelName, members: selectedUsers});
            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);

        
        }catch(err){
            console.log(err)
        }

    }
    

    return (
        <div className='="create-channel__container'>
            <div className="create-channel__header">
                <p>{createType==='team' ? 'Create New Channel' : 'Send Direct Message'}</p>
                <CloseCreateChannel setISCreating = {setIsCreating} />
            </div>
            { createType ==='team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/> } 
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType ==='team' ? 'Create Channel' : 'Create Message Group' } </p>
            </div>

        </div>
    )
}

export default CreateChannel
