import { ReplaySubject } from 'rxjs';

const messageSubject = new ReplaySubject();

export const messageService = {
    messageSubject,
    message$: messageSubject.asObservable(),
};