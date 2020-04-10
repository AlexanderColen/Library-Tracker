import { Book } from './Book';

export class UserBook {
    id: string;
    userId: string;
    book: Book;
    locationStatus: string;
    progressStatus: string;
    comment: string;

    public constructor() { }
}
