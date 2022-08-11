## part of backend 
- This is the main part and actually, the App itself after when 'build' folder of the frontend was added inside;
- Backend was developed based on NodeJS and Express;
- Inside the main file index.js have added description comments;
- To run the App it is needed to be ensured the NodeJS is installed and run in the core backend directory:
```
npm start
```
- The raw data from excel is stored on MongoDB server. Due to big data volume and limited free space on MongoDB (512Mb) it was decided to provide and fetch data inline with excel accordingly: Journeys May, June, July and Stations. It also was reflected on backend and frontend files. Of course, it makes code bulkier, but at least it works with limited free space of server;
- The backend uses MongoDB server to provide the data in validated, sorted and needed view;
- The results were limited by 1000 not to crash the browser memory.