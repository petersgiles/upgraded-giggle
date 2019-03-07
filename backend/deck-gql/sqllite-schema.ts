import { dropDeckItemTable, createDeckItemTable } from "./resolvers";

export const createDB = (knex: any, drop?: boolean) => {
    if(drop) {
        dropDeckItemTable(knex)
    }

    createDeckItemTable(knex)
}