export interface AuthZ {
  Request: Request;
}

export interface Request {
  Action: AccessSubject;
  Resource: AccessSubject;
  AccessSubject: AccessSubject;
  Environment: Environment;
}

export interface AccessSubject {
  Attribute: Attribute[];
}

export interface Environment {
  Attribute: Attribute[];
}

export interface Attribute {
  AttributeId: string;
  Value: string;
}
