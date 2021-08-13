import Vue from "vue";
import Vuex from "vuex";
import todo from "./todo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [],
    activeTab: localStorage.getItem("tabs") ? localStorage.getItem("tabs") : "",
  },
  mutations: {
    ADD_TODO_LIST(stateData, data) {
      stateData.todos = [...stateData.todos, data];
      localStorage.setItem("todos", JSON.stringify(stateData.todos));
    },
    UPDATE_TODO_ITEM(stateData, data) {
      stateData.todos = [...data];
      localStorage.setItem("todos", JSON.stringify(stateData.todos));
    },

    CHANGE_TAB(stateData, data) {
      stateData.activeTab = data;
      localStorage.setItem("tabs", stateData.activeTab);
    },
  },
  actions: {
    createTodo({ commit }, title) {
      const payload = {
        title: title,
        complete: false,
        id: Math.floor(Math.random() * 10000000),
        edit: false,
      };
      // console.log(payload);
      // console.log(todo);
      commit("ADD_TODO_LIST", payload);
    },
    deleteTodo({ commit, state: stateData }, id) {
      const todoDeleteds = stateData.todos.filter((todo) => todo.id !== id);
      commit("UPDATE_TODO_ITEM", todoDeleteds);
    },
    changeCompleted({ commit, state: stateData }) {
      // console.log(stateData.todos);
      // console.log(todoCompleteds);

      commit("UPDATE_TODO_ITEM", stateData.todos);
    },
    changeTab({ commit }, tab) {
      commit("CHANGE_TAB", tab);
    },
    clearComplete({ commit, state: stateData }) {
      const clearTodoCompletes = stateData.todos.filter(
        (todo) => todo.complete === false
      );
      commit("UPDATE_TODO_ITEM", clearTodoCompletes);
    },
    selectAll({ commit, state: stateData }, selected) {
      const selectedAlls = stateData.todos.map((todo) => {
        return { ...todo, complete: selected };
      });
      commit("UPDATE_TODO_ITEM", selectedAlls);
    },

    todoEdit({ commit, state: stateData }) {
      commit("UPDATE_TODO_ITEM", stateData.todos);
    },
  },
  modules: {
    todo,
  },
});
