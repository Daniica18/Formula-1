import React from "react";
import { SyncLoader } from "react-spinners";

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <SyncLoader color="red" size={60} />
            </div>
        );
    }
}

