const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({ 
            email: email,
            hash: hash 
        })
        .into('login')
        .returning('email')
        .then(newEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: newEmail[0], 
                    joined: new Date() 
                })
                .then(user => {
                    console.log(user);
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
};