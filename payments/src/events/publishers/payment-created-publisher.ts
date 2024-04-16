import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@microserviceticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
