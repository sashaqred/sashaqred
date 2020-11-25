---
layout: post
lang: en
title: Mastering types with TypeScript generics
description: Have you ever tried to improve TypeScript type coverage? Make everything autocomplete with IntelliSense? Probably tried to implement a single interface for objects with some similar shape, but `any` was the only solution. Like I did. However, the only one interface for the same objects isn't enough. Let's improve our code with some generics.
---

## Context

Imagine that we are working on a component library. There're tons of components inside: text, link, button, image, tabs, tab, table, table-row, table-header, table-cell, and others... We didn't cover the library with types properly, used a lot of `any`.
Because of that each refactoring, bug fixing, or even property rename starts being a big issue and generates tons of problems.

Let's take a look at how you can build a completely typed component library in typescript step by step.

## Initial typings

In the beginning we start with something simple:

```typescript
interface LibComponent {

  // напиши что такое id, и нахер оно тту вообще надо. Если оно не нужно для понимания контекста прямо сейчас, то удаляй. То же самое для остальных компонентов.
  id: string;
  definition: string;
  properties: Record<string, any>;
}
```

We have type covered all the interface properties. But there is still some `any` here. Let's look at the component creation function:

```typescript
// Когда ты вначале говоришьь про библиотеку компонентов, я начинаю думать, что ты про ui kit типо material/nebular. И только тут я понял, что вообще нет и я опять нихуя не понимаю :D Что это за компоненты такие?)
function createTextComponent(properties: Record<string, any>): LibComponent {
  return {
    id: generateId(),
    definition: 'text',
    properties,
  };
}

const text = createTextComponent({ text: 'The text component' });
```

Is everything fine with that? Can we be sure that we have passed all the required data or have forgotten some props? Does the `text` field exist or have `string` type? We can't definitely answer those questions.


## короче я так и не понял, почему вместо ковычек для кода ты html пишешь) Дальше лень исправлять

## Single interface problem

<code class="language-">properties</code> type <code class="language-">Record<string, any></code> is not so bad as just <code class="language-">any</code>. At least we know that <code class="language-">properties</code> field is object and it has <code class="language-">string</code> keys, but we can't recognize values type in each field.

The first step will be creating the separate interface for <code class="language-">properties</code>:

```typescript
interface LibComponentProperties {}
```

But what should be inside of that? We can add <code class="language-">value</code> field, all components have some kind of value, haven't they? The text has some text inside, the button also has some text, input has value itself:

```typescript
interface LibComponentProperties {
  value: ...
}
```

But what type should be here? <code class="language-">string</code>? Not really, we have checkbox component with <code class="language-">boolean</code>, date-picker component with <code class="language-">Date</code> type, in some cases it could be even array, like table component with array of rows. <code class="language-">any</code> is not a solution. Our goal is to remove any <code class="language-">any</code> from our code.

Also, what about other component properties? How should we add rest of them? For example our Link component in addition has <code class="language-">href</code> property, which definitely has <code class="language-">string</code> type.

```typescript
interface LibComponentProperties {
  value: ...;
  href: string;
}
```

But it's not ok for the Button or Image component, which doesn't contain <code class="language-">href</code> property, but they contain their own properties. So here we can't use a single interface to improve our types.

## Splitting type

The main issue of our current <code class="language-">LibComponent</code> type implementation is that it's definitely typed and we can't extend or clarify this type for each component's purposes. Let's split the one single type for all components into individual types for each component. Since we have a finite variety of components, it won't be a big deal:

```typescript
interface LibTextComponent {
  id: string;
  definition: string;
  properties: {
    text: string;
  };
}

interface LibLinkComponent {
  id: string;
  definition: string;
  properties: {
    text: string;
    link: string;
  };
}

interface LibInputComponent {
  id: string;
  definition: string;
  properties: {
    type: string;
    value: string;
    label: string;
  };
}

interface LibCheckboxComponent {
  id: string;
  definition: string;
  properties: {
    value: boolean;
    label: string;
  };
}
```

The general shape of that type is the same, the difference only in <code class="language-">properties</code>. So we can create some generic for it, which will contain all repeated field in all our components:

```typescript
interface BaseLibComponent<Properties extends Record<string, unknown>> {
  id: string;
  definition: string;
  properties: Properties;
}

interface LibTextComponentProperties {
  text: string;
}
type LibTextComponent = BaseLibComponent<LibTextComponentProperties>;

interface LibLinkComponentProperties {
  text: string;
  link: string;
}
type LibLinkComponent = BaseLibComponent<LibLinkComponentProperties>;

interface LibInputComponentProperties {
  type: string;
  value: string;
  label: string;
}
type LibInputComponent = BaseLibComponent<LibInputComponentProperties>;

interface LibCheckboxComponentProperties {
  value: string;
  label: string;
}
type LibCheckboxComponent = BaseLibComponent<LibCheckboxComponentProperties>;
```

<code class="language-">Properties extends Record<string, unknown></code> is not really something that is required, but it help us to define the basic shape of <code class="language-">properties</code> field. Without that we can pass array to properties instead of object and it would be fine for TypeScript.

## Merging type again

And now we can create type which will describe all our components in one place:

```typescript
type LibComponent = LibTextComponent | LibLinkComponent | LibInputComponent | LibCheckboxComponent;
```

But it won't work in proper way. During component creation process we can set properties of checkbox to text:

```typescript
const component: LibComponent = {
  id: '1',
  definition: 'text',
  properties: {
    value: true,
    label: 'Label for checkbox',
  },
};
```

Here won't be any error. Let's figure out what is going on.

```typescript
type LibComponent = LibTextComponent | LibLinkComponent | LibInputComponent | LibCheckboxComponent;
```

<code class="language-">LibComponent</code> is union type. During type creation TypeScript is trying to create most common type as possible. We set <code class="language-">id</code> and <code class="language-">definition</code> as regular <code class="language-">string</code> and only difference is in <code class="language-">properties</code>. This will be the same as code above:

```typescript
interface LibComponent {
  id: string;
  definition: string;
  properties:
    | LibTextComponentProperties
    | LibLinkComponentProperties
    | LibInputComponentProperties
    | LibCheckboxComponentProperties;
}
```

Here TypeScript can't see any difference in <code class="language-">definition</code> field, the difference only in types of <code class="language-">properties</code>. Actually each component <code class="language-">definition</code> accepts only some specific string, <code class="language-">LibTextComponent</code> accepts <code class="language-">'text'</code>, <code class="language-">LibButtonComponent</code> accepts <code class="language-">'button'</code>, etc. For that fix let's improve our <code class="language-">BaseLibComponent</code>:

```diff
-interface BaseLibComponent<Properties extends Record<string, unknown>> {
+interface BaseLibComponent<Definition extends string, Properties extends Record<string, unknown>> {
  id: string;
-  definition: string;
+  definition: Definition;
  properties: Properties;
}

-type LibTextComponent = BaseLibComponent<LibTextComponentProperties>;
+type LibTextComponent = BaseLibComponent<'text', LibTextComponentProperties>;

-type LibLinkComponent = BaseLibComponent<LibLinkComponentProperties>;
+type LibLinkComponent = BaseLibComponent<'link', LibLinkComponentProperties>;

-type LibInputComponent = BaseLibComponent<LibInputComponentProperties>;
+type LibInputComponent = BaseLibComponent<'input', LibInputComponentProperties>;

-type LibCheckboxComponent = BaseLibComponent<LibCheckboxComponentProperties>;
+type LibCheckboxComponent = BaseLibComponent<'checkbox', LibCheckboxComponentProperties>;
```

Now our <code class="language-">definition</code> is not an abstract string, but it always has exact value as type. And here TypeScript will show us an error, that our passed properties are not compatible with text properties:

```typescript
const component: LibComponent = {
  id: '1',
  definition: 'text',
  properties: {
    value: true,
    label: 'Label for checkbox',
  },
};
```

## Summary

- Don't create a big complex interface with <code class="language-">any</code> for everything;
- Instead of that, create a lot of small types with exact shape;
- Generics would help with reducing repeating the same fields over and over again;
- Instead of one complex type use union type which consisted of small ones;
- Sometimes for proper union type work it's required to define the pair of unique values. Like <code class="language-">definition</code> and <code class="language-">properties</code> in our example.
- Be careful, generics aren't a solution for everything. Overengineering of it could bring even more pain. Use it smartly.
