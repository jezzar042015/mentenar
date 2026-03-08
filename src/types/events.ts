export interface CalendarEvent {
    date: string; // ISO format date string (e.g., "2024-06-15")
    title: string;
    description?: string;
    assignee?: string;
    origin: 'followup' | 'preventive' 
}