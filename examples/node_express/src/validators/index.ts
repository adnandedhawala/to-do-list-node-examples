import * as yup from "yup";
import { TODO_STATUS } from "../constants/index";

export const createTodoSchema = yup.object().shape({
  title: yup.string().required("title is required").min(3, "title too short"),
  description: yup.string(),
  status: yup
    .string()
    .required("status is required")
    .oneOf(Object.values(TODO_STATUS), "invalid status"),
});

export const editTodoSchema = yup.object().shape({
  _id: yup.string().required("id is required"),
  title: yup.string().min(3, "title too short"),
  description: yup.string(),
  status: yup.string().oneOf(Object.values(TODO_STATUS), "invalid status"),
});

export const statusChange = yup.object().shape({
  _id: yup.string().required("id is required"),
  status: yup
    .string()
    .required("status is required")
    .oneOf(Object.values(TODO_STATUS), "invalid status"),
});
