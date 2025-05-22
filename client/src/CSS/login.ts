import { CSSProperties } from "@mui/material";

export const loginBox: CSSProperties = {
    padding: "30px",
    width: "400px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",

};

export const loginTitle: CSSProperties = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: 600,
    color: "black"
};
export const loginForm: CSSProperties = {
    display: "flex",
    flexDirection: "column",

    fontFamily: "Calibri"
};
export const formStyle: CSSProperties = {
    display: "block",
    flexDirection: "column",
    width: "30vw",
    fontFamily: "Calibri"
}
export const InputStyle: CSSProperties = {
    width: "45vw",
    marginBottom: "1vh"
}
export const submitBtn: CSSProperties = {
    width: "45vw",
    backgroundColor: "rgb(35, 0, 173)", // חום כהה
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.6rem 1rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginLeft: "1vw",
}

export const errorCSS: CSSProperties = {
    color: 'red',
    fontSize: 'smaller',
    textAlign:"right",
    
}