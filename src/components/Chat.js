import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import db from '../firebase'
import { useParams } from 'react-router-dom'
import firebase from "firebase"


function Chat({ user }) {

    let { channelId } = useParams();
    const [ channel, setChannel ] = useState();
    const [ messages, setMessages ] = useState([]);
    const messagesEndRef = useRef(null);

    const getMessages = () => {
        db.collection('rooms')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot)=>{
            let messages = snapshot.docs.map((doc)=>doc.data());
            setMessages(messages);
            console.log(messages)
        })
    }

    const sendMessage = (text) => {
        if (channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }
            db.collection('rooms').doc(channelId).collection('messages').add(payload)
        }
    }

    const getChannel = () => {
        db.collection('rooms')
        .doc(channelId)
        .onSnapshot((snapshot) => {
            setChannel(snapshot.data())
        })
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    };

    useEffect(() => {
        getChannel();
        getMessages();
    }, [channelId])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <Container>
            <ChatHeader>
                <Channel>
                    <ChannelName>
                        # {channel && channel.name}
                        {/* # {channel.name} */}
                    </ChannelName>
                    <ChannelInfo>
                        Company-wide announcements and work-based matters
                    </ChannelInfo>
                </Channel>
                <ChannelDetails>
                    <div>
                        Details
                    </div>
                    <Info/>
                </ChannelDetails>
            </ChatHeader>

            <MessageContainer>
                {
                    messages.length > 0 &&
                    messages.map((data, index)=>(
                        <ChatMessage
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}
                        />
                    ))
                }
                <div ref={messagesEndRef} />
            </MessageContainer>

            <ChatInput sendMessage={sendMessage} />
        </Container>
    )
}

export default Chat


const Container = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
    min-height: 0;
`

const Channel = styled.div`

`

const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    color: #606060;
    
`

const ChannelName = styled.div`
    font-weight: 700;
`

const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px;
`

const ChatHeader = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(83, 39, 83, .13);
`

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

`

