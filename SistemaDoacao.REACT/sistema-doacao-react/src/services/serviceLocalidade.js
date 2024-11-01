import Api from "../helpers/api";

export async function GetLocalidade() {
    return await Api.get("/Localidade");
}

export async function GetLocalidadeById(id) {
    return await Api.get(`/Localidade/GetLocalidadeById/${id}`);
}

export async function PostLocalidade(localidade) {
    return await Api.post("/Localidade/PostLocalidade", localidade);
}

export async function PutLocalidade(localidade) {
    return await Api.put("/Localidade/PutLocalidade", localidade);
}

export async function DeleteLocalidade(id) {
    return await Api.delete(`/Localidade/DeleteLocalidade/${id}`);
}

export async function GetLocalidadePorNome(name) {
    return await Api.get(`/Localidade/GetLocalidadeByName${name}`)
}