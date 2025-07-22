# Micro Frontend (MFE) Example
This repository presents a example of Micro Frontends application using Firebase Hosting and GitLab Pipelines. The template have a docker-compose.yaml file to make more easier the development in localhost.

### Environment Variables
Please update the GitLab environment variables with Firebase Hosting respective host for every MFE. 

### Micro Frontends
Micro Frontends enables a distributed and technology agnostic way to develop frontend solutions. So you can have specific teams with it's own technologies to every part of the template where it is necessary.

### Install
- Configure Docker (In Windows I recommend Windows Subsystem Linux)

```bash
sudo docker compose up
``` 

### Firebase Hosting
The Firebase Hosting enable us to easily host and scale the frontend of our application. To deploy manually the code you can use the following command where the variable PROJECT_NAME can be replaced by the hosting target identification:

```bash
npm run build && firebase deploy --only hosting:$PROJECT_NAME
```

### Firebase Authentication
Localy, you can just use the following command:

```bash
firebase login
```

In CI/CD you can export the GitLab temporary file variable "GOOGLE_APPLICATION_CREDENTIALS" with Firebase Service Account credential JSON, [you can create a new Service Account here](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk). Having this variable defined in the environment it will be automatically applied by the 'firebase deploy' command.

### GitLab Pipelines
In this example the GitLab Pipeline is being used as CI/CD mechanism. This project pipeline is with the type parent-child. So every folder will have its own pipeline.


### Useful links
Find more information in the following links
- https://itnext.io/how-to-deploy-and-host-angular-%EF%B8%8F-micro-frontend-for-free-using-firebase-6e675b511a4
- https://medium.com/@learning.bikash/building-micro-frontends-71a09dd591b6
- https://martinfowler.com/articles/micro-frontends.html
- https://docs.gitlab.com/ee/ci/quick_start/
- https://docs.gitlab.com/ee/ci/pipelines/parent_child_pipelines.html
- https://about.gitlab.com/blog/2020/03/16/gitlab-ci-cd-with-firebase/
- https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2
- https://dev.to/bitovi/how-to-build-a-micro-frontend-with-webpacks-module-federation-plugin-n41