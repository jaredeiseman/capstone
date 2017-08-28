import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConfigService {

  constructor(private http: Http) { }

  getConfig() {
    return this.http.get('http://localhost:3000/api/masterconfig');
  }

  updateConfig(value) {
    return this.http.post('http://localhost:3000/api/masterconfig', value);
  }

}
