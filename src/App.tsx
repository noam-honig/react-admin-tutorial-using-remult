import * as React from "react";
import { Admin, ListGuesser, Resource } from 'react-admin';
import { remult } from "./common";
import { PostList } from "./components/Posts";
import { UserList } from "./components/UserList";
import { RemultReactAdminDataProvider } from "./dev/remultReactAdminDataProvider";
import { Post } from "./model/Post";
import { User } from "./model/User";


const dataProvider = new RemultReactAdminDataProvider(remult, [User,Post]);
const App = () => <Admin dataProvider={dataProvider} >
  <Resource name="users" list={UserList} />
  <Resource name="posts" list={PostList} />
</Admin>;

export default App;