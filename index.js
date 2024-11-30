import express from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let blogs = [];
let currentID = 1;

function getID() {
    return ++currentID;
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Explicitly set the views directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index", { blogs: blogs });
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id);

    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    res.render("blog", { blog });
});

app.post("/", (req, res) => {
    let blog = { title: req.body.title, content: req.body.content, id: getID() };

    if (blog.title == "" || blog.content.trim() == "") {
        res.status(400).send("Blog is empty");
    } else {
        blogs.push(blog);
        res.render("index", { blogs });
    }
});

app.patch("/:id", (req, res) => {
    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id);

    console.log("before" + blog);


    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    // Update the blog fields
    blog.title = req.body.title;
    blog.content = req.body.content;

    console.log(blog)

    // Respond with no content (204)
    res.status(204).end();
});

app.delete("/:id", (req, res) => {
    const id = req.params.id;

    let filteredBlogs = blogs.filter(elem => elem.id != id);

    if (blogs.length != filteredBlogs.length) {
        blogs = filteredBlogs;
        blogs.forEach(elem => {
            elem.id = getID();
        });
        res.status(204).send({ message: "Blog deleted successfully" });
    } else {
        res.status(404).send({ message: "Blog not found" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
