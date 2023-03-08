# FoodFactor
A social media platform for sharing recipes and meal ideas

FoodFactor is a social media platform for food enthusiasts to share and discover new recipes. Users can sign up, log in, and create a profile. They can then create, read, update, and delete recipes, and share them with others. Users can also search for recipes based on keywords, ingredients, or categories.

# Technologies Used
FoodFactor is built using the MERN stack of technologies:
- MongoDB for the database
- Express.js for the server
- React.js for the client
- Node.js for the backend
- Bootstrap 5 for the UI

# User Interactions and Features:
### As A User You will be able to:
- User Authentication: Users can sign up, log in, and log out of the platform.
- User Authorization: Different levels of authorization can be granted to users based on their roles.
- Recipe CRUD Operations: Users can create, read, update, and delete recipes.
- Meal Planning: Users can create a meal plan for the week.
- Shopping List: Users can generate a shopping list based on the recipes they have added to their meal plan.
- Recipe Search: Users can search for recipes based on keywords, ingredients, or categories.
- Reviews and Ratings: Users can leave reviews and ratings for recipes they have tried.
- Social Sharing: Users can share their favorite recipes on social media platforms.
- Notifications: Users can receive notifications when someone likes or comments on their recipe.
- Admin Dashboard: An admin dashboard can be created to manage user accounts and recipe submissions.

# Installation
To run FoodFactor on your local machine, follow these steps:
1. Clone the repository. 
2. Create and activate a virtual environment.
  `python -m venv env`
`source env/bin/activate`
3. Install the required packages using pip.
  `pip install -r requirements.txt`
4. Run database migrations.
  `python manage.py migrate`
5. Create a superuser account for admin access.
  `python manage.py createsuperuser`
6. Start the development server.
  `python manage.py runserver`
  
 # Wire Frames & Entity Relationship Diagram 
 ### Log In
 ![image](https://user-images.githubusercontent.com/106713788/223487710-466ddf42-beb1-4e53-becd-e691f9206706.png)
 ### Home
 ![image](https://user-images.githubusercontent.com/106713788/223487483-3d889d32-339d-4173-b986-5e327974140c.png)
 ### Show
 ![image](https://user-images.githubusercontent.com/106713788/223487394-90694547-d86e-49c4-911a-241d0f0f13c2.png)

 ### Entity Relationship Diagram (ERD)
 In the context of the FoodFactor project, here's what our ERD might look like:
 
 ![image](https://user-images.githubusercontent.com/106713788/223472494-46487e25-61c2-426f-9e65-94687d323162.png)
 
 This ERD has four entities: users, recipes, reviews, and ingredients. The relationships between these entities are as follows:
- A user can create many recipes, but a recipe can only be created by one user (one-to-many relationship).
- A recipe can have many reviews, and a review can belong to only one recipe (one-to-many relationship).
- A recipe can have many ingredients, and an ingredient can be used in many recipes (many-to-many relationship).

Each entity has its own set of attributes that define the information that can be stored in it. For example, the users entity has attributes like username, email, and password that store user account information, while the recipes entity has attributes like title, description, and image that store recipe details.

# Routes

### Authentication: Users

| **URL**              | **HTTP Verb** |**Actions**|
|----------------------|---------------|-----------|
| /auth/signup         | POST          | new       | 
| /auth/login          | POST          | create    | 
| /auth/logout         | DELETE        | destroy   |      
| /auth/:id            | GET           | show      |        
| /auth/:id            | PATCH         | update    |        

### Recipes

| **URL**              | **HTTP Verb** |**Actions**|
|----------------------|---------------|-----------|
| /                    | GET           | index
| /recipe/:id          | GET           | show
| /recipe/             | POST          | create
| /recipe/:id          | PATCH         | update      
| /recipe/:id          | DELETE        | destroy     

### Ingredients

| **URL**           | **HTTP Verb** |**Actions**|
|-------------------|---------------|-----------|
| /ingredients/     | GET           | index
| /ingredients/     | POST          | create
| /ingredients/:id/ | PATCH         | update  
| /ingredients/:id/ | DELETE        | destroy  

### Reviews

| **URL**           | **HTTP Verb** |**Actions**|
|-------------------|---------------|-----------|
| /reviews/     | GET           | index
| /reviews/     | POST          | create
| /reviews/:id/ | PATCH         | update  
| /reviews/:id/ | DELETE        | destroy  

### Meal Plans

| **URL**           | **HTTP Verb** |**Actions**|
|-------------------|---------------|-----------|
| /mealplan/     | GET           | index
| /mealplan/     | POST          | create 
| /mealplan/:id/ | DELETE        | destroy  
