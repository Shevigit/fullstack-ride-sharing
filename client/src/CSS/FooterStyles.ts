import { SxProps, Theme } from "@mui/material/styles";

export const footerBox: SxProps<Theme> = {
  bgcolor: "#0D1117",
  color: "white",
  pt: 6,
  pb: 3,
  direction: "rtl",
  width:"100vw",
};

export const sectionTitle: SxProps<Theme> = {
  variant: "h6",
  gutterBottom: true,
  fontWeight: "bold",
  fontSize: "1.1rem",
  mb: 2,
};

export const linkList: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const contactText: SxProps<Theme> = {
  variant: "body2",
};

export const iconGroup: SxProps<Theme> = {
  mt: 2,
  display: "flex",
  gap: 1,
};

export const dividerStyle: SxProps<Theme> = {
  bgcolor: "gray",
  my: 4,
};

export const copyrightText: SxProps<Theme> = {
  variant: "body2",
  color: "gray",
  textAlign: "center",
};
