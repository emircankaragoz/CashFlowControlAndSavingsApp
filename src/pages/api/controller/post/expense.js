export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {

    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { amount, defination, category, date } = req.body.values;
    const { user } = req.body.session;
    const datetime = new Date(date)

    try {
      const data = await prisma.expenses.create({
        data: {
          amount: amount,
          defination: defination,
          date: datetime,
          user: {
            connect: {
              email: user.email,
            },
          },
          category: {
            connect: {
              slug: category,
            },
          },
        },
      });

      res.status(201).json({ status: true, expenses: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
