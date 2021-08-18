import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const baseUrl = "https://api.mazii.net/api/";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getFolder = () => {
    return this.httpClient.get(baseUrl + "get-category/0/100", {headers: {Authorization: '3fef9c7409b2f7a45b805096dd7517ae'}})
  }

  getNote = (id) => {
    return this.httpClient.get(`${baseUrl}get-note/${id}/0/100`, {headers: {Authorization: '3fef9c7409b2f7a45b805096dd7517ae'}})
  }
}
