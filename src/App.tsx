import React from "react";
import logo from "./logo.svg";
import "./App.css";
import filterMessages from "./utils/filterMessages";
import { Filter, Message } from "./utils/type";

const messages: Message[] = [
    {
        boolean: true,
    },
    {
        boolean: false,
    },
    {
        string: "string",
    },
    {
        string: "$StartsWith",
    },
    {
        string: "EndsWith$",
    },
    {
        string: "string contains $$ double dollar symbol",
    },
    {
        number: 12,
    },
    { date: new Date().toISOString() },
    {
        field1: 122,
        field2: new Date("2024-03-01T12:00:00.000Z").toISOString(),
    },
    {
        field1: 123,
        field2: new Date("2024-01-01T12:00:00.000Z").toISOString(),
    },
    {
        field1: 124,
        field2: new Date("2024-03-01T12:00:00.000Z").toISOString(),
    },
];

const filters: Filter = {
    type: "and",
    filters: [
        {
            type: "or",
            filters: [
                {
                    field: "field1",
                    type: "number",
                    operation: "lt",
                    value: 123,
                },
                {
                    field: "field1",
                    type: "number",
                    operation: "gt",
                    value: 123,
                },
            ],
        },
        {
            field: "field2",
            type: "date",
            operation: "after",
            value: new Date(),
        },
    ],
};

function App() {
    const result = filterMessages(messages, filters);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
