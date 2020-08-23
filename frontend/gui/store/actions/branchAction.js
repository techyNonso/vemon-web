import { GET_BRANCHES } from "./types";

export const getBranches = () => {
  return {
    type: GET_BRANCHES,
    payload: ["second item"],
  };
};
