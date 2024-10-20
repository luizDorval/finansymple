import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { EMAIL_REGEX } from "../utils/regex.js";

export const handleRegister = (req, res) => {
  const { name, email, password } = req.body;

  const isEmailValid = EMAIL_REGEX.test(email);

  if (!isEmailValid) return res.sendStatus(400);

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

      const selectQuery = "SELECT `ID` FROM usuarios WHERE `Email` = ?";

      const values = [email];

      db.query(selectQuery, [...values], (error, data) => {
        if (error) return res.json(error);

        const roleQuery =
          "INSERT INTO usuarios_cargos (`ID_Usuario`, `ID_Cargo`) VALUES (?)";

        const values = [data[0].ID, 2];

        db.query(roleQuery, [values], (error) => {
          if (error) return res.json(error);

          return res
            .status(200)
            .json({ success: true, message: "Usuário Registrado com Sucesso" });
        });
      });
    });
  });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const isEmailValid = EMAIL_REGEX.test(email);

  if (!isEmailValid) return res.sendStatus(400);

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Por favor informe E-mail e Senha " });

  const query =
    "SELECT `usuarios`.`ID`, `usuarios`.`Email`, `usuarios`.`Senha`, `cargos`.`Nome` as Cargo FROM usuarios INNER JOIN usuarios_cargos ON `usuarios`.`ID` = `usuarios_cargos`.`ID_Usuario`INNER JOIN cargos ON `cargos`.`ID` = `usuarios_cargos`.`ID_Cargo`WHERE `usuarios`.`Email` = ?";

  db.query(query, [email], (error, data) => {
    if (!data.length) return res.sendStatus(401);

    const match = bcrypt.compare(password, data[0].Senha);
    if (match) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: data[0].ID,
            email: data[0].Email,
            roles: [data[0].Cargo],
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
      );

      const refreshToken = jwt.sign(
        { email: data[0].Email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshTokenQuery =
        "INSERT INTO refresh_tokens (`Refresh_Token`, `ID_Usuario`) VALUES (?)";

      const values = [refreshToken, data[0].ID];

      db.query(refreshTokenQuery, [values], (error) => {
        if (error) return res.status(400).json(error);

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res
          .status(200)
          .json({
            success: true,
            accessToken,
            roles: [data[0].Cargo],
            id: data[0].ID,
          });
      });
    } else {
      return res.sendStatus(401);
    }
  });
};
