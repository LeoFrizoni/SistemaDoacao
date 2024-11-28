import Api from "../helpers/api";

export async function GetAdministrador() {
    return await Api.get("/Administrador");
}

export async function GetAdministradorById(id) {
    return await Api.get(`/Administrador/GetADMById/${id}`);
}

export async function PostAdministrador(adm) {
    return await Api.post("/Administrador/PostADM", adm);
}

export async function GetAdministradorByUser(user) {
    return await Api.get(`/Administrador/GetADMByUser/${user}`)
}