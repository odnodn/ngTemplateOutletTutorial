import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <header *ngIf="isTitleAString(); else titleTemplateWrapper">{{ title }}</header>
      <ng-template #titleTemplateWrapper>
        <ng-container [ngTemplateOutlet]="title"></ng-container>
      </ng-template>
      <article>
        <ng-content></ng-content>
      </article>
    </div>
  `,
  styleUrls: ['card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title: string | TemplateRef<HTMLElement>;
  isTitleAString = () => typeof this.title == 'string';
}
