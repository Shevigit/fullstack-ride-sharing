import { Button } from "@mui/material"
import { bigFont, btnStyle, containerLinks, containerOfBtnsInHomePage, margin, mediumFont, picture, smallFont } from "../CSS/home"

import { Link } from "react-router"
import BasicPage from "./About"

const Home = () => {
    return (
        <>
            <div >
                <div style={picture}>
                    <div style={containerLinks}>
                        <div style={bigFont}>מהיום קל יותר ...... (צריך ניסוח)</div>
                        <div style={mediumFont}>מלל כלשהוא...</div>
                        <div style={mediumFont}>מלל כלשהוא...</div>
                        <div style={mediumFont}>מלל כלשהוא...</div>
                        <div style={mediumFont}>מלל כלשהוא...</div>
                       
                        <div style={bigFont}>והכל בקליק אחד</div>
                        <div style={containerOfBtnsInHomePage}>
                            <Link to="/Update">
                                <Button sx={btnStyle} style={margin}>עדכן נסיעה</Button>
                            </Link>
                            <Link to="/Offer">
                                <Button sx={btnStyle} style={margin}>הצעת נסיעה</Button>
                            </Link>
                            <Link to="/SearchDrive">
                                <Button sx={btnStyle} style={margin}>חפש נסיעה</Button>
                            </Link>

                        </div>
                    </div>
                </div>
                <div id="about-us">
                        <BasicPage/>
                </div>
            </div>
        </>
    )
}
export default Home