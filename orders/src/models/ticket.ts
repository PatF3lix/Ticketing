import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
  //   userId: string;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<Boolean>;
  //   userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    //   userId: {
    //     type: String,
    //     required: true,
    //   },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    //   userId: attrs.userId,
  });
};

//this is how we add a method directly to the ticekt document itself
ticketSchema.methods.isReserved = async function () {
  /** Run query to look at all orders.
     Find an order where the ticket is the ticket we just found
     *and* the orders status is *not* cancelled.
     If we find an order from that means the ticket *is* reserved */
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  // in case existing order is null, it will be flipped to true, then false due to the (!!)
  // in case the existing order exists, it will be flipped to false, then true due to the (!!)
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
