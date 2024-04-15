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

## My Anime Catalog is no longer maintined

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


For styling, we chose Tailwind CSS because of the fast workflow, especially when building mobile-friendly applications.  Built in screen breakpoints make it easy to define different styles for varying screen sizes.  If you value speed, consistency, and flexibility in their CSS workflow without the need to write CSS in a separate file or defining classess/IDs for the purpose of styling it's definitely worth checking out Tailwind CSS!

Check the links above or the <a href = "#Editorial">editorial</a> if you are interested in learning more about any of the tools we used

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

If you're reading this, you're probably interested in the design choices behind the tech stack we chose and possibly want to implement parts (or the whole stack) to your next project!  Let's dive right into it!

If you want to quickly get started with this end-to-end TypeSafe tech stack, a great place to start is <a href = "https://create.t3.gg/">here</a>.  Create T3 App lets you pick and choose different pieces of the stack and is a great way to get up and running with a brand new project quickly.  There's also some great documentation going into the design choices behind the T3 stack and more details on each technology <a href = "https://create.t3.gg/en/introduction">here</a>!

We chose this stack as open source developers that believe in TypeScript.  We're all React developers and found that the unopinionated nature of React (Which can also be great because it allows us to be flexible) can often times make it harder to collaborate.  Everyone has a little bit of a different way to approach writing their code.  We found that TypeScript can help with this problem a little bit, by at least providing guidance with types.  We like to think of types as guard rails that can potentially prevent you from making type related errors before compile time and help streamline the debugging process.  This is the driving force behind why we wanted to use TypeScript and make a completely typesafe application: it helps us collaborate!

A lot of the technologies that we used are all built to reinforce type safety within the app, which makes it more readable and robust!

<br/>

## Next.js

<br/>

We chose Next.js for a couple of reasons.  The first is to optimize performance on all types of devices, especially low performance devices.  Next.js leverages server-side rendering, which allows web pages to be pre-rendered on the server and sent to the browser as fully-formed HTML, CSS, and JavaScript (A lot of the load is on the server, rather than the device).  Additionally, we utilized the Next Image component, which takes advantage of lazy loading (images are only loaded when they are visible) and automatically optimizes images based on screen size.

We also love the developer experience generating routes in Next.js.  It's really easy to generate static and dynamic routes (we used both in this application) without much setup.

Next.js projects are structured as a monorepo, which also makes it easy to implement tRPC which we will talk about next.  It's also really easy to deploy fullstack Next.js projects using <a href = "https://vercel.com/">Vercel</a>.  Overall it's a great developer experience and a nice framework for creating production ready applications.  Even the new React docs recommend it!

<br/>

## tRPC

<br/>

tRPC is an amazing tool that we can use to build typesafe APIs. tRPC makes your front-end and back-end feel really close to each other and the transition between writing front-end and back-end code feels seamless.  As you're consuming your APIs on the front-end, IntelliSense helps you autocomplete fields to make consumption fast.  While you're passing arguments into the APIs, type errors are generated before you even run your code!  The developer experience with tRPC has been great so far, we would highly suggest trying it out if you use TypeScript in your front and back-end code.

<br/>

## Prisma

<br/>

Prisma pairs really nicely with tRPC by generating typesafe schemas.  It's a great tool if you plan on using tRPC and comes with some really nice extras!  Prisma Studio is a GUI that allows you to interact with your database quickly, we found it to be an essential tool for visualizing our data.  You can also make intuitive queries that help streamline the process of writing SQL queries, although we did find that we enjoyed using vanilla SQL better sometimes for complex queries.  

We think if you plan on using tRPC in a fresh project, Prisma is a great addition and pairs well.

<br/>

## Tailwind CSS

<br/>

Like we said earlier, Tailwind makes building user interfaces quick, while also giving developers a lot of control over the fine details of their styling.  We chose Tailwind specifically because it makes building mobile applications much easier.  With built in screen breakpoints and the option to add custom screen breakpoints, writing CSS to make the user experience consistent across all screen sizes was made much easier.  It does have some drawbacks, the main one we noticed being JSX pollution (your JSX becomes cluttered at times), but we think it's worth a shot if you haven't tried it out yet!

<br/>

## NextAuth.js

<br/>

OAuth provides a great solution for authentication that allows applications to access user data from another web application or service, without requiring the user to share their login credentials.  NextAuth is an awesome tool that makes implementing OAuth quick and easy.  We've also looked into <a href = "https://clerk.com/">Clerk</a> and think that's another great solution.  If you're thinking of implementing OAuth in your Next.js project, we would highly recommend either of these tools!

## Contributing

If you are interested in contributing, feel free to submit an issue or a pull request! My Anime Catalog is open source and we would be thrilled to welcome contributions from other developers excited about the project!
