export interface PreventiveItem {
    task: string
    url: string
    completed: boolean
}

export interface PreventiveResponse {
    month: string
    assigned: string
    target: string
    tasks: PreventiveItem[]
}