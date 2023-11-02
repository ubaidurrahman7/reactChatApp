import { styled } from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
      
    return (
      <Container>
        <img src={Robot} alt="robot" />
        <h1>
          Welcome, <span>{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to start Messaging</h3>
      </Container>
    );
  };
export default Welcome;
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    color:white;
    img{
        height:16rem;
        padding-bottom: 0px;
    }
    h1{
        ${'' /* padding-top: 0px; */}
    }
    span{
        color:#4e0eff
    }
`;

