import { colors, CSSProperties } from "@mui/material";
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.svg'
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
    backgroundColor: "rgba(81, 165, 12, 0.86)",
    color: "white",
    width: '16vw',
    height: '6vh',
    margin: "1vh",
    fontFamily: "Calibri "
}
export const margin: CSSProperties = {
    //   marginRight: '3vw'
}

export const mainPage: CSSProperties = {
    marginTop: "24vh",
    marginLeft: "15vw",
    color: "black",
    direction: "rtl",
    textAlign: "right",
    lineHeight: "2.2",

}
export const aboutTitle: CSSProperties = {
    fontSize: "x-large",
    fontWeight: "500",
    color: "rgba(81, 165, 12, 0.86)",
    fontFamily: "Calibri "

}

export const typingAnimation: CSSProperties = {
    overflow: "hidden",
    borderRight: "0.15em solid orange",
    whiteSpace: "nowrap",
    animation: "typing 4s steps(50, end) infinite, blink-caret 0.75s step-end infinite",
    width: "0", // מתחיל ברוחב 0
    fontSize: "x-large",
    fontWeight: "500",
    color: "rgba(81, 165, 12, 0.86)",
    marginLeft: "1vw",
    fontFamily: "Calibri "
};
export const sectionStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between", // מפזר את הילדים בין ימין לשמאל
    alignItems: "center",
    padding: "40px",                 // ריווח אחיד מסביב
    fontFamily: "Calibri"

};

export const imageStyle: CSSProperties = {

    width: "40vw",
    height: "50vh",
    marginLeft: "2vw",
    backgroundImage: `url(${pic2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',

};

export const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    flexGrow: 1,
    marginRight: "-20vw", // דוחף ימינה
};

export const itemStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "#2e7d32", // ירוק
    //   fontFamily: "sans-serif",
    fontFamily: "Calibri "
};

export const iconStyle: CSSProperties = {
    fontSize: "32px",
    backgroundColor: "#e8f5e9",
    borderRadius: "50%",
    padding: "15px",
    marginBottom: "10px",
};

export const textStyle: CSSProperties = {
    fontSize: "1rem",
};
export const floatingButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    zIndex: 1000,
};
export const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
};

export const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(114, 92, 92, 0.3)",
};
export const commentsContainer: CSSProperties = {
    width: "100vw",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fdfdfd",
    height: "35vh", // חשוב: וודא שיש מספיק גובה כדי להכיל טקסט רב שורות.
    fontSize: "large",
    color: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // מרכז את כל התוכן בתוך commentsContainer
};

export const commentText: CSSProperties = {
    fontSize: "x-large",
    fontFamily: "Calibri",
    margin: "0 15px", // רווח מהכפתורים
    // הסרנו whiteSpace: "nowrap" מכאן
    maxWidth: "50vw", // *** חשוב ***: הגדר רוחב מקסימלי לטקסט
    // אפשר גם רוחב בפיקסלים קבוע אם זה מתאים לעיצוב שלך:
    // width: "400px",
    textAlign: "center", // וודא שהטקסט בתוך ה-p אלמנט ממורכז
    flexGrow: 1, // מאפשר לטקסט לתפוס מקום ככל האפשר בין הכפתורים
};

export const inlineContentWrapper: CSSProperties = {
    display: "flex",
    alignItems: "center", 
    justifyContent: "space-between",
    width: "20vw", 
    margin: "20px auto",
    
};

export const buttonStyle: CSSProperties = {
    width: "7vw",
    height: "7vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s ease",
    flexShrink: 0, // מונע מהכפתורים להתכווץ כשהטקסט גדל
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "12px 20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    zIndex: 1000,
    
    
};

export const arrowIconStyle: CSSProperties = {
    width: "30px",
    height: "30px",
    filter: "invert(100%)",
};