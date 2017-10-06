import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  baseURI: string = environment.baseURI;

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
