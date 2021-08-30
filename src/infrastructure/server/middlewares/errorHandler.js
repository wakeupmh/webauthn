const boom = require('@hapi/boom')
const { createLog } = require('../../log')
const Logger = createLog('error-handler')

const notFoundHandler = (req, _, next) => {
  next(boom.notFound(`O recurso ${req.path} não foi encontrado!`))
}

const errorHandler = (error, _, res, next) => {
  const statusCode = boom.isBoom(error) ? error.output.statusCode : 500

  if (error.scope) {
    return res.status(error.statusCode).json({
      error: {
        message: error.customMessage,
        code: error.errorCodeType
      }
    })
  }

  if (!boom.isBoom(error)) {
    Logger.error(error.message, error.stack)
  }
  return res.status(statusCode).json({
    message: boom.isBoom(error)
      ? error.message
      : 'Ocorreu um erro genérico, por favor tente mais tarde!',
    statusCode
  })
}

module.exports = { errorHandler, notFoundHandler }
