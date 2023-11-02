import React, { useEffect, useState } from 'react';
import styled  from 'styled-components';
import Logo from "../assets/logo.svg";

export default function Contacts ({ contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName ] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
    if(currentUser){
      setCurrentUserImage(currentUser.avatarimage);
      setCurrentUserName(currentUser.username);
    }
  },[currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  
  return (
    currentUserImage && currentUserName && (
      <Container>
          <div className='brand'>
            <img src={Logo} alt ="Log" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
          {
            contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarimage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })
          }
          </div>
          <div className='current-user'>
          <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${currentUserImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h2>{currentUserName}</h2>
                  </div>
          </div>
      </Container>
    )
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 10%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar{
    width: 0.01rem;
    &-thumb{
      background-color: #ffffff39;
      width:0.1rem;
      border-radius:1rem;
    }
  }

  .contact {
    background-color: #ffffff39;
    min-height: 3rem; /* Adjust the min-height value as needed */
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.6rem; /* Adjust the padding value as needed */
    gap: 1rem;
    display: flex;
    transition: 0.5s ease-in-out;
    align-items: center;
    justify-content: start;

    .avatar {
      img {
        height: 2.5rem;
        left: 0;
      }
    }
    .username{
      h3{
        color:white;
      }
    }
    @media screen  and (max-width: 1080px ){
        gap: 0.5rem;
        .username{
          h3{
            font-size: 1rem;
          }
        }
      }
  }
  .selected{
    background-color: #9186f3;
  }
}
.current-user{
  background-color: #0d0d30;
  display:flex;
  justify-content: center;
  align-items:center;
  gap:2rem;
  .avatar{
    img{
      height: 2.5rem;
      max-inline-size:100%;
    }
  }
  .username{
    h2{
      color: white;
    }
  }
  @media screen  and (max-width: 1080px ){
        gap: 0.5rem;
        .username{
          h2{
            font-size: 1rem;
          }
        }
      }
}
`;