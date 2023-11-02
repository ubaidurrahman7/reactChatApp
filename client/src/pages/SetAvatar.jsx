import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  return navigate;
}

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/12`;
  const navigate = useAuth(); // Use the custom hook
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
   }
  }, []);

  const setProfilePicture = async () => {
       if(selectedAvatar === undefined){
          toast.error("please select an avatar", toastOptions);
       }else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        console.log(user);
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
          image: avatars[selectedAvatar],
        });
        console.log(data);
        if(data.isSet){
          user.isAvatarImageSet = true;
          user.avatarimage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        }
        else{
          toast.error("Error setting avatar. Please try again", toastOptions);
        }
       }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
    
        if ( selectedAvatar !== undefined && selectedAvatar < data.length) {
          setSelectedAvatar(selectedAvatar);
        } else {
          setSelectedAvatar(undefined);
        }
    
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };
    fetchData();
  }, []);

  const handleReloadAvatars = async () => {
    try {
      const data = [];
      let newSelectedAvatar = selectedAvatar;
  
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
  
      // If the previous selected avatar still exists in the new set of avatars, keep it selected
      if (newSelectedAvatar !== undefined && newSelectedAvatar < data.length) {
        setSelectedAvatar(newSelectedAvatar);
      } else {
        setSelectedAvatar(undefined);
      }
  
      setAvatars(data);
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
  };
  
  
  
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index} // Add a unique key prop here
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={handleReloadAvatars} className="reload-btn">
  Reload Avatars
</button>

          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .reload-btn {
  background-color: #4e0eff;
  color: white;
  padding: 0.8rem 1.6rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  margin-top: 1rem;
  &:hover {
    background-color: #4e0eff;
  }
}

`;
