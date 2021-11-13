import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, Create } from 'react-admin';

export const PostList = (props: any) => (
    <List {...props} filters={postFilters}>
        <Datagrid rowClick="edit" >
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
        </Datagrid>
    </List>
);

export const PostEdit = (props: any) => (
    <Edit {...props} title={<PostTitle />}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

const PostTitle = (props: any) => {
    const { record } = props;

    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};
const postFilters = [
    <TextInput source="title.$contains" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];