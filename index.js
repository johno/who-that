'use strict'

const ghUser = require('gh-user')
const pinnedRepos = require('gh-pinned-repos')
const npmUser = require('npm-user')
const pkgList = require('pkg-list')
const isBlank = require('is-blank')

module.exports = function whoThat (who) {
  return new Promise((resolve, reject) => {
    ghUser(who.github)
      .then(gh => Object.assign({}, gh))
      .then(data => pinnedRepos(who.github).then(pinned => Object.assign({}, data, { pinned })))
      .then(data => {
        if (isBlank(who.npm)) return data

        return npmUser(who.npm)
          .then(npm => Object.assign({}, npm, data))
          .then(data => pkgList(who.npm).then(pkgs => Object.assign({}, { pkgs }, data)))
      })
      .then(resolve)
      .catch(reject)
  })
}
