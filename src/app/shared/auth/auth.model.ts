export interface AuthZ {
    Request: Request;
}

export interface Request {
    Resource:      AccessSubject;
    AccessSubject: AccessSubject;
}

export interface AccessSubject {
    Attribute: Attribute[];
}

export interface Attribute {
    AttributeId: string;
    Value:       string;
}
