import { inject } from "aurelia-framework";
import { NavigationInstruction, Next, PipelineStep, Redirect, Router, RouterConfiguration } from "aurelia-router";

import { ApiService } from "./app/api/api-service";

@inject(ApiService)
export class App {
	message = 'Hello World!';
	public router: Router;

	constructor(public Api: ApiService) {
	}

	public configureRouter(config: RouterConfiguration, router: Router) {
		this.router = router;
		config.addPipelineStep("authorize", AuthorizeStep);

		config.map([
			{ route: ["/", "", "home"], moduleId: "app/start/start.html", title: "Start", name: "start", settings: { roles: [] } },
			{ route: "login", moduleId: "app/login/login", title: "Login", name: "login", nav: true, settings: { roles: [] } },
			{ route: "song/:id/edit", moduleId: "app/edit/edit", title: "Edit", name: "edit-song", nav: false, settings: { roles: ["User"] } }
		]);

		config.mapUnknownRoutes((instruction) => {
			return "home";
		});
	}
}

@inject(ApiService)
class AuthorizeStep implements PipelineStep {
	constructor(private Api: ApiService) { }

	public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
		// Does the roles required contain "User"
		if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf("User") !== -1)) {
			// Are we NOT logged in and NOT going to the login page
			if (!this.Api.IsLoggedIn && navigationInstruction.config.name !== "login") {
				// Capture the route (to navigate back to)
				this.Api.RouteFragment = navigationInstruction.fragment;
				// Cancel current navigation instruction, redirect to login
				return next.cancel(new Redirect("login"));
			}
		}
		return next();
	}
}
