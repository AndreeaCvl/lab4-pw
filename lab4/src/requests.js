const ACCESS_TOKEN = "c8d5051edd90b0cdabbc69c35f5e46d8e227e7c8804603fe1e8a22cfe7f1edcd"

export function getUsers() {
    return fetch("https://late-glitter-4431.fly.dev/api/v54/users", {
      headers: {
        "X-access-token": ACCESS_TOKEN, 
      },
    }).then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        return null; 
    });
}


export function getQuizes() {
    return fetch("https://late-glitter-4431.fly.dev/api/v54/quizzes", {
      headers: {
        "X-access-token": ACCESS_TOKEN, 
      },
    }).then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching quizes:", error);
        return null; 
    });
}

  
export function register(args) {
    const payload = {
        data: {
          name: args.name,
          surname: args.surname,
        },
      };
    
    return fetch("https://late-glitter-4431.fly.dev/api/v54/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": ACCESS_TOKEN,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User created:", data);
      return {data}
      // Handle the response data or perform any necessary actions
    })
    .catch((error) => {
      console.log("Error creating user:", error);
      return null
      // Handle the error case accordingly
    });
}


export function getQuizByID(quizID) {
    return fetch(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${quizID}`, {
      headers: {
        "X-access-token": ACCESS_TOKEN, 
      },
    }).then((res) => res.json()).then((data) => {
        return {
          data
        };
      })
      .catch((error) => {
        console.log("Error fetching the quiz:", error);
        return null; 
    });
}