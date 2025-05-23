import { CSSProperties } from "@mui/material";

export const NavbarContainer: CSSProperties = {
    display: "flex",
    justifyContent: "space-around", // כדי לפזר את הקישורים באופן שווה
    alignItems: "center",
    backgroundColor: "#E0F2F7", // כחול בהיר מאוד כרקע לכל הניווט (אופציונלי)
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // צל עדין לתת עומק
    width: "100%",
    boxSizing: "border-box", // לוודא שה-padding לא מגדיל את הרוחב מעבר ל-100%
};
export const NavbarLink: CSSProperties = {
    textDecoration: "none", // מוריד קו תחתון ברירת מחדל
   
    fontSize: "120%",
    fontWeight: "100",
    padding: "0.5rem 1rem", // ריווח פנימי לכל קישור
    position: "relative", // חשוב בשביל אפקט הקו התחתון
    overflow: "hidden", // לוודא שהקו לא יוצא מהגבולות לפני ה-hover
    cursor: "pointer",
    transition: "color 0.3s ease-in-out",
    color: 'rgb(0, 0, 0)',
    fontFamily: "Calibri",
 
    
};
export const NavbarLinkHover: CSSProperties = {
    textDecoration: "none", // מוריד קו תחתון ברירת מחדל
   
    fontSize: "1.4rem",
    fontWeight: "600",
    padding: "0.5rem 1rem", // ריווח פנימי לכל קישור
    position: "relative", // חשוב בשביל אפקט הקו התחתון
    overflow: "hidden", // לוודא שהקו לא יוצא מהגבולות לפני ה-hover
    cursor: "pointer",
    transition: "color 0.3s ease-in-out",
    color: 'rgb(39, 8, 165)',
    fontFamily: "Calibri",
 
    
};