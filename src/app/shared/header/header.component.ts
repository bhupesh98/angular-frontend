import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

	private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);
	isAuthenticated: boolean = false;
	userName: string = '';

	ngOnInit(): void {
		this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
			this.isAuthenticated = isAuthenticated;
		});
		this.oidcSecurityService.userData$.subscribe(({userData}) => {
			this.userName = userData?.preferred_username;
		});
	}

	login(): void {
		this.oidcSecurityService.authorize();
	}

	logout(): void {
		this.oidcSecurityService.logoff().subscribe((result) => {
			console.log(result);
		});
	}
}
