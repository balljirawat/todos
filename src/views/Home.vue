<template>
  <div class="home">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <form @submit.prevent="onSubmit">
          <input
            type="text"
            v-model.trim="newTodo"
            placeholder="What needs to be done?"
            class="new-todo"
          />
        </form>
      </header>
      <section class="list">
        <input
          type="checkbox"
          id="toggle-all"
          class="toggle-all"
          v-model="select_All"
          @input="selectAll"
        />
        <label for="toggle-all"></label>

        <ul class="todo-list">
          <li
            class="todo"
            v-for="(todo, index) in filterTab"
            :key="`${todo.id}${index}`"
          >
            <div class="view">
              <input
                type="checkbox"
                class="checkbox"
                v-model="todo.complete"
                @change="changeCompleted"
              />
              <input
                ref="editTodoRef"
                v-if="todo.edit"
                v-model.trim="todo.title"
                type="text"
                class="editTodo"
                @blur="onSubmitEdit(todo)"
                @keyup.enter="onSubmitEdit(todo)"
              />
              <div v-else>
                <label
                  :class="{ completed: todo.complete }"
                  @dblclick="onEdit(todo)"
                >
                  {{ todo.title }}
                </label>
              </div>

              <button @click="deleteTodo(todo.id)" class="destroy"></button>
            </div>
          </li>
        </ul>
      </section>
      <div class="last">
        <footer class="footer">
          <span class="todo-count">{{ todoLeftString }}</span>
          <div class="filters">
            <button
              @click="changeTodoTab('all')"
              :class="[activeTab === 'all' ? 'selected' : '']"
            >
              All
            </button>
            <button
              @click="changeTodoTab('active')"
              :class="[activeTab === 'active' ? 'selected' : '']"
            >
              Active
            </button>
            <button
              @click="changeTodoTab('complete')"
              :class="[activeTab === 'complete' ? 'selected' : '']"
            >
              Completed
            </button>
          </div>

          <button
            ref="buttonCompleteRef"
            @click="clearComplete"
            class="clear-complete"
          >
            {{ todoClearString }}
          </button>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      newTodo: "",
      select_All: false,
    };
  },
  computed: {
    ...mapState(["todos", "activeTab"]),
    todoNumberLeft() {
      return this.todos.filter((todo) => todo.complete === false).length;
    },
    todoLeftString() {
      return this.todoNumberLeft > 1
        ? `${this.todoNumberLeft} items left`
        : `${this.todoNumberLeft} item left`;
    },
    todoClearCompleteNumber() {
      return this.todos.filter((todo) => todo.complete === true).length;
    },
    todoClearString() {
      return this.todoClearCompleteNumber > 0 ? "Clear Completed" : "";
    },
    // todoAll() {
    //   return this.todos.map((todo) => todo.title);
    // },
    // todoActives() {
    //   return this.todos.filter((todo) => todo.complete === false);
    // },
    // todoCompletes() {
    //   return this.todos.filter((todo) => todo.complete === true);
    // },
    filterTab() {
      if (this.activeTab === "active") {
        return this.todos.filter((todo) => todo.complete === false);
      }
      if (this.activeTab === "complete") {
        return this.todos.filter((todo) => todo.complete === true);
      }
      return this.todos;
    },
    select() {
      return this.todos.map((todo) => todo.complete);
    },
  },

  methods: {
    onSubmit() {
      if (this.newTodo === "") {
        return;
      }
      // console.log(this.newTodo);
      // console.log("submitted");

      // console.log(this.$store);
      this.$store.dispatch("createTodo", this.newTodo);
      this.newTodo = "";
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    changeCompleted() {
      this.$store.dispatch("changeCompleted");
    },
    changeTodoTab(tab) {
      this.$store.dispatch("changeTab", tab);
    },
    clearComplete() {
      this.$store.dispatch("clearComplete");
    },
    selectAll() {
      this.$store.dispatch("selectAll", this.select_All);
    },

    onEdit(todo) {
      todo.edit = true;
      this.$nextTick(() => {
        setTimeout(() => {
          // console.log(this.$refs.editTodoRef[0]);
          this.$refs.editTodoRef[0].focus();
        }, 200);
      });
    },
    onSubmitEdit(todo) {
      todo.edit = false;
      if (todo.title === "") {
        this.deleteTodo(todo.id);
      }
      this.$store.dispatch("todoEdit");
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  font-weight: 100;
}
body {
  background: #f5f5f5;
}
.header {
  h1 {
    text-align: center;
    font-size: 100px;
    font-weight: 100;
    color: rgba(175, 47, 47, 0.15);
  }
}
.header form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.new-todo {
  width: 650px;
  padding: 20px 20px 20px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 24px;
  box-sizing: border-box;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  font-weight: 100;

  background: #fff;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.05);
  position: relative;
}

.toggle-all {
  text-align: center;
  border: none;
  opacity: 0;
  position: absolute;
}
.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -8px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.list {
  width: 650px;
  background: #fff;
  position: relative;
  margin: 0 auto;
}
.todo-list {
  list-style-type: none;
}
.todo {
  position: relative;
  border-bottom: 1px solid #ededed;
  font-size: 24px;
  padding: 13px;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  font-weight: 100;
}
.todo-list li label {
  word-break: break-all;
  font-size: 24px;
  font-weight: 100;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  width: 550px;
}
.editTodo {
  font-size: 24px;
  width: 600px;
}
.completed {
  color: #d9d9d9;
  text-decoration: line-through;
}
.view {
  display: flex;
  align-items: center;
}
.checkbox {
  margin-right: 20px;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #ddd;
  display: block;
}
.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}
.todo-list li .destroy:after {
  content: "×";
}
.view button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;

  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
}
.todo:hover .destroy {
  display: inline-block;
}
.last {
  width: 650px;
  margin: 0 auto;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  padding: 10px 0;
  height: 45px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.09);

  text-align: center;

  width: 100%;
  background: #fff;
  position: relative;
}
.todo-count {
  margin-left: 20px;
}
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  position: absolute;
  right: 250px;
}
.filters button {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  background: none;
}
.filters .selected {
  border-color: rgba(175, 47, 47, 0.2);
}
.clear-complete {
  color: inherit;
  margin-right: 20px;
  padding: 3px 7px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  background: none;
}
</style>
