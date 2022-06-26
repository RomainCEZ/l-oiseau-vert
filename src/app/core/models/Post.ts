export class Post {
    constructor(
        public id: string,
        public content: string,
        public authorId: string,
        public author: string,
        public creationDate: number
    ) { }
}