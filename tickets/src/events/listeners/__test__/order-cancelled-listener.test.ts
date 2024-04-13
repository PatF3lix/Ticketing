import mongoose, { set } from "mongoose";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent } from "@microserviceticket/common";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/tickets";
import { Message } from "node-nats-streaming";
const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "asdf",
  });

  ticket.set({ orderId }); // Set orderId using the set method
  console.log("Ticket before saving:", ticket); // Log ticket before saving

  await ticket.save();
  console.log("Ticket after saving:", ticket);

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, ticket, orderId, listener };
};

it("updates the ticket , publishes an event, and acks the message", async () => {
  const { msg, data, ticket, orderId, listener } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  console.log("after findbyId", updatedTicket);
  expect(updatedTicket!.orderId).not.toBeUndefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
