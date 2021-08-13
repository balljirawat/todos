const state = {
  todos: [],
};

const mutations = {
  UPDATE_TODOS(stateData, data) {
    stateData.todos = {
      ...data,
    };
    localStorage.setItem("todos", JSON.stringify(stateData.todos));
  },
};

const actions = {
  updateTodos({ commit }, data) {
    commit("UPDATE_TODOS", data);
  },
};

//   const getters = {
//     isLoggedIn(stateData) {
//       let userLocalStorage = localStorage.getItem('user');

//       return !!stateData.user || userLocalStorage;
//     },
//   };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
};
