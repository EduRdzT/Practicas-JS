export default function todolist() {
  class TodoList {
    //Atributos
    constructor() {
      this.todos = [];
    }
    //Metodos
    addTodo(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false,
      });
    }
    deleteTodo(position) {
      this.todos.splice(position, 1);
    }
    deleteCompletedTodos() {
      for (var i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].completed === true) {
          this.deleteTodo(i);
        }
      }
    }
    updateTodo(newTodoText, position) {
      this.todos[position].todoText = newTodoText;
    }
    toggleCompleted(todo) {
      todo.completed = !todo.completed;
    }
    toggleAll() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      this.todos.forEach((todo) => {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
      if (completedTodos === totalTodos) {
        this.todos.forEach((todo) => {
          todo.completed = false;
        });
      } else {
        this.todos.forEach((todo) => {
          todo.completed = true;
        });
      }
    }
    updateLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    getLocalStorage() {
      if (localStorage.getItem("todos") !== null) {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      }
    }
  }
  class Handlers extends TodoList {
    //Metodos
    addTodo() {
      var addTodoTextInput = document.getElementById("addTodoTextInput");
      if (/\S/.test(addTodoTextInput.value)) {
        super.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
      }
    }
    deleteTodo(position) {
      super.deleteTodo(position);
      view.displayTodos();
    }
    deleteCompletedTodos() {
      super.deleteCompletedTodos();
      view.displayTodos();
    }
    updateTodo(newTodoText, position) {
      super.updateTodo(newTodoText, position);
      super.updateLocalStorage();
    }
    toggleCompleted(todo) {
      super.toggleCompleted(todo);
      view.displayTodos();
    }
    toggleAll() {
      super.toggleAll();
      view.displayTodos();
    }
  }

  const todo = new Handlers();

  var view = {
    selectedFilter: "showAllTodos",
    filteredTodos: [],
    displayTodos: function () {
      var todosUl = document.getElementById("todos");
      // Filter todos based on selectedFilter.
      view.filterTodos();
      // Empty the list before updating it.
      todosUl.innerHTML = "";
      // Create todo elements from todoList.todos and display them.
      view.filteredTodos.forEach((todo, position) => {
        var todoLi = document.createElement("li");
        var checkbox = this.createCheckbox(todo);
        var todoLabel = this.createTodoLabel(todo);
        var deleteButton = this.createDeleteButton();
        todoLi.className = "todo";
        todoLi.appendChild(checkbox);
        todoLi.appendChild(todoLabel);
        todoLi.appendChild(deleteButton);
        todosUl.appendChild(todoLi);
        // If todo is completed, set checkbox to true and give the li its 'checked' class.
        if (todo.completed === true) {
          checkbox.querySelector("input").checked = true;
          todoLabel.classList.add("todo-checked-text");
        }
        todo.elementReference = todoLi;
      }, this);
      this.checkTodosCompletion();
      todo.updateLocalStorage();
    },
    filterTodos: function () {
      switch (view.selectedFilter) {
        case "showAllTodos":
          view.filteredTodos = todo.todos;
          break;
        case "showUncompletedTodos":
          view.filteredTodos = todo.todos.filter((todo) => {
            return todo.completed == false;
          });
          break;
        case "showCompletedTodos":
          view.filteredTodos = todo.todos.filter((todo) => {
            return todo.completed == true;
          });
          break;
      }
    },
    createCheckbox: function () {
      // for pretty-checkbox.css
      var checkboxMain = document.createElement("div");
      var checkbox = document.createElement("input");
      var checkboxState = document.createElement("div");
      var checkboxIcon = document.createElement("i");
      var checkboxLabel = document.createElement("label");
      checkboxMain.className = "pretty p-icon p-round";
      checkboxState.className = "state";
      checkboxIcon.className = "icon mdi mdi-check mdi-18px";
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkboxState.appendChild(checkboxIcon);
      checkboxState.appendChild(checkboxLabel);
      checkboxMain.appendChild(checkbox);
      checkboxMain.appendChild(checkboxState);
      return checkboxMain;
    },
    createTodoLabel: function (todo) {
      var todoLabel = document.createElement("label");
      todoLabel.textContent = todo.todoText;
      todoLabel.className = "todo-text";
      todoLabel.contentEditable = true;
      return todoLabel;
    },
    createDeleteButton: function () {
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "×";
      deleteButton.className = "delete-button";
      return deleteButton;
    },
    checkTodosCompletion: function () {
      var totalTodos = todo.todos.length;
      var completedTodos = 0;
      var toggleAllButton = document.getElementById("toggleAll");
      var deleteCompletedButton = document.getElementById(
        "deleteCompletedButton"
      );
      var todosLeftLabel = document.getElementById("todosLeft");
      todo.todos.forEach((todo) => {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
      var uncompletedTodos = totalTodos - completedTodos;
      // If all todos are completed, add 'toggle-all-checked' class to toggleAll button.
      if (completedTodos === totalTodos && totalTodos > 0) {
        toggleAllButton.classList.add("toggle-all-checked");
      } else {
        toggleAllButton.classList.remove("toggle-all-checked");
      }
      // If at least one todo is completed, show Clear completed button, otherwise don't display it.
      switch (completedTodos) {
        case 0:
          deleteCompletedButton.style.display = "none";
          break;
        default:
          deleteCompletedButton.style.display = "initial";
          break;
      }
      // Update todosLeft label with the number of uncompleted todos.
      switch (uncompletedTodos) {
        case 0:
          todosLeftLabel.textContent = "";
          break;
        default:
          todosLeftLabel.textContent = "Todos left: " + uncompletedTodos;
      }
    },
    // Find the todo's element reference inside the todos array which matches argument element and then return it's index.
    getTodoElementIndex: function (todoElement) {
      var todos = todo.todos.find((todo) => {
        return todo.elementReference == todoElement;
      });
      return todo.todos.indexOf(todos);
    },
    // If device width is 680px or smaller, make todo text field equal to app width - 100px (for checkbox and delete button) so that extra text goes in a new line instead of increasing the todo's width and making it overflow horizontally.
    resizeTodos: function () {
      if (window.matchMedia("(max-device-width: 680px)").matches) {
        var hero = document.getElementById("hero");
        var todoAppWidth = document.getElementById("todoApp").offsetWidth;
        var todoTextWidth = todoAppWidth - 100 + "px";
        hero.style.setProperty("--mobile-todo-text-width", todoTextWidth);
      }
    },
    // For mobile devices, set hero height to mobile viewport height instead of using 100vh for height (because when using mobile keyboard, it's not included in the 100vh).
    setMobileHeroRows: function () {
      var hero = document.getElementById("hero");
      var windowHeight = window.innerHeight + "px";
      hero.style.setProperty("--mobile-hero-height", windowHeight);
    },
    setUpEventListeners: function () {
      var addTodoTextInput = document.getElementById("addTodoTextInput");
      var todoMenu1 = document.getElementById("todoMenu1");
      var todosUl = document.getElementById("todos");
      var todoMenu2 = document.getElementById("todoMenu2");
      window.addEventListener("resize", function () {
        // If screen width is 680px or less, run resizeTodos function.
        // The problem with this if statement is that Apple devices report screen width in dips while Android devices report it in physical pixels (which are being used here).
        // Correct if statement to cover both Apple and Android devices:
        if (window.matchMedia("(max-device-width: 680px)").matches) {
          view.resizeTodos();
        }
      });
      todoMenu1.addEventListener("click", function (event) {
        var elementClicked = event.target;
        if (elementClicked.id === "toggleAll") {
          todo.toggleAll();
        }
      });
      // Run addTodo function when 'Enter' is pressed inside addTodoTextInput
      addTodoTextInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          todo.addTodo();
        }
      });
      todosUl.addEventListener("click", function (event) {
        // Get the element that was clicked.
        var elementClicked = event.target;
        // Check if elementClicked is a delete button.
        if (elementClicked.classList.contains("delete-button")) {
          // Get index using getTodoElementIndex function.
          var indexOfTodoElement = view.getTodoElementIndex(
            elementClicked.parentNode
          );
          todo.deleteTodo(indexOfTodoElement);
        }
        // Check if elementClicked is a checkbox.
        else if (elementClicked.classList.contains("checkbox")) {
          // Get index using getTodoElementIndex function.
          var indexOfTodoElement = view.getTodoElementIndex(
            elementClicked.parentNode.parentNode
          );
          todo.toggleCompleted(todo.todos[indexOfTodoElement]);
        }
      });
      // Make todos lose focus on Enter.
      todosUl.addEventListener("keypress", function (event) {
        var elementClicked = event.target;
        if (event.key === "Enter") {
          elementClicked.blur();
        }
      });
      // When todo li loses focus, make todoList.todos.todo.todoText equal to the value of todo li.
      todosUl.addEventListener("focusout", function (event) {
        var elementClicked = event.target;
        if (elementClicked.classList.contains("todo-text")) {
          var indexOfTodoElement = view.getTodoElementIndex(
            elementClicked.parentNode
          );
          todo.updateTodo(elementClicked.textContent, indexOfTodoElement);
        }
      });
      todosUl.addEventListener("paste", function (event) {
        // Prevent paste.
        event.preventDefault();
        // Get text from clipboard.
        var text = event.clipboardData.getData("text/plain");
        // Insert text.
        document.execCommand("insertHTML", false, text);
      });
      todoMenu2.addEventListener("click", function (event) {
        var elementClicked = event.target;
        if (elementClicked.id === "deleteCompletedButton") {
          todo.deleteCompletedTodos();
        }
        // If the clicked element is a menu 2 button, add 'active' class to it and remove it from any other active button.
        else if (elementClicked.classList.contains("menu-2-button")) {
          var menu2ButtonElements = document.querySelectorAll(".menu-2-button");
          menu2ButtonElements.forEach((button) => {
            button.classList.remove("active");
          });
          elementClicked.classList.add("active");
          view.selectedFilter = elementClicked.id;
          view.displayTodos();
        }
      });
    },
  };
  view.setUpEventListeners();
  todo.getLocalStorage();
  view.setMobileHeroRows();
  view.displayTodos();
  view.resizeTodos();
}
