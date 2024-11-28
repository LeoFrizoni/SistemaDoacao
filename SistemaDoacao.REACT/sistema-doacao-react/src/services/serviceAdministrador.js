import Api from "../helpers/api";

export async function GetAdministrador() {
    return await Api.get("/Administrador");
}

export async function GetAdministradorById(id) {
    return await Api.get(`/Administrador/GetADMById/${id}`);
}

