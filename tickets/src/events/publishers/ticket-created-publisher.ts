import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@microserviceticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
