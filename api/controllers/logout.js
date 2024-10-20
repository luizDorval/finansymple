import { db } from "../db.js";

export const handleLogout = (req, res) => {
  // On cliente also deletes the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  const query =
    "SELECT Email, ID_Usuario FROM usuarios INNER JOIN refresh_tokens ON usuarios.ID =  (SELECT ID_Usuario FROM refresh_tokens WHERE `Refresh_Token` = ?)";

  db.query(query, [refreshToken], (error, data) => {
    if (!data.length) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    const deleteQuery = "DELETE FROM refresh_tokens WHERE `ID_Usuario` = ?";

    // Delete refresh token in db
    db.query(deleteQuery, [data[0].ID_Usuario], (error) => {
      if (error) return res.sendStatus(500);

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204);
    });
  });
};
