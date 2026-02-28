

export interface PreventiveResponse {
    month: string
    assigned: string
    target: string
    tasks: PreventiveItem[]
}

export interface PreventiveItem {
    task: string
    completed: boolean
    tiId: string
}

export interface TaskInstruction {
    id: string
    task: string
    frequency: string
    aspect: string
    safety: string
    elements: TaskInstructionElement[]
}

export interface TaskInstructionElement {
    element: string
    items: string[]
}