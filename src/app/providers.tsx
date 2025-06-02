'use client'

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query"

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 60 * 1000,
                gcTime: 60 * 1000,
                refetchOnMount: false
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
    if (isServer) {
        return makeQueryClient();
    }
    else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()

        return browserQueryClient
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}