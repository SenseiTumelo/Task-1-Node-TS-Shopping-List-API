export interface lists {
    id: number,
    userId: number,
    name: string,
    color: string,
    item: {
        id: number,
        name: string,
        category: [],
        completed: boolean
    }
};

export interface users {
    id: number,
    name: string,
    password: string,
    email: string
}
