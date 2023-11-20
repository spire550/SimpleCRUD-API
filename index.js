
import http from "http";
const users = [
  { id: 1, name: "ahmed" },
  { id: 2, name: "mohamed" },
  { id: 3, name: "yousef" },
  { id: 4, name: "farid" },
];
const posts = [
  { id: 1, data: "firstPost" },
  { id: 2, data: "secondPost" },
  { id: 3, data: "thirdPost" },
  { id: 4, data: "fourthPost" },
];
const server = http.createServer((req, res) => {
  ///////////////////////////User endpoint///////////////////////////////////////////////
 /*1- get all users*/ 
  if (req.url === "/users" && req.method === "GET") {
    //res.write(users);
    res.end(JSON.stringify(users));
  } 
  /*2- add user*/
  else if (req.url === "/users" && req.method === "POST") {
    req.on("data", (buffer) => {
      const newUser = JSON.parse(buffer);
      console.log(newUser);
      users.push(newUser);
    });
    req.on("end", () => {
      res.end("products added successfuly");
    });
  } 
  /*3- sort users*/
  else if (req.url === "/usersSort" && req.method === "GET") {
    let newuser = [...users];
    newuser.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    res.end(JSON.stringify(newuser));
  } 
  /*4- delete user*/
  else if (req.url === "/userdelete" && req.method === "DELETE") {
    req.on("data", (buffer) => {
      const newUser = JSON.parse(buffer);
      console.log(newUser);
      const index = users.map((object) => object.id).indexOf(newUser.id); // i try to get the index then remove it
      users.splice(index, 1);
      console.log(index);
    });
    req.on("end", () => {
      res.end("user has been deleted successfully");
    });
  } 
  /*5- update User*/
  else if (req.url === "/userupdate" && req.method === "PATCH") {
    req.on("data", (buffer) => {
      const newUser = JSON.parse(buffer);
      console.log(newUser);
      const index = users.map((object) => object.id).indexOf(newUser.id);
      console.log(users[index]);
      users[index].name = newUser.name;
    });
    req.on("end", () => {
      res.end("user has been updated successfully");
    });
  } 
  /*6- user search by id*/
  else if (req.url === "/usersearch" && req.method === "GET") {
    req.on("data", (buffer) => {
      const newUser = JSON.parse(buffer);
      console.log(newUser);
      const index = users.map((object) => object.id).indexOf(newUser.id);
      console.log(users[index]);
      res.end("The name is:" + JSON.stringify(users[index].name));
    });
  }
/////////////////////////////////////////POST endpoint/////////////////////////////////////////////////////
 /*1- get all posts*/ 
 if (req.url === "/posts" && req.method === "GET") {
    res.end(JSON.stringify(posts));
  }
  /*2- add post*/
  else if (req.url === "/posts" && req.method === "POST") {
    req.on("data", (buffer) => {
      const newPost = JSON.parse(buffer);
      console.log(newPost);
      posts.push(newPost);
    });
    req.on("end", () => {
      res.end("post added successfuly");
    });
  } 
  /*3- post reverse*/
  else if (req.url === "/postsReverse" && req.method === "GET") {
    let reverse = [...posts];

    reverse.reverse();
    res.end("The reversed posts :" + JSON.stringify(reverse));
  } 
  /*4- delete post*/
  else if (req.url === "/postdelete" && req.method === "DELETE") {
    req.on("data", (buffer) => {
      const newPost = JSON.parse(buffer);
      console.log(newPost);
      const index = posts.map((object) => object.id).indexOf(newPost.id); 
      posts.splice(index, 1);
      console.log(index);
    });
    req.on("end", () => {
      res.end("post has been deleted successfully");
    });
  } 
  /*5- post update*/
  else if (req.url === "/postupdate" && req.method === "PATCH") {
    req.on("data", (buffer) => {
      const newPost = JSON.parse(buffer);
      console.log(newPost);
      const index = posts.map((object) => object.id).indexOf(newPost.id);
      console.log(posts[index]);
      posts[index].data = newPost.data;
    });
    req.on("end", () => {
      res.end("post has been updated successfully");
    });
  }
  /*6- post search*/
  else if (req.url === "/postsearch" && req.method === "GET") {
    req.on("data", (buffer) => {
      const newPost = JSON.parse(buffer);
      console.log(newPost);
      const index = posts.map((object) => object.id).indexOf(newPost.id);
      console.log(posts[index]);
      res.end("The post data is:" + JSON.stringify(posts[index].data));
    });
  }
});

const port = 3000;

server.listen(port, () => {
  console.log("server is connected successfully at:" + port);
});
