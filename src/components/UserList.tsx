import * as React from "react";
import { List, Datagrid, TextField, EmailField, UrlField } from 'react-admin';
import MyUrlField from "./MyUrlField";

export const UserList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);