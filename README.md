# Eco-Friendly

Work in progress.

The project is a web application that allows users to read articles about living an eco-friendlier lifestyle and to share their own tips. The application is built in PHP with the Symfony framework and uses a MariaDB database.

Built by 6 students (3 for the frontend / 3 for the backend) of the PHP web and mobile development cursus at the [O'Clock](https://oclock.io/) full remote school, it is our final course project.

I'm the backend lead developer of the ongoing project and this repository presents this part to this day (2023-03-05). To let our fellow React frontenders concentrate on their part, we decided to take care of the backoffice frontend ourselves and to build it in Twig and Bootstrap.

I especially work on the following features:

-   Fixtures

-   Full API REST design and implementation

-   Twig templates

-   Data constraints & validation

-   User registration (with email confirmation)

-   Image upload (with image resizing)

![Login page](https://github.com/Laure-Riglet/Laure-Riglet/blob/main/img/Eco-Friendly/Eco-Friendly_login.png?raw=true)

![Home page](https://github.com/Laure-Riglet/Laure-Riglet/blob/main/img/Eco-Friendly/Eco-Friendly_home.png?raw=true)

## Installation

### Requirements

[PHP 7.4.3](https://www.php.net/) (minimum)

[Composer 2.0.11](https://getcomposer.org/) (minimum)

### How to install the project?

1. Clone project

    `git clone git@github.com:O-clock-Lara/projet-11-eco-friendly-back.git`

2. Move in the project

    `cd projet-11-eco-friendly-back`

    `git switch develop`

3. Installing dependencies

    `composer install`

4. Setup a database and fill in the `.env` file

    `DATABASE_URL="<db_type>://<username>:<password>@127.0.0.1:3306/<db_name>?serverVersion=<server_version>"`

    `BASE_URL="http://www.your-app-root.com"`

5. Run migration

    `php bin/console make:migration`

    `php bin/console doctrine:make:migrations`

6. Install CKEditor

    `php bin/console ckeditor:install`

    `php bin/console assets:install`

7. Install GD

    `sudo apt-get install php7.4-gd`

8. (optionnal) Load fixtures

    `php bin/console doctrine:fixtures:load`

## What command can I use for in project?

1. Start a development server

    From the project's root: `php -S 0.0.0.0:8000 -t public`
