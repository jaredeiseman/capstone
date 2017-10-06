import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConfigService {

  baseURI: string = '/api';
  // baseURI: string = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  getConfig() {
    return this.http.get(`${this.baseURI}/masterconfig`);
  }

  updateConfig(value) {
    return this.http.post(`${this.baseURI}/masterconfig`, value);
  }

  updateGlobalStyles(newStyles) {
    return this.http.post(`${this.baseURI}/updateglobalstyles`, newStyles);
  }
}
