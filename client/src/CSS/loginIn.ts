// LoginIn.styles.ts

import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  rootBox: {
    background: 'linear-gradient(to right, #dbeafe, #ede9fe)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  paper: {
    width: '100%',
    maxWidth: 500,
    padding: 4,
    borderRadius: 5,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255,255,255,0.85)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  title: {
    mb: 3,
    color: '#4f46e5',
  },
  inputContainer: {
    mb: 2,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
  },
  errorText: {
    color: 'red',
    fontSize: '0.875rem',
    mt: 0.5,
  },
  submitBtn: {
    mt: 3,
    py: 1.5,
    borderRadius: 3,
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#fff',
    background: 'linear-gradient(45deg, #6366f1, #3b82f6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #4f46e5, #2563eb)',
    },
    boxShadow: '0 5px 15px rgba(99,102,241,0.3)',
  },
};
