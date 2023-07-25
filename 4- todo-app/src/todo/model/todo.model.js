

export class Todo {

    /**
     * Constructor de la clase Todo
     * @param {String} descripcion Descripción de la tarea
     */
    constructor ( descripcion) {
        this.id = 1;
        this.descripcion = descripcion;
        this.done = false;
        this.createdAt = new Date();
    }
}