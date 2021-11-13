import * as React from "react";
import { Admin, ListGuesser, Resource } from 'react-admin';
import { remult } from "./common";
import { UserList } from "./components/UserList";
import { RemultReactAdminDataProvider } from "./dev/remultReactAdminDataProvider";
import { User } from "./model/User";


const dataProvider = new RemultReactAdminDataProvider(remult, [User]);
const App = () => <Admin dataProvider={dataProvider} >
  <Resource name="users" list={UserList} />
</Admin>;

export default App;