import { Todo } from "../todo/model/todo.model";

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos : [
        new Todo('Prieda del alma'),
        new Todo('Prieda del infinito'),
        new Todo('Prieda del tiempo'),
    ], 
    filter: Filters.All,

}