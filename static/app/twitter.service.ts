import { Injectable, Inject }    from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TwitterService {

    constructor(@Inject(Http) private _http: Http){}

    getTweets(username:string) : Promise<Response>{
        let ths = this;
        return ths._http.get('/api/twitter/'+ username)
            .toPromise()
    }
}