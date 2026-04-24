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

export interface FollowupItemUpdatePayload {
    assignees?: string
    target?: string
    remarks?: string
    list: FollowupChecklistItem[]

}

export interface PostFollowupItemUpdatePayload {
    token: string
    target: 'update-followup-item'
    data: {
        task: string,
        changes: FollowupItemUpdatePayload
    }
}

export interface PostFollowupUpdateResponse {
    status: number
    message: string
    timestamp: string
}


export type FollowupListFilter = 'all' | 'overdue' | 'due' | 'due-weeks' | 'none' | 'completed'