import type { AppView } from "@/types/views"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useURLStore = defineStore('url', () => {

    const allowedParams = ref<{
        v: AppView
        ref: string | null,
        nh: boolean
    }>({
        v: 'home',
        ref: null,
        nh: true,
    })

    const parseURL = async () => {
        const params = new URLSearchParams(globalThis.location.search)

        if (params.has('nh')) allowedParams.value['nh'] = false
        if (params.has('v')) allowedParams.value['v'] = params.get('v') as AppView
        if (params.has('ref')) allowedParams.value['ref'] = params.get('ref') 
    }

    return {
        parseURL,
        allowedParams
    }



})