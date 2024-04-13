import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@microserviceticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
