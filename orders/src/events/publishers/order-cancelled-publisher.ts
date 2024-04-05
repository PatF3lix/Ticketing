import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@microserviceticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
