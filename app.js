const express = require("express")
const bodyParser = require("body-parser")
const date= require(__dirname+"/date.js")

workItems=[]
const app = express()

var items = ["Buy Food","Cook Food", "Eat Food"];

app.set("view engine", "ejs");



app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req,res){

    let day = date.getDate()
    
    res.render("list", {
        listTitle:day,
        newListItems:items
    })
    
})
app.post("/",function(req, res){
    var item=req.body.newItem
    if(req.body.list==="work"){
        workItems.push(item)
        res.redirect("/work")
    }
    else{
        items.push(item)
        res.redirect("/")
    }
})
app.get("/work",function(req,res){
    res.render("list",{
        listTitle:"work List",
        newListItems:workItems
    })
})

app.get("/about",function(req,res){
    res.render("about")
})




app.post("/work",function(req,res){
    let item=req.body.newItem
    workItems.push(item)
    res.redirect("/")
})





app.listen(3000,function(){
    console.log("server is running on port 3000")
})