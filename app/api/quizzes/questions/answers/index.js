const { Router } = require('express')

const { Answer } = require('../../../../models')


const router = new Router({ mergeParams: true })


router.get('/', (req, res) => {
  try {
    res.status(200).json(Answer.get().filter((q) => q.questionId === parseInt(req.params.questionId, 10)))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    if (Answer.getById(req.params.answerId).questionId !== parseInt(req.params.questionId, 10)) {
      res.status(500).json('There is no question matching answerId-questionId')
    } else {
      res.status(200).json(Answer.getById(req.params.answerId))
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:answerId', (req, res) => {
  try {
    if (Answer.getById(req.params.answerId).questionId !== parseInt(req.params.questionId, 10)) {
      res.status(500).json('There is no question matching answerId-questionId')
    } else {
      res.status(200).json(Answer.update(req.params.answerId, req.body))
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const questionId = parseInt(req.params.questionId, 10)
    const answer = Answer.create({ ...req.body, questionId })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    if (Answer.getById(req.params.answerId).questionId !== parseInt(req.params.questionId, 10)) {
      res.status(500).json('There is no question matching answerId-questionId')
    } else {
      res.status(200).json(Answer.delete(req.params.answerId))
    }
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
