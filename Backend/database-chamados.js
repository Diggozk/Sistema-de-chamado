import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class databasechamados{
    //crud

    async read(search){
        let chamados
        
        if(search){
            chamados = await sql`select * from chamados where title ilike ${'%' + search + '%'} `
        }else{
            chamados = await sql`select * from chamados`
        }

        return chamados
    }
    async create(chamados){
        let chamadosID = randomUUID()
        let {title, description} = chamados

        await sql`insert into chamados(id, title, description) VALUES (${chamadosID},${title},${description})`

    }
    async update(id, chamados){
        const {title, description} = chamados

        await sql`update chamados set title = ${title}, description = ${description}  WHERE id = ${id}`
    }
    async delete(id){

        await sql`delete from chamados WHERE id = ${id}`
    }
}