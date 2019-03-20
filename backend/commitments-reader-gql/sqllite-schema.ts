import { dropCommitmentTable, createCommitmentTable } from "./resolvers";

export const createDB = (knex: any, drop?: boolean) => {
    if(drop) {
        dropCommitmentTable(knex)
    }

    createCommitmentTable(knex)
}