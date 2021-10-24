import express from "express";
import cidade from "./Controller/CidadeController.js";
const router = express.Router();

router.use("/cidade",cidade);

router.use('/*',(req, res) => {
    res.status(404).send({message: "Caminho Não Encontrado"});
});

export default router;