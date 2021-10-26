import express from 'express';
const router = express.Router();
import db from "../service/UfService.js";

router.get('/', async (req, res) => {
    try{
        const dataUf = await db.findAll();
        res.status(200).send(dataUf);
    }catch(err){
        res.status(500).send({message: "Erro recuperar os estados", err: err});
    }
});

export default router;