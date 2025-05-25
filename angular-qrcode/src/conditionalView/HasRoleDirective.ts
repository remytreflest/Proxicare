import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/userService';
import { toRoleEnum } from '../herlpers/enumHelper';
import { RolesEnum } from '../resources/rolesEnum';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnDestroy {
  private rolesSub?: Subscription;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input()
  set hasRole(roles: string | string[]) {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    this.expectedRoles = rolesArray;
    this.rolesSub?.unsubscribe();
    this.rolesSub = this.userService.rolesLoaded$.subscribe((loaded) => {
      this.updateView(loaded);
    });
  }

  private expectedRoles: string[] = [];

  private updateView(loaded: boolean) {
    if (!loaded || this.expectedRoles.length === 0) {
      this.clearView();
      return;
    }

    const rawRoles = this.userService.getRoles();
    if (!rawRoles) {
      this.clearView();
      return;
    }

    // Convertit les rôles en enum valides
    const expectedEnums = this.expectedRoles
      .map(toRoleEnum)
      .filter((r): r is RolesEnum => r !== null)

    const hasRole = expectedEnums.some((r) => this.userService.hasRole(r));

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.clearView();
    }
  }

  private clearView() {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy() {
    this.rolesSub?.unsubscribe();
  }
}
