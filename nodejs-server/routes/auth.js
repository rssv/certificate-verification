const express = require('express');

const router = express.Router();

app.post('/login', async (req, res) => {
    // Authenticate User
    const { username, password } = req.body;
    //console.log(username, password);
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = users.find(user => user.username == username);
    //console.log("foundUser", foundUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = generateAccessToken(foundUser)
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const otherUsers = users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        users = [...otherUsers, currentUser];
        //console.log(refreshToken, "refresh")
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ ...foundUser, accessToken });
    } else {
        res.sendStatus(401);
    }

})

app.delete('/logout', async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const otherUsers = users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    users = [...otherUsers, currentUser];
    //console.log(users);

    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
})

app.post('/token', async (req, res) => {
    const cookies = req.cookies;
    //console.log("cookies:", cookies.jwt)
    if (!cookies.jwt) return res.status(403).send({ message: 'unauthorized' });
    const refreshToken = cookies.jwt;

    const foundUser = users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.status(403).send({ message: "forbidden" }); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.status(403).send({ message: "forbidden" });
            const accessToken = generateAccessToken(foundUser)
            res.json({ accessToken })
        }
    );
})

module.exports = router;
