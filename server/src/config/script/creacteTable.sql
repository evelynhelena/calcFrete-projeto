-- projetofrete.preco_cidade_frete_peso definition

CREATE TABLE `preco_cidade_frete_peso` (
  `ID_PRECO` bigint(20) NOT NULL AUTO_INCREMENT,
  `PESO_INICIO` decimal(10,3) DEFAULT NULL,
  `PESO_FINAL` decimal(10,3) DEFAULT NULL,
  `VALOR_TAXA` decimal(10,2) DEFAULT NULL,
  `KG_EXCEDENTE` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`ID_PRECO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- projetofrete.uf definition

CREATE TABLE `uf` (
  `ID_UF` tinyint(4) NOT NULL,
  `SIGLA_UF` char(2) DEFAULT NULL,
  `PERC_ICMS` decimal(7,2) DEFAULT NULL,
  `REGIAO` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`ID_UF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- projetofrete.vigencia_preco definition

CREATE TABLE `vigencia_preco` (
  `ID_Vigencia` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRICAO` varchar(15) DEFAULT NULL,
  `DT_INICIO` datetime DEFAULT NULL,
  `DT_FINAL` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_Vigencia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- projetofrete.cidade definition

CREATE TABLE `cidade` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FK_ID_UF` tinyint(4) DEFAULT NULL,
  `NOME_CIDADE` varchar(40) DEFAULT NULL,
  `TIPO_CIDADE` char(1) DEFAULT NULL,
  `ind_canc` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `FK_ID_UF` (`FK_ID_UF`),
  CONSTRAINT `FK_ID_UF` FOREIGN KEY (`FK_ID_UF`) REFERENCES `uf` (`ID_UF`)
) ENGINE=InnoDB AUTO_INCREMENT=3413 DEFAULT CHARSET=utf8mb4;


-- projetofrete.preco_frete_cidade definition

CREATE TABLE `preco_frete_cidade` (
  `ID_Frete_Cidade` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID_VIGENCIA` int(11) DEFAULT NULL,
  `ID_CIDADE` int(11) DEFAULT NULL,
  `VLR_PEDAGIO` decimal(7,2) DEFAULT NULL,
  `OUTRAS_TXS` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Frete_Cidade`),
  KEY `FK_PRECFRECID_VIG` (`ID_VIGENCIA`),
  KEY `FK_PRECFRECID_CID` (`ID_CIDADE`),
  CONSTRAINT `FK_PRECFRECID_CID` FOREIGN KEY (`ID_CIDADE`) REFERENCES `cidade` (`ID`),
  CONSTRAINT `FK_PRECFRECID_VIG` FOREIGN KEY (`ID_VIGENCIA`) REFERENCES `vigencia_preco` (`ID_Vigencia`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;