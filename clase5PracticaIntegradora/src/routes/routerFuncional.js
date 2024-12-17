import { Router } from 'express'
import { passportCall } from '../utils/passportCall.js'

const handlePolicies = policies => (req, res, next) => {
    
    const normalizedPolicies = policies.map(policy => policy.toUpperCase())

    if (normalizedPolicies.includes("PUBLIC")) return next()

    passportCall('jwt')(req, res, err => {
        if (err) return next(err);

        const userRoles = req.user.roles.map(role => role.toUpperCase())

        const hasAccess = userRoles.some(role => normalizedPolicies.includes(role))
        if (!hasAccess) {
            return res.status(403).send({ error: "Forbidden" })
        }

        next()
    })
}


const generateCustomResponses = (req, res, next) => {
    res.sendSuccess = payload => res.send({ status: "success", payload })
    res.sendServerError = error => res.status(500).send({ status: "error", error })
    res.sendUserError = error => res.status(400).send({ status: "error", error })
    next()
}

const applyCallbacks = callbacks => callbacks.map(callback => async (req, res, next) => {
    try {
        await callback(req, res, next);
    } catch (error) {
        next(error)
    }
})

const createRoute = (method, path, policies, callbacks, router) => {
    router[method](
        path,
        handlePolicies(policies),
        generateCustomResponses,
        ...applyCallbacks(callbacks)
    )
}

router.get("/",["public","user"],)

const createRouter = () => {
    const router = Router()
    return {
        getRouter: () => router,
        get: (path, policies, ...callbacks) => createRoute('get', path, policies, callbacks, router),
        post: (path, policies, ...callbacks) => createRoute('post', path, policies, callbacks, router),
        patch: (path, policies, ...callbacks) => createRoute('patch', path, policies, callbacks, router),
        delete: (path, policies, ...callbacks) => createRoute('delete', path, policies, callbacks, router),
        param: (paramName, callback) => router.param(paramName, async (req, res, next, value) => {
            try {
                await callback(req, res, next, value);
            } catch (error) {
                next(error)
            }
        }),
    }
}

export default createRouter