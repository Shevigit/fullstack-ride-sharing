import { colors, CSSProperties } from "@mui/material";
import pic1 from '../assets/pic1.jpg';
export const picture: CSSProperties = {
    backgroundImage: `url(${pic1})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '80vh',
    alignItems: "center",
    textAlign: "center",
    position: 'relative',


}
export const containerLinks: CSSProperties = {
    width: '50vw',
    height: '36vh',
    backgroundColor: "white",
    // marginTop: "14.8vh",
    position: 'absolute',
    bottom: '10vh',
    left: '5vw',
    padding: '1rem', // אופציונלי, לריווח פנימי
    borderRadius: '12Px',      // פינות מעוגלות
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // צל עדין
    overflow: 'hidden',
    textAlign: "right",
    fontFamily: "Calibri "
}
export const bigFont: CSSProperties = {
    color: "black",
    fontSize: "xx-large",
    fontWeight: "100",
    fontFamily: "Calibri "
}
export const smallFont: CSSProperties = {
    color: "black",
    fontSize: "medium",
    fontWeight: "100",

    fontFamily: "Calibri "
}
export const mediumFont: CSSProperties = {
    color: "black",
    fontSize: "larger",
    fontWeight: "100",
    fontFamily: "Calibri "
}
export const containerOfBtnsInHomePage: CSSProperties = {
    width: "20vw",
    display: "flex",
    alignItems: "flex-end",
    fontFamily: "Calibri "
    // justifyContent: "flex-end",
    // marginLeft: '10vw'

}
export const btnStyle: CSSProperties = {
    backgroundColor: "rgba(254, 95, 51, 0.86)",
    color: "white",
    width: '16vw',
    height: '6vh',
    margin: "1vh",
    fontFamily: "Calibri "
}
export const margin: CSSProperties = {
    //   marginRight: '3vw'
}
export const main: CSSProperties={
    
}