export interface User {
    userName: string;
    phone: string;
    email: string;
    password:string;
    hasCar: boolean;
    driveringLicense?: string;
    gender: string;
    _id?: string
}
export interface RegisterUser{
    userName: string;
    phone: string;
    email: string;
    hasCar?: boolean;
    driveringLicense: string;
    gender: string;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export enum type{
    "זכר",
    "נקבה",
    "מעדיף שלא לומר"
}
export enum status{
    "active",
    "canceled",
    "completed"
}
export interface Driver{
     driver: User,
    address: string,
    source: string,
    destination: string,
    date: Date,
    time: string,
    availableSeats: number,
    genderPreference: type,
    passengers:User[],
    status: status
    createdAt:Date,
    _id?:string,
}

