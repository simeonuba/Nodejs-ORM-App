
let forminput = {
    name: "required|string|max:255",
    email: "required|string|email|max:255",
    password: "required|string|min:8",
    phone_number: 'required|min:11',
    // pin: 'number:5'
}
let loginform ={
    phone_number: 'required|min:11',

    //email: "required|string|email|max:255",
    password: "required"
}
let changePasswordform =  {
    password: "required|string|min:8"
}

module.exports = {
    forminput,
    loginform,
    changePasswordform
}