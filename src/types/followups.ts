export interface FollowupItem {
    task: string
    assignees: string
    started: string
    target: string
    completed: string
    location: string
    status: string
    remarks: string
    list: FollowupChecklistItem[]
    link: string
}

export interface FollowupChecklistItem {
    task: string
    completed: boolean
}


export type FollowupListFilter = 'all' | 'overdue' | 'due' | 'due-weeks' | 'none' | 'completed'