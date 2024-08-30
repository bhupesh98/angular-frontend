import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {HeaderComponent} from "./shared/header/header.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, HeaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'frontend';

	private readonly oidcService: OidcSecurityService = inject(OidcSecurityService);

	ngOnInit(): void {
		this.oidcService.checkAuth().subscribe(({isAuthenticated}) => {
			console.log('app authenticated', isAuthenticated);
		});
	}
}
