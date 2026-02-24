import 'dotenv/config'
import postgres from 'postgres';

const {DBHOST, DBUSER, DBPASS, DBNAME, DBPORT} = process.env;
const URL =  `postgresql://${DBUSER}:${DBPASS}@${DBHOST}:${DBPORT}/${DBNAME}`;

export const sql = postgres(URL);
