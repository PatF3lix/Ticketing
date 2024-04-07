import { Message } from "node-nats-streaming";
import {
  Subjects,
  listener,
  TicketUpdatedEvent,
} from "@microserviceticket/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName: string = Subjects.TicketUpdated;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price } = data;
    ticket.set({
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
