import * as React from "react";
import { Admin, ListGuesser, Resource } from 'react-admin';
import { remult } from "./common";
import { PostCreate, PostEdit, PostList } from "./components/Posts";
import { UserList } from "./components/UserList";
import { RemultReactAdminDataProvider } from "./dev/remultReactAdminDataProvider";
import { Post } from "./model/Post";
import { User } from "./model/User";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';


const dataProvider = new RemultReactAdminDataProvider(remult, [User, Post]);
const App = () => <Admin dataProvider={dataProvider} >
  <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
  <Resource name="users" list={UserList} icon={UserIcon} />
</Admin>;

export default App;