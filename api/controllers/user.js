import { db } from "../db.js";
import bcrypt from "bcrypt";

//#region GET
export const getUsers = (req, res) => {
  const query = "SELECT * FROM usuarios WHERE ID = ?";

  db.query(query, [req.id], (error, data) => {
    if (error) {
      if (error.code === "ECONNREFUSED")
        return res.json({
          success: true,
          Message: "Banco de dados offline, tente novamente mais tarde",
        });

      return res.json(error);
    }

    return res.status(200).json(data);
  });
};
//#endregion

//#region GET ONE
export const getUser = (req, res) => {
  const query = "SELECT * FROM usuarios WHERE ID = ?";

  db.query(query, [req.params.id], (error, data) => {
    if (error) {
      if (error.code === "ECONNREFUSED")
        return res.json({
          success: true,
          Message: "Banco de dados offline, tente novamente mais tarde",
        });

      return res.json(error);
    }

    return res.status(200).json(data);
  });
};
//#endregion

//#region CREATE
export const createUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos",
    });
  }

  const emailQuery = "SELECT COUNT(*) AS count FROM usuarios WHERE email = ?";

  db.query(emailQuery, [email], async (error, data) => {
    if (error) return res.status(400).json(error);
    const emailExists = data[0].count > 0;

    if (emailExists)
      return res
        .status(409)
        .json({ success: false, message: "O email informado já existe" });

    const query = "INSERT INTO usuarios (`Nome`, `Email`, `Senha`) VALUES (?)";

    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [name, email, hashedPassword];

    db.query(query, [values], (error) => {
      if (error) return res.json(error);

      return res
        .status(200)
        .json({ success: true, message: "Usuário Criado com Sucesso" });
    });
  });
};
//#endregion

//#region UPDATE
export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos",
    });
  }

  const query =
    "UPDATE usuarios SET `Nome` = ?, `Email` = ?, `Senha` = ? WHERE `ID` = ?";

  const hashedPassword = await bcrypt.hash(password, 10);

  const values = [name, email, hashedPassword];

  db.query(query, [...values, req.id], (error) => {
    if (error) return res.json(error);

    return res
      .status(200)
      .json({ success: true, message: "Usuário Atualizado com Sucesso" });
  });
};
//#endregion

//#region DELETE
export const deleteUser = (req, res) => {
  const query = "DELETE FROM usuarios WHERE `ID` = ?";

  db.query(query, [req.params.id], (error) => {
    if (error) return res.json(error);

    return res
      .status(200)
      .json({ success: true, message: "Usuário Removido com Sucesso" });
  });
};
//#endregion
