import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { Messages } from "./Messages";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import {v4 as uuidv4 } from "uuid";
export default function ChatContainer ({ currentChat, currentUser, socket }) {
  
  const [ messages, setMessages ] = useState([]);
  const [arrivalMessage, setArrivalMessage ] = useState(null);
  
  const scrollRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        if (currentUser && currentChat) {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    
    fetchData();
  }, [currentUser, currentChat]);
  

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
  
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };
  

    useEffect(() => {
      if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
          setArrivalMessage({fromSelf: false, message: msg});

          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        });
      }
    },[]);


    useEffect(()=> {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages]);
    return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarimage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          <div className="chat-messages">
            {
              messages.map((message, index) => {
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended": "recieved"}`}>
                        <div className="content">
                          <p>
                            {message.message}
                          </p>
                        </div>
                    </div>
                  </div>
                )
              } ) 
            }
          </div>
          <ChatInput handleSendMsg={handleSendMsg}/>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    @media screen and (min-width: 720px )and (max-width:1080px){
      grid-template-rows: 15% 70% 15%;
          }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color:white;

                }
            }
        }
    }
    .chat-messages {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto; /* Add this line to enable vertical scrolling */
  max-height: 400px;
  
}
.chat-messages::-webkit-scrollbar {
  width: 5px; 
}
@media screen and (max-width: 720px ){
    .chat-messages::-webkit-scrollbar {
    width: 0;
  }
      }

/* Style the scrollbar thumb */
.chat-messages::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: #9186f3; /* Change this color to match your design */
}

.message {
  display: flex;
  align-items: center;
    margin: 0px 10px;
  .content {
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    font-size: 1.1rem;
    color: #d1d1d1;
    max-width: 60%;
    word-wrap: break-word; /* Ensure long messages wrap correctly */
  }
}

.sended {
  justify-content: flex-end;
  .content {
    background-color: #4f04ff21;
  }
}

.recieved {
  justify-content: flex-start; 
  .content {
    background-color: #9900ff20;
  }
}


`;
