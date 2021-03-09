import React, { useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import './ChatInput.css'

function ChatInput( { sendMessage } ) {

    const [input, setInput] = useState('');
    const messageInput = document.getElementById('message-input');

    const changeToBold = () => {
        messageInput.classList.toggle('bold-input')
        messageInput.classList.toggle('normal-input')
    }

    const changeToItalics = () => {
        messageInput.classList.toggle('italics-input')
        messageInput.classList.toggle('normal-input')
    }

    const send = (e) => {
        e.preventDefault();
        if(!input) return;
        sendMessage(input)
        setInput('')
    }

    return (
        <Container>
            <InputContainer>
                <form>
                    <input
                        id='message-input' 
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        value={input}
                        placeholder='Message here...' 
                        
                    />
                    <SendButton 
                        type='submit'
                        onClick={send} 
                    >
                        <Send />
                    </SendButton>
                </form>
                <ExtraFunctionalities>
                    <BoldBtn onClick={changeToBold} />
                    <ItalicsBtn onClick={changeToItalics} />
                </ExtraFunctionalities>
            </InputContainer>
        </Container>
    )
}

export default ChatInput

const Container = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
`
const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;

    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding-left: 10px;
        input {
            flex: 1;
            ${'' /* coge el width máximo que puede por el 1 (entre 0 y 1) */}
            border: none;
            font-size: 13px;
        }
        input:focus {
            outline: none;
        }
    }
`
const SendButton = styled.button`
    background: #007a5a;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    cursor: pointer;
    border: none; 

    .MuiSvgIcon-root {
        width: 18px;
    }

    :hover {
        background: #148557;
    }
`

const Send = styled(SendIcon)`
    color: #D9D9D9;
`

const ExtraFunctionalities = styled.div`
    border-top: 1px solid #E5E5E5;
    padding: 5px 5px;
`

const BoldBtn = styled(FormatBoldIcon)`
    
    :hover {
        background-color: #E5E5E5; 
        border-radius: 3px;
    }
`

const ItalicsBtn = styled(FormatItalicIcon)`

    :hover {
        background-color: #E5E5E5; 
        border-radius: 3px;
    }
`

