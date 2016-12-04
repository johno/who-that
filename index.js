'use strict'

const ghUser = require('gh-user')
const pinnedRepos = require('gh-pinned-repos')
const npmUser = require('npm-user')
const pkgList = require('pkg-list')
const isBlank = require('is-blank')
const githubUsername = require('github-username')

module.exports = function whoThat (who) {
  return new Promise((resolve, reject) => {
    const findWho = Object.assign({}, who)
    const firstFind = isBlank(findWho.github) ? githubUsername(findWho.email) : ghUser(findWho.github)

    firstFind
      .then(data => {
        if (isBlank(findWho.github)) {
          findWho.github = data
          return ghUser(data).then(gh => Object.assign({}, gh))
        }

        return Object.assign({}, data)
      })
      .then(data => pinnedRepos(findWho.github).then(pinned => Object.assign({}, data, { pinned })))
      .then(data => {
        if (isBlank(findWho.npm)) return data

        return npmUser(findWho.npm)
          .then(npm => Object.assign({}, npm, data))
          .then(data => pkgList(findWho.npm).then(pkgs => Object.assign({}, { pkgs }, data)))
      })
      .then(resolve)
      .catch(reject)
  })
}
