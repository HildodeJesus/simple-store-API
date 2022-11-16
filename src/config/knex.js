import config from "../knexfile";
import knex from "knex";

const dbKnex = knex(config);

export default dbKnex;
