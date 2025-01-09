export class CreateUserDto {
    readonly username: string;
    password: string;
}

export class UpdateUserDto {
    readonly username?: string;
    password?: string;
}