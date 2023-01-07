import { RequestStatusType } from "../store/app/app-reducer";

export const entityStatusDisabledUtils = (
  entityStatusTask: RequestStatusType
) => {
  return entityStatusTask === "loading";
};
