import Role from "../models/Role"

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount() //Verifica si existen documentos

        if(count > 0 ) return

        const values = await Promise.all([   // Crea Roles y guarda al mismo tiempo 
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ])

        console.log(values)
    } catch (error) {
        console.error(error);
    }
}