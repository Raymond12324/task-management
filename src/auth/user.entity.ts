import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn('uuid')
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

}