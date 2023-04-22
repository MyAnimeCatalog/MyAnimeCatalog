<div align="center">

# My Anime Catalog

![1](https://user-images.githubusercontent.com/35904733/233177950-dcba8cb3-84a0-41e2-877c-99c051c7e4f2.png)
  
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)&nbsp;&nbsp;&nbsp;
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;&nbsp;&nbsp;
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
<br/>
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)&nbsp;&nbsp;&nbsp;
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)&nbsp;&nbsp;&nbsp;
![PlanetScale](https://img.shields.io/badge/planetscale-%23000000.svg?style=for-the-badge&logo=planetscale&logoColor=white)
<br/>
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>
<hr>

<p align="center" class="toc">
<strong><a href="#Tech-Stack">Tech Stack</a></strong>
•
<strong><a href="#Features">Features</a></strong>
•
<strong><a href="#Editorial">Editorial</a></strong>
•
<strong><a href="#Contributing">Contributing</a></strong>
</p>

<hr>

## What is My Anime Catalog?

My Anime Catalog is a simple application, built for you to quickly keep up to date with the most recent popular animes! Within the application, you can organize animes you have watched, plan to watch, and are in the process of watching.  You can view details on animes, search animes, view popular seasonal animes, & check the animes playing today!  We designed it as a mobile-friendly website, bring My Anime Catalog with you anywhere 🎆

## Getting Started

If you want to try out My Anime Catalog, check it out <a href = "https://my-anime-catalog.vercel.app/">here</a>!

If you are interested in contributing to My Anime Catalog, fork and clone this repo.  Navigate to the root directory and install the dependencies 
e.g:
```
npm install
```
then 
```
npm run dev
```
Make sure you make your own .env file and fill it with the variables found in the .env.example file in the root directory!

## Tech Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

We built this application with typesafety in mind! From the client to the database, everything is typed and we chose our tech stack to accomplish this! As devs, the experience using these tools is also amazing.  When using APIs on the frontend, IntelliSense helps us autocomplete fields for efficient workflow and type errors are quickly caught before compile time.

</br>

For styling, we chose Tailwind CSS because of the fast workflow, especially when building mobile-friendly applications.  Built in screen breakpoints make it easy to define different styles for varying screen sizes.  If you value speed, consistency, and flexibility in their CSS workflow without the need to write CSS in a separate file or defining classess/IDs for the purpose of styling it's definitely worth checking out Tailwind CSS!

Check the links above or the <href = "editorial#>editorial</a> if you are interested in learning more about any of the tools we used

## Features

<hr>

### Home Page

</br>

https://user-images.githubusercontent.com/35904733/233545865-415c443a-e672-4b2b-88cb-08bc03814de2.mov

</br>

https://user-images.githubusercontent.com/35904733/233545653-bdbbe281-3d31-46ac-8eef-bfbc947ae2ea.mov

</br>

🟣 The home page allows users to browse the top seasonal anime, which is fetched from the Jikan API.  If you want to search an anime, simply search using the search bar at the bottom of the page and press enter.

🟣 When an anime card is hovered, the name of the anime is displayed.  You can click on a card to access a details page for that specific anime!

<hr>

### Daily Schedule

</br>

https://user-images.githubusercontent.com/35904733/233545894-7cd8e434-029a-4bb9-bf4a-b593bbe92c5a.mov

</br>


🟣 This page is very similar to the home page, but provides info on animes that are airing live today!

<hr>

### Authentication

</br>

https://user-images.githubusercontent.com/35904733/233545987-02def753-bb2f-4ed0-98c0-6a67815ea90a.mov

</br>


🟣 My Anime Catalog uses Google and Discord OAuth to handle authentication.  We chose this method of authentication because it improves user experience, allowing users to sign in without manually creating a new account.  It also allows users to grant access to their data without sharing their passwords or other sensitive information, minimzing serious security concerns like password leaks.

🟣 When users are not logged in, the profile & my list features are disabled.  If a session expires or a user logs out and they are on a page they should not have access to, they are rerouted to the home page.

<hr>

### My List

</br>

https://user-images.githubusercontent.com/35904733/233546248-694d62e8-8f91-4b2a-be01-ad93dd0e5eba.mov

</br>

https://user-images.githubusercontent.com/35904733/233546223-4e8cf201-7562-4fef-ab24-2b246f967e77.mov

</br>


https://user-images.githubusercontent.com/35904733/233546435-f0ebaa84-7e15-4eec-93f3-930b1e10ecbb.mov

</br>


https://user-images.githubusercontent.com/35904733/233546542-08bf14d9-cefa-4b94-9439-8b1e6283afda.mov

</br>

🟣 Once logged in, you will have access to the "My List" feature of the site!  From any of the pages, feel free to add animes to your lists, delete animes, or move them around to different lists.

<hr>

### Profile

</br>

https://user-images.githubusercontent.com/35904733/233546797-bfc0d088-d27d-4843-bfcd-d73d32b16ecd.mov

</br>

https://user-images.githubusercontent.com/35904733/233546731-7cc9f439-c356-47fb-9da4-fc2ec64640af.mov

</br>

🟣 On the profile page, you can view the number of animes in each of their lists and interact with it using the doughnut chart.

🟣 You can also edit your profile picture and bio, which is saved in the database!

<hr>

### Editorial

<hr>

## Contributing

If you are interested in contributing, feel free to submit an issue or a pull request! My Anime Catalog is open source and we would be thrilled to welcome contributions from other developers excited about the project!
