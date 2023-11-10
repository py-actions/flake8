# Maintainer documentation

## Releases

### Update version number

- in `package.json`

### Build dist file

```
$ make dist
```

Confirm that this is pushed to the remote as the Action execution is based on `dist/index.js`!

### Tag a release

This project follows semantic versioning.

The Action is automatically updated across all releases within a major version using a `v[MAJOR VERSION]` git tag.  The [recommended approach](https://help.github.com/en/actions/building-actions/about-actions#versioning-your-action) is to move the `v[MAJOR VERSION]` tag to each new within major version release.

- Push a semver git tag
- Move the major version `v[MAJOR VERSION]` tag to the new release commit
- Create a new `v[MAJOR VERSION]` git tag when the major version changes
