class Person {
    private readonly name!: string;
    private readonly age!: number;
    private readonly email: string;
    private readonly address?: {street: string, no: number};


    public constructor(param: {name: string, age: number, email?: string, address?: {street: string, no: number}}) {
        this.name = param.name;
        this.age = param.age;
        this.email = param.email||'';
        this.address = param.address;
        
    }

    public getName = (): string  =>  this.name;
    public getAge = (): number => this.age;
    public getEmail = (): string => this.email;
    public isEmail = ():boolean => this.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
    public hasGivenAge = (): boolean => this.age >= 18;
    public hasAddress = (): boolean => this.address !== undefined;
}

export default Person;