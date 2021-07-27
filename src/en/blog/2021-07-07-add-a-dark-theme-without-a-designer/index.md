---
layout: post
title: How to add a dark theme to a web app without begging a designer for help
description: 'Have you ever been in a situation where you needed to make a dark theme for your new app, but there was no designer to help? You are on a deadline, and, seemingly, there is no hope to finish the project in time. If you find yourself in this situation now, you are in the right place to find the way out of it.<p>From this article, you will know how to create a dark theme for your app without a designer’s help. Without further ado, let’s dive into the process.</p>'
canonical:
  name: Akveo
  url: https://www.akveo.com/blog/how-to-add-a-dark-theme-to-a-web-app-without-begging-a-designer-for-help
---

## Add a Dark Theme

Adding the themes is a quite easy process that is done in 3 steps:

Step 1 - choose the colors:

```css
:root {
  --primary-color: #2e3a59;
}
```

Step 2 - add a use case:

```css
html {
  color: var(--primary-color);
}
```

Step 3 - add a new theme:

```css
:root.other-theme {
  --primary-color: #8f9bb3;
}
```

If you cannot use [CSS Custom Properties](https://caniuse.com/css-variables), you will have to write a few cycles on SASS. You can’t call this task a piece of cake, but we’ll manage to complete it.

But there’s a catch - you can have a few themes only if a designer made it for you first. Although you don’t always have one by hand, you want to add a dark theme to a default one. Accessibility matters.

Once, I participated in a project where a designer worked only at an early stage. All the designers were busy, so we couldn’t count on them after they finished their part. But at the end of the project came an idea to make it better by adding a dark theme.

Creating the first version, we didn’t want to add complex logic and additional controls. Therefore, we decided not to allow a user to change the theme. We had to act in line with system settings because it was the only way to keep the first option simple.

## Define the rules for the Dark Theme

Now we need to know when to display the dark theme. There is a special CSS media inquiry for that purpose: `prefers-color-scheme`.
Support is practically the same as in CSS Custom Properties ([https://caniuse.com/prefers-color-scheme](https://caniuse.com/prefers-color-scheme)).

```css
@media (prefers-color-scheme: dark) {
}
```

## What about the colors?

Alright, we have established how to define what theme to display. But what to do if there are no colors for the dark theme? And there is the answer to that question too. We can apply color inverse filters to the whole page. Again, support will be similar to CSS Custom Properties ([https://caniuse.com/css-filters](https://caniuse.com/css-filters)).

```css
@media (prefers-color-scheme: dark) {
  :root {
    filter: invert(100%);
  }
}
```

Now let’s add a text on the page. Looks sharp, huh? Then we add a list, a citation, and a random text item - they look just as good as the previous one. Even so, the moment we add a picture, it turns negative.

{% image './filter-compare.jpg', 'The UI before & after we\'ve made an inversion' %}

At this stage, we invert the whole page. It means that **all** the elements will change their color to the opposite. The inversion works well with the text, but I don’t want my photos to turn negative. To avoid that, you need to add an exception.

```css
@media (prefers-color-scheme: dark) {
  :root,
  :root img {
    filter: invert(100%);
  }
}
```

But in this case, it would rather be a reinversion than an exception. Now, we’ve applied “reinversion” for images only. If you have a video or iFrame, or other content that is not to be reversed, you should apply the same rule to them too.

{% image './revert-image.png', 'The UI after the reinversion' %}

Excellent!

But you will ask me: “why do we need to apply a filter to `:root` and reverse visual elements to their initial state?”. Why can’t we just write the following CSS code:

```css
*:not(img) {
  filter: invert(100%);
}
```

Selector will allow us to apply the filter to all the elements except images. Although, you should consider that the filter has some peculiarities. Let’s look at them in the case of the page layout below:

```html
<div>
  <p>
    Text in p
    <span>and in span.</span>
  </p>
  With picture of me:
  <img src="./pic.jpg" />
</div>
```

1. So as `div` matches our selector, the filter will apply to it. As a result, everything will be negative.
2. Since `p` is inside the `div`, it matches the selector and will change too. Thus, we will have it reinverted so that the colors get back to normal.
3. The `span` also matches the selector. Whereas the `p` has become normal, the contents of the `span` went negative.
4. Finally, the `img` selector is not influenced by the filter, so no inversion happens. However, as the `img` is a part of the element that we have inverted, the image will be negative.

That is how it will look like on your screen:

{% image './broken-invert.png', 'Broken invert' %}

That’s why we apply the filter to the `root` element once. Then, we invert the elements that we want to stay the same, again to bring them to the initial state.

Done! The first version works just fine, and the client is happy.

In the second stage of the process, we add a switch for our themes.

To do this, we’ll add `select` to the header of our app, allowing users to choose the theme they prefer. The select will include 3 choices: `light`, `dark`, and `auto`.

Therefore, the `auto` will be a default value that will allow the app to inherit system settings. At the same time, when choosing `light` or `dark`, we are adding a `theme-light` or `theme-dark` class correspondingly to the `root` element of a document. Then, we delete a theme class if using `auto`. To top it off, we save these settings in `localStorage`, which allows us to show the previous theme.

After we’ve added a few classes, we will modify CSS:

```css
@media screen and (prefers-color-scheme: dark) {
  :root:not(.theme-light):not(.theme-dark),
  :root:not(.theme-light):not(.theme-dark) img {
    filter: invert(100%);
  }
}

:root.theme-dark,
:root.theme-dark img {
  filter: invert(100%);
}
```

## Wrap up

That’s it! You are ready to add the dark theme to your app without a designer’s help. But before you go and nail it, take a glance at the resume of the article to memorize the main points better.

We have the following process logic:

- If the light theme is chosen - do nothing;
- If the dark one - always invert;
- If neither a dark nor light theme is chosen - invert depending on the system's settings.

“Generating” a dark theme by applying a filter is quite easy and quick.

Although, there can be some nuances regarding the page contents that are not to be inverted. In the majority of cases, you solve that problem by simple reinversion of such objects. But it doesn’t always work, so we need to use some hacks.

However, there are some drawbacks of this method:

- Not all of the colors invert “aesthetically”, which can tarnish the UI a little bit;
- You cannot change the hues of light and dark to create different visual experiences of the interface;
- And the last but not least thing to remember is that all of the colors get inverted. Thereby, your “brand colors” will change too, which can harm your corporate identity.

Regardless of all the drawbacks, it is still a credible and fast way to add a dark theme to your app. Besides, it can be helpful when you want to experiment with different themes, make PoC (Proof of concept), and see if it suits your application.
