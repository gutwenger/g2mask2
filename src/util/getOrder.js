import { SERVER_URL } from "./serverVariables";

export async function getOrder({ uuid, user }) {
    return fetch(`${SERVER_URL}eshop/trackorder/${uuid}`, {
        headers: {
            "Authorization": user && `Bearer ${user.access}`
        }
    })
    .then(response => response.json())
    .then(result => result);
}