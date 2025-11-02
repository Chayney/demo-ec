export type Todo = {
    id: number,
    title: string,
    content: string
}

export type CreateTodoRequest = {
    title: string,
    content: string
}

export type EditTodoRequest = {
    id: number,
    title: string,
    content: string
}

export type DeleteTodoRequest = {
    id: number
}