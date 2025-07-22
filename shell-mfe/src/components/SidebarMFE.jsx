import React, {lazy, Suspense} from "react";

import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "./ErrorFallBack";

const SidebarMFEContainer = function(){ 
    const SidebarMFE = lazy(() => import("sidebar/SidebarContainer"));

    return (
        <ErrorBoundary 
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => console.log({ error, errorInfo })}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <SidebarMFE />
            </Suspense>
        </ErrorBoundary>
    );
}

export default SidebarMFEContainer;
