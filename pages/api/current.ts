import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { currentUser } = await serverAuth(req, res);

      return res.status(200).json(currentUser);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  } else if (req.method === "PUT") {
    try {
      const { currentUser } = await serverAuth(req, res);
      const { password, newPassword } = req.body;

      if (!currentUser.hashedPassword) {
        return res.status(400).json({ error: "User password not available" });
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        currentUser.hashedPassword
      );

      if (!isCorrectPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      const updatedUser = await prismadb.user.update({
        where: { id: currentUser.id },
        data: { hashedPassword: hashedNewPassword },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
