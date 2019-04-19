# Claire Gilligan portfolio website

This website was always designed to be a filterable resumé, since I'm still accepting
work in my two prior fields even now that I've reinvented myself as a software
engineer.

It's very much been a process of "Wait, didn't I learn how to do this already?
Then how am I failing to accomplish it so utterly now?" In other words, a great
learning experience.

The database is in PostgreSQL, constructed in Sequelize, and is far more complex
than the current construction takes advantage of. I intend to add individual
component pages in the future, to show off some of those associations/joins
that are interwoven so deeply (see [script/seed.js](https://github.com/feminaprovita/cg-com/blob/master/script/seed.js)).

The front end is built in React, with a bit of Redux woven in to filter the data
upon each button press.

Express and Axios for API routes. Webpack to minify (etc). [React Notification
System](http://igorprado.com/react-notification-system/) for notifications.

I particularly enjoyed using RegEx to repurpose titles into slugs (used here for
component ids, but in future for human-friendly urls).

I'd love to hear what you think! What you liked, what you've not seen before,
what you think I could (or should) improve: [@feminaprovita](https://twitter.com/feminaprovita/) or claire.gilligan.dev@gmail.com.
