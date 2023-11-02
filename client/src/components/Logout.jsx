import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import axios from "axios"
import { BiPowerOff }from 'react-icons/bi';

function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}

export default Logout

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border:none;
    cursor: pointer;
    svg{
        font-size: 1rem;
        color: #ebe7ff;
    }

`;