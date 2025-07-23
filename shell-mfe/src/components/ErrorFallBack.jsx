import React from 'react';

export default function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert" style={{ width: 400 }}>
            <p>Something went wrong...</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}