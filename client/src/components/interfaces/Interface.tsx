export interface User {
    userName: string;
    phone: string;
    email: string;
    password: string;
    hasCar: boolean;
    driveringLicense?: string;
    gender: string;
    _id?: string
}
export interface RegisterUser {
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
export enum type {
    "זכר",
    "נקבה",
    "מעדיף שלא לומר"
}
export enum status {
  פעיל = "פעיל",
  בוטל = "בוטל",
  הושלם = "הושלם"
}
export interface Driver {
    driver: string,
    address: string,
    source: string,
    destination: string,
    date: Date,
    time: string,
    availableSeats: number,
    genderPreference: type,
    passengers: User[],
    status: status
    createdAt: Date,
    _id?: string,
}
export interface Driver_FieldsFillByUser {
    address: string,
    source: string,
    destination: string,
    date: Date,
    time: string,
    availableSeats: number,
    // genderPreference: type,
}
export interface SearchDriversData{
    sourse: string,
    destination: string,
    date: Date,
    time: string,
    

}
export interface ResDriver extends Driver{
 passengers: User[],

}
export interface Comment{
    text: string
}
export interface CreateSuggestionPayload extends Driver_FieldsFillByUser {
  driver: string; 
}
