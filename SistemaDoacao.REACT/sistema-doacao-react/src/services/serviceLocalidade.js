import Api from "../helpers/api";

export async function GetLocalidade() {
    return await Api.get("/localidade");
}

export async function GetLocalidadeById(id) {
    return await Api.get(`/localidade/getlocalidadebyid/${id}`);
}

export async function PostLocalidade(localidade) {
    return await Api.post("/localidade/postlocalidade", localidade);
}

export async function PutLocalidade(localidade) {
    return await Api.put("/localidade/putlocalidade", localidade);
}

export async function DeleteLocalidade(id) {
    return await Api.delete(`/localidade/deletelocalidade/${id}`);
}

export async function GetLocalidadeByCEP(cep) {
    return await Api.get(`/localidade/GetLocalidadeByCEP/${cep}`)
}