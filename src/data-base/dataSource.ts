import path, { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { User } from "../user/entities/user.entity";

config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB_NAME } = process.env;
export const datasourceOptions: DataSourceOptions = {
    type: "postgres",
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT || 5432,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_NAME,
    entities: [User,
        join(__dirname, "../**/*entity{.ts,.js}")
    ],
    migrationsTableName: "migrations",
    logging: true,
    migrations: [join(__dirname, "../migration/*{.ts,.js}")],
    migrationsRun: true,
    synchronize:false,

    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // }
};
export const connectDb = new DataSource(datasourceOptions);
connectDb.initialize().then((data) => console.log("Datasource Intitatilised!!!")).catch((e) => console.log(e));