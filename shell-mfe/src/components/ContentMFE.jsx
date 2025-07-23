import React, {lazy, Suspense} from "react";

import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "./ErrorFallBack";

const ContentMFEContainer = function(){ 
    const ContentMFE = lazy(() => import("content/ContentContainer"));

    return (
        <ErrorBoundary 
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => console.log({ error, errorInfo })}
        >
            <Suspense fallback={<div>Wait... Loading...</div>}>
                <ContentMFE />
            </Suspense>
        </ErrorBoundary>
    );
}

export default ContentMFEContainer;
