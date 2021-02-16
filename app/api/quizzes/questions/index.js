const { Router } = require('express')

// const { Quiz } = require('../../../models')
const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })


router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get().filter((q) => q.quizId === parseInt(req.params.quizId, 10)))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    if (Question.getById(req.params.questionId).quizId !== parseInt(req.params.quizId, 10)) {
      res.status(500).json('There is no question matching quizId-questionId')
    } else {
      res.status(200).json(Question.update(req.params.questionId, req.body))
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10)
    const question = Question.create({ ...req.body, quizId })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    if (Question.getById(req.params.questionId).quizId !== parseInt(req.params.quizId, 10)) {
      res.status(500).json('There is no question matching quizId-questionId')
    } else {
      res.status(200).json(Question.delete(req.params.questionId))
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
