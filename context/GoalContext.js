import createDataContext from "./createDataContext"
import api from "../utilities/API/Api"

const goalReducer = (state, action) => {
  switch (action.type) {
    case "getGoals":
      return action.payload
    case "addGoal":
      return [...state, action.payload]
    case "editGoal":
      const changedState = state.map((goal) => {
        return goal.goalId === action.payload.goalId ? action.payload : goal
      })
      return changedState
    default:
      return state
  }
}

const getGoals = (dispatch) => {
  return async (userId) => {
    try {
      const apiUrl = `/zig360/api/goal/?userid=${userId}`
      //const apiUrl = '/zig360/api/goal/?userid=534ffc73-04b1-4082-b4a0-c11507c17abd'

      const response = await api.get(apiUrl)
      dispatch({ type: "getGoals", payload: response.data.body })
      console.log("api-request goals :", apiUrl)
    } catch (error) {
      console.log("Get Goals error :", error)
    }
  }
}

const addGoal = (dispatch) => {
  return async (payload) => {
    await api.post("/zig360/api/goal/", payload)
    dispatch({ type: "addGoal", payload })
  }
}

const editGoal = (dispatch) => {
  return async (goalId, content) => {
    console.log("EditGoal dispatch", goalId, content)
    await api.put(`/zig360/api/goal/${goalId}`, content)
    const _status = content.status
    const _goalId = goalId

    dispatch({
      type: "editGoal",
      payload: { goalId: _goalId, status: _status, dateTime: Date() }
    })
  }
}

export const { Provider, Context } = createDataContext(
  goalReducer,
  { getGoals, addGoal, editGoal },
  []
)
