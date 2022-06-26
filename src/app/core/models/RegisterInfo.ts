import { LoginInfo } from "./LoginInfo";

export class RegisterInfo extends LoginInfo {
    constructor(
        email: string,
        password: string,
        public username: string
    ) {
        super(email, password);
    }
}