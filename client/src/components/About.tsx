import { useEffect, useState } from "react"
import { useGetAllDrivesQuery } from "../stores/Slices/ApiSlice-Drivers-Endpoints"
import { Drivers } from "./interfaces/Interface";
const BasicPage = () => {
    // const { data: GetAllDrives, isLoading, isError, error } = useGetAllDrivesQuery();
    // const [allDrivers, setAllDrivers] = useState<Drivers[] | undefined>();
    // useEffect(() => {
    //     if (GetAllDrives) {
    //         setAllDrivers(GetAllDrives);
    //         console.log(GetAllDrives);
    //     }
    // }, [GetAllDrives]);
    // if (isLoading) {
    //     return <div>טוען נתונים...</div>;
    // }
    // if (isError) {
    //     return <div>שגיאה: || 'אירעה שגיאה בטעינת הנתונים'</div>;
    // }
    return (
        <>
            {/* {allDrivers && allDrivers.map((driver) => (
                <div key={driver._id}>{driver.driver.userName}</div>
            ))} */}
        </>
    )
}
export default BasicPage;