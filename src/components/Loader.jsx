import React from "react";
import { CircleLoader } from "react-spinners";

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <CircleLoader color="red" size={100} />
            </div>
        );
    }
}

