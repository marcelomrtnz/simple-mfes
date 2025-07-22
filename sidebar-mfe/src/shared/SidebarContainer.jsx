import React from "react";

import "./SidebarContainer.css";

const Container = function () {
    const newItemBroadcastChannel = new BroadcastChannel("newItem");

    const newItem = () => {
        newItemBroadcastChannel.postMessage({
            content: "Test Item"
        })
    }

    return (
        <div className="sidebar">
            <h1>Sidebar MFE</h1>
            <button onClick={() => newItem()}>Add new item</button>
        </div>
    );
}

export default Container;
