export const styles = {
  container: {
    marginTop: "10vh",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    direction: "rtl",
    padding: 2,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "row",
  },
};

export const buttonStyles = {
  wrapper: {
    padding: 2,
  },
  button: {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "12px 0",
    // הגברת נראות הכפתור עם צללים וטרנזישן
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    },
  },
};

export const backButtonStyles = {
  wrapper: {
    maxWidth: 600,
    margin: "20px auto 40px",
    textAlign: "center",
  },
  button: {
    color: "#1976d2",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.1)",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};
