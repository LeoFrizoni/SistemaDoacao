import Api from "../helpers/api";

export async function GetEndereco() {
    return await Api.get("/Endereco");
}

export async function GetEnderecoById(id) {
    return await Api.get(`/Endereco/GetEnderecoById/${id}`);
}

export async function PostEndereco(endereco) {
    return await Api.post("/Endereco/PostEndereco", endereco);
}

export async function PutEndereco(endereco) {
    return await Api.put("/Endereco/PutEndereco", endereco);
}

export async function DeleteEndereco(id) {
    return await Api.delete(`/Endereco/DeleteEndereco/${id}`);
}