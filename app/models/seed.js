const mongoose = require('mongoose')
const Recipe = require('./recipe')
const db = require('../../config/db')

const startRecipes = [
{username:"Christiano",
recipeName: 1,
caption: 'I love meal prep on sundays!',
image: 'https://media.istockphoto.com/id/1136168094/photo/chicken-teriyaki-meal-prep-lunch-box-containers-with-broccoli-rice-and-carrots.jpg?s=612x612&w=0&k=20&c=WNAaGFVX-Kt3l_wrw02Gz6UEg1KOJPByQUYwecIOodc='},
{username:"JonJones",
recipeName: 2,
caption: 'Salads... Soup and salads... #road to 4percentbf',
image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/28/1/FNM_040112-WN-Dinners-014_s4x3.jpg.rend.hgtvcom.581.436.suffix/1371605958678.jpeg'},
{username:"SerenaWilliams",
recipeName: 3,
caption: 'Okay. Secret is out: My favorite cheat meal!',
image: 'https://www.flavormosaic.com/wp-content/uploads/2022/06/Copycat-ChickFilA-Grilled-Chicken-Sandwich-with-Bacon-and-Cheese-and-Honey-Barbecue-Sauce-333x500.jpg'},
{username:"LeBronJames",
recipeName: 4,
caption: 'TACO TUEEEEESSSSDAYYYYYYYY!!!!!!!!! ',
image: 'https://www.eatupnewyork.com/wp-content/uploads/2015/05/ThinkstockPhotos-186347741-750x400.jpg'},
{username:"JoeBurrow",
recipeName: 5,
caption: 'Bang Bang Shrimp never gets old frfr',
image: 'https://www.bakingbeauty.net/wp-content/uploads/2018/10/bang-bang-shrimp.jpg'},
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Recipe.deleteMany()
            .then(deletedRecipes => {
                console.log('the deleted recipes:', deletedRecipes)
                // now we add our recipes to the db
                Recipe.create(startRecipes)
                    .then(newRecipes => {
                        console.log('the new recipes', newRecipes)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })