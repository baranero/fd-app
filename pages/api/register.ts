import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    // Sprawdź, czy użytkownik o podanym emailu już istnieje
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    // Sprawdź, czy nazwa użytkownika już istnieje
    const existingUsername = await prismadb.user.findUnique({
      where: {
        name,
      },
    });

    if (existingUsername) {
      return res.status(422).json({ error: "Username taken" });
    }

    // Znajdź strażaka o podanej nazwie
    const firefighter = await prismadb.firefighters.findUnique({
      where: {
        name,
      },
    });

    if (!firefighter) {
      return res.status(422).json({ error: "Firefighter not found" });
    }

    // Hashuj hasło
    const hashedPassword = await bcrypt.hash(password, 12);

    // Utwórz użytkownika z ID strażaka
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
        firefighterId: firefighter.id,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
