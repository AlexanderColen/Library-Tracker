import { Book } from './Book';

export class UserBook {
    id: string;
    user_id: string;
    book: Book;
    location_status: string;
    progress_status: string;

    public constructor() { }
}
