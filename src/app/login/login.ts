import { inject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";

import { ApiService } from "../api/api-service";

@inject(ApiService, Router)
export class Login {
	@bindable
	public Username: string;
	@bindable
	public Password: string;

	constructor(private Api: ApiService, private Router: Router) {

	}

	public DoLogin() {
		this.Api.Login(this.Username, this.Password);

		if (this.Api.IsLoggedIn) {
			// We're logged in
			if (this.Api.RouteFragment && this.Api.RouteFragment.length > 0) {
				// We've got somewhere to go after
				this.Router.navigate(this.Api.RouteFragment);
			} else {
				// Go home
				this.Router.navigate("/");
			}
		}
	}
}