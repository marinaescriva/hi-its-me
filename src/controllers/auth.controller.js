
export const register = (req, res) => {  //no se tipa request ni response porq es javascript!
    res.status(201).json(
        {
            success: true,
            message: "register user successfully"
        }
    )
}


export const login = (req, res) => {  //no se tipa request ni response porq es javascript!
    res.status(200).json(
        {
            success: true,
            message: "login user successfully"
        }
    )
}