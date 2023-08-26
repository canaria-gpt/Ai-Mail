function Token(accessToken) {

    return {
        headers:{
            Authorization: "Bearer "+accessToken
        }
    }
}

export default Token;