// in src/MyUrlField.js
import * as React from "react";
import { useRecordContext } from 'react-admin';

const MyUrlField = (args: any) => {
    let { source } = args;
    const record = useRecordContext();
    return record ? (
        <a href={record[source]}>
            {record[source]}
        </a>
    ) : null;
}

export default MyUrlField;