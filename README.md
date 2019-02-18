# Platform user analytics: project for StyleSage.

## Objectives for this project:
* Visualizing user sessions list.
* Visualizing chart usage list.

## Project specifications:
This is an Adalab student group project for StyleSage, which is made using React. The objective of this project is constructing a SPA, to visualize usage analytics for StyleSage platform. It contains two routes where the following will be able to be visualized, depending on the route:
* Sessions List: A list of the latest sessions on the platform.
* Charts Usage: Chart usage on the platform.


###User Sessions
User sessions requests user data from the latest month and renders it in a table. Data is paginated and can be filtered by username, searching via text input. Additionally, data can be sorted by username, time started, length of stay and times visited.

###Charts Usage
Charts Usage requests the data corresponding to each individual chart, that is, a data graphic that the client can consult. The petition returns each individual chart query, then data is rearranged so that each table row corresponds to a specific chart. Data shows how many times a chart was used, chart usage relative to all charts and how many individual users visualized each chart. Data can be customized with a start and end date of choice. In addition, filters can be applied to select only certain user groups and exclude support users from the search.

The API petition will use mockup data to avoid compromising StyleSage's clients anonymity. This means that data is not currently being updated so there are no requests corresponding to recent dates.
