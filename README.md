# HospitalDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `npm run full-stack` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## App description

I've decided to develop this project in Angular v18 to test and experiment with the features of this version.

The first part of development was about installing the libraries I need (ngx-translate, ng-material...), to create some shared components I would use later in development (table, input-select ...).

The second part of development was about the application main "module", so the patients table page, his filter dialog and a way to get the data.

I used the json server library to simulate the database where the datas will be stored, I`ve changed a little bit the mock api data structure, instead of having a folder for every patients with all its activities I've opted for a single array of activities, and in each Activity I've added the property patientId so I can link each Activity to its corresponding Patient.

To manage the data I've created the patients service and structured it like a "backend repository", there I've used RXJS to manage the requested data, I've divided it in multiple methods one for each "table of the database" and then mapped togethere the data by their key in a single object class. The main public method getPatientsWithActivities() get all the mapped patients data and by the given filters returns the filtered patients data.

The main page, patients-table-component, show the patient data in a table where is possible to filter and sort all the patients, other than see in a sub-table the activities for each person by clicking on its corresponding row.

In future is possible to upgrade the app by adding a form to add patients, their activities, more filters (for example filtering the activities type), a patient page with all his information and maype some charts about the activities, an admin section where is possible to manage the activities type by adding more them or changing their associated intensity and so on...

I've also prepared the whole app for a future internationalization using the ngx-translate library, so it can be easily translated in more language by a json based key-value system.
