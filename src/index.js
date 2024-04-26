var username;
let Useraccount = {};
const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const cors = require("cors");
const axios = require("axios");

const app = express();

// convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: true }));

//use EJS as the view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

// login to signup <=> signup to login
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bio: ""
    }

    //Check if the user already exists in the database
    const existinguser = await collection.findOne({ email: data.email });

    if (existinguser) {
        res.send("User already exists. Please Sign in.");
    } else {

        // Hash the password using bcrypt
        const saltRounds = 10; // number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        res.render("login");
    }

});

//Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });

        if (!check) {
            res.send("Email not found");
        }

        Useraccount.email = req.body.email;

        console.log("login user name: ", Useraccount.email);
        console.log("User: ", await collection.findOne({ email: Useraccount.email }))


        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {


          //  matches();
            res.redirect("home");


        } else {
            req.send("Password is incorrect");
        }

    } catch (e) {
        res.send("Wrong Details", e);

    }
});


app.get("/home", async (req, res) => {

    try {
        const user = await collection.findOne({ email: Useraccount.email });
        // console.log("User: ",user);

        if (user) {
            res.render("home", {
                ACCName: user.name,
                matchList: user.matchList,
                bio: user.bio
            });
        } else {
            console.log("User not found")
            res.render("home", {
                ACCName: "Default Account"
            });
        }
    } catch (error) {
        // console.log("reached but wrong");
        console.error("Error:", error);
        res.render("error");
    }

});

// Chat button

app.post("/home", async (req, res) => {
    try {
        //const {username} = req.body.name;
        //console.log("username: ", username);

        const doc = await collection.findOne({ email: Useraccount.email });

        const submit = req.body.quiz;
        const refresh = req.body.refresh;
        const upd_bio = req.body.upd_bio;
        if (submit === "quiz") {
            if (doc.quizAnswerList.length > 9) {
                console.log("Looks like you took quiz already, just wait for matches :)");
            } else {
                res.redirect("question1");
            }
        }

        if (refresh === "refresh") {
            matches();
            res.redirect("back");
        }

        // console.log("User Bio: ", req.body.bio);

        if (upd_bio === "upd_bio") {
            res.redirect('updateBio');
        }

        // const r = await axios.put(
        //     "https://api.chatengine.io/users/",
        //     { username: username, secret: username, first_name: username },
        //     { headers: { "private-key": "76bb4adb-e60f-49a8-9ef7-b5057d946a87" } }
        // );



        // return res.status(r.status).json(r.data);


    } catch (e) {
        return res.status(e.response.status).json(e.response.data);

    }

});

app.get("/question1", (req, res) => {
    res.render("question1");
});

app.get("/question2", (req, res) => {
    res.render("question2");
});

app.get("/question3", (req, res) => {
    res.render("question3");
});

app.get("/question4", (req, res) => {
    res.render("question4");
});

app.get("/question5", (req, res) => {
    res.render("question5");
});

app.get("/question6", (req, res) => {
    res.render("question6");
});

app.get("/question7", (req, res) => {
    res.render("question7");
});

app.get("/question8", (req, res) => {
    res.render("question8");
});

app.get("/question9", (req, res) => {
    res.render("question9");
});

app.get("/question10", (req, res) => {
    res.render("question10");
});

app.post("/question1", (req, res) => {

    const answer = req.body.q1;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question2");

});

app.post("/question2", (req, res) => {

    const answer = req.body.q2;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question3");

});

app.post("/question3", (req, res) => {

    const answer = req.body.q3;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question4");

});

app.post("/question4", (req, res) => {

    const answer = req.body.q4;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question5");

});

app.post("/question5", (req, res) => {

    const answer = req.body.q5;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question6");

});

app.post("/question6", (req, res) => {

    const answer = req.body.q6;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question7");

});

app.post("/question7", (req, res) => {

    const answer = req.body.q7;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question8");

});

app.post("/question8", (req, res) => {

    const answer = req.body.q8;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question9");

});

app.post("/question9", (req, res) => {

    const answer = req.body.q9;
    console.log(answer);
    addQuizAnswer(answer);


    res.redirect("question10");

});

app.post("/question10", (req, res) => {

    const answer = req.body.q10;
    console.log(answer);
    addQuizAnswer(answer);
    matches();

    res.redirect("home");

});

app.post("/updateBio", async (req, res) => {
    try {
        const doc = await collection.findOne({ email: Useraccount.email });
        const save_btn = req.body.save_bio;

        if (save_btn === "save_bio") {
            const newBio = req.body.bio;
            doc.bio = newBio;
            await doc.save();
            res.redirect('home');
        }
    } catch (error) {
        console.log("error saving bio: ", error);
    }
});

app.get("/updateBio", (req, res) => {
    res.render("updateBio");
});

app.get("/chat", (req, res) => {
    res.render("chat")
});

async function addQuizAnswer(answer) {
    try {
        const doc = await collection.findOne({ email: Useraccount.email });

        const int_answer = parseInt(answer);
        //console.log("parse int: ",int_answer);

        if (doc) {
            doc.quizAnswerList = doc.quizAnswerList.concat(int_answer);
            console.log("List: ", doc.quizAnswerList);
        }

        await doc.save();
        console.log("Answer added successfully: ", answer)
    } catch (error) {
        console.error("Error adding integer to list:", error);
    }
}

async function matches() {
    try {
        //const currUser = Useraccount.email;
        const currUserdoc = await collection.findOne({ email: Useraccount.email });
        currUserdoc.matchList = [];

        if (currUserdoc) {
            Useraccount.answerList = currUserdoc.quizAnswerList;
            //console.log("List: ",currUserdoc.quizAnswerList);
        }

        const otherUsers = await collection.find({ email: { $ne: Useraccount.email } });

        //const otherUsers = [];

         /// otherUsersCursor.forEach(user => otherUsers.push(user));
        if (otherUsers) {
              otherUsers.forEach(async function (user) {
                const FCP = matchAlgo(user.quizAnswerList, Useraccount.answerList);
                console.log("FCP returned: ", FCP);
                const FCPmatch = [{ first: user.email, second: FCP }];
                const matchexist = currUserdoc.matchList.some(pair => pair.first === FCPmatch.first && pair.second === FCPmatch.second);
                if (!matchexist) {
                    console.log("matchExist: ", matchexist);
                    currUserdoc.matchList = currUserdoc.matchList.concat(FCPmatch);
                }
            })

            // for(const user of otherUsers){
                
            //     const FCP = matchAlgo(user.quizAnswerList, Useraccount.answerList);
            //     console.log("User list: ", Useraccount.answerList);
            //     console.log("Potential match list: ",user.quizAnswerList);

            //     console.log("FCP returned: ", FCP);
            //     const FCPmatch = [{ first: user.email, second: FCP }];
            //     const matchexist = currUserdoc.matchList.some(pair => pair.first === FCPmatch.first && pair.second === FCPmatch.second);
            //     if (!matchexist) {
            //         // console.log("matchExist: ", matchexist);
            //         currUserdoc.matchList = currUserdoc.matchList.concat(FCPmatch);
            //     }
            // }
          

        }

        await currUserdoc.save();


        // console.log("User matches: ", currUserdoc.matchList);


    } catch (error) {
        console.log("error gettiing matches: ", error);
    }
}

function matchAlgo(lis1, lis2) {
    try {
        let larger = 0;
        let smaller = 0;
        let sum = 0;
        let diff = 0;
        let FCP;



        // This loop compares two people's answers for each question and sums up the difference.
        // The worst possible difference would be 90 (not compatible), the best possible difference is 0 (TWINS)
        for (let i = 0; i < lis1.length; i++) {
            if (lis1[i] > lis2[i]) {
                larger = lis1[i];
                smaller = lis2[i];
            } else {
                larger = lis2[i];
                smaller = lis1[i];
            }
            diff = larger - smaller;
            sum += diff;
            // console.log("Difference: " + diff);
            // console.log("Sum: " + sum);
        }

        let div = sum / 90.0;
        // console.log("division: " + div);

        // Gives compatibility instead of incompatibility.
        FCP = 1 - div;
        // console.log("FCP: " + FCP);

        // Returns compatibility percentage out of 100
        return FCP * 100;

    } catch (error) {
        console.error("Error matching two lists:", error);

    }

}




// chat api to get and create user with chat engine
// https://api.chatengine.io/users/ 


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

