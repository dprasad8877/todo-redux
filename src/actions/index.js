export const addTodo = data => ({
  type: 'ADD_TODO',
  // id: nextTodoId++,
  data
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})
export const updateTodo = data => ({
  type: 'UPDATE_TODO',
  data
})
export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id
})


export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}