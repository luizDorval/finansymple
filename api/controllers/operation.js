import { db } from "../db.js";

//#region GET
export const getOperations = (req, res) => {
  const query = "SELECT * FROM operacoes WHERE ID_Usuario = ?";

  db.query(query, [req.id], (error, data) => {
    if (error) return res.json(error);

    return res.status(200).json(data);
  });
};
//#endregion

//#region GET ONE
export const getOperation = (req, res) => {
  const query = "SELECT * FROM operacoes WHERE ID = ? AND ID_Usuario = ?";

  db.query(query, [req.params.id, req.id], (error, data) => {
    if (error) return res.json(error);

    return res.status(200).json(data);
  });
};
//#endregion

//#region CREATE
export const createOperation = (req, res) => {
  const { description, type, value, createdDate, userId } = req.body;

  if (!type || !createdDate || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Preencha todos os campos" });
  }

  const query =
    "INSERT INTO operacoes (`Descricao`, `Tipo`, `Valor`, `Data_Criacao`, `ID_Usuario`) VALUES (?)";

  const values = [description, type, value, createdDate, userId];

  db.query(query, [values], (error) => {
    if (error) return res.json(error);

    return res
      .status(200)
      .json({ success: true, message: "Operação Criada com Sucesso" });
  });
};
//#endregion

//#region UPDATE
export const updateOperation = (req, res) => {
  const { type, createdDate, value } = req.body;

  if (!type || !createdDate) {
    return res
      .status(400)
      .json({ success: false, message: "Preencha todos os campos" });
  }

  const query =
    "UPDATE operacoes SET `Tipo` = ?, `Valor` = ?, `Data_Criacao` = ? WHERE `ID` = ? AND `ID_Usuario` = ?";

  const values = [type, value, createdDate];

  db.query(query, [...values, req.params.id, req.id], (error, data) => {
    if (error) return res.json(error);

    if (data.affectedRows < 1) return res.sendStatus(500);

    return res
      .status(200)
      .json({ success: true, message: "Operação Atualizada com Sucesso" });
  });
};
//#endregion

//#region DELETE
export const deleteOperation = (req, res) => {
  const query = "DELETE FROM operacoes WHERE `ID` = ?";

  db.query(query, [req.params.id], (error) => {
    if (error) return res.json(error);

    return res
      .status(200)
      .json({ success: true, message: "Operação Removida com Sucesso" });
  });
};
//#endregion
