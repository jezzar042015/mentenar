export interface FollowupItem {
    task: string
    assignees: string
    started: string
    target: string
    status: string
    remarks: string
}

export type FollowupListFilter = 'all' | 'overdue' | 'due' | 'none'