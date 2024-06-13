## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

para correr el eslint y probar la accesibilidad se hace así:
    npm run lint


aria-describedby="customer-error": This establishes a relationship between the select element and the error message container. It indicates that the container with id="customer-error" describes the select element. Screen readers will read this description when the user interacts with the select box to notify them of errors.

id="customer-error": This id attribute uniquely identifies the HTML element that holds the error message for the select input. This is necessary for aria-describedby to establish the relationship.

aria-live="polite": The screen reader should politely notify the user when the error inside the div is updated. When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, but only when the user is idle so as not to interrupt them.