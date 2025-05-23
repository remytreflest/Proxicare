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

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnDestroy {
  private rolesSub?: Subscription;
  private hasView = false;
  private expectedRole: string | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input()
  set hasRole(role: string) {
    this.expectedRole = role;
    this.rolesSub?.unsubscribe();
    this.rolesSub = this.userService.rolesLoaded$.subscribe((loaded) => {
      this.updateView(loaded);
    });
  }

  private updateView(loaded: boolean) {
    if (!loaded || !this.expectedRole) {
      this.clearView();
      return;
    }

    const rawRoles = this.userService.getRoles();
    if (!rawRoles) {
      this.clearView();
      return;
    }

    const role = toRoleEnum(this.expectedRole);

    if (role == null)
    {
      this.clearView();
      return;
    }

    let hasRole = this.userService.hasRole(role);

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
