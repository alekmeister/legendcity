import {REQUEST_STATUS} from "types/RequestStatuses";


export interface User {
    "id"?: number,
    "firstName": string,
    "secondName": string,
    "phone": string,
    "email": string,
    "password": string
}

type D = keyof User

export interface State {
    users: User[]
    status: REQUEST_STATUS;
}

export type Page = { page: number }