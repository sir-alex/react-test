import React from 'react'
import { act } from 'react-dom/test-utils'

export const useRequest = (callback: any) : [(data: any) => void, boolean, object | null] => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const request = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e: any) {
            setError(e)
        } finally {
            act(() => {
                setIsLoading(false)
            })
        }
    }

    return [request, isLoading, error]
}
