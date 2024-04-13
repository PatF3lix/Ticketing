import {
  Publisher,
  TicketUpdatedEvent,
  Subjects,
} from "@microserviceticket/common";
import { natsWrapper } from "../../nats-wrapper";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

new TicketUpdatedPublisher(natsWrapper.client).publish({});
