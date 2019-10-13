# Introduction

To build reusable and developer friendly components, we need to make them more dynamic (read more adaptable). Great news, Angular comes with some great tools for that. For instance, we could inject content to our components using `<ng-content>` (example in Snippet 1: Transclution).

```typescript
@Component({
  selector: 'child-component',
  template: `
    <div class="child-component">
      <ng-content></ng-content>
    </div>
  `,
})
export class ChildComponent {}

@Component({
  selector: 'parent-component',
  template: `
    <child-component>
      Transcluded content
    </child-component>
  `,
})
export class ParentComponent {}
```

<figcaption>Snippet 1: Transclusion</figcaption>

Although this transclusion technique is great for simple content projection, what if you want your projected content to be context-aware. For example, while implementing a list component you want the items template to be defined in the parent component while being context-aware (of what is the current item it hosts).
For those kinds of scenarios, Angular comes with a great API called `ngTemplateOutlet`.

In this post, we will we will define what `ngTemplateOutlet` is then we will build the list component we mentioned above as well as a tab component to see some use-cases. We will do the implementation step-by-step, so by the end of this post you should feel comfortable using this in your components :)

# Definition

From the current Angular documentation `ngTemplateOutlet` is a directive that: **Inserts an embedded view from a prepared TemplateRef**.

This directive has two properties:

- ngTemplateOutlet: the template reference (type: `TemplateRef`).
- ngTemplateOutletContext: A context object to attach to the EmbeddedViewRef. Using the key `$implicit` in the context object will set its value as default.

What this means is that in the child component we can get a template from the parent component and we can inject a context object into this template. We can then use this context object in the parent component.

If you find this too abstract, this is how we use it:

```html
<script>
  // let's assume we have this public property in our child component
  context = { $implicit: 'Joe', age: 42 };
</script>

<!-- Child component -->
<ng-container [ngTemplateOutlet]="templateRefFromParentComponent" [ngTemplateOutletContext]="context">
</ng-container>

<!-- Parent component -->
<ng-template #someTemplate let-name let-age="age">
  <p>{{ name }} - {{ age }}</p>
</ng-template>
```

<figcaption>Snippet 2: ngTemplateOutlet usage</figcaption>

In the code above, the child component will have a paragraph containing 'Joe - 42'.
<b>Note</b> that for the name (`let-name`) we did not specify which property of the context object we had to use because the name was stored in the `$implicit` property. In the other hand, for the age (`let-age="age"`) we did specify the name of the property to use (in this case it was `age`).

Well enough with the definitions let's start coding.

# Use case #1: Context-aware template

Let's build a list component that takes two input from it's parent:

1. data: A list of objects
2. itemTemplate: a template that will be used to represent each element of the list

Let's generate the list component using the Angular schematics (`ng g c components/list`). Once that's done let's implement the component which should look like this:

```typescript
@Component({
  selector: 'app-list',
  template: `
    <ul class="list">
      <li class="list-item" *ngFor="let item of data">
        <ng-container
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"
        ></ng-container>
      </li>
    </ul>
  `,
  styles: [
    `
      .list {
        list-style: none;
        padding: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() data: any[];
  @Input() itemTemplate: TemplateRef<HTMLElement>; // a template reference of a HTML element
}
```

<figcaption>Snippet 3.1: List component implementation</figcaption>

Then in the parent component we need to call the list component with a list (of objects) and a template reference:

```html
<app-list
  [itemTemplate]="item"
  [data]="[{ id: 4, name: 'Laptop', rating: 3 },
    { id: 5, name: 'Phone', rating: 4 },
    { id: 6, name: 'Mice', rating: 4 }]"
>
  <ng-template #item let-item>
    <div style="display: flex; justify-content: space-between;">
      <span> {{ item.id }} - <b>{{ item.name }}</b> </span>
      <mark> Stars: {{ item.rating }} </mark>
    </div>
  </ng-template>
</app-list>
```

<figcaption>Snippet 3.2: Parent component template</figcaption>

<b>Note</b> that we placed the ng-template (item template) inside the app-list component tags. This is only for readability, you could place the item template anywhere you want in the parent template.
Also i put some inline styles in the item template, but you could also give it a class and style it in the parent component style file.

# Use case #2: Template overloading

We saw how `ngTemplateOutlet` could help us to project context-aware templates, let's see another great use-case: template overloading.

# Wrapping up

---

## Hey, let's stay in touch!

I'm working on a lot of awesome posts and tutorials to come. If you liked this one, make sure to follow me on [Twitter](https://twitter.com/TheAngularGuy?ref_src=twsrc%5Etfw) to get updated on when the next one might come out.

## What to read next?

- [Angular unit testing 101 (with examples)](https://dev.to/mustapha/angular-unit-testing-101-with-examples-6mc)
- [All you need to know about Angular animations](https://dev.to/mustapha/all-you-need-to-know-about-angular-animations-1c09)
- [CSS Grid: illustrated introduction](https://dev.to/mustapha/css-grid-illustrated-introduction-52l5)

<a href="https://www.buymeacoffee.com/fiywQH2Dc" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
