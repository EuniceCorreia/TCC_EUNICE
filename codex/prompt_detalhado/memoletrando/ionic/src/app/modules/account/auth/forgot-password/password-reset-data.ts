export class PasswordResetData {

    public email: string;
    public token: string;
    public password: string;
    public password_confirmation: string;

    public email_is_valid: boolean = false;
    public token_is_valid: boolean = false;

    constructor() {
    }

    validateEmail(error: boolean) {
        this.email_is_valid = !error;
    }

    validateToken(error: boolean) {
        this.token_is_valid = !error;
    }

    skipEmail() {
        this.email_is_valid = true;
    }

    get stage() {
        if (this.email_is_valid) {
            if (this.token_is_valid) {
                return 3;
            }
            return 2;
        }
        return 1;
    }

    at(stage: number) {
        return (this.stage == stage);
    }

    get email_data() {
        return {
            email: this.email
        };
    }

    get validate_token_data() {
        return {
            token: this.token,
            email: this.email,
        };
    }

    get update_password_data() {
        return {
            token:                 this.token, 
            email:                 this.email,
            password:              this.password,
            password_confirmation: this.password_confirmation,
        };
    }
}