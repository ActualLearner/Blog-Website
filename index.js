import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = path.dirname(__filename); // Get the current directory name

let blogs = [];
let currentID = 1;

function getID() {
    return ++currentID;
}

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("./index.ejs", { blogs: blogs });
})

app.get("/:id", (req, res) => {

    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id);

    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    res.render("./blog.ejs", { blog });

});

app.post("/", (req, res) => {

    let blog = { title: req.body.title, content: req.body.content, id: getID() };

    if (blog.title == "" || blog.content.trim() == "") {
        res.status(400).send("Blog is empty");
    } else {
        blogs.push(blog);
        res.render("./index.ejs", { blogs });
    }

})

app.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    let filteredBlogs = blogs.filter(elem => {
        return elem.id != id;
    })

    if (blogs.length != filteredBlogs.length) {

        blogs = filteredBlogs;
        blogs.forEach(elem => {
            elem.id = getID();
        });
        res.status(204).send({ message: "Blog deleted successfully" });

    } else {
        res.status(404).send({ message: "Blog not found" });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
