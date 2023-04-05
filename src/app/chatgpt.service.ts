import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { environment } from 'src/environments/environment';


const APIKEY = environment.apiKey;

export interface ResponseOpenai {
  created: number;
  data:    Datum[];
}

export interface Datum {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor(private http: HttpClient) { }

  readonly configuration = new Configuration({
    apiKey: APIKEY,
    // organization: "org-nbgOuawYW1vCuheqqf4O491L",
    //organization: "org-2ByajWvqsNPBVOKOilmYdiPt",
  });

  readonly openai = new OpenAIApi(this.configuration);

  getCompletion(prompt: string){

    const params : CreateCompletionRequest = {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 256,
      temperature: 0.5
    };   

    return from(this.openai.createCompletion(params));
  }


  getImage(prompt: string):Observable<ResponseOpenai>{

    const URL = 'https://api.openai.com/v1/images/generations';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIKEY}`
    });
    
    const options = {
      headers: headers,
    };
    
    const body = {
      prompt,
      n: 1,
      size: "1024x1024"
    };

    return this.http.post<ResponseOpenai>(URL, body, options);
  }

}
