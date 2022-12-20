import { TODO_STATUS } from "../constants/index";

export interface todoItem{
    title:string,
    description:string,
    status:TODO_STATUS,
    _id?:string
}