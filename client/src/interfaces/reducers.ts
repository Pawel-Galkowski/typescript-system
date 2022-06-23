export interface Action {
    type: string,
    payload: any
}

export interface InitialState {
    forms?: any
    form?: Object
    loading: boolean
    error?: Object
    isAuthenticated?: boolean
    token?: any
    user?: Object
    posts?: any
    post?: any
    profile?: Object
    profiles?: any
    repos?: any
}
