const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const multer = require('multer');
const upload = multer();
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware para lidar com o formulário e arquivos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://jkuniversitario411:<db_password>@cluster0.ih9d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conexão com MongoDB bem-sucedida.");
    return client.db('nome_do_banco'); // Substitua pelo nome real do banco de dados
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

// Rota para receber os dados do formulário
app.post('/enviar-dados', upload.fields([
  { name: 'rgFoto' },
  { name: 'passaporteFoto' },
  { name: 'matriculaFoto' },
  { name: 'selfieDoc' }
]), async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection('usuarios');

  try {
    // Converte os arquivos para armazenar em base64
    const rgFoto = req.files['rgFoto'] ? req.files['rgFoto'][0].buffer.toString('base64') : null;
    const passaporteFoto = req.files['passaporteFoto'] ? req.files['passaporteFoto'][0].buffer.toString('base64') : null;
    const matriculaFoto = req.files['matriculaFoto'] ? req.files['matriculaFoto'][0].buffer.toString('base64') : null;
    const selfieDoc = req.files['selfieDoc'] ? req.files['selfieDoc'][0].buffer.toString('base64') : null;

    // Dados a serem inseridos
    const data = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      cpf: req.body.cpf,
      rg: req.body.rg,
      rgFoto: rgFoto,
      passaporte: req.body.passaporte,
      passaporteFoto: passaporteFoto,
      matricula: req.body.matricula,
      matriculaFoto: matriculaFoto,
      email: req.body.email,
      telefone: req.body.telefone,
      selfieDoc: selfieDoc,
      contato: {
        nome: req.body.contatoNome,
        sobrenome: req.body.contatoSobrenome,
        telefone: req.body.contatoTelefone,
        endereco: req.body.contatoEndereco,
        parentesco: req.body.contatoParentesco
      }
    };

    await collection.insertOne(data);
    res.status(200).json({ message: "Dados enviados com sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    res.status(500).json({ message: "Erro ao enviar os dados." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
      
