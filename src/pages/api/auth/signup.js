import prisma from "../../../../lib/prismadb";
import { hashSync, genSaltSync } from "bcryptjs";


export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { username, email, password } = req.body;

    //chechk duplicate users
    const checkexisting = await prisma.user.findUnique({
      where: { email: email },
      select: {
        email: true,
      }
    });
    if (checkexisting !== null)
      return res.status(422).json({ message: "User already exists" });

    // hash password
    const salt = genSaltSync(12)
    const hashedPassword = hashSync(password, salt)
    try {
      const data = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ status: true, user: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res
      .status(500)
      .json({
        message: "HTTP method is not valid, only POST method is accepted.",
      });
  }
}
