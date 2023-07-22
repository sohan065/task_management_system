
Laravel : 10
additional package: composer require firebase/php-jwt    for making user login access token
and composer require jenssegers/agent  for getting user browser info 

Creating a new route name user. here i created all necessary api as per my database model.

i have made a service named Token which will help me to generate encoded data for user login access.

first user will register by giving credentials if user provide valid data then user will get token in token user's info will be encoded .in front side based on this token new user page will show. then user dash board there will be a tab named ADDTASK . a log in user can added new task . after adding task user can assign task by clicking tab assign task. when new task will be assigned then assigned user will get message . 

for UI design i used React Redux-Toolkit .

there i created two slice one for user another for task . user registration , login , user list api are handeling from userSlice.

and task create ,task assign and task list api are handeling in taskSlice.

Total Time :

Backend API: 2h (migration,model,route,tesing api).

FrontEnd UI: 3h(i am mid level in frontend)
