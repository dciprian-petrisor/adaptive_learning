
export interface ExpectedError {
    message: string;
    code: string;
} 


export interface ExpectedErrorType {
    [key: string]: ExpectedError[];
    nonFieldErrors: ExpectedError[];
}