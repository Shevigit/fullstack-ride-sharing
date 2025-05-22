import {  useLocation, useNavigate, useParams } from 'react-router';
import {  Button } from '@mui/material';
import { useSelector } from 'react-redux';

interface Params {
    userName: string;
    phone: string;
    email: string;
    hasCar?: boolean| undefined;
    driveringLicense?: string|undefined;
    gender: string;
}

const PasswordGmail = () => {

    // const userlogin=useSelector(selectUser)
//   console.log("תודה לד'",userlogin);
    const navigate = useNavigate();
    const generateTemporaryPassword = () => {
        // Generate a temporary password (example logic)
        return Math.random().toString(36).slice(-8); // Simple password generation
    };
//    const location = useLocation();
//     const { user } = location.state;
    const handleSubmit =  () => {
        const temporaryPassword = generateTemporaryPassword();
        console.log("Temporary Password:", temporaryPassword);
     navigate("../registerComplete")
    };

    return (
        <div>
            <h1>Receive Your Temporary Password</h1>
            <p>Your temporary password has been sent to your email.</p>
            <Button onClick={handleSubmit}>Continue to Register</Button>
        </div>
    );
};

export default PasswordGmail;