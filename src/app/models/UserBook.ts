import { Book } from './Book';

export class UserBook {
    id: string;
    user_id: string;
    book: Book;
    status: string;

    public constructor() { }
}
