import React, { useEffect, useState } from "react";
import axios from "axios";

const initState = {
    seenIndexes: [],
    values: {},
    index: ""
};

const Fib = () => {
    const [state, setState] = useState(initState);

    useEffect(
        () => {
            (async () => {
                const values = await axios.get("/api/values/current");
                const seenIndexes = await axios.get("/api/values/all");
                setState({ ...state, values: values.data, seenIndexes: seenIndexes.data });
            })();
        },
        // eslint-disable-next-line
        []
    );

    const renderSeenIndexes = () => {
        return state.seenIndexes.map(index => index.number).join(", ");
    };

    const renderCalculatedValues = () => {
        console.log(state.values);
        const entries = [];

        for (let key in state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {state.values[key]}
                </div>
            );
        }

        return entries;
    };

    const onFormSubmit = async event => {
        event.preventDefault();

        await axios.post("/api/values", {
            index: state.index
        });
        setState({ ...state, index: "" });
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <label>Enter your index:</label>
                <input value={state.index} onChange={event => setState({ ...state, index: event.target.value })} />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculated values:</h3>
            {renderCalculatedValues()}
        </div>
    );
};

export default Fib;