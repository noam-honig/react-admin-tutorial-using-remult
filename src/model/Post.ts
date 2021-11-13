import { Entity, Field, IntegerField } from "remult";

@Entity("posts", {
    allowApiCrud: true
})
export class Post {
    @IntegerField()
    userId!: number;
    @IntegerField()
    id!: number;
    @Field()
    title!: string;
    @Field()
    body!: string;
}