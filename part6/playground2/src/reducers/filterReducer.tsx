const filterReducer = (state = "ALL", action: any) => {
  console.log("filterReducer - ACTION: ", JSON.stringify(action));
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterChange = (filter: string) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
