import { db } from "../db.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const query =
    "SELECT `usuarios`.`ID`, `usuarios`.`Email`, `cargos`.`Nome` as `Cargo` FROM usuarios INNER JOIN refresh_tokens ON `usuarios`.`ID` =  (SELECT `ID_Usuario` FROM refresh_tokens WHERE `Refresh_Token` = ?) INNER JOIN usuarios_cargos ON `usuarios`.`ID` = `usuarios_cargos`.`ID_Usuario` INNER JOIN cargos ON `cargos`.`ID` = usuarios_cargos.ID_Cargo";

  db.query(query, [refreshToken], (error, data) => {
    if (!data.length) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || data[0].Email !== decoded.email)
          return res.status(403).json({
            success: false,
            message: "fudeu",
            error: error,
            data: data[0].Email,
            decoded,
          });

        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: data[0].ID,
              email: decoded.email,
              roles: [data[0].Cargo],
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "300s" }
        );

        return res.json({
          roles: [data[0].Cargo],
          accessToken,
          id: data[0].ID,
        });
      }
    );
  });
};
