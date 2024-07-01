const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mobileapp'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

app.post('/api/reservar_sala', (req, res) => {
    const { responsavel, email, data_reuniao, horario_inicio, horario_final, sala, observacao } = req.body;
    console.log('Dados recebidos no back-end:', req.body);
    const sql = 'INSERT INTO reservas (responsavel, email, data_reuniao, horario_inicio, horario_final, sala, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [responsavel, email, data_reuniao, horario_inicio, horario_final, sala, observacao], (err, result) => {
        if (err) {
            console.error('Erro ao reservar sala: ', err);
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: result.insertId, responsavel, email, data_reuniao, horario_inicio, horario_final, sala, observacao });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});