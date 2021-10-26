import express from 'express';
import {body, validationResult} from "express-validator";
const router = express.Router();
import db from "../service/CidadeService.js";

router.post('/',[
    body('nomeCity').isString().withMessage("Nome da cidade inválido"),
    body('tipoCity').isString().withMessage("Tipo da cidade inválido"),
    body('idUF').isNumeric().withMessage("UF inválido")
], async (req, res) => {
    const {nomeCity,tipoCity,idUF} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try{
        await db.insetCity(nomeCity,tipoCity,idUF);
        res.status(200).send({mensage: "Cidade inserida com sucesso"});
    }catch(err){
        res.status(500).send({message: "Erro ao inserir a cidade", err: err});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const dataCidade = await db.findByID(id);
        res.status(200).send(dataCidade);
    }catch(err){
        res.status(500).send({message: "Erro", err: err});
    }
});

router.get('/name/:name', async (req, res) => {
    try{
        const name = req.params.name;
        const dataCidade = await db.findByName(name);
        res.status(200).send(dataCidade);
    }catch(err){
        res.status(500).send({message: "Erro", err: err});
    }
});


router.put('/:id',[
    body('nomeCity').isString().withMessage("Nome da cidade inválido"),
    body('tipoCity').isString().withMessage("Tipo da cidade inválido"),
    body('idUF').isNumeric().withMessage("UF inválido")
], async (req, res) => {
    const {nomeCity,tipoCity,idUF} = req.body;
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try{
        await db.updateCity(nomeCity,tipoCity,idUF,id);
        res.status(200).send({mensage: "Cidade atualizada com sucesso"});
    }catch(err){
        res.status(500).send({message: "Erro ao editar a cidade", err: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        await db.deleteCity(id);
        res.status(200).send({message: "Cidate deletada com sucesso"});
    }catch(err){
        res.status(500).send({message: "Erro ao deletar a cidade", err: err});
    }
});


export default router;