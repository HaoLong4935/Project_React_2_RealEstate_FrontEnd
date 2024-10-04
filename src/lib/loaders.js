import { defer } from "react-router-dom"
import apiReq from "./apiRequest"

export const singlePageLoader = async ({ request, params }) => {
    const res = await apiReq.get("/posts/" + params.id)
    return res.data
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]
    const postPromise = apiReq("/posts?" + query)
    return defer({
        postResponse: postPromise,
    })
}

export const profiletPageLoader = async () => {
    const postPromise = apiReq("/users/profilePosts")
    const chatPromise = apiReq("/chats")
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    })
}