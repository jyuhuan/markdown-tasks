/**
 * A greeter.
 */
export class Greeter {
  /**
   * The name of the greeter.
   */
  name: string;
  message: string;
  
  /**
   * 
   * @param name The name of the greeter.
   * @param msg 
   */
  public constructor(name: string, msg: string) {
    this.name = name;
    this.message = msg;
  }

  public getGreetingMessage(): string {
    return `[${this.name}] ${this.message}`
  }
}