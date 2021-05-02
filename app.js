const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
const { User } = require('./models');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));





app.get('/users', async (req, res) => {

  try {

    let users = await User.findAll();

    if (!users) {
      res.send('User note found')
    }

    res.send(users);

  } catch (error) {
    res.json(error);
  }


});




app.get('/users/:id', async (req, res) => {


  try {

    let user = await User.findOne({
      where: {
        id: req.params.id
      }
    })


    if (!user) {
      res.send('User note found');
    }

    res.send(user);

  } catch (error) {
    res.json(error);
  }


});





app.post('/users', async (req, res) => {

  try {

    const newUser = new User({

      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      city: req.body.city,
      phone: req.body.phone,

    });

    const saveUser = await newUser.save();

    res.send('User added');

  } catch (error) {
    res.json(error);
  }

});




app.put('/users/:id', async (req, res) => {

  try {

    const user = await User.findByPk(req.params.id);

    if (!user) {

      res.send('User note found');
    } else {

      await user.update({

        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        phone: req.body.phone,
      });

      res.send('User Updated');

    }
  } catch (error) {
    res.json(error);
  }



});




app.delete('/users/:id', async (req, res) => {
  try {

    const user = await User.findByPk(req.params.id);

    if (!user) {

      res.send('User note found');
    } else {

      await user.destroy();

      res.send('User Deleted');

    }
  } catch (error) {
    res.json(error);
  }
});



db.sequelize.sync().then((res) => {


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })

})