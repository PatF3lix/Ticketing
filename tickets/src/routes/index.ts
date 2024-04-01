import expresss, { Response, Request } from "express";
import { Ticket } from "../models/tickets";

const router = expresss.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export { router as indexTicketRouter };
