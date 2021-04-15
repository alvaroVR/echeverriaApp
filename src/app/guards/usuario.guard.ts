import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from "../services/usuario.service";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(private authService: AuthService) {}


  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.validaToken();
  }

  //canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //  return false;
  //}
//
}
