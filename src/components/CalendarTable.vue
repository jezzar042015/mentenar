<template>
    <div class="p-4">
        <!-- Weekday headers -->
        <div class="grid grid-cols-7 gap-1 mb-1">
            <div
                v-for="weekday in weekdayHeaders"
                :key="weekday"
                class="text-center text-sm font-semibold text-gray-600 py-2"
            >
                {{ weekday }}
            </div>
        </div>

        <!-- Calendar cells -->
        <div class="grid grid-cols-7 gap-1">
            <div
                v-for="cell in calendarCells"
                :key="cell.key"
                class="border border-gray-300 p-4 min-h-24"
                :class="cell.inCurrentMonth ? 'bg-gray-100' : 'bg-gray-50 text-gray-400'"
            >
                <div class="text-sm font-semibold">
                    {{ cell.day }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    /**
     * Month number (1-12)
     */
    month: number;
    year: number;
}>();

const weekdayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const firstDayOfMonth = computed(() => new Date(props.year, props.month - 1, 1).getDay());
const daysInMonth = computed(() => new Date(props.year, props.month, 0).getDate());
const daysInPreviousMonth = computed(() => new Date(props.year, props.month - 1, 0).getDate());

const calendarCells = computed(() => {
    const cells: Array<{ key: string; day: number; inCurrentMonth: boolean }> = [];

    // Leading days from previous month
    for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
        cells.push({
            key: `prev-${i}`,
            day: daysInPreviousMonth.value - i,
            inCurrentMonth: false
        });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth.value; day++) {
        cells.push({
            key: `current-${day}`,
            day,
            inCurrentMonth: true
        });
    }

    // Trailing days from next month to complete 6 weeks (42 cells)
    const trailing = 42 - cells.length;
    for (let day = 1; day <= trailing; day++) {
        cells.push({
            key: `next-${day}`,
            day,
            inCurrentMonth: false
        });
    }

    return cells;
});
</script>