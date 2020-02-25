interface ResponseData {
    statusCode: number,
    body: string,
    headers: string
}

export interface Response{
    relativepath: string,
    method: string,
    responseData: ResponseData
}