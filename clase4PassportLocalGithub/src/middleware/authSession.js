export async function auth(req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).send('error de autorización!')
    }

    return next()
}

export async function authUser(req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).send('error de autorización!')
    }
    if (req.user?.role === 'admin'  || req.user?.role == 'user') {
        return next()
    }
    return res.status(401).send('error de autorización!')
}



export async function authAdmin(req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).send('error de autorización!')
    }
    if (req.user?.role === 'admin') {
        return next()
    }
    return res.status(401).send('error de autorización!')
}

