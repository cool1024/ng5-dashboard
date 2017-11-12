import { Injectable } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { Breadcrumbs, Breadcrumb } from './../classes/breadcrumb.class';

@Injectable()
export class AuthService {

    private loginState = false;

    constructor() { }

    setOut() {
        this.loginState = false;
    }

    setIn() {
        this.loginState = true;
    }

    get isLoggedIn(): boolean {
        return this.loginState;
    }
}
