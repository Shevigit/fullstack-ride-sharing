
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';

export const StyledTextField = styled(TextField)({
    marginBottom: '20px',
    width: '100%',
    // The color property should be set within a nested style for MUI components
    '& .MuiInputBase-root': {
        color: 'success', // If you meant to use a color variant, ensure this fits with your theme
    },
});

export const StyledButton = styled(Button)({
    width: '100%',
});
