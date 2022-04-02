import bcrypt from "bcryptjs";

const users=[
    {
        name:'Admin user',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Abhishek singh',
        email:'admn@example.com',
        password:bcrypt.hashSync('123456',10),
     
    },
    {
        name:'Harshdev singh',
        email:'admi@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    }
]
export default users;