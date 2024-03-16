export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    const token = body.token;

    if(!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No token or invalid token provided'
        })
    }

    return token;
});


