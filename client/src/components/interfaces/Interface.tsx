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
export enum Enum{
    "זכר",
    "נקבה",
    "מעדיף שלא לומר"
}
export enum Status{
    "active",
    "canceled",
    "completed"
}
export interface Drivers{
     driver: User,
    address: string,
    source: string,
    destination: string,
    date: Date,
    time: string,
    availableSeats: number,
    genderPreference: Enum,
    passengers: User[],
    status: Status,
    createdAt: Date,
    _id?: string
}

