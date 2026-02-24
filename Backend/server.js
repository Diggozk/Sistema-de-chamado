import fastify from 'fastify';
import cors from '@fastify/cors'
import { databasechamados } from './database-chamados.js';



const server = fastify()
await server.register(cors, {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "PUT", "POST", "DELETE"]
})
const database = new databasechamados()


//criação de chamado
server.post('/chamados', async (request, reply)=>{
    const {title, description} = request.body

    await database.create({
        title,
        description
    })

    return reply.status(201).send()
})

server.get('/chamados/:id', async(request) =>{
    const search = request.query.search
    const chamados = await database.read(search)

    return chamados
})

server.put('/chamados/:id', async(request, reply) => {
    const chamadosID = request.params.id
    const {title, description} = request.body

    await database.update(chamadosID, {
        title,
        description
    })

    return reply.status(204).send()
})

server.delete('/chamados/:id', async (request, reply) => {
    const chamadosID = request.params.id

    await database.delete(chamadosID)

    return reply.status(204).send


})


server.listen({
    port: process.env.PORT || 3003,
    host: '127.0.0.1'
})