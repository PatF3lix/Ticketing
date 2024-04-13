import {
  listener,
  OrderCreatedEvent,
  Subjects,
} from "@microserviceticket/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    // Save theticket
    await ticket.save();
    // ack the message
    msg.ack();
  }
}
