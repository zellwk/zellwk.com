---
title: How to review and edit a pull request
layout: post
slug: edit-pull-request
newsletter: better-fed
youtubeHash: UpBpb0j7IKA
tags:
 - video
 - git
description: Collaborators can decide whether to accept or reject your pull request. They may also request for some changes. This video shows you what process looks like.
---

When you submit a pull request, a collaborator will have the right to review your pull request. They'll decide whether to accept your pull request. If they accept your pull request, your code will be merged into the branch you requested for.

You're going to learn how a review process will look like from both points of view:

1. The person who's reviewing the process
2. The person who's submitting the review

<!-- more -->

## Merging the pull request

For this lesson, I'll use the following accounts:

1. `zellwk` as the reviewer
2. `zellwk2` as the person who submitted the pull request

As the reviewer, if you scroll down to the bottom of the page, you'll see a green button that says merge pull request. You see this because you have write access to the repository.

If you want to merge the pull request, you can click on the green button and you're done.

<figure><img src="/images/2018/edit-pr/merge.png" alt="The merge pull request button">
</figure>

If you don't have write access to the repository, you won't see a button that says merge pull request.

<figure><img src="/images/2018/edit-pr/no-merge.png" alt="Non-collaborators won't see the merge pull request button">
</figure>

## Reviewing the pull request

As a reviewer, you'll want to click on the files changed tab. This tells you what files have changed.

<figure><img src="/images/2018/edit-pr/files-changed-tab.png" alt="The files changed tab">
</figure>

You'll come to a page with two sets of code:

1. The left set is the current code
2. The right set is the proposed code

You can see what code is added or removed in this view. Green lines signify code that's added. Red lines signify code that's removed.

<figure><img src="/images/2018/edit-pr/diff.png" alt="The diff view">
</figure>

### Commenting, approving, or requesting changes

The reviewer can comment, approve, or request for changes as they see fit. To do so, they can click on the review changes button on the top-right-hand corner.

If you click on the review changes button, you'll see three options:

1. Comment
2. Approve
3. Request changes

<figure><img src="/images/2018/edit-pr/review-change-button.png" alt="The review changes button">
</figure>

### A better way to review

A better way to review the code is to provide feedback on the line of code that requires feedback.

You can do this by hovering over the line you want to provide feedback for. When you do so, you'll see a blue `+` button.

<figure><img src="/images/2018/edit-pr/plus-button.png" alt="The plus button">
</figure>

When you click on the blue `+` button, you'll see an editor. You can comment on the line of code here.

<figure><img src="/images/2018/edit-pr/the-editor.png" alt="The editor shows up after you click the plus button">
</figure>

There are two options:

1. Add a single comment
2. Start a review

If you click on add single comment, the comment will be made immediately.

If you click on start a review, you'll have the chance to write more comments before sending them at once. To end the review, you need to click on the review changes button and select submit review.

<figure><img src="/images/2018/edit-pr/submit-review.png" alt="Submitting the review">
</figure>

The pull request will be updated with your changes after you submit your review:

<figure><img src="/images/2018/edit-pr/pr-updated.png" alt="Pull request updated">
</figure>

## Working on the pull request

The person who is submitting the pull request can also see the comments.

<figure><img src="/images/2018/edit-pr/pr-updated-2.png" alt="Pull request from the submitter's view">
</figure>

If you're working on the pull request, you have to make the necessary changes. To do so, you go back to your forked repository and update the same branch you used to submit the pull request.

In this case, this will be the development branch. I went ahead and added the closing `<ul>` tag in the `index.html` file. I also set the commit message to `closing <ul> appropriately`.

<figure><img src="/images/2018/edit-pr/edit-pr.png" alt="Writing a commit message that says closing <ul> appropriately">
</figure>

Github will update the pull request with the new changes once the submitter pushes into the forked repository.

<figure><img src="/images/2018/edit-pr/pr-updated-after-edit.png" alt="Pull request updated automatically after commits are pushed">
</figure>

The reviewer can now merge the request by clicking on the merge pull request button.

## After the merge

You can delete the forked repository (or the branch you used for the pull request) after the code is merged into the main repository. They're no longer needed.

## Wrapping up

You learned how to review and edit a pull request in this lesson.

To edit a pull request, you push new changes into the same branch that was used for the pull request. Github will update everything else automatically.
