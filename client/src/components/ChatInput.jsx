import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker ] = useState(false);
  const [msg, setMsg ] = useState("");

    const handleEmojiPickerHideShow = () =>{
      setShowEmojiPicker(!showEmojiPicker);
    }
    
    const handleEmojiClick = (emojiObject) => {
      const newMessage = msg + emojiObject.emoji;
      setMsg(newMessage);
    };    

    const sendChat = (event) => {
      event.preventDefault();
      if(msg.length>0){
        handleSendMsg(msg);
        setMsg('')
      }
    };

  return (
    <Container>
      <div className="button-container">
      <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            
              <Picker onEmojiClick={handleEmojiClick} />
            
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input type="text" 
          placeholder="type your message here!"
          value={msg} onChange={(e)=> {setMsg(e.target.value)}}/>
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  gap: 1rem;
  @media screen and (min-width: 720px )and (max-width:1080px){
      padding: 0 1rem;
      gap:1rem;
          }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 2rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -350px !important;
        background-color: #080420;
        height: 300px !important;
        width: 250px !important;
        font-size: 20px !important;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        --epr-preview-height:{ 80px};
        --epr-search-input-height: 30px;
        --epr-search-input-bg-color: transparent;
        --epr-emoji-size: 22px;

        .epr-body::-webkit-scrollbar{
          background-color: #080420;
          width: 5px;
        &-thumb {
    background-color: #9186f3;
  }}
        .FLex{
          height: 20px;
        }
        .epr-category-nav{
          padding: 0 10px;
          button .span{
            font-size: 12px !important;
          }
        }
        .epr-emoji-category-label{
          background-color: transparent;
          font-size: 16px;
          height: 18px;
        }
        
        .emoji-categories {
          button{
          filter:contrast(0);
          }
        }
        .emoji-search{
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group:before{
          background-color: #080420;
        }
        .epr-category-nav {
          font-size: 24px !important;          
        }

        .FlexRow {
          img {
            font-size: 24px !important;
            height: 24px !important;
            width: 24px !important;
          }
        }
      }
    }
  }
  .input-container {
    white: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 80%;
      background-color: transparent;
      color: white;
      border: none;
      padding: 0.6rem 0rem 0.3rem 1.2rem;
      font-size: 1.2rem;
      &:: selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor:pointer;
      @media screen and (min-width: 720px )and (max-width:1080px){
              padding: 0.3rem 0.6remrem;
              svg{
                font-size:1rem;
              }
          }
      &:hover{
        background-color: #9186f3;
      }
      svg {
        font-size: ;
      }
    }
  }
`; 