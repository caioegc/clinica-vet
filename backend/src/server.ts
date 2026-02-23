import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/pets', async (req, res) => {
  const pets = await prisma.pet.findMany();
  res.json(pets);
});

app.post('/pets', async (req, res) => {
  const { nome, especie, idade } = req.body;
  const novoPet = await prisma.pet.create({
    data: {
      nome,
      especie,
      idade: Number(idade)
    }
  });
  res.json(novoPet);
});

app.delete('/pets/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.pet.delete({
    where: { id: Number(id) }
  });
  res.send();
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001 🚀');
});