const initialstate = [
  {
    id: "t1",
    summary: "Test123",
    description: "Testndjhbf jbjbjc123",
    priority: "low",
    CreatedOn: "23/05/2020",
    dueBy: "25/06/2020",
    status: true,
  },
  {
    id: "t2",
    summary: "Test123d",
    description: "Testndjhbf jbjbjc123",
    priority: "low",
    CreatedOn: "23/05/2020",
    dueBy: "25/06/2020",
    status: false,
  },
  {
    id: "t3",
    summary: "Test",
    description: "Testndjhbf jbjbjc123",
    priority: "high",
    CreatedOn: "2/05/2020",
    dueBy: "2/06/2020",
    status: true,
  },
];

const todos = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.data];
    case "UPDATE_TODO":      
      let tempState=state.filter((todo) => todo.id !== action.data.id);
      tempState.push(action.data);
      return tempState;
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, status: !todo.status } : todo
      );
    case "MODIFY_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, status: !todo.status } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

export default todos;
