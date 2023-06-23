# FireApp

FireApp is a web application built using Next.js, TypeScript, Prisma, Tailwind CSS, PostgreSQL and Supabase. It is a platform for managing crews in the fire brigade. The app offers various features such as user registration, authentication, crews management, and user administration.</br></br>
<b>To create account user must exist in the database. An admin user has access to the database. Log in as administrator to add and remove users.</b>

## Characteristics

- **User Registration**: Users can register in the app using a username that is verified against the existing firefighter database. Password is required and must be at least 8 characters long.

![Login page](images/auth-page.png)

- **Authentication**: the application uses the `next-auth/react` library for authentication. Once authenticated, users can access a personalized dashboard and perform various actions based on the permissions assigned to them.

- **Change management**: Users with administrator privileges can add and delete change records. Each user can change their password. Shift records contain vacation, overtime, and other relevant details. The data is stored in a PostgreSQL database.

![Vacations page](images/vacations-page.png)

- **User Administration**: Admin users have additional privileges such as the ability to delete any record, delete users, and assign admin privileges to other users.

![Delete user](images/swal-example.png) </br>

![Settings](images/settings-modal.png)

- **Visualization**: The app includes interactive charts powered by "react-charts" to display change data in a visual format. Users can view charts to have information in an accessible form.

![Chart](images/normal-user-access-2.png)

- **UI Libraries**: FireApp also uses Material-UI components to design intuitive and responsive user interfaces, giving your application a modern and polished look.

![Table](images/vacations-delete-record.png)

- **API integration**: the application integrates with Supabase using `axios` and `swr`. Retrieves and updates data from external APIs.

- **Data Security**: Passwords are securely stored using bcrypt encryption, ensuring the confidentiality and integrity of user credentials.

## Technologies Used

- Next.js
- TypeScript
- Prisma
- Tailwind CSS
- PostgreSQL
- Supabase
- next-auth/react
- Zustand
- Lodash
- Bcrypt
- SweetAlert
- react-charts
- Material-UI
- Axios
- SWR
- JWT (JSON Web Tokens)

## Installation and Setup

To run FireApp locally on your machine, follow these steps:

1. Clone the repository:

`git clone https://github.com/baranero/fd-app.git`


2. Install dependencies:

`cd fd-app` </br>
`npm install`

3. Create a .env file in the root of the project.

4. Create a Supabase Project:

- Go to the Supabase website and sign in or create an account.</br>
- Create a new project.
- Go to 'Settings', then to 'Database'. In connection string choose 'Nodejs' and copy link.

5. Configure the following environment variables in the .env file:

DATABASE_URL="[Paste copied link here]" Replace [YOUR-PASSWORD] with the password you set when creating the project.</br>
NEXTAUTH_JWT_SECRET="NEXTAUTH-JWT-SECRET"</br>
NEXTAUTH_SECRET="NEXTAUTH-SECRET"

6. Run Database Migrations with Prisma:

`npx prisma migrate dev`

7. Run the development server:

`npm run dev`

8. The application will be accessible at `http://localhost:3000`.

9. Before You start using FireApp:

- Go to tables editor in Supabase. Choose 'firefighters' table and insert row with any id and name.
- Next Sign up to FireApp with username same as You set in previous step.
- Go again to tables editor and choose 'users'. Set 'isAdmin' as 'true'.
- Now You are main admin. You have access to all functionality.
- Enjoy!

## Contributing

Contributions to FireApp are welcome. If you would like to contribute, please follow these guidelines:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

`git checkout -b my-feature`

3. Make your changes and commit them:

`git commit -m "Add my feature"`

4. Push the changes to your forked repository:

`git push origin my-feature`

5. Open a pull request on the main repository.

Please ensure that your code follows the project's coding conventions and includes appropriate documentation where necessary.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code.
