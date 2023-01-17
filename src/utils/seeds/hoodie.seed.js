const mongoose = require("mongoose");
const Hoodie = require("../../api/models/hoodies.model");
const connectDb = require("../database/db");

const hoodies = [
    {
        brand: "Heron Preston",
        model: "Heron Watercolor Print Crewneck Sweatshirt",
        collaboration: "",
        img: "https://images.stockx.com/images/Heron-Preston-Heron-Watercolor-Print-Crewneck-Sweatshirt-Black.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1634740478&q=57"
    },
    {
        brand: "Supreme",
        model: "Label Hooded Sweatshirt",
        collaboration: "Champion",
        img: "https://images.stockx.com/images/Supreme-Champion-Label-Hooded-Sweatshirt-Olive.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1613351920&q=57"
    },
    {
        brand: "Stone Island",
        model: "Brushed Cotton Fleece Crewneck",
        collaboration: "",
        img: "https://images.stockx.com/images/Stone-Island-63020-Brushed-Cotton-Fleece-Crewneck-Antique-Rose.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1637372936&q=57"
    },
    {
        brand: "Palm Angels",
        model: "Bear Hoodie",
        collaboration: "",
        img: "https://images.stockx.com/images/Palm-Angels-Bear-Hoodie-Hoodie-Black-Multi.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1644511033&q=57"
    },
    {
        brand: "Stussy",
        model: "Basic Hoodie Black",
        collaboration: "",
        img: "https://images.stockx.com/images/Stussy-Basic-Hoodie-Black-v2.jpg?fit=fill&bg=FFFFFF&w=576&h=384&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1666590407&q=57"
    },
]

connectDb()
.then(async () => {
    const allHoodies = await Hoodie.find().lean();

    if (!allHoodies.length){
        console.log("[seed]: No hoodies found, continuing...");
    } else {
        console.log(`[seed]: ${allHoodies.length} hoodie(ies) found.`);
        await Hoodie.collection.drop();
        console.log("[seed]: Collection 'hoodies' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the hoodies ---> " + error))
.then (async () => {
    await Hoodie.insertMany(hoodies)
    console.log("[seed]: New hoodies succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the hoodies ---> " + error))
.finally(() => mongoose.disconnect());