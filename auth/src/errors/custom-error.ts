export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}

/**    Object.setPrototypeOf(this, CustomError.prototype);
 * 
 * When you extend a class in TypeScript (or JavaScript),
 * the prototype chain is established automatically. 
 * That is, instances of the subclass inherit properties and methods from both the subclass 
 * itself and its superclass. However, in some cases, such as when using Object.create() 
 * or in this case, when manually setting the prototype, you may need to ensure that 
 * the prototype chain is correctly established.

  In this specific scenario, calling Object.setPrototypeOf(this, CustomError.prototype) 
  is a precautionary measure to ensure that the prototype chain is set up properly. 
  This line of code sets the prototype of the subclass instance (this) to be the prototype of the 
  CustomError class. This ensures that instances of the subclass have access to methods and 
  properties defined in CustomError.

  It's worth noting that while this line might be necessary in some scenarios, 
  in typical subclassing scenarios in TypeScript, you don't usually need to manually 
  set the prototype, as TypeScript handles prototype chaining automatically when you extend a class. 
  However, there are certain situations, particularly when dealing with custom prototypes 
  or non-standard inheritance patterns, where manually setting the prototype might be necessary. 
*/
