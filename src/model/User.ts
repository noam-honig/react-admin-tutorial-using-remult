import { Entity, EntityBase, Field } from "remult";

@Entity("users", { allowApiCrud: true, dbAutoIncrementId: true })
export class User extends EntityBase {
    @Field({ allowApiUpdate: false })
    id!: number;
    @Field()
    name!: string;
    @Field()
    username!: string;
    @Field()
    email!: string;
    @Field()
    address!: Address;
    @Field()
    phone!: string;
    @Field()
    website!: string;
    @Field()
    company!: Company;
}
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}
export interface Geo {
    lat: string;
    lng: string;
}
export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
