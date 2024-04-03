import {
  Publisher,
  TicketUpdatedEvent,
  Subjects,
} from "@microserviceticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
