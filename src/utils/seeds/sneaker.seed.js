const mongoose = require("mongoose");
const Sneaker = require("../../api/models/sneakers.model");
const connectDb = require("../database/db");

const sneakers = [
    {
        brand: "Adidas",
        name: "Yeezy Boost 350 V2",
        model: "Semi Frozen Yellow",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/Sin_t%C3%ADtulo-6_aezmsg.png"
    },
    {
        brand: "Adidas",
        name: "Yeezy Boost 350 V2",
        model: "Cream White",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/cream_white_ymqs4k.png"
    },
    {
        brand: "Adidas",
        name: "Yeezy Boost 350 V2",
        model: "Trfrm",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/trfm_ug09z4.png"
    },
    {
        brand: "Adidas",
        name: "Yeezy Boost 350 V2",
        model: "Beluga",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/beluga_yqno9j.png"
    },
    {
        brand: "Adidas",
        name: "Yeezy 500",
        model: "Bone White",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/500_f7qweo.png"
    },
    {
        brand: "Adidas",
        name: "NMD Hu",
        model: "Pharrell Inspiration Pack Black",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/HR_fjmqxz.png"
    },
    {
        brand: "Nike",
        name: "Blazer Mid 77",
        model: "White Black",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/BLAZER_qrqhgx.png"
    },
    {
        brand: "Nike",
        name: "Air Max Plus",
        model: "Time Capsule",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/TN_zydxn6.png"
    },
    {
        brand: "Nike",
        name: "Air Max 270",
        model: "Light Bone Hot Punch",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/270_m9f8po.png"
    },
    {
        brand: "Nike",
        name: "React Element 55",
        model: "White Crimson Volt",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/REACT_u1tmn8.png"
    },
    {
        brand: "Nike",
        name: "Air Max 270 React",
        model: "Bauhaus",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/BAUHAUS_kmf5ut.png"
    },
    {
        brand: "Nike",
        name: "Air Force 1 DNA",
        model: "White",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/FORCE_LV_qspnyc.png"
    },
    {
        brand: "Nike",
        name: "Air Force 1 Low",
        model: "LV8 3 White",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/GRAFITI_tncb5n.png"
    },
    {
        brand: "Nike",
        name: "Air Force 1 Low",
        model: "Tie Dye",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997974/armario/FORCE_ROJA_yssqks.png"
    },
    {
        brand: "Nike",
        name: "Air Max 97",
        model: "Safari Off Noir",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/97_umz8xy.png"
    },
    {
        brand: "Nike",
        name: "Dunk Low Retro",
        model: "White Black Panda",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/DUNK_w1pofd.png"
    },
    {
        brand: "Balenciaga",
        name: "Speed Trainer",
        model: "Black White",
        img: "https://res.cloudinary.com/dj0q4vclw/image/upload/v1673997973/armario/BALENCIAGA_b5nqyy.png"
    }
];

connectDb()
.then(async () => {
    const allSneakers = await Sneaker.find().lean();

    if (!allSneakers.length){
        console.log("[seed]: No sneakers found, continuing...");
    } else {
        console.log(`[seed]: ${allSneakers.length} sneaker(ies) found.`);
        await Sneaker.collection.drop();
        console.log("[seed]: Collection 'sneakers' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the sneakers ---> " + error))
.then (async () => {
    await Sneaker.insertMany(sneakers)
    console.log("[seed]: New sneakers succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the sneakers ---> " + error))
.finally(() => mongoose.disconnect());