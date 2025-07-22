import React, { useEffect, useState } from "react";

import "./ContentContainer.css";

const Container = function () {
    const newItemBroadcastChannel = new BroadcastChannel("newItem");
    const [itens, setItens] = useState([]);

    newItemBroadcastChannel.onmessage = ((itemElement) => {
        setItens([...itens, itemElement.data]);
    });

    return (
        <div className="content">
            <h1>Content MFE</h1>

            {itens.map((item, itemIndex) => (
                <h2 key={itemIndex}>{item.content}</h2>
            ))}
        </div>
    );
}

export default Container;
