import { AuthQuery } from '../auth/state/auth-query.service';
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  @Input('hasPermission')
  checkPermissions: String | String[];
  private subscription: Subscription;

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private authQuery: AuthQuery
  ) {}

  ngOnInit() {
    this.authQuery
      .hasPermission(this.checkPermissions)
      .subscribe(hasPermission => {
        this.vcr.clear();
        if (hasPermission) {
          this.vcr.createEmbeddedView(this.tpl);
        }
      });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
