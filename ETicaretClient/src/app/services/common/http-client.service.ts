import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) {}

  private generateUrl(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.generateUrl(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryStrings ? `?${requestParameter.queryStrings}` : "" }`;
    return this.httpClient.get<T>(url, { headers: requestParameter.headers })
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.generateUrl(requestParameter)}${requestParameter.queryStrings ? `?${requestParameter.queryStrings}` : "" }`
    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers });
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) : Observable<T>{
    let url: string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.generateUrl(requestParameter)}${requestParameter.queryStrings ? `?${requestParameter.queryStrings}` : "" }`
    return this.httpClient.put<T>(url, body, {headers: requestParameter.headers})
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string) : Observable<T> {
    let url: string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.generateUrl(requestParameter)}/${id}${requestParameter.queryStrings ? `?${requestParameter.queryStrings}` : "" }`
    return this.httpClient.delete<T>(url, {headers: requestParameter.headers});
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryStrings?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}