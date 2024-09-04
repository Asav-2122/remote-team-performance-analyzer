# Contributing to Remote Team Performance Analyzer

First off, thank you for considering contributing to Remote Team Performance Analyzer! It's people like you that make this tool a great resource for organizations managing remote development teams.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to [project_email@example.com].

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the problem in as many details as possible.
- Provide specific examples to demonstrate the steps.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- Use a clear and descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps.

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible.
- Follow the TypeScript and JavaScript styleguides.
- Include thoughtfully-worded, well-structured tests.
- Document new code based on the Documentation Styleguide
- End all files with a newline

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

- Use types always when possible
- Prefer `const` over `let`. Never use `var`
- Use async/await over callbacks
- Use template literals over string concatenation

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown)
- Reference methods and classes in markdown with the custom `{}` notation:
    - Reference classes with `{ClassName}`
    - Reference instance methods with `{ClassName::methodName}`
    - Reference class methods with `{ClassName.methodName}`

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `enhancement` - Issues that are feature requests
* `documentation` - Issues or pull requests related to documentation
* `good first issue` - Good for newcomers

## Getting Started

For something that is bigger than a one or two line fix:

1. Create your own fork of the code
2. Do the changes in your fork
3. If you like the change and think the project could use it:
    * Be sure you have followed the code style for the project.
    * Send a pull request.

Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a patch.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:
* Spelling / grammar fixes
* Typo correction, white space and formatting changes
* Comment clean up
* Bug fixes that change default return values or error codes stored in constants
* Adding logging messages or debugging output
* Changes to 'metadata' files like .gitignore, build scripts, etc.
* Moving source files from one directory or package to another

## Attribution

This Contributing Guide is adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/master/CONTRIBUTING.md)
